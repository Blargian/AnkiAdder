import pandas as pd 

class FileReader:
    def __init__(self):
        self.file_location = None

    def setFileLoc(self,file):
        self.file_location = file[0].name

    def readFile(self):
        if(self.file_location==None):
            return {'success':False,
                    'error_message': 'Please select a file first'}
        else:
            return {'success':False,
                    'error_message':None}
    
    # reads an excel file and retrieves the words in the file 
    def readFile(self,fileName):
        wordList = pd.read_excel(fileName.get())
        words = wordList["Words"]
        return words.values 