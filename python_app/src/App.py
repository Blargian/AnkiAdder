import tkinter as tk
from Layout import Layout
from WordHandler import WordHandler
import asyncio

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Anki Adder")
        self.geometry("1920x1080")
        self.layout = Layout(self,self.wordHandler)
        self.wordHandler = WordHandler(self.layout)
        setUp(self)
        

def setUp(self):
    asyncio.run(self.wordHandler.clearWordData())

if __name__ == "__main__":
    app = App()
    app.mainloop()