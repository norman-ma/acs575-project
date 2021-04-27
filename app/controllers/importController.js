const appController = require('./appController')



const queries = {
    airport: `INSERT INTO airport VALUES($1, $2, $3, $4, ST_GeographyFromText('Point($6 $5)'), $7);`,
    airline: 'INSERT INTO airline VALUES($1, $2, $3, $4, $5);',
    route: 'INSERT INTO airlineroute VALUES($1, $2, $3, $4);',
    routeinfo: 'INSERT INTO routeinfo VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    aircraft: 'INSERT INRO aircraft VALUES($1, $2, $3)'
}

const insert = async (category, data) => {
    let routeid = null
    let query = ''
    let id = null
    switch(category){
        case 'route':
            query = 'SELECT routeid FROM airlineroute WHERE origin = $1 AND destination = $2 AND airline = $3;'
            id = await db.query(query, [data.origin, data.destination, data.airline])
            if(id.rows.length > 0){
                return `${['a', 'e', 'i', 'o','u'].includes(category.charAt(0)) ? 'An' : 'A'} ${category} with this ID already exists`
            } 
            query = 'SELECT routeid FROM airlineroute;'
            let existing = await db.query(query)
            let list = existing.rows.map((value) => {value.routeid})
            routeid = Math.floor(1000 + Math.random() * 999000)
            while(list.includes(id)){
                routeid = Math.floor(1000 + Math.random() * 999000)
            }
            break
        case 'routeinfo':
            query = 'SELECT routeid FROM airlineroute WHERE origin = $1 AND destination = $2 AND airline = $3;'
            id = await db.query(query, [data.origin, data.destination, data.airline])
            if(id.rowCount > 0){
                routeid = id.rows[0].routeid
            }else{
                return "This route does not exist"                
            }      
            break
        default:
            if(['airline', 'airport', 'aircraft'].includes(category)){
                query = `SELECT ${category}id from ${category}`; 
                id = await db.query(query)
                if(id.rows.length > 0){
                    return `${['a', 'e', 'i', 'o','u'].includes(category.charAt(0)) ? 'An' : 'A'} ${category} with this ID already exists`
                }
            }else{
                return 'This category does not exist'
            }                 
    }

    query = queries[category]
    let result = null
    let values = null
    try{
        switch(category){
            case 'airport':
                values = [data.id, data.name, data.city, data.state, data.longitude, data.latitude, data.altitude]
                result = await db.query(query, values)
                break
            case 'airline':
                values = [data.id, data.name, data.alias, data.callsign, data.country]
                result = await db.query(query, values)
                break
            case 'route':
                values = [routeid, data.origin, data.destination, data.airline]
                result = await db.query(query, values)
                break
            case 'routeinfo':
                values = [routeid, data.year, data.month, data.aircraft, data.passengers, data.mail, data.freight, data.airtime, data.serviceclass, data.config]
                result = await db.query(query, values)
                break
            case 'aircraft':
                values = [data.id, data.description, data.group]
                result = await db.query(query, values)
                break
            default: 
                return `This category does not exist`
                                    
        }
    }catch(err){
        if(err.code === '23505'){
            return `${['a', 'e', 'i', 'o','u'].includes(category.charAt(0)) ? 'An' : 'A'} ${category} record with this ID already exists`
        }
        return 'An error occurred'        
    }

    return true
}

const parseLine = (category, values) => {
    let models = {
        airport: ['id', 'name', 'city', 'state', 'longitude', 'latitude', 'altitude'],
        airline: ['id', 'name', 'alias', 'callsign', 'country'],
        route: ['origin', 'destination', 'airline'],
        routeinfo: ['origin', 'destination', 'airline', 'year', 'month', 'aircraft', 'passengers', 'mail', 'freight', 'airtime', 'serviceclass', 'config'],
        aircraft: ['id', 'description', 'group']
    }

    let model = models[category]
    let out = {}

    if(model){
        if(model.length === values.length){
            for(let i = 0; i < model.length; i++){
                let field = model[i]
                out[field] = values[i]
            }
            return out
        }
        return 'Line does not match model'
    }
    return 'This category does not exist'
}

module.exports = {
    import: async (req, res) => {
        let category = req.params.category;
        let data = req.body

        let success = await insert(category, data)

        if(success === true){
            appController.update()
            res.send('Insert successful!')
        }else{
            res.status(404).send(success)
        }        
    },
    importFile: async (req, res) => {
        let form = new formidable.IncomingForm()
        let category = req.params.category;
        
        let success = 0
        let fail = 0
        let index = 1
        let errors = []
        let message = ''
        form.parse(req, async (err, fields, files) => {
            let old = files.file.path
            let data = fs.readFileSync(old, 'utf8')
            let lines = data.split('\n')
            for(let line of lines){
                let value = line.split(',').map((value) => {
                    value = value.trim()
                    if(isNaN(value)){
                        return value
                    }else{
                        if(value.includes('.')){
                            return parseFloat(value)
                        }
                        return parseInt(value)
                    }
                })   
                
                let model = parseLine(category, value)
                if(typeof model === typeof ''){
                    fail++
                    errors.push(`Line ${index}: ${model}`)
                }else{
                    let result = await insert(category, model)
                    if(result === true){
                        success++
                        message = 'Insert successful!'
                    }else{
                        fail++
                        errors.push(`Line ${index}: ${result}`)
                    }
                }
                index++
            }

            appController.update()

            let result = {
                success: success,
                fail: fail,
                errors: errors,
                message: message
            }

            res.send(result)
        })
    }
}