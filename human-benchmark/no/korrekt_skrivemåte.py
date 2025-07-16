# -*- coding: utf-8 -*-

import csv

ordliste = []

with open("korrekt_skrivemåte.csv", encoding="utf-8-sig") as fil:
    innhold = csv.reader(fil)
    
    for rad in innhold:
        linje = rad[0]
        
        if len(linje.split(" ")) == 1 and linje[0].islower() and len(linje.split("-")) == 1:
            ordliste.append(linje)
        

print("Antall ord:", len(ordliste))

with open("ord2.js", 'w', encoding="utf-8") as fil_ut:
    fil_ut.write("let korrekt_skrivemaate = [")
    
    first = True
    
    for word in ordliste:
        if first:
            first = False
        else:
            fil_ut.write(",")        
        fil_ut.write(f"'{word}'")

    fil_ut.write("]")