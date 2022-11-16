import sys
import argparse 
import pandas as pd 
import json
import aiohttp
import asyncio
import aiofiles
import pymongo
import re
# for anki #
import sys, json
from anki.storage import Collection
import os
import requests
import shutil
#---------#
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog as fd
from tkintertable import TableCanvas, TableModel
import spacy
from spacy.tokens import Token

#Change this to be your media directory
anki_home = r'C:/AnkiTmp/User 1/'
mediaDirectory=anki_home + 'collection.media'
anki_collection_path = os.path.join(anki_home, "collection.anki2")

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        #Script
        self.title("Anki Adder")
        self.geometry("720x550")
        self.resizable(True,True)
        self.words = []
        self.databaseData = []

        container = tk.Frame(self)
        container.pack(side="top", fill="both",expand="true")

        #global variables#
        self.selectedFile = tk.StringVar(container,'')
        
        def selectFile(self):
            filetypes = (
                ('xlsx files','*.xlsx'),
            )

            file = (fd.askopenfile(
                title = 'Open a file',
                initialdir='./',
                filetypes=filetypes)
            )
            self.selectedFile.set(file.name)    

        # modules 
        padding = {'padx':'10','pady':'10'}
        open_button = tk.Button(
            container,
            text='Open a File',
            command=lambda:selectFile(self)
        ).pack()

        process_button = tk.Button(
            container,
            text='Process',
            command=lambda:self.process_file(container)
        ).pack()

    def process_file(self,container):
        self.words = readFile(self.selectedFile)
        db = establishDBConnection()
        asyncio.run(clearWordData(db))
        cleanedWords = cleanWords(self.words)
        nlp = spacy.load("ru_core_news_lg")

        lemmatizedWords = []
        for word in cleanedWords:
            lemmatizedWords.append(lemmatize(word,nlp))

        asyncio.run(storeWordData(db,asyncio.run(getWordData(db,lemmatizedWords)))) 
        #downloadPronounciation(self.words,db)
        tableData = asyncio.run(getDataForDisplay(db,lemmatizedWords))

        #returned data seperated into data & 'informer' data as table won't work with Bool 
        tableDataDic = {}
        tableInformersDic = {} 
        tableDataDic,tableInformersDic = extractDataFromInformer(tableData,["error_multipleAspectPartners","pronounciationFound"])

        tframe = tk.Frame(container)
        tframe.pack(fill='both')
        table=TableCanvas(tframe,data=tableDataDic)

        for index,record in enumerate(tableInformersDic):
            if(tableInformersDic[record]["pronounciationFound"]==True):
                table.setcellColor(rows=[index],cols=[1],newColor='green',key='bg',redraw=False)
            elif(tableInformersDic[record]["pronounciationFound"]==False):
                table.setcellColor(rows=[index],cols=[1],newColor='red',key='bg',redraw=False)
            elif(tableInformersDic[record]["error_multipleAspectPartners"]==True):
                table.setcellColor(rows=[index],cols=[3],newColor='yellow',key='bg',redraw=False)

        table.show()

        add_button = tk.Button(
            container,
            text='Add to Anki',
            command=lambda:addTableToAnki(db,self.words,table)
        ).pack()

def addTableToAnki(db,words,table):

    columnNames = []
    for i in range(table.model.getColumnCount()):
        columnNames.append(table.model.getColumnName(i))
    
    data = table.model.getAllCells()
    # for word in words:
    #     addToAnki(db,word)

#seperates out boolean data from a dictionary. Used because the table library won't process Bools directly
def extractDataFromInformer(dataToSeperate,informers):

    tableDataDic = {}
    tableInformersDic = {}

    for index,table in enumerate(dataToSeperate):
        withoutBooleans = {}
        for informer in informers:
            withoutBooleans["{}".format(informer)] = table.pop(informer)
            
        tableInformersDic["rec{}".format(index)] = withoutBooleans
        tableDataDic["rec{}".format(index)] = table

    return tableDataDic,tableInformersDic 

