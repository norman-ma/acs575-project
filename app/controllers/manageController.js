const appController = require("./appController")

let parseData = (data) => {
    let fields = Object.keys(data)
    let values = fields.map((field) => data[field])
    return {
        fields: fields,
        values: values
    }
}

module.exports = {
    getTable: async (req, res) => {
        let table = req.params.table
        let search = parseData(req.body);
        let n = search.fields.length
        let query = ''
        let start = 0

        if(['aircraft', 'aircraftconfiguration', 'aircraftgroup', 'airline', 'airlineroute', 'airport', 'routeinfo', 'serviceclass'].includes(table)){
            switch(table){
                case 'airport':
                    query = `SELECT airportid, airportname, city, state, ST_Y(airportlocation::geometry) as latitude, ST_X(airportlocation::geometry) as longitude, altitude FROM airport`
                    break
                case 'routeinfo':
                    if(search.fields.includes('origin') || search.fields.includes('destination') || search.fields.includes('airline')){
                        query = 'SELECT origin, destination, airline, year , month, aircraft, passengers, mail, freight, airtime, serviceclass, aircraftconfig FROM airlineroute JOIN routeinfo ON airlineroute.routeid = routeinfo.routeid'
                        break
                    }
                default:
                    query = `SELECT * FROM ${table}`
            }

            
            if(n > 0){
                if(!query.includes('WHERE')){
                    query += ' WHERE '
                }else{
                    query += ' AND '
                }                
                for(i = start; i < n; i++){
                    let field = search.fields[i]
                    query += `${field}=$${i+1}`
                    if(i != n-1){
                        query += ' AND '
                    }
                }
            }
            query += ';'
            query = query.replace('AND ;', ';')

            try{
                let data = await db.query(query, search.values)
                let out = {
                    fields: data.fields,
                    rows: data.rows
                }
                res.send(out)
            }catch(err){
                res.status(400).send(err)
            }
        }else{
            res.status(400).send('Invalid Table')
        }        
    },
    updateTable: async (req, res) => {
        let table = req.params.table
        let values = parseData(req.body.values)
        let keys = parseData(req.body.keys)
        let query = ''
        let n = values.fields.length
        let m = keys.fields.length

        if(['aircraft', 'aircraftconfiguration', 'aircraftgroup', 'airline', 'airlineroute', 'airport', 'routeinfo', 'serviceclass'].includes(table)){
            query = `UPDATE ${table} SET `
            
            if(table === 'airport'){
                query += "airportname=$1, city=$2, state=$3, airportlocation=ST_GeographyFromText($4), altitude=$5"
                values = {
                    fields:['airportname', 'city', 'state', 'point', 'altitude'],
                    values:[
                        values.values[0],
                        values.values[1],
                        values.values[2],
                        `Point(${values.values[4]} ${values.values[3]})`,
                        values.values[5]
                    ]
                }
                n = values.fields.length
            }else{
                for(let i = 0; i < n; i++){
                    query += ` ${values.fields[i]}=$${i+1}`
                    if(i !== n - 1){
                        query += ','
                    }
                }
            }

            query += ' WHERE '

            if(table === 'routeinfo'){
                query += 'routeid in (SELECT routeid FROM airlineroute WHERE origin=$7 AND destination=$8 AND airline=$9) AND year=$10 AND month=$11 AND aircraft=$12'
            }else{
                for(let i = n; i < n + m; i++){
                    query += ` ${keys.fields[i - n]}=$${i+1}`
                    if(i !== n + m - 1){
                        query += ' AND '
                    }
                } 
            }

            query += ';'
            let updatevals = values.values.concat(keys.values)

            try{
                await db.query(query, updatevals)
                appController.update()
                res.send('Update Successful')
            }catch(err){
                console.error(err)
                res.status(400).send(err) 
            }
                
        }else{
            res.status(400).send('Invalid Table') 
        }        
    },
    deleteFromTable: async (req, res) => {
        let table = req.params.table
        let keys = req.params.keys.split(':')
        let pk = {
            airport: 'airportid',
            airline: 'airlineid',
            aircraft: 'aircraftid',
            serviceclass: 'scid',
            aircraftgroup: 'agid',
            aircraftconfiguration: 'acid'
        }

        if(['aircraft', 'aircraftconfiguration', 'aircraftgroup', 'airline', 'airlineroute', 'airport', 'routeinfo', 'serviceclass'].includes(table)){
            switch(table){
                case 'airlineroute': 
                    query = 'DELETE FROM airlineroute WHERE origin=$1 AND destination=$2 AND airline=$3;'
                    break;
                case 'routeinfo':
                    if(keys.length === 6){
                        query = 'DELETE FROM airlineroute WHERE routeid in (SELECT FROM airlineroute WHERE origin=$1 AND destination=$2 AND airline=$3) AND year=$4 AND month=$5 AND aircraft=$6;'
                    }else{
                        query = 'DELETE FROM routeinfo WHERE routeid=$1 AND year=$2 AND month=$3 AND aircraft=$4;'
                    }
                    break;
                default: 
                    query = `DELETE FROM ${table} WHERE ${pk[table]}=$1;`
            }

            try{
                await db.query(query, keys)
                appController.update()
                res.send('Delete Successful')
            }catch(err){
                console.error(err)
                res.status(400).send(err) 
            }
        }
    }
}