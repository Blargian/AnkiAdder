from tkinter import *
from tkinter import ttk

class Table:
    def __init__(self,frameToBind,tableWidth=400,tableHeight=400):
        self.headers = ["Imported Word","Accented","Translation","Imperfective","Perfective","Image url","Example Sentence","Extra Info"]
        self.headerCount = len(self.headers)
        self.width = tableWidth
        self.height = tableHeight
        self.table_frame = Frame(frameToBind,width=tableWidth,height=tableHeight,background="white")
        self.table_frame.grid_propagate(0)
        for i in range(self.headerCount):
            self.table_frame.grid_columnconfigure(i, weight=1)
        for column, header in enumerate(self.headers):
            Label(self.table_frame,text=header,background="white").grid(row=0, column=0+column,sticky="W")

    def getTable(self):
        return self.table_frame

    def loadData(self,data):
        pass