# reads an excel file and retrieves the words in the file 
def readFile(fileName):
    wordList = pd.read_excel(fileName.get())
    words = wordList["Words"]
    return words.values 

def getConfig():
    configFile = open('config.json')
    config = json.load(configFile)
    return config

def downloadPronounciation(words,db):
    config = getConfig()
    requestString = config["forvo"]["requestString"]
    apiKey = config["forvo"]["apiKey"]

    requestUrls = []
    for word in words:
        #"requestString":"https://apifree.forvo.com ... /word/{}/ ... /key/{}/".format(word, apiKey)
        requestUrls.append(requestString.format(word,apiKey))
    asyncio.run(makeRequests(requestUrls,db,words))

async def makeRequests(requestUrls,db,word):

    mp3Urls = []

    async with aiohttp.ClientSession() as session: 

        for index,requestUrl in enumerate(requestUrls):
            async with session.get(requestUrl) as resp:
                if(resp.status == 200):
                    pronounciation = await resp.json()
                    mp3Url = pronounciation["items"][0]["pathmp3"]
                    mp3Urls.append(mp3Url)

                    async with session.get(mp3Url) as resp:
                        tempCollection = db["temp"]
                        if resp.status == 200:
                            f = await aiofiles.open('./media/{}.mp3'.format(pronounciation["items"][0]["word"]), mode='wb')
                            await f.write(await resp.read())
                            await f.close()
                            await updateTempStorage(db,word,{ "importedWord": word[index] },True)
                else:
                    await mp3Urls.append(null)
                    await updateTempStorage(db,word,{ "importedWord": word[index] },False)

async def updateTempStorage(db,wordToUpdate,query,value):
    tempCollection = db["temp"]
    newvalues = { "$set": { "pronounciationFound": value }}
    tempCollection.update_one(query, newvalues)

def establishDBConnection():

    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDb = myClient["OpenRussian"]
    return myDb

def findWord(db,word):

    formattedWordData = {
        'importedWord':'',
        'accented': '',
        'level': '',
        'type': '',
        'translation':'',
        'verb':{
            'imperfective':'',
            'perfective':'',
        },
        'error_multipleAspectPartners': False,
        'pronounciationFound': False,
        'pronounciationURL':'',
        'imageURL':'',
        'exampleSentence':'',
        'extraInfo': ''
    }

    inWordCollection = db["words"]
    result = inWordCollection.find_one({'bare':'{}'.format(word)})
    formattedWordData["importedWord"] = word
 
    if(result):

        keys = ["accented","level","type"]
        for key in keys:
            if(result.get(key)):
                formattedWordData[key] = result[key]
        
        if(result["type"]=='verb'):
            inVerbsCollection = db["verbs"]
            resultVerb = inVerbsCollection.find_one({'word_id':'{}'.format(result["id"])})

            if(resultVerb):
                formattedWordData["verb"]['{}'.format(resultVerb["aspect"])] = result["accented"]

                #handles the case where partner aspects are more than one 
                if("partner" in resultVerb):
                    if(checkForSinglePartner(resultVerb["partner"])):
                        partnerResult = inWordCollection.find_one({'bare':'{}'.format(resultVerb["partner"])})
                        if(partnerResult):
                            formattedWordData["verb"][getOppositeAspect(resultVerb["aspect"])] = partnerResult["accented"] 
                    else: 
                        formattedWordData["verb"][getOppositeAspect(resultVerb["aspect"])] = resultVerb["partner"] 
                        formattedWordData["error_multipleAspectPartners"] = True

        id = result["id"]
        #do another search for word_id and lang="en" in table Translations
        inTranslationsCollection = db["Translations"]
        translationResult = inTranslationsCollection.find_one({
            'word_id':'{}'.format(id),
            'lang':'en'
            })
        if(translationResult):
            formattedWordData["translation"] = translationResult["tl"]
    
    return formattedWordData

async def getWordData(db, wordsToSearch):
    formattedWordData = []
    for word in wordsToSearch:
        formattedWordData.append(findWord(db,word))
    return formattedWordData

