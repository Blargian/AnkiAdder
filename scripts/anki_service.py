import sys, json
import os

from anki.storage import Collection

def read_in():
    input = sys.stdin.readlines()
    return json.loads(input[0])

def main():

    print('Main')
    #data = read_in()
    #col = getCollection(r'C:\AnkiDataFolder\User 1')
    
    anki_home = r'C:/AnkiDataFolder/User 1/'
    anki_collection_path = os.path.join(anki_home, "collection.anki2")

    col = Collection(anki_collection_path, log=True)

    modelBasic = col.models.byName('Basic')
    col.models.save(modelBasic)
    
    deck = col.decks.byName("Algorithms")

    note = col.newNote(deck['id'])
    note.fields[0] = "Linchick" # The Front input field in the UI
    note.fields[1] = "Kakoonchick"   # The Back input field in the UI
    col.add_note(note,deck["id"])

    col.save()
    print('added to anki')

if __name__ == '__main__':
    main()

