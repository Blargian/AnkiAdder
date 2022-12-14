from tkinter import Canvas
import math

class Table:
    def __init__(self,parentFrame,tableWidth,tableHeight):
        self.headers = ["Imported Word","Accented","Translation","Imperfective","Perfective","Image url","Example Sentence","Extra Info"]
        self.headerCount = len(self.headers)
        self.width = tableWidth
        self.height = tableHeight
        self.table_frame = Canvas(master=parentFrame,width=tableWidth,height=tableHeight,background='white',scrollregion=(0,0,tableWidth,tableHeight))
        self.cellWidth = calcCellWidth(self,self.width,self.headers)
        self.cellHeight = 18
        
        self.table_frame.configure(scrollregion=self.table_frame.bbox("all"))
        self.table_frame.configure(highlightthickness=0, borderwidth=0)
        self.drawHeaders()

    def getTable(self):
        return self.table_frame

    def drawText(self,textToDraw,x,y):
        self.table_frame.create_text((x,y),text = textToDraw,anchor="nw")

    def loadData(self,data):
        pass

    def drawHeaders(self):
        for x, header in enumerate(self.headers):
            self.drawText(header,x*self.cellWidth,10)

    def drawRow(self,rowData):
        for column,index in enumerate(rowData):
            self.create_text(index*self.cellWidth,index*self.cellHeight,text=column,fill="black", font=('Helvetica 15 bold'))

def calcCellWidth(self,tableWidth,headers):
        return math.floor(tableWidth/len(headers))

