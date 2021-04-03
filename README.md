# AnkiAdder

An application to automate the process of adding cards to Anki for learning the Russian language. 

## Project Progress 

28/03/2021

Converted the .sql database dump from the openrussian website into an sqlite3 database and setup the backend to have an API endpoint which can query the database using knex and return a json formatted list of words which match the search criteria. 

Added an autosuggest dropdown from the search bar which displays the top 10 closest search results.

29/03/2021

Added React-Router and set it up so that a new 'Selector' component is rendered once the search is submitted. (place holder text on this component for now)

02/04/2021 

