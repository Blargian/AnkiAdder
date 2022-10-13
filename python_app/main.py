import sys
import argparse 
import pandas as pd 
import json
import aiohttp
import asyncio
import aiofiles

def main(args):
    parser = argparse.ArgumentParser(description='Adds a list of words to Anki')
    parser.add_argument('-i',dest='input',help='the name of .xlsx file to run the script on. The file should be in the same directory. ')
    args = parser.parse_args()
    downloadPronounciation(readFile(args.input))
    
def readFile(fileName):
    wordList = pd.read_excel("testfile.xlsx")
    words = wordList["Words"]
    return words.values 

def getConfig():
    configFile = open('config.json')
    config = json.load(configFile)
    return config

def downloadPronounciation(words):
    print(words)
    config = getConfig()
    requestString = config["forvo"]["requestString"]
    apiKey = config["forvo"]["apiKey"]

    requestUrls = []
    for word in words:
        #"requestString":"https://apifree.forvo.com ... /word/{}/ ... /key/{}/".format(word, apiKey)
        requestUrls.append(requestString.format(word,apiKey))
    asyncio.run(makeRequests(requestUrls))

async def makeRequests(requestUrls):

    mp3Urls = []
    async with aiohttp.ClientSession() as session: 

        for requestUrl in requestUrls:
            async with session.get(requestUrl) as resp:
                if(resp.status == 200):
                    pronounciation = await resp.json()
                    mp3Url = pronounciation["items"][0]["pathmp3"]
                    mp3Urls.append(mp3Url)

                    async with session.get(mp3Url) as resp:
                        if resp.status == 200:
                            f = await aiofiles.open('./media/{}.mp3'.format(pronounciation["items"][0]["word"]), mode='wb')
                            await f.write(await resp.read())
                            await f.close()
                else:
                    mp3Urls.append(null)
    print(mp3Urls) 

if __name__ == '__main__':
    main(sys.argv)