import csv, requests, io
from jinja2 import Environment, FileSystemLoader
from livereload import Server
import pandas as pd

# Load template from current directory
env = Environment(loader=FileSystemLoader("."))
template = env.get_template("template.html")


df = pd.read_excel("dominion-cards.xlsx", sheet_name="cards", engine="openpyxl")
df['img'] = './images/' + df['expansion'] + '/' + df['expansion'] + '_' + df['fixed_text'] + '.jpg'

cards = df.to_dict(orient="records")

df_set = pd.read_excel("dominion-cards.xlsx", sheet_name="paths_to_victory", engine="openpyxl")

selected_names = (
    df_set.melt()['value']
    .dropna()
    .astype(str)
    .str.replace(" ", "")
    .str.replace("'", "")
    .str.lower()
    .to_list()
)

selection = [card for card in cards if card['fixed_text'] in selected_names]


# Render and write output
html = template.render(cards=selection)
with open("index.html", "w", encoding="utf-8") as f:
  f.write(html)

