#This class defines the model for a single word
class Word:
    def __init__(self,importedWord):
        self._id = None
        self.imported_word = importedWord
        self.accented = None
        self.level = None
        self.translation = None
        self.part_of_speech = None
        self.verb = {
            "imperfective": None,
            "perfective": None
        }
        self.error_multiple_aspects = None
        self.Pronounciation_found = False 
        self.prounciation_url = None
        self.image_url = None
        self.example_sentence = None
        self.extra_info = None

    #getters and setters for all of the properties above 
    def getId(self):
        return self._id
    
    def setId(self,id):
        self._id = id

    def getImportedWord(self):
        return self.imported_word

    def setImportedWord(self,imported):
        self.imported_word = imported 

    def getAccented(self):
        return self.accented

    def setAccented(self,accented):
        self.accented = accented 
    
    def getLevel(self):
        return self.level

    def setLevel(self,level):
        self.level = level 

    def getTranslation(self):
        return self.translation

    def setTranslation(self,translation):
        self.translation = translation 

    def getPartOfSpeech(self):
        return self.part_of_speech

    def setPartOfSpeech(self,partOfSpeech):
        self.part_of_speech = partOfSpeech 

    def getVerb(self):
        if(self.part_of_speech == 'verb'):
            return self.verb
        else:
            return None

    def setVerb(self,imperfective=None,perfective=None):
        if(imperfective):
            self.verb["imperfective"] = imperfective
        if(perfective):
            self.verb["perfective"] = perfective

    def getErrorMultipleAspects(self):
        
