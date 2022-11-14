# AnkiAdder

A desktop application to automate the process of adding flashcards to Anki for learning the Russian language. The application makes use of the Forvo API and the incredibly generous sharing of data over at www.openrussian.com. Using Anki to memorise vocabulary is one of the most effective ways to learn new words however the time it takes to add the cards can quickly stack up and become impractical, especially when you need to add hundreds of new words. This app simplifies the process by allowing you to import a list of words you want to add from a .csv file. The program will automatically pull pronounciations and images for you and add the cards directly to the anki database programatically, whilst showing you any potential issues you will need to manually fix. In this way most of the work is done and only minimal time is spent on fixing words which are more obscure.  

## Setup notes (Database)

In order to run this project on your local machine you'll need to install mongoDb and create the database on your local machine. 

## Interfacing with Anki 

Julien Sobczak provides an excellent guide on how to automate adding cards to Anki over at 
https://www.juliensobczak.com/write/2016/12/26/anki-scripting.html
https://www.juliensobczak.com/write/2020/12/26/anki-scripting-for-non-programmers.html


