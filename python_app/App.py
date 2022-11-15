import tkinter as tk
from Layout import Layout

class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Anki Adder")
        self.geometry("1920x1080")
        self.layout = Layout(self)
        
if __name__ == "__main__":
    app = App()
    app.mainloop()