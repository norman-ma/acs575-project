module.exports = {

    getState: (req, res) => {
        let query = "SELECT state, SUM(passengers) AS passengers, SUM(mail) as mail, SUM(freight) as freight FROM airport JOIN airlineroute on airport.airportid = airlineroute.origin JOIN routeinfo on routeinfo.routeid = airlineroute.routeid GROUP BY state"

        db.query(query, (err, res) => {
            if(err)
                console.error(err.stack)
            else
                console.log(res)
        })
    }
}