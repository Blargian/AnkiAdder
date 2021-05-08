import sys, json
import io
import os

from anki.storage import Collection

def read_in():
    try:
        input = sys.stdin.read()
        print(input)
        return json.loads(input)
    except Exception as e:
        print(e)


def main():

    data = read_in()

    anki_home = r'C:/AnkiDataFolder/User 1/'
    anki_collection_path = os.path.join(anki_home, "collection.anki2")

    try:
        col = Collection(anki_collection_path, log=True)
    except Exception as e:
        print(e)

    modelPictureWord = col.models.byName('2. Picture Words')

    col.models.save(modelPictureWord)
    
    deck = col.decks.byName("Russian")

    note = col.newNote(deck['id'])

    note.fields[0] = data["accented"] #Word
    note.fields[1] = "Picture"  #Picture 
    note.fields[2] = data["extraInfo"] #ExtraInfo 
    note.fields[3] = "Audio"  #Pronounciation 
    note.fields[4] = data["exampleSentence"] #ExampleSentence
    
    try:
        print("error comes here --->")
        col.add_note(note,deck["id"])
        col.save()
        print('added to anki')
    except Exception as e:
        print(e)

if __name__ == '__main__':
    main()

