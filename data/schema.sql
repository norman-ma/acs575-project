CREATE DATABASE localairlineroutes;
\connect localairlineroutes;
-- Enable PostGIS (includes raster)
CREATE EXTENSION postgis;
-- Enable Topology
CREATE EXTENSION postgis_topology;

CREATE TABLE Airport(
    AirportID VARCHAR(4),
    AirportName TEXT,
    City TEXT,
    State VARCHAR(2),
    AirportLocation GEOGRAPHY,
    Altitude INTEGER,
    PRIMARY KEY(AirportID)
);

CREATE TABLE Airline(
    AirlineID VARCHAR(4),
    AirlineName VARCHAR(60),
    Alias VARCHAR(60),
    Callsign VARCHAR(60),
    Country VARCHAR(60),
    PRIMARY KEY(AirlineID)
);

CREATE TABLE AirlineRoute(
    RouteID INTEGER,
    Origin VARCHAR(4),
    Destination VARCHAR(4),
    Airline VARCHAR(4),
    PRIMARY KEY(RouteID),
    FOREIGN KEY(Origin) REFERENCES Airport(AirportID),
    FOREIGN KEY(Destination) REFERENCES Airport(AirportID),
    FOREIGN KEY(Airline) REFERENCES Airline(AirlineID)
);

CREATE TABLE ServiceClass(
    SCID VARCHAR(1),
    Description TEXT,
    PRIMARY KEY(SCID)
);

CREATE TABLE AircraftGroup(
    AGID INTEGER,
    Description TEXT,
    PRIMARY KEY(AGID)
);

CREATE TABLE Aircraft(
    AircraftID VARCHAR(3),
    Description TEXT,
    AircraftGroup INTEGER,
    PRIMARY KEY(AircraftID),
    FOREIGN KEY(AircraftGroup) REFERENCES AircraftGroup(AGID)
);

CREATE TABLE AircraftConfiguration(
    ACID INTEGER,
    Description TEXT,
    PRIMARY KEY(ACID)
);

CREATE TABLE RouteInfo(
    RouteID INTEGER,
    Year INTEGER,
    Month INTEGER,
    Passengers INTEGER,
    Mail DECIMAL(2),
    Freight DECIMAL(2),
    Airtime DECIMAL(2),
    ServiceClass VARCHAR(1),
    Aircraft VARCHAR(3),
    AircraftConfig INTEGER,
    PRIMARY KEY(RouteID, Year, Month),
    FOREIGN KEY(ServiceClass) REFERENCES ServiceClass(SCID),
    FOREIGN KEY(Aircraft) REFERENCES Aircraft(AircraftID),
    FOREIGN KEY(AircraftConfig) REFERENCES AircraftConfiguration(ACID)
);