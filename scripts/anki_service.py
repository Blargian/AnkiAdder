#coding:utf8

import sys, json
from anki.storage import Collection
import os
import requests
import shutil

#Change this to be your media directory
anki_home = r'C:/AnkiDataFolder/User 1/'
mediaDirectory=anki_home + 'collection.media'

def read_in():
    path = os.path.dirname(os.path.abspath(__file__))+'\datasource.json'
    with open(path,encoding="UTF-8") as json_file:
        try:
            data = json.load(json_file)
            return data
        except Exception as e:
            print("An error occured in reading the json datasource: ")
            print(e)
            sys.exit()

#type 'audio' | 'image'
def download_file(type,url,word):
    try:
        extension = ''
        if(type=='audio'):
            extension = '.mp3'
        elif(type=='image'):
            extension='.jpg'
        r = requests.get(url) 
        path = os.path.dirname(os.path.abspath(__file__))+'\downloads'
        localFile = '{path}\{word}{ext}'.format(path=path,word=word,ext=extension)
        with open(localFile,"wb") as file:
            file.write(r.content)
        copyTo = shutil.copy(localFile, mediaDirectory)
        os.remove(localFile)
    except Exception as e:
        print("An error occured downloading {type}".format(type=type))
        print(e)    
        exit()

def main():
    data = read_in()
    #data = {"accented": "соба'ка","exampleSentence":"Де́вочка бои́тся соба́к","extraInfo":"feminine"}

    anki_collection_path = os.path.join(anki_home, "collection.anki2")

    try:
        col = Collection(anki_collection_path, log=True)
    except Exception as e:
        print(e)
        exit()

    try:
        modelPictureWord = col.models.byName('2. Picture Words')
        col.models.save(modelPictureWord)
        deck = col.decks.byName("Russian")
        note = col.newNote(deck['id'])

        note.fields[0] = data["accented"] #Word
        note.fields[1] = "<img src=" + data["accented"]+".jpg" +"/>"  #Picture 
        note.fields[2] = data["extraInfo"] #ExtraInfo 
        note.fields[3] = "[sound:"+data["accented"]+".mp3"+"]"  #Pronounciation 
        note.fields[4] = data["exampleSentence"] #ExampleSentence
    except Exception as e:
        print("An error occured trying to add data to note")
        print(e)
    try:
        download_file('audio',data["pronounciationURL"],data["accented"])
        download_file('image',data["imageURL"],data["accented"])
        col.add_note(note,deck["id"])
        col.save()

    except Exception as e:
        print("An error occured trying to add a note")
        print(e)
        exit()

if __name__ == '__main__':
    print("reached python")
    main()

