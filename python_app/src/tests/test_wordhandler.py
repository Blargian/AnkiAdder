import unittest
import WordHandler

class TestWordHandler(unittest.TestCase):

    def test_FindWord(self):
        wordHandler = WordHandler.WordHandler()
        db = wordHandler.getDb()

        #check that the function returns false if no word is found 
        result = WordHandler.findWord(db,'notAWord')
        self.assertFalse(result)

        #check that the function does not return true if a word is found 
        result = WordHandler.findWord(db,'дом')
        self.assertTrue(result)

    def test_checkForSinglePartner(self):

        #check that the function returns false for a word with multiple aspect partners  
        result = WordHandler.checkForSinglePartner('говорить;ска\'зывать')
        self.assertFalse(result)

        #check that the function returns true for a word with only a single partner  
        result = WordHandler.checkForSinglePartner('смочь')
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()