def cleanWords(wordsToSearch):
    cleanedWords = []
    for word in wordsToSearch:
        cleanedWord = re.sub('[".",","," ","!","?"]$','',word)
        #get rid of sentences by looking for multiple spaces
        if(re.search(re.compile('\s+'),word)==None):
            cleanedWords.append(cleanedWord)
        else:
            ()
    return cleanedWords

async def storeWordData(db,wordsToStore):
    tempCollection = db["temp"]
    tempCollection.insert_many(wordsToStore)

async def clearWordData(db):
    tempCollection = db["temp"]
    tempCollection.delete_many({})

async def getDataForDisplay(db,wordsToSearch):
    formattedWordData = []
    tempCollection = db["temp"]

    for word in wordsToSearch:
        result = tempCollection.aggregate([{'$unwind':'$verb'},{'$match':{'importedWord':word}},{'$group':{
        '_id':0,
        'importedWord':{'$first':"$importedWord"},
        'accented':{'$first':"$accented"},
        'translation':{'$first':"$translation"},
        'imperfective':{'$first':"$verb.imperfective"},
        'perfective':{'$first':"$verb.perfective"},
        'error_multipleAspectPartners':{'$first':"$error_multipleAspectPartners"},
        'pronounciationFound':{'$first':"$pronounciationFound"},
        'imageURL':{'$first':"$imageURL"},
        'exampleSentence':{'$first':"$exampleSentence"},
        'extraInfo':{'$first':"$extraInfo"}
        }
        }]) 

        listResult = list(result)
        if listResult:
            formattedWordData.append(listResult[0])
        if not listResult:
            print('skipped {}'.format(word))

    #get rid of _id which was needed for the grouping above 
    for each in formattedWordData:
        each.pop('_id',None)

    return formattedWordData


#returns only the first aspect partner if a verb has multiple associated aspect partners  
def checkForSinglePartner(aspectPartner):
    if ";" in aspectPartner:
        return False 
    else:
        return True

#changes perfect <-> imperfect 
def getOppositeAspect(aspect):
    if "im" in aspect:
        return "perfective"
    else:
        return "imperfective"

#add to anki 
def addToAnki(db,word):

    try:
        col = Collection(anki_collection_path,log=True)
    except Exception as e:
        print(e)
        exit()

    try:
        modelPictureWord = col.models.by_name('2. Picture Words')
        col.models.save(modelPictureWord)
        deck = col.decks.by_name("Default")
        note = col.newNote(deck['id'])

        #pull the data from the temporary table in db
        tempCollection = db["temp"]
        data = tempCollection.find_one({'importedWord':'{}'.format(word)})

        #add the data to each field of the note 
        note.fields[0] = data["accented"] #Word
        note.fields[1] = "<img src=" + data["importedWord"]+".jpg" +"/>"  #Picture
        note.fields[2] = "" #ExtraInfo 
        note.fields[3] = "[sound:"+data["importedWord"]+".mp3"+"]"  #Pronounciation 
        note.fields[4] = data["exampleSentence"] #ExampleSentence

    except Exception as e:
        print("An error occured trying to add data to note")
        print(e)
    
    try:
        copy_file('audio',data["importedWord"])
        #download_file('image',data["imageURL"],data["accented"])
        col.add_note(note,deck["id"])
        col.save()

    except Exception as e: 
        print("An error occured trying to add a note")
        print(e)
        exit()

#type 'audio' | 'image'
def copy_file(type,word):
    try:
        if(type=='audio'):
            localFile = './media/{}.mp3'.format(word)
        elif(type=='image'):
            localFile='./media/{}.jpg'.format(word)
        copyTo = shutil.copy(localFile, mediaDirectory)
        os.remove(localFile)
    except Exception as e:
        print("An error occured copying {}").format(type)
        print(e)    
        exit()

def lemmatize(word,nlp):
    try:
        doc = nlp(word)
        empty_list = []
        for token in doc:
            empty_list.append(token.lemma_)
        processed = empty_list[0]
    except Exception as e:
        print("An error occured lemmatizing {}").format(word)
        print(e)    
    return processed 

if __name__ == '__main__':
    app = App()
    app.mainloop()