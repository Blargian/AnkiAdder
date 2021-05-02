import sys, json
import os

from anki.storage import Collection

# Function returns a note to work with
def getCollection(absolutePathAnki):

    print('get collection')
    # Get the anki directory
    anki_home = absolutePathAnki
    anki_collection_path = os.path.join(anki_home,"collection.anki2")

    # Load the collection
    return Collection(anki_collection_path,log=True)

def getNote(collection,deckName,model):

    print('get note')
    # Find the model to use (Basic, Basic with reversed, ...)
    modelBasic = collection.models.byName(model)
    
    # Select the deck
    deck = collection.decks.byName(deckName)
    collection.decks.select(deck['id'])
    collection.decks.current()['mid'] = modelBasic['id']

    # Return the note 
    return collection.newNote()

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

    deck = col.decks.byName("test")
    print(deck)
    col.decks.select(deck['id'])
    col.decks.current()['mid'] = modelBasic['id']

    note = col.newNote()
    note.fields[0] = "Bonjour" # The Front input field in the UI
    note.fields[1] = "Hello"   # The Back input field in the UI
    col.addNote(note)

    col.save()
    print('added to anki')

if __name__ == '__main__':
    main()

