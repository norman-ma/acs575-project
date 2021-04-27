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
    statesOverview: async (req, res) => {
        let incomingQuery = 'SELECT state, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight FROM airport JOIN airlineroute ON airportid = destination JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid GROUP BY state'
        let outgoingQuery = 'SELECT state, SUM(passengers) as passengers, SUM(mail) as mail, SUM(freight) as freight FROM airport JOIN airlineroute ON airportid = origin JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid GROUP BY state'
        
        let result = {
            incoming:[],
            outgoing:[]
        }

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

        console.log(result)
        res.send(JSON.stringify(result))    
    }
}