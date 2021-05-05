# AnkiAdder

An application to automate the process of adding cards to Anki for learning the Russian language. 

## Project Progress 

28/03/2021

Converted the .sql database dump from the openrussian website into an sqlite3 database and setup the backend to have an API endpoint which can query the database using knex and return a json formatted list of words which match the search criteria. 

Added an autosuggest dropdown from the search bar which displays the top 10 closest search results.

29/03/2021

Added React-Router and set it up so that a new 'Selector' component is rendered once the search is submitted. (place holder text on this component for now)

03/04/2021 

Added an image grid and image selection functionality. An API call is made to Pixabay which fetches images for the search term. When the user clicks an image the image url is written to the redux store and a visual indicator added to show which item is selected.  

04/04/2021 

Refactored the search bar redux code to pass more information for the search to the store (added audio, accented, type and id), added a dbHelper and endpoint for fetching the translation. Added pronounciation play support (for words where the pronounciation link exists).

01/05/2021 - 02/05/2021

Incorporated material-io, setup the form for examples sentences and extra information and wrote code so that when the user clicks the add button the data in the redux store gets formatted as JSON which can then be passed to the backend. Backend runs a python script which downloads the image, audio and adds the card to Anki itself. 

05/05/2021

After a little bit of confusion for the last two days I've been able to add the cards to the deck that I choose. The Anki API has obviously changed a little bit since the article was written so I needed to look into the code and figure out how to use the functions correctly. The Anki API is pretty powerful and actually it shouldn't be too hard to use it to make a more generic program which is pretty exciting. I could display a list of the decks on the frontend, a list of card types. This program could be extended to allow other uses to add vocabulary easily. 
Got JSON from the frontend passing to the backend. Tried adding cards programatically using the python anki library however it seems to work incorrectly and just adds to the default deck. I'll try going the harder route now - will need to do that anyway if I want to make the program more generic later on. (Ability to read what decks and card types are already in anki and populate the forms accordingly).

## Setup notes (Database)

In order to run this project on your local machine you'll need to download the latest MySql dump of the openrussian.org database from https://en.openrussian.org/dictionary. Once you've downloaded that you'll need to convert the database dump to an sqlite3 .db file. I did that using this handy converter shell script: https://github.com/dumblob/mysql2sqlite 

To convert the sql dump to sqlite you can run:
```
mysql2sqlite -f openrussian.db -d openrussian -u yourusername -p yourpassword
```

Place the .db file at /database

## Interfacing with Anki 

Julien Sobczak provides an excellent guide on how to automate adding cards to Anki over at https://www.juliensobczak.com/write/2016/12/26/anki-scripting.html
Or
https://www.juliensobczak.com/write/2020/12/26/anki-scripting-for-non-programmers.html

The frontend data is passed to nodeJS as JSON which is then fed into a python script via stdin with the script running as a child process in node. The python script makes use of Anki desktops internal API to add the cards as an alternative to using the desktop GUI to add the cards.

