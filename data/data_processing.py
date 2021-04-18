import csv

airports = {}
airlines = {}
aircraft = {}
aircraft_configs = {}
service_classes = {}
routes = {}
route_info = {}


class Airport:
    def __init__(self, a_id, name, city, latitude, longitude, altitude):
        self.id = a_id
        self.name = name
        self.city = city
        self.coord = (latitude, longitude)
        self.altitude = altitude

    def to_string(self):
        return "\"" + self.id + "\", \"" + self.name + "\", \"" + self.city + "\", " + str(self.coord[0]) + ", " + \
               str(self.coord[1]) + ", " + str(self.altitude)


class Airline:
    def __init__(self, a_id, name, alias, callsign, country):
        self.id = a_id
        self.name = name
        self.alias = alias
        self.callsign = callsign
        self.country = country

    def to_string(self):
        return "\"" + self.id + "\", \"" + self.name + "\", \"" + self.alias + "\", \"" + self.callsign + "\", \"" + \
               self.country + "\""


class Aircraft:
    def __init__(self, a_id, desc):
        self.id = a_id
        self.desc = desc

    def to_string(self):
        return "\"" + self.id + "\", \"" + self.desc + "\""


class AircraftConfig:
    def __init__(self, ac_id, desc):
        self.id = ac_id
        self.desc = desc
    
    def to_string(self):
        return "\"" + self.id + "\", \"" + self.desc + "\""


class ServiceClass:
    def __init__(self, sc_id, desc):
        self.id = sc_id
        self.desc = desc

    def to_string(self):
        return "\"" + self.id + "\", \"" + self.desc + "\""


class Route:
    def __init__(self, origin, destination, carrier, distance):
        self.origin = origin
        self.destination = destination
        self.airline = carrier
        self.distance = distance
        self.id = self.gen_id()

    def gen_id(self):
        # Create ID generator for Route

        string = self.origin.id + self.destination.id + self.airline.id
        k = hash(string)

        # print(string, key)
        return str(k)

    def equals(self, r):
        return self.origin == r.origin and self.destination == r.destination and self.airline == r.airline

    def to_string(self):
        return "\"" + self.id + "\", \"" + self.origin + "\", \"" + self.destination + "\", \"" + self.airline + "\", " + str(self.distance)


class RouteInfo:
    def __init__(self, r_id, year, month, no_passengers, airtime, mail_weight, freight_weight, seats_available, s_class,
                 a_craft, aircraft_config):
        self.route_id = r_id
        self.year = year
        self.month = month
        self.no_passengers = no_passengers
        self.airtime = airtime
        self.mail_weight = mail_weight
        self.freight_weight = freight_weight
        self.seats_available = seats_available
        self.service_class = s_class
        self.aircraft = a_craft
        self.aircraft_config = aircraft_config
        self.key = self.gen_key()

    def gen_key(self):
        # Create ID generator for Route

        k = self.route_id + str(self.year) + str(self.month)
        return str(hash(k))

    def to_string(self):
        return "\"" + self.route_id + "\"," + str(self.year) + ", " + str(self.month) + ", " + str(self.airtime) + ", " + str(self.mail_weight) + ", " + self.freight_weight + ", " + self.seats_available + self.service_class.to_string() + ", " + self.aircraft.to_string() + ", " + self.aircraft_config.to_string()


with open("raw-data/airports.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[4] in airports.keys():
            print("Airport already exists: " + row[3])
        elif (row[3] == "United States" or row[3] == "Puerto Rico" or row[3] == "Guam") and row[12] == "airport" and row[4] != "\\N":
            airport = Airport(row[4], row[1], row[2], row[6], row[7], row[8])
            airports[row[4]] = airport

with open("raw-data/airlines.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[3] in airlines.keys():
            print("Airline already exists: " + row[3])
        else:
            airline = Airline(row[3], row[1], row[2], row[5], row[6])
            airlines[row[3]] = airline

with open("raw-data/aircraft_type.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[0] in aircraft.keys():
            print("Aircraft already exists: " + row[0])
        else:
            craft = Aircraft(row[0], row[1])
            aircraft[row[0]] = craft

with open("raw-data/aircraft-config.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[0] in aircraft_configs.keys():
            print("Config already exists: " + row[0])
        else:
            config = AircraftConfig(row[0], row[1])
            aircraft_configs[row[0]] = config

with open("raw-data/service-class.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[0] in service_classes.keys():
            print("Class already exists: " + row[0])
        else:
            service_class = ServiceClass(row[0], row[1])
            service_classes[row[0]] = service_class

with open("raw-data/flight-data/2018.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        # print(row[7], row[6],row[4])
        if row[7] in airports and row[8] in airports and row[4] in airlines:
            route = Route(airports[row[7]], airports[row[8]], airlines[row[6]], row[4])
            route_id = route.id
            if route_id not in aircraft.keys():
                routes[route_id] = route

            # print(row[14], row[10],int(row[11]))
            info = RouteInfo(route_id, row[12], row[13], row[1], row[5], row[3], row[2], row[1], service_classes[row[14]], aircraft[row[10]], aircraft_configs[int(row[11])])
            if info.key not in route_info.keys():
                route_info[info.key] = info
count = 0

for key in airlines.keys():
    count += 1
    print(count, airlines[key].to_string())
