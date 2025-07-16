import csv


ordliste = []

with open("norske_ord.txt", encoding="utf-8") as fil_inn:
    innhold = fil_inn.readlines()
    linjenummer = 0
    for linje in innhold:
        linjenummer += 1
        
        if linjenummer % 2 == 0:
            ord = linje.strip()
            if len(ord) > 3 and ord != 'mdash':
                ordliste.append(ord)



print("Antall ord:", len(ordliste))

with open("ord.js", 'w', encoding="utf-8") as fil_ut:
    fil_ut.write("let ordliste = [")
    
    first = True
    
    for ord in ordliste:
        if first:
            first = False
        else:
            fil_ut.write(",")        
        fil_ut.write(f"'{ord}'")

    fil_ut.write("]")