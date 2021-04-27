const { airport, airline } = require("./testController")

let lists = {}
const init = async () => {
    let states= [
        {value: 'AL', name: 'Alabama'},
        {value: 'AK', name: 'Alaska'},
        {value: 'AS', name: 'American Samoa'},
        {value: 'AZ', name: 'Arizona'},
        {value: 'AR', name: 'Arkansas'},
        {value: 'CA', name: 'California'},
        {value: 'CO', name: 'Colorado'},
        {value: 'CT', name: 'Connecticut'},
        {value: 'DE', name: 'Delaware'},
        {value: 'DC', name: 'District of Columbia'},
        {value: 'FL', name: 'Florida'},
        {value: 'GA', name: 'Georgia'},
        {value: 'GU', name: 'Guam'},
        {value: 'HI', name: 'Hawaii'},
        {value: 'ID', name: 'Idaho'},
        {value: 'IL', name: 'Illinois'},
        {value: 'IN', name: 'Indiana'},
        {value: 'IA', name: 'Iowa'},
        {value: 'KS', name: 'Kansas'},
        {value: 'KY', name: 'Kentuky'},
        {value: 'LA', name: 'Louisiana'},
        {value: 'ME', name: 'Maine'},
        {value: 'MD', name: 'Maryland'},
        {value: 'MA', name: 'Massachusetts'},
        {value: 'MI', name: 'Michigan'},
        {value: 'MN', name: 'Minnesota'},
        {value: 'MS', name: 'Mississippi'},
        {value: 'MO', name: 'Missouri'},
        {value: 'MT', name: 'Montana'},
        {value: 'NE', name: 'Nebraska'},
        {value: 'NV', name: 'Nevada'},
        {value: 'NH', name: 'New Hampshire'},
        {value: 'NJ', name: 'New Jersey'},
        {value: 'NM', name: 'New Mexico'},
        {value: 'NY', name: 'New York'},
        {value: 'NC', name: 'North Carolina'},
        {value: 'ND', name: 'North Dakota'},
        {value: 'MP', name: 'Northern Mariana IS'},
        {value: 'OH', name: 'Ohio'},
        {value: 'OK', name: 'Oklahama'},
        {value: 'OR', name: 'Oregon'},
        {value: 'PA', name: 'Pennsylvania'},
        {value: 'PR', name: 'Puerto Rico'},
        {value: 'RI', name: 'Rhode Island'},
        {value: 'SC', name: 'South Carolina'},
        {value: 'SD', name: 'South Dakota'},
        {value: 'TN', name: 'Tennesee'},
        {value: 'TT', name: 'Trust Territory of the Pacific Islands'},
        {value: 'TX', name: 'Texas'},
        {value: 'UT', name: 'Utah'},
        {value: 'VT', name: 'Vermont'},
        {value: 'VA', name: 'Virginia'},
        {value: 'VI', name: 'Virgin Islands'},
        {value: 'WA', name: 'Washington'},
        {value: 'WI', name: 'Wisconsin'},
        {value: 'WV', name: 'West Virginia'},
        {value: 'WY', name: 'Wyoming'}
    ]

    let airports= []
    let airportList =  await db.query('SELECT airportid, airportname, city FROM airport;')
    for(let airport of airportList.rows){
        airports.push({
            value: airport.airportid,
            name: `${airport.airportid} ${airport.airportname}, ${airport.city}`
        })
    }

    let airlines= []
    let airlineList = await db.query('SELECT airlineid, airlinename FROM airline;')
    for(let airline of airlineList.rows){
        airlines.push({
            value: airline.airlineid,
            name: `${airline.airlineid} ${airline.airlinename}`
        })
    }

    let routes= []
    let routeList = await db.query('SELECT origin, destination, airline FROM airlineroute;')
    for(let route of routeList.rows){
        routes.push({
            value: `${route.origin}:${route.destination}:${route.airline}`,
            name: `${route.airline}: ${route.origin} to ${route.destination}`
        })
    }

    let aircraft = []
    let parseDescription = (desc) => {
        return {name: desc.split('(')[0], notes: desc.match(/\(.*\)/) ? desc.match(/\(.*\)/)[0] : ''}
    }
    let aircraftList = await db.query('SELECT * from aircraft;')
    for(let craft of aircraftList.rows){
        aircraft.push({
            value: craft.aircraftid,
            name: parseDescription(craft.description).name
        })
    }

    let serviceClasses = []
    let classList = await db.query('SELECT * from serviceclass;')
    for(let sclass of classList.rows){
        serviceClasses.push({
            value: sclass.scid,
            name: sclass.description
        })
    }

    let configs = []
    let configList = await db.query('SELECT * from aircraftconfiguration;')
    for(let config of configList.rows){
        configs.push({
            value: config.acid,
            name: config.description
        })
    }

    let groups = []
    let groupList = await db.query('SELECT * from aircraftgroup;')
    for(let group of groupList.rows){
        groups.push({
            value: group.agid,
            name: group.description
        })
    }

    lists = {
        states: states,
        airports: airports,
        airlines: airlines,
        routes: routes, 
        aircraft: aircraft,
        classes: serviceClasses,
        configs: configs,
        groups: groups
    }        
}
init()

module.exports = {
    /**
     * Serves Homepage
     */
    showHome: (req, res) => {
        res.sendFile('./views/index.html', {root: './'})
    },
    show404: (req, res) => {
        res.sendFile('./views/404.html', {root: './'})
    },
    init: async(req, res) => {                
        console.log(lists)
        res.send(JSON.stringify(lists))
    },
    update: () => init(),
    lists: lists
}