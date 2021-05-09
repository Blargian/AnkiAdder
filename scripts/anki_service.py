import sys, json
from anki.storage import Collection
import os

def read_in():
    path = os.path.dirname(os.path.abspath(__file__))+'\datasource.json'
    with open(path,encoding="utf-8") as json_file:
        try:
            data = json.load(json_file)
            return data
        except Exception as e:
            print("An error occured in reading the json datasource: ")
            print(e)
            sys.exit()
        
def main():
    data = read_in()
    #data = {"accented": "соба'ка","exampleSentence":"Де́вочка бои́тся соба́к","extraInfo":"feminine"}

    anki_home = r'C:/AnkiDataFolder/User 1/'
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
        note.fields[1] = "Picture"  #Picture 
        note.fields[2] = data["extraInfo"] #ExtraInfo 
        note.fields[3] = "Audio"  #Pronounciation 
        note.fields[4] = data["exampleSentence"] #ExampleSentence
    except Exception as e:
        print("An error occured trying to add a note")
        print(e)
    try:
        col.add_note(note,deck["id"])
        col.save()
        print('added to anki')
    except Exception as e:
        print(e)

if __name__ == '__main__':
    print("reached python")
    main()

