# -*- coding: utf-8 -*-

import csv

ordliste = []

with open("frekvensordliste.csv", encoding="utf-8") as fil_inn:
    innhold = csv.reader(fil_inn)
    
    for linje in innhold:
        word = linje[0]
        if len(word) > 3 and word != 'mdash' and word != "ikkje":
            ordliste.append(word)



print("Antall ord:", len(ordliste))

with open("ord.js", 'w', encoding="utf-8") as fil_ut:
    fil_ut.write("let frekvensordliste = [")
    
    first = True
    
    for ord in ordliste:
        if first:
            first = False
        else:
            fil_ut.write(",")        
        fil_ut.write(f"'{ord}'")

    fil_ut.write("]")