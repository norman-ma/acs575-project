import csv

airports = []
airlines1 = []

with open("raw-data/flight-data/2018.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[6] not in airlines1:
            airlines1.append(row[6])

        if row[7] not in airports:
            airports.append(row[7])

        if row[8] not in airports:
            airports.append(row[8])

with open("raw-data/flight-data/2019.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[6] not in airlines1:
            airlines1.append(row[6])

        if row[7] not in airports:
            airports.append(row[7])

        if row[8] not in airports:
            airports.append(row[8])

with open("raw-data/flight-data/2020.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[6] not in airlines1:
            airlines1.append(row[6])

        if row[7] not in airports:
            airports.append(row[7])

        if row[8] not in airports:
            airports.append(row[8])

print(len(airports))
print(len(airlines1))

airlines2 = []

with open("raw-data/airlines.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[3] not in airlines2:
            airlines2.append(row[3])

count = 0
for a in airlines1:

    if a not in airlines2:
        # print(a)
        count += 1

print("Missing Airlines: ", count)

airports2 = []

with open("raw-data/airports.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[4] not in airports2:
            airports2.append(row[4])

count = 0
for a in airports:
    if a not in airports2:
        # print(a)
        count += 1

print("Missing Airports: ", count)