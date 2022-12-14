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
            wordList = pd.read_excel(self.file_location)
            words = wordList["Words"]
            return {'success':True,
                    'error_message':None,
                    'words':words.values.tolist()}