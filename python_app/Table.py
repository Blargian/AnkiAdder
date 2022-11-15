from tkinter import *
from tkinter import ttk

class Table:
    def __init__(self,frameToBind):
        self.headers = ["word","accented","translation","imperfective","perfective","image url","example sentence","extra info"]
        self.table_frame = Frame(frameToBind,width=1000,height=490,background="white")
        self.table_frame.grid_propagate(0)
        for column, header in enumerate(self.headers):
            Label(self.table_frame,text=header).grid(row=0, column=0+column)

    def getTable(self):
        return self.table_frame