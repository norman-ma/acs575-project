const appController = require('./appController')
const AppController = require('./appController')

module.exports = { 
    overview: async (req, res) => {
        let query = 'SELECT SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight, SUM(airtime) as airtime from routeinfo;'
        let result = {
            states: 0,
            passengers: 0,
            mail: 0, 
            freight: 0,
            airtime: 0
        }
        
        let data = await db.query(query)
        for(let row of data.rows){
            result.passengers += row.passengers
            result.mail += row.mail
            result.freight += row.freight
            result.airtime += row.airtime
        }

        query = 'SELECT COUNT(DISTINCT state) AS states from airport;'
        
        data = await db.query(query)
        for(let row of data.rows){
            result.states += row.states
        }

        res.send(result)
    },
    /*{
        incoming: [{state, passenger, mail, freight}], 
        outgoing: [{state, passenger, mail, freight}]
    }*/
    statesOverview: async (req, res) => {
        let incomingQuery = 'SELECT dest.state AS state, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airport AS dest JOIN airlineroute ON dest.airportid = destination JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid JOIN airport AS origin on origin.airportid = origin WHERE dest.state != origin.state GROUP BY dest.state;'
        let outgoingQuery = 'SELECT origin.state AS state, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airport AS dest JOIN airlineroute ON dest.airportid = destination JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid JOIN airport AS origin on origin.airportid = origin WHERE dest.state != origin.state GROUP BY origin.state;'
        
        let result = {
            incoming:[],
            outgoing:[]
        }
        try{
            let incoming = await db.query(incomingQuery)
            for(let row of incoming.rows){
                let value = {state: row.state, passenger: row.passengers, mail: row.mail, freight: row.freight}
                result.incoming.push(value)
            }
            let outgoing = await db.query(outgoingQuery)
            for(let row of outgoing.rows){
                let value = {state: row.state, passenger: row.passengers, mail: row.mail, freight: row.freight}
                result.outgoing.push(value)
            }

            res.send(result)    
        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },
    /*{
        state, 
        airports: [{airport: {id, name, city}, passenger, mail, freight}], 
        airlines: [{airline: {id, name}, passenger, mail, freight}], 
        annual:[{year, passenger, mail, freight}], 
        monthly:[{year, month, passenger, mail, freight}]
    }*/
    
    stateOverview: async (req, res) => {

        let state = req.params.state
        let airportQuery = 'SELECT airportid, airportname, city, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airport JOIN airlineroute ON airportid = origin OR airportid = destination JOIN routeinfo on airlineroute.routeid=routeinfo.routeid WHERE state=$1 GROUP BY airportid;'
        let airlineQuery = 'SELECT airlineid, airlinename, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airline JOIN airlineroute on airlineid=airline JOIN routeinfo ON routeinfo.routeid=airlineroute.routeid WHERE destination IN (SELECT airportid FROM airport WHERE state = $1 ) OR origin IN (SELECT airportid FROM airport WHERE state = $1) GROUP BY airlineid;'
        let annualQuery = 'SELECT year, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid=airlineroute.routeid WHERE destination IN (SELECT airportid FROM airport WHERE state = $1 ) OR origin IN (SELECT airportid FROM airport WHERE state = $1) GROUP BY year;'
        let monthlyQuery = 'SELECT year, month, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid=airlineroute.routeid WHERE destination IN (SELECT airportid FROM airport WHERE state = $1 ) OR origin IN (SELECT airportid FROM airport WHERE state = $1) GROUP BY year, month;'
        let result = {
            state: state,
            airports: [],
            airlines:[],
            annual: [],
            monthly: []
        }
        
        try{
            
            let airportList = await db.query(airportQuery,[state])
            for(let row of airportList.rows){
                result.airports.push({
                    airport: {
                        id: row.airportid,
                        name: row.airportname,
                        city: row.city
                    },
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            let airlineList = await db.query(airlineQuery,[state])
            for(let row of airlineList.rows){
                result.airlines.push({
                    airline: {
                        id: row.airlineid,
                        name: row.airlinename
                    },
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            let annual = await db.query(annualQuery,[state])
            for(let row of annual.rows){
                result.annual.push({
                    year: row.year,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            let monthly = await db.query(monthlyQuery,[state])
            for(let row of monthly.rows){
                result.monthly.push({
                    year: row.year,
                    month: row.month,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },
    
    /*{
        incoming: [{airport: {id, name, city}, passenger, mail, freight}], 
        outgoing: [{airport: {id, name, city}, passenger, mail, freight}]
    }*/ 
    airportsOverview: async (req, res) => {
        let incomingQuery = 'SELECT airportid, airportname, city, state, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight FROM airport JOIN airlineroute ON airportid = destination JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid GROUP BY airportid'
        let outgoingQuery = 'SELECT airportid, airportname, city, state, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight FROM airport JOIN airlineroute ON airportid = origin JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid GROUP BY airportid;'
        
        let result = {
            incoming:[],
            outgoing:[]
        }
        try{
            let incoming = await db.query(incomingQuery)
            for(let row of incoming.rows){
                result.incoming.push({
                    airport: {id: row.airportid, name: row.airportname, city: row.city, state: row.state}, 
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight
                })
            }
            let outgoing = await db.query(outgoingQuery)
            for(let row of outgoing.rows){
                result.outgoing.push({
                    airport: {id: row.airportid, name: row.airportname, city: row.city, state: row.state}, 
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight
                })
            }

            res.send(result)    
        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },

    /*{
        airport: {id, name, city, state, latitude, longitude}, 
        incoming: [{route: {origin: {id, name, city}, airline: {id, name}}, passenger, mail, freight}], 
        outgoing: [{route: {destination: {id, name, city}, airline: {id, name}}, passenger, mail, freight}], 
        annual: [{year, passenger, mail, freight}], 
        monthly: [{year, month, passenger, mail, freight}]
    }*/
    airportOverview: async (req, res) => {

        let airportid = req.params.airport
        let airportQuery = 'SELECT airportid, airportname, city, state, ST_X(airportlocation::geometry) as longitude, ST_Y(airportlocation::geometry) as latitude, altitude FROM airport WHERE airportid = $1;'
        let incomingQuery = 'SELECT airportid, airportname, city, airlineid, airlinename, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airlineroute JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid JOIN airport on airlineroute.origin = airport.airportid JOIN airline ON airlineroute.airline = airlineid  WHERE destination = $1 GROUP BY airlineroute.routeid, airportid, airlineid;'
        let outgoingQuery = 'SELECT airportid, airportname, city, airlineid, airlinename, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight FROM airlineroute JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid JOIN airport on airlineroute.origin = airport.airportid JOIN airline ON airlineroute.airline = airlineid  WHERE origin = $1 GROUP BY airlineroute.routeid, airportid, airlineid;'
        let annualQuery = 'SELECT year, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE origin = $1 or destination= $1 GROUP BY year;'
        let monthlyQuery = 'SELECT year, month, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE origin = $1 or destination= $1 GROUP BY year, month;'
        
        let result = {
            airport: null,
            incoming: [],
            outgoing:[],
            annual: [],
            monthly: []
        }
        
        try{

            let airport = await db.query(airportQuery, [airportid])
            for(let row of airport.rows){
                result.airport = {
                    id: row.airportid,
                    name: row.airportname,
                    city: row.city,
                    state: row.state, 
                    latitude: row.latitude, 
                    longitude: row.longitude,
                    altitude: row.altitude
                }
            }
            
            let incoming = await db.query(incomingQuery,[airportid])
            for(let row of incoming.rows){
                result.incoming.push({
                    route: {
                        origin: {
                            id: row.airportid,
                            name: row.airportname,
                            city: row.city,
                            state: row.state
                        },
                        airline: {
                            id: row.airlineid,
                            name: row.airlinename,
                        }                        
                    },
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight
                })
            }

            let outgoing = await db.query(outgoingQuery,[airportid])
            for(let row of outgoing.rows){
                result.outgoing.push({
                    route: {
                        destination: {
                            id: row.airportid,
                            name: row.airportname,
                            city: row.city,
                            state: row.state
                        },
                        airline: {
                            id: row.airlineid,
                            name: row.airlinename,
                        }                        
                    },
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight
                })
            }

            let annual = await db.query(annualQuery,[airportid])
            for(let row of annual.rows){
                result.annual.push({
                    year: row.year,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            let monthly = await db.query(monthlyQuery,[airportid])
            for(let row of monthly.rows){
                result.monthly.push({
                    year: row.year,
                    month: row.month,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },

    /*{
        airlines: [{airline:  {id, name}, passenger, mail, freight}]
    }  */
    airlinesOverview: async (req, res) => {
        
        let airlinesQuery = 'SELECT airlineid, airlinename, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight FROM airline JOIN airlineroute ON airlineid = airline JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid GROUP BY airlineid;'

        let result = {
            airlines:[]
        }
        try{
            let airlines = await db.query(airlinesQuery)
            for(let row of airlines.rows){
                result.airlines.push({
                    airline: {id: row.airlineid, name: row.airlinename}, 
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight
                })
            }

            res.send(result)    
        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },

    /*{
        airline: {id, name, country}, 
        routes: [{
            origin: {id, name, city}, 
            destination: {id, name, city}, 
            passenger, mail, freight
        }], 
        annual: [{year, passenger, mail, freight}], 
        monthly: [{year, month, passenger, mail, freight}]
    } */
    airlineOverview: async (req, res) => {

        let airlineid = req.params.airline
        let airlineQuery = 'SELECT * FROM airline WHERE airlineid = $1;'
        let routeQuery = 'SELECT origin.airportid as originid, origin.airportname as originname, origin.city as origincity, origin.state as originstate, destination.airportid as destid, destination.airportname as destname, destination.city as destcity, destination.state as deststate, sum(passengers) as passengers, sum(mail) as mail, sum(freight) as freight from airport as origin join airlineroute on origin.airportid = origin join airport as destination on destination.airportid = destination join routeinfo on routeinfo.routeid=airlineroute.routeid where airline = $1 group by routeinfo.routeid, originid, destid;'
        let annualQuery = 'SELECT year, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE airline = $1 GROUP BY year;'
        let monthlyQuery = 'SELECT year, month, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE airline = $1 GROUP BY year, month;'
        
        let result = {
            airline: null,
            routes: [],
            incoming: [],
            outgoing:[],
            annual: [],
            monthly: []
        }
        
        try{

            let airline = await db.query(airlineQuery, [airlineid])
            for(let row of airline.rows){
                result.airline = {
                    id: row.airlineid,
                    name: row.airlinename,
                    alias: row.alias,
                    callsign: row.callsign, 
                    country: row.country
                }
            }
            
            let routes = await db.query(routeQuery, [airlineid])
            for(let row of routes.rows){
                result.routes.push({ 
                    origin: { id: row.originid, name: row.originname, city: row.origincity }, 
                    destination: { id: row.destid, name: row.destname, city: row.destcity }, 
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight 
                })
            }

            let annual = await db.query(annualQuery,[airlineid])
            for(let row of annual.rows){
                result.annual.push({
                    year: row.year,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            let monthly = await db.query(monthlyQuery,[airlineid])
            for(let row of monthly.rows){
                result.monthly.push({
                    year: row.year,
                    month: row.month,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },

    /*{
        routes: [{
            airline: {id, name}, 
            origin: {id, name, city, state}, 
            destination: {id, name, city, state}, 
            passenger, 
            mail,
            freight, 
            distance
        }]}
    */
    routesOverview: async (req, res) => {

        let routeQuery = 'SELECT origin.airportid as originid, origin.airportname as originname, origin.city as origincity, origin.state as originstate, destination.airportid as destid, destination.airportname as destname, destination.city as destcity, destination.state as deststate, airlineid, airlinename, sum(passengers) as passengers, sum(mail) as mail, sum(freight) as freight, sum(ST_Distance(origin.airportlocation, destination.airportlocation) * 0.000621371) as distance from airport as origin join airlineroute on origin.airportid = origin join airport as destination on destination.airportid = destination join airline on airlineid=airline join routeinfo on routeinfo.routeid=airlineroute.routeid group by routeinfo.routeid, originid, destid, airlineid LIMIT 1000;'

        let result = {
            routes: []
        }

        try{

            let routes = await db.query(routeQuery)
            
            for(let row of routes.rows){
                result.routes.push({ 
                    origin: { id: row.originid, name: row.originname, city: row.origincity }, 
                    destination: { id: row.destid, name: row.destname, city: row.destcity }, 
                    airline: {id: row.airlineid, name: row.airlinename},
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight,
                    distance: row.distance 
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },
    /*{
        route: {
            origin: {id, name, city}, 
            destination: {id, name, city}, 
            airline: {id, name}
        }, 
        annual: [{year, passenger, mail, freight, airtime}], 
        monthly: [{year, month, passenger, mail, freight, airtime}]
    } */
    routeOverview: async (req, res) => {

        let routeid = [req.params.origin, req.params.destination, req.params.airline]

        let routeQuery = 'SELECT origin.airportid as originid, origin.airportname as originname, origin.city as origincity, origin.state as originstate, ST_X(origin.airportlocation::geometry) as originlong, ST_Y(origin.airportlocation::geometry) as originlat, destination.airportid as destid, destination.airportname as destname, destination.city as destcity, destination.state as deststate, ST_X(destination.airportlocation::geometry) as destlong, ST_Y(destination.airportlocation::geometry) as destlat,airlineid, airlinename from airport as origin join airlineroute on origin.airportid = origin join airport as destination on destination.airportid = destination join airline on airlineid=airline WHERE origin=$1 AND destination=$2 AND airline=$3 group by airlineroute.routeid, originid, destid, airlineid;'
        let annualQuery = 'SELECT year, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight, SUM(airtime) AS airtime  from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE origin=$1 AND destination=$2 AND airline=$3 group by routeinfo.routeid, origin, destination, airline, year, origin, destination;'
        let monthlyQuery = 'SELECT year, month, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight, SUM(airtime) AS airtime from airlineroute JOIN routeinfo ON routeinfo.routeid = airlineroute.routeid WHERE origin=$1 AND destination=$2 AND airline=$3 group by routeinfo.routeid, origin, destination, airline, year, month, origin, destination;'
        
        let result = {
            route: null,
            annual: [], 
            monthly: []
        }
        
        try{
            let route = await db.query(routeQuery, routeid)
            for(let row of route.rows){
                result.route = {
                    airline: {
                        id: row.airlineid,
                        name: row.airlinename
                    },
                    origin: {
                        id: row.originid,
                        name: row.originname,
                        city: row.origincity, 
                        state: row.originstate,
                        latitude: row.originlat,
                        longitude: row.originlong
                    },
                    destination: {
                        id: row.destid,
                        name: row.destname,
                        city: row.destcity, 
                        state: row.deststate,
                        latitude: row.destlat,
                        longitude: row.destlong
                    }
                }
            }

            let annual = await db.query(annualQuery,routeid)
            for(let row of annual.rows){
                result.annual.push({
                    year: row.year,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight,
                    airtime: row.airtime
                })
            }

            let monthly = await db.query(monthlyQuery,routeid)
            for(let row of monthly.rows){
                result.monthly.push({
                    year: row.year,
                    month: row.month,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight,
                    airtime: row.airtime
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },
    /*{
        aircraft: [{
            aircraft: {id, description}, 
            passengers, 
            mail, 
            freight, 
            airtime
        }]
    }*/
    aircraftOverview: async (req, res) => {

        let aircraftQuery = 'SELECT aircraftid, description, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight, SUM(airtime) as airtime FROM aircraft JOIN routeinfo ON aircraft.aircraftid = routeinfo.aircraft GROUP BY aircraftid, ;'

        let result = {
            aircraft: []
        }
        
        try{

            let aircraft = await db.query(aircraftQuery)
            for(let row of aircraft.rows){
                result.aircraft.push({
                    aircraft: {
                        id: row.aircraftid,
                        description: row.description
                    },
                    passenger: row.passengers, 
                    mail: row.mail, 
                    freight: row.freight,
                    airtime:  row.airtime
                    
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    },
    /*{
        aircraft: {id, description}, 
        routes: [{airline: {id, name}, origin: {id, name, city}, destination: {id, name, city}, passenger, mail, freight, distance}], 
        annual: [{year, passenger, mail, freight, airtime}], 
        monthly: [{year, month, passenger, mail, freight, airtime}]
    }*/
    craftOverview: async (req, res) => {

        let aircraftid = req.params.aircraft
        let aircraftQuery = 'SELECT * FROM aircraft WHERE aircraftid = $1;'

        let routeQuery = 'SELECT origin.airportid as originid, origin.airportname as originname, origin.city as origincity, origin.state as originstate, destination.airportid as destid, destination.airportname as destname, destination.city as destcity, destination.state as deststate, airlineid, airlinename,  SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight, SUM(airtime) AS airtime from airport as origin join airlineroute on origin.airportid = origin join airport as destination on destination.airportid = destination join airline on airlineid=airline join routeinfo on airlineroute.routeid=routeinfo.routeid WHERE aircraft=$1 group by aircraft, originid, destid, airlineid;'
        let annualQuery = 'SELECT year, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight, SUM(airtime) AS airtime from routeinfo WHERE aircraft=$1 group by year;'
        let monthlyQuery = 'SELECT year, month, SUM(passengers) AS passengers, SUM(mail) AS mail, SUM(freight) AS freight, SUM(airtime) AS airtime from routeinfo WHERE aircraft=$1 group by year, month;'
        
        let result = {
            aircraft: {},
            routes: [],
            annual: [], 
            monthly: []
        }
        
        try{

            let aircraft = await db.query(aircraftQuery, [aircraftid])
            for(let row of aircraft.rows){
                result.aircraft = {
                    id: row.aircraftid,
                    description: row.description   
                }
            }

            let routes = await db.query(routeQuery, [aircraftid])
            for(let row of routes.rows){
                result.routes.push({
                    airline: {
                        id: row.airlineid,
                        name: row.airlinename
                    },
                    origin: {
                        id: row.originid,
                        name: row.originname,
                        city: row.origincity, 
                        state: row.originstate,
                    },
                    destination: {
                        id: row.destid,
                        name: row.destname,
                        city: row.destcity, 
                        state: row.deststate,
                    },
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight,
                    airtime: row.airtime
                })
            }

            let annual = await db.query(annualQuery, [aircraftid])
            for(let row of annual.rows){
                result.annual.push({
                    year: row.year,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight,
                    airtime: row.airtime
                })
            }

            let monthly = await db.query(monthlyQuery,[aircraftid])
            for(let row of monthly.rows){
                result.monthly.push({
                    year: row.year,
                    month: row.month,
                    passenger: row.passengers,
                    mail: row.mail,
                    freight: row.freight,
                    airtime: row.airtime
                })
            }

            res.send(result)  

        }catch(err){
            console.error(err)
            res.status(404).send(err)
        }
    }

}