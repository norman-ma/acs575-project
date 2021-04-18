import csv

def get_data():

    airports = []
    airports2 = []

    airlines = []
    airlines2 = []

    with open("raw-data/flight-data/2018.csv", newline='', encoding="utf8") as file:
        reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
        for row in reader:
            if row[6] not in airports:
                airports.append(row[6])

            if row[8] not in airports:
                airports.append(row[8])

            if row[5] not in airlines:
                airlines.append(row[5])

    with open("raw-data/flight-data/2019.csv", newline='', encoding="utf8") as file:
        reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
        for row in reader:
            if row[6] not in airports:
                airports.append(row[6])

            if row[8] not in airports:
                airports.append(row[8])

            if row[5] not in airlines:
                airlines.append(row[5])

    with open("raw-data/flight-data/2020.csv", newline='', encoding="utf8") as file:
        reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
        for row in reader:
            if row[6] not in airports:
                airports.append(row[6])

            if row[8] not in airports:
                airports.append(row[8])

            if row[5] not in airlines:
                airlines.append(row[5])

    with open("raw-data/airports.csv", newline='', encoding="utf8") as file:
        reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
        for row in reader:
            if row[4] not in airports2:
                airports2.append(row[4])

    with open("raw-data/airlines.csv", newline='', encoding="utf8") as file:
        reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
        for row in reader:
            if row[3] not in airlines2:
                airlines2.append(row[3])

    out = {'airlines': [], 'airports': []}

    longer = airports if len(airports) > len(airports2) else airports2
    shorter = airports2 if longer == airports else airports

    for airport in longer:
        if airport in shorter:
            out['airports'].append(airport)

    longer = airlines if len(airlines) > len(airlines2) else airlines2
    shorter = airlines2 if longer == airlines else airlines

    for airline in longer:
        if airline in shorter:
            out['airlines'].append(airline)

    print('done')
    return out['airports'], out['airlines']
