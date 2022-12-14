import unittest
import Table 

class TestTable(unittest.TestCase):

    def test_calcCellWidth(self):
        headers = ['a','b','c','d','e']
        self.assertEquals(Table.calcCellWidth(self,500,headers),100)
        self.assertEquals(Table.calcCellWidth(self,556,headers),111)

if __name__ == '__main__':
    unittest.main()

