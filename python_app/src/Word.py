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
        self.error_multiple_aspects = False
        self.pronounciation_found = False 
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

    def setVerb(self,aspect,verb):
        if(aspect=='imperfective'):
            self.verb["imperfective"] = verb
        elif(aspect=='perfective'):
            self.verb["perfective"] = verb

    def setErrorMultipleAspects(self,value):
        if(value is bool):
            self.error_multiple_aspects = value

    def getErrorMultipleAspects(self):
        pass

    def getFormattedForInsert(self):
        return {
            'imported_word':self.imported_word,
            'accented':self.accented,
            'level':self.level,
            'type':self.part_of_speech,
            'translation':self.translation,
            'verb':{
                'imperfective':self.verb["imperfective"],
                'perfective':self.verb["perfective"]
            },
            'error_multipleAspectPartners':self.error_multiple_aspects,
            'pronounciation_found':self.pronounciation_found,
            'prounciation_url':self.prounciation_url,
            'imageUrl':self.image_url,
            'exampleSentence':self.example_sentence,
            'extraInfo':self.extra_info
        }
