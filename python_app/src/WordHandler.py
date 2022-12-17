

import re 
import spacy
from spacy.tokens import Token
from Word import Word
import pymongo
import asyncio

class WordHandler:
    def __init__(self):
        self.words = []
        self.db = establishDBConnection()

    def processWords(self, words):
        cleanedWords = preProcess(words)
        lemmatizedWords = preProcessLematizer(words)

        for preprocessed_word in lemmatizedWords:
            processed_word = findWord(self.db,preprocessed_word)
            if(processed_word):
                processed_word.setId(asyncio.run(storeWordData(self.db,processed_word)))
                self.setWord(processed_word)

    def getDb(self):
        return self.db

    def setWord(self,wordToAdd):
        self.words.append(wordToAdd)

    async def clearWordData(self):
        tempCollection = self.db["temp"]
        tempCollection.delete_many({})

# preprocesses words to clean up accidental kindle highlights of punctuation
def preProcess(wordsToSearch):
    cleanedWords = []
    for word in wordsToSearch:
        cleanedWord = re.sub('[".",","," ","!","?"]$','',word)
        #get rid of sentences by looking for multiple spaces
        if(re.search(re.compile('\s+'),word)==None):
            cleanedWords.append(cleanedWord)
        else:
            ()
    return cleanedWords

# attempts to get the root word of a given highlight (which may be a declanation, conjugation, plural etc)
def preProcessLematizer(cleanedWords):
    nlp = spacy.load("ru_core_news_lg")
    lemmatizedWords = []
    for word in cleanedWords:
        lemmatizedWords.append(lemmatize(word,nlp))
    return lemmatizedWords

#helper function which uses spacey to get the root 
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

# takes a word and accesses the database to pull information on it
def findWord(db,word):

    formattedWordData = Word(word) #create a new word 
    inWordCollection = db["words"]
    result = inWordCollection.find_one({'bare':'{}'.format(word)})

    if(result==None):
        return False

    keys = ["accented","level","type"]
    functions = {
        "accented":formattedWordData.setAccented,
        "level":formattedWordData.setLevel,
        "type":formattedWordData.setPartOfSpeech
    }

    #call setters on each key 
    for key in keys:
        if(result.get(key)):
            functions[key](result[key])
    
    #handles case where the part of speech is verb 
    #in the Russian language all verbs have a 'partner' verb
    #so it's easier to memorise both together  
    if(result["type"]=='verb'):
        inVerbsCollection = db["verbs"]
        resultVerb = inVerbsCollection.find_one({'word_id':'{}'.format(result["id"])})

        if(resultVerb):

            formattedWordData.setVerb(resultVerb["aspect"],result["accented"])
            #handles the case where partner aspects are more than one 
            if("partner" in resultVerb):
                if(checkForSinglePartner(resultVerb["partner"])):
                    partnerResult = inWordCollection.find_one({'bare':'{}'.format(resultVerb["partner"])})
                    if(partnerResult):
                        formattedWordData.setVerb(getOppositeAspect(resultVerb["aspect"]),partnerResult["accented"]) 
                    else: 
                        formattedWordData.setErrorMultipleAspects(True)

    id = result["id"]
    #do another search for word_id and lang="en" in table Translations
    inTranslationsCollection = db["Translations"]
    translationResult = inTranslationsCollection.find_one({
        'word_id':'{}'.format(id),
        'lang':'en'
        })
    if(translationResult):
        formattedWordData.setTranslation(translationResult["tl"])
    
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

def establishDBConnection():
    myClient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDb = myClient["OpenRussian"]
    return myDb

async def storeWordData(db,wordToStore):
    tempCollection = db["temp"]
    insertedId = tempCollection.insert_one(wordToStore.getFormattedForInsert())
    return insertedId