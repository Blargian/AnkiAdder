from tkinter import *
from tkinter import ttk
from Table import Table

# This class defines all GUI elements and interfaces to them

class Layout:
    def __init__(self,appWindow):
        self.inner_frame = Frame(appWindow,padx=10,pady=10)
        self.inner_frame.pack()

        self.file_dialogue = LabelFrame(self.inner_frame,text="File Dialogue",padx=10,pady=10)
        self.file_dialogue.grid(row=0,column=0, sticky="W")

        self.load_file = Button(self.file_dialogue,text="Select File").grid(row=0,column=0)
        self.process_file = Button(self.file_dialogue,text="Process File").grid(row=0,column=1)

        t = Table(self.inner_frame)
        self.table_frame = t.getTable()
        #self.table_frame = Frame(self.inner_frame,width=1000,height=490,background="white")
        self.table_frame.grid(row=1,column=0,pady=10)

        self.processing_dialogue = LabelFrame(self.inner_frame,text="Execution Dialogue",padx=10,pady=10)
        self.processing_dialogue.grid(row=2,column=0,stick="W")

        self.process_file = Button(self.processing_dialogue,text="Add to Anki").grid(row=0,column=0)

        self.progress_bar = ttk.Progressbar(self.inner_frame,orient='horizontal',length=0,mode='indeterminate')
        self.progress_bar.grid(row=3,column=0)
