import csv, requests, io
from jinja2 import Environment, FileSystemLoader
from livereload import Server
import pandas as pd

# Load template from current directory
env = Environment(loader=FileSystemLoader("."))
template = env.get_template("template.html")


df = pd.read_excel("dominion-cards.xlsx")
df['img'] = './images/' + df['expansion'] + '/' + df['fixed_text'] + '.jpg'
df.drop(columns=['url'], inplace=True)

cards = df.to_dict(orient="records")

for card in cards:
  print(card)


# Render and write output
html = template.render(cards=cards)
with open("index.html", "w", encoding="utf-8") as f:
  f.write(html)

