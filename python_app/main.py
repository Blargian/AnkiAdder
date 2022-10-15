import sys
import argparse 
import pandas as pd 
import json
import aiohttp
import asyncio
import aiofiles
import pymongo
# for anki #
import sys, json
from anki.storage import Collection
import os
import requests
import shutil
#---------#

#Change this to be your media directory
anki_home = r'C:/AnkiTmp/User 1/'
mediaDirectory=anki_home + 'collection.media'
anki_collection_path = os.path.join(anki_home, "collection.anki2")

def main(args):

    #Script
    parser = argparse.ArgumentParser(description='Adds a list of words to Anki')
    parser.add_argument('-i',dest='input',help='the name of .xlsx file to run the script on. The file should be in the same directory. ')
    args = parser.parse_args()
    words = readFile(args.input)
    db = establishDBConnection()
    clearWordData(db)
    storeWordData(db,getWordData(db,words))
    downloadPronounciation(words,db)
    for word in words:
        addToAnki(db,word)
    
# reads an excel file and retrieves the words in the file 
def readFile(fileName):
    wordList = pd.read_excel("testfile.xlsx")
    words = wordList["Words"]
    return words.values 

def getConfig():
    configFile = open('config.json')
    config = json.load(configFile)
    return config

def downloadPronounciation(words,db):
    print(words)
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
    newvalues = { "$set": { "downloadedPronounciation": value }}
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
        'exampleSentence':''
        'extraInfo'
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
                if(checkForSinglePartner(resultVerb["partner"])):
                    partnerResult = inWordCollection.find_one({'bare':'{}'.format(resultVerb["partner"])})
                    if(partnerResult):
                        formattedWordData["verb"][getOppositeAspect(resultVerb["aspect"])] = partnerResult["accented"] 
                else: 
                    formattedWordData["verb"][getOppositeAspect(resultVerb["aspect"])] = resultVerb["partner"] 
                    formattedWordData["error_multipleAspectPartners"] = True
    
    return formattedWordData

async def getWordData(db, wordsToSearch):
    formattedWordData = []
    for word in wordsToSearch:
        formattedWordData.append(findWord(db,word))
    return formattedWordData

async def storeWordData(db,wordsToStore):
    tempCollection = db["temp"]
    tempCollection.insert_many(wordsToStore)

async def clearWordData(db):
    tempCollection = db["temp"]
    tempCollection.delete_many({})

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
        print(data)

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

if __name__ == '__main__':
    main(sys.argv)