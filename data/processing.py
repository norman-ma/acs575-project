import csv
import filter_data
import psycopg2
from decouple import config
import random


def keygen(a, b, for_dict):
    x = random.randint(a, b)
    while x in for_dict.keys():
        x = random.randint(a, b)
    return x


airport_list, airline_list = filter_data.get_data()

airports = {}
for k in airport_list:
    airports[k] = None

airlines = {}
for k in airline_list:
    airlines[k] = None

aircraft = {}
aircraft_groups = {}
aircraft_configs = {}
service_classes = {}
routes = {}
route_info = {}


class Airport:
    def __init__(self, a_id, name, city, latitude, longitude, altitude):
        self.id = a_id
        self.name = name
        self.city = city
        self.state = ''
        self.coord = (latitude, longitude)
        self.altitude = altitude

    def to_string(self):
        return "{0}, {1}, {2}, {3}, ST_GeographyFromText(Point({4} {5})), {6}".format(self.id, self.name, self.city, self.state, self.coord[0], self.coord[1], self.altitude)


class Airline:
    def __init__(self, a_id, name, alias, callsign, country):
        self.id = a_id
        self.name = name
        self.alias = alias
        self.callsign = callsign
        self.country = country

    def to_string(self):
        return "{0}, {1}, {2}, {3}, {4}".format(self.id, self.name, self.alias, self.callsign, self.country)


class AircraftGroup:
    def __init__(self, agid=0, desc="Aircraft Configuration Not Relevant"):
        self.id = agid
        self.desc = desc

    def to_string(self):
        return "{0}, {1}".format(self.id, self.desc)


class Aircraft:
    def __init__(self, a_id, desc):
        self.id = a_id
        self.desc = desc
        self.group = AircraftGroup()

    def to_string(self):
        return "{0}, {1}, {2}".format(self.id, self.desc, self.group.id)


class AircraftConfig:
    def __init__(self, ac_id, desc):
        self.id = ac_id
        self.desc = desc

    def to_string(self):
        return "{0}, {1}".format(self.id, self.desc)


class ServiceClass:
    def __init__(self, sc_id, desc):
        self.id = sc_id
        self.desc = desc

    def to_string( self):
        return "{0}, {1}".format(self.id, self.desc)


class Route:
    def __init__(self, origin, destination, carrier):
        self.id = keygen(1000, 1000000, routes )
        self.origin = origin
        self.destination = destination
        self.airline = carrier

    def equals(self, r):
        return self.origin == r.origin and self.destination == r.destination and self.airline == r.airline

    def to_string(self):
        return "{0}, {1}, {2}, {3}".format(self.id, self.origin.id, self.destination.id, self.airline.id)


class RouteInfo:
    def __init__(self, route, year, month, no_passengers, mail_weight, freight_weight, airtime, s_class, a_craft, aircraft_config):
        self.route = route
        self.year = year
        self.month = month
        self.no_passengers = no_passengers
        self.airtime = airtime
        self.mail_weight = mail_weight
        self.freight_weight = freight_weight
        self.service_class = s_class
        self.aircraft = a_craft
        self.aircraft_config = aircraft_config

    def add(self, route):
        self.no_passengers += route.no_passengers
        self.airtime += route.airtime
        self.mail_weight += route.mail_weight
        self.freight_weight += route.freight_weight

    def to_string(self):
        return "{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}".format(self.route.id, self.year, self.month, self.no_passengers, self.mail_weight, self.freight_weight, self.airtime, self.service_class.id, self.aircraft.id, self.aircraft_config.id)


with open("raw-data/airports.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[4] in airports.keys() and row[12] == "airport" and row[4] != "\\N":
            airport = Airport(row[4], row[1], row[2], row[6], row[7], row[8])
            airports[row[4]] = airport

with open("raw-data/airlines.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[3] in airlines.keys():
            airline = Airline(row[3], row[1], row[2], row[5], row[6])
            airlines[row[3]] = airline

with open("raw-data/aircraft-group.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if int(row[0]) not in aircraft_groups.keys():
            aircraft_group = AircraftGroup(int(row[0]), row[1])
            aircraft_groups[int(row[0])] = aircraft_group

with open("raw-data/aircraft_type.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[0] not in aircraft.keys():
            craft = Aircraft(row[0], row[1])
            aircraft[row[0]] = craft

with open("raw-data/aircraft-config.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if int(row[0]) not in aircraft_configs.keys():
            aircraft_config = AircraftConfig(int(row[0]), row[1])
            aircraft_configs[int(row[0])] = aircraft_config

with open("raw-data/service-class.csv", newline='', encoding="utf8") as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[0] not in service_classes.keys():
            service_class = ServiceClass(row[0], row[1])
            service_classes[row[0]] = service_class

with open("raw-data/flight-data/2018.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[6] in airports.keys() and row[8] in airports.keys() and row[5] in airlines.keys():

            airports[row[6]].state = row[7]
            airports[row[8]].state = row[9]

            #print(airports[row[6]], airports[row[8]], airlines[row[5]])
            route = Route(airports[row[6]], airports[row[8]], airlines[row[5]])
            route_id = (route.origin.id, route.destination.id, route.airline.id)
            if route_id not in routes.keys():
                routes[route_id] = route

            info = RouteInfo(routes[route_id], row[13], row[14], row[1], row[3], row[2], row[4],
                             service_classes[row[15]], aircraft[row[11]], aircraft_configs[int(row[12])])
            info_id = (info.route.id, info.year, info.month, info.aircraft.id)
            if info_id not in route_info.keys():
                route_info[info_id] = info
            else:
                route_info[info_id].add(info)

            if row[11] in aircraft:
                aircraft[row[11]].group = aircraft_groups[row[10]]

with open("raw-data/flight-data/2019.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        if row[6] in airports.keys() and row[8] in airports.keys() and row[5] in airlines.keys():

            airports[row[6]].state = row[7]
            airports[row[8]].state = row[9]

            #print(airports[row[6]], airports[row[8]], airlines[row[5]])
            route = Route(airports[row[6]], airports[row[8]], airlines[row[5]])
            route_id = (route.origin.id, route.destination.id, route.airline.id)
            if route_id not in routes.keys():
                routes[route_id] = route

            info = RouteInfo(routes[route_id], row[13], row[14], row[1], row[3], row[2], row[4],
                             service_classes[row[15]], aircraft[row[11]], aircraft_configs[int(row[12])])
            info_id = (info.route.id, info.year, info.month, info.aircraft.id)
            if info_id not in route_info.keys():
                route_info[info_id] = info
            else:
                route_info[info_id].add(info)

            if row[11] in aircraft:
                aircraft[row[11]].group = aircraft_groups[row[10]]

with open("raw-data/flight-data/2020.csv", newline='') as file:
    reader = csv.reader(file, quoting=csv.QUOTE_NONNUMERIC)
    for row in reader:
        # print(row[7], row[6],row[4])
        if row[6] in airports.keys() and row[8] in airports.keys() and row[5] in airlines.keys():

            airports[row[6]].state = row[7]
            airports[row[8]].state = row[9]

            #print(airports[row[6]], airports[row[8]], airlines[row[5]])
            route = Route(airports[row[6]], airports[row[8]], airlines[row[5]])
            route_id = (route.origin.id, route.destination.id, route.airline.id)
            if route_id not in routes.keys():
                routes[route_id] = route

            info = RouteInfo(routes[route_id], row[13], row[14], row[1], row[3], row[2], row[4],
                             service_classes[row[15]], aircraft[row[11]], aircraft_configs[int(row[12])])
            info_id = (info.route.id, info.year, info.month, info.aircraft.id)
            if info_id not in route_info.keys():
                route_info[info_id] = info
            else:
                route_info[info_id].add(info)

            if row[11] in aircraft:
                aircraft[row[11]].group = aircraft_groups[row[10]]


conn = psycopg2.connect(
    host=config('DB_HOST'),
    dbname=config('DB_NAME'),
    user=config('DB_USER'),
    password=config('DB_PASS')
)
cur = conn.cursor()

print('AIRPORT')
for a in airports.keys():
    airport = airports[a]
    query = 'INSERT INTO airport (airportid, airportname, city, state, airportlocation, altitude) VALUES(%s, %s, %s, %s, ST_GeographyFromText( \'Point( %s %s)\'), %s);'
    print(airport.to_string())
    try:
        cur.execute(query, (airport.id, airport.name, airport.city, airport.state, airport.coord[1], airport.coord[0], airport.altitude))
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('AIRLINE')
for a in airlines.keys():
    airline = airlines[a]
    query = 'INSERT INTO airline VALUES(%s, %s, %s, %s, %s);'
    print(airline.to_string())
    try:
        cur.execute(query, (airline.id, airline.name, airline.alias, airline.callsign, airline.country))
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('AIRCRAFT CONFIGURATION')
for ac in aircraft_configs.keys():
    aircraft_config = aircraft_configs[ac]
    query = 'INSERT INTO aircraftconfiguration VALUES(%s, %s);'
    print(aircraft_config.to_string())
    try:
        cur.execute(query, (aircraft_config.id, aircraft_config.desc))
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('AIRCRAFT GROUP')
for ag in aircraft_groups.keys():
    group = aircraft_groups[ag]
    query = 'INSERT INTO aircraftgroup VALUES(%s, %s)'
    print(group.to_string())
    try:
        cur.execute(query, (group.id, group.desc))
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('AIRCRAFT')
for a in aircraft.keys():
    plane = aircraft[a]
    query = 'INSERT INTO aircraft VALUES(%s, %s, %s);'
    print(plane.to_string())
    try:
        cur.execute(query, (plane.id, plane.desc, plane.group.id));
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('ROUTE')
for ar in routes.keys():
    route = routes[ar]
    query = 'INSERT INTO airlineroute VALUES(%s, %s, %s, %s);'
    print(route.to_string())
    try:
        cur.execute(query, (route.id, route.origin.id, route.destination.id, route.airline.id))
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('SERVICE CLASS')
for sc in service_classes:
    service_class = service_classes[sc]
    query = 'INSERT INTO serviceclass VALUES(%s, %s);'
    print(service_class.to_string())
    try:
        cur.execute(query, (service_class.id, service_class.desc));
        conn.commit()
    except psycopg2.IntegrityError:
        conn.rollback()

print('ROUTE INFO')
for ri in route_info.keys():
    info = route_info[ri]
    query = 'INSERT INTO routeinfo VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
    print(info.to_string())
    cur.execute(query, (info.route.id, info.year, info.month, info.aircraft.id, info.no_passengers, info.mail_weight, info.freight_weight, info.airtime, info.service_class.id, aircraft_config.id))
    conn.commit()

conn.close()

print("routes: ", len(routes.keys()))
print("routeinfo: ", len(route_info.keys()))