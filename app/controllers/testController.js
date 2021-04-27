let test = {
    states:{
        incoming:[],
        outgoing:[]
    },
    state:{
        state: '',
        airports:[], 
        airlines:[], 
        annual:[], 
        monthly:[]
    },
    airports:{
        incoming:[],
        outgoing:[]
    },
    airport:{
        airport: {id: '', name: '', city: '', state: ''},
        incoming:[],
        outgoing:[],
        annual:[],
        monthly:[]
    },
    airlines:{
        airlines:[]
    }, 
    airline: {
        airline: {id: '', name: '', country: ''},
        routes:[],
        annual:[], 
        monthly:[]
    },
    routes:{
        routes:[]
    },
    route:{
        route: {
            origin: {id: '', name: '', city: ''},
            destination: {id: '', name: '', city: ''},
            airline: {id: '', name: ''}
        },
        annual:[], 
        monthly:[]
    },
    aircrafts:{
        aircraft:[]
    },
    aircraft:{
        aircraft: {id: '', description: ''},
        routes:[], 
        annual:[], 
        monthly:[]
    }
}

const states = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District of Columnbia', 
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentuky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'MP': 'Northern Mariana IS',
    'OH': 'Ohio',
    'OK': 'Oklahama',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennesee',
    'TT': 'Trust Territory of the Pacific Islands',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'VI': 'Virgin Islands',
    'WA': 'Washington',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
}
const statecodes = Object.keys(states)
const airports = {
    'IND': {id: 'IND', name: 'Indianapolis International Airport', city: 'Indianapolis', state: 'IN'},
    'HUF': {id: 'HUF', name: '"Terre Haute Regional Airport', city: ' Hulman Field"', state: 'Terre Haute'},
    'DPA': {id: 'DPA', name: 'Dupage Airport', city: 'West Chicago', state: 'IL'},
    'MDW': {id: 'MDW', name: 'Chicago Midway International Airport', city: 'Chicago', state: 'IL'},
    'BLV': {id: 'BLV', name: 'Scott AFB/Midamerica Airport', city: 'Belleville', state: 'IL'},
    'UGN': {id: 'UGN', name: 'Waukegan National Airport', city: 'Chicago', state: 'IL'},
    'ORD': {id: 'ORD', name: `Chicago O'Hare International Airport`, city: 'Chicago', state: 'IL'},
    'GUS': {id: 'GUS', name: 'Grissom Air Reserve Base', city: 'Peru', state: 'IN'},
    'EVV': {id: 'EVV', name: 'Evansville Regional Airport', city: 'Evansville', state: 'IN'},
    'RFD': {id: 'RFD', name: 'Chicago Rockford International Airport', city: 'Rockford', state: 'IL'},
    'BMI': {id: 'BMI', name: 'Central Illinois Regional Airport at Bloomington-Normal', city: 'Bloomington', state: 'IL'},
    'FWA': {id: 'FWA', name: 'Fort Wayne International Airport', city: 'Fort Wayne', state: 'IN'},
    'DEC': {id: 'DEC', name: 'Decatur Airport', city: 'Decatur', state: 'IL'},
    'PIA': {id: 'PIA', name: 'General Wayne A. Downing Peoria International Airport', city: 'Peoria', state: 'IL'},
    'CMI': {id: 'CMI', name: 'University of Illinois Willard Airport', city: 'Champaign', state: 'IL'},
    'MLI': {id: 'MLI', name: 'Quad City International Airport', city: 'Moline', state: 'IL'},
    'SPI': {id: 'SPI', name: 'Abraham Lincoln Capital Airport', city: 'Springfield', state: 'IL'},
    'SBN': {id: 'SBN', name: 'South Bend Regional Airport', city: 'South Bend', state: 'IN'},
    'UIN': {id: 'UIN', name: 'Quincy Regional Baldwin Field', city: 'Quincy', state: 'IL'},
    'MWA': {id: 'MWA', name: 'Williamson County Regional Airport', city: 'Marion', state: 'IL'},
    'MIE': {id: 'MIE', name: 'Delaware County Johnson Field', city: 'Muncie', state: 'IN'},
    'LAF': {id: 'LAF', name: 'Purdue University Airport', city: 'Lafayette', state: 'IN'},
    'GYY': {id: 'GYY', name: 'Gary Chicago International Airport', city: 'Gary', state: 'IN'},
    'BMG': {id: 'BMG', name: 'Monroe County Airport', city: 'Bloomington', state: 'IN'},
    'LOT': {id: 'LOT', name: 'Lewis University Airport', city: 'Lockport', state: 'IL'},
    'PWK': {id: 'PWK', name: 'Chicago Executive Airport', city: 'Chicago-Wheeling', state: 'IL'},
    'MQJ': {id: 'MQJ', name: 'Moma Airport', city: 'Honuu', state: 'IN'},
    'OKK': {id: 'OKK', name: 'Kokomo Municipal Airport', city: 'Kokomo', state: 'IN'},
    'VPZ': {id: 'VPZ', name: 'Porter County Municipal Airport', city: 'Valparaiso IN', state: 'IN'},
    'ALN': {id: 'ALN', name: 'St Louis Regional Airport', city: 'Alton/St Louis', state: 'IL'},
    'CLU': {id: 'CLU', name: 'Columbus Municipal Airport', city: 'Columbus', state: 'IN'},
    'MDH': {id: 'MDH', name: 'Southern Illinois Airport', city: 'Carbondale/Murphysboro', state: 'IL'}
}
const airportCodes = Object.keys(airports)
const airlines = {
    'Q5': {id: 'Q5', name: '40-Mile Air'},
    'AN': {id: 'AN', name: 'Ansett Australia'},
    'AA': {id: 'AA', name: 'American Airlines'},
    'OZ': {id: 'OZ', name: 'Ozark Air Lines'},
    'G4': {id: 'G4', name: 'Allegiant Air'},
    'M3': {id: 'M3', name: 'North Flying'},
    '8V': {id: '8V', name: 'Wright Air Service'},
    'UX': {id: 'UX', name: 'Air Europa'},
    'EM': {id: 'EM', name: 'Empire Airlines'},
    'KO': {id: 'KO', name: 'Alaska Central Express'},
    'AF': {id: 'AF', name: 'Air France'},
    '2O': {id: '2O', name: 'Air Salone'},
    '5D': {id: '5D', name: 'DonbassAero'},
    'CC': {id: 'CC', name: 'Macair Airlines'},
    'M6': {id: 'M6', name: 'Amerijet International'},
    'ZW': {id: 'ZW', name: 'Air Wisconsin'},
    'AM': {id: 'AM', name: 'AeroMéxico'},
    'AC': {id: 'AC', name: 'Air Canada'},
    'GV': {id: 'GV', name: 'Aero Flight'},
    'AS': {id: 'AS', name: 'Alaska Airlines'},
    'EV': {id: 'EV', name: 'Atlantic Southeast Airlines'},
    '8C': {id: '8C', name: 'Shanxi Airlines'},
    'RU': {id: 'RU', name: 'Rainbow Air Euro'},
    'MQ': {id: 'MQ', name: 'American Eagle Airlines'},
    'V8': {id: 'V8', name: 'ATRAN Cargo Airlines'},
    'CA': {id: 'CA', name: 'Air China'},
    'GL': {id: 'GL', name: 'Miami Air International'},
    '5Y': {id: '5Y', name: 'Atlas Air'},
    'XL': {id: 'XL', name: 'Aerolane'},
    '3S': {id: '3S', name: 'Air Antilles Express'},
    'AD': {id: 'AD', name: 'Azul'},
    'Z3': {id: 'Z3', name: 'Avient Aviation'},
    '6R': {id: '6R', name: 'Alrosa Mirny Air Enterprise'},
    'BA': {id: 'BA', name: 'British Airways'},
    'CH': {id: 'CH', name: 'Bemidji Airlines'},
    '8E': {id: '8E', name: 'Bering Air'},
    'E9': {id: 'E9', name: 'Compagnie Africaine d\'Aviation'},
    'CP': {id: 'CP', name: 'Compass Airlines'},
    '9K': {id: '9K', name: 'Cape Air'},
    'PT': {id: 'PT', name: 'Red Jet Andes'},
    'W8': {id: 'W8', name: 'Cargojet Airways'},
    'RV': {id: 'RV', name: 'Caspian Airlines'},
    'CX': {id: 'CX', name: 'Cathay Pacific'},
    'KX': {id: 'KX', name: 'Cayman Airways'},
    'CI': {id: 'CI', name: 'China Airlines'},
    'CK': {id: 'CK', name: 'China Cargo Airlines'},
    'X7': {id: 'X7', name: 'Atlantic Air Services'},
    'G3': {id: 'G3', name: 'Sky Express'},
    'OH': {id: 'OH', name: 'Comair'},
    'C5': {id: 'C5', name: 'CommutAir'},
    'DE': {id: 'DE', name: 'Condor Flugdienst'},
    'DL': {id: 'DL', name: 'Delta Air Lines'},
    'D8': {id: 'D8', name: 'Djibouti Airlines'},
    'DI': {id: 'DI', name: 'dba'},
    'BR': {id: 'BR', name: 'EVA Air'},
    'LY': {id: 'LY', name: 'El Al Israel Airlines'},
    'EY': {id: 'EY', name: 'Etihad Airways'},
    'K2': {id: 'K2', name: 'Eurolot'},
    'FX': {id: 'FX', name: 'FOX Linhas Aereas'},
    'N8': {id: 'N8', name: 'National Air Cargo'},
    'AY': {id: 'AY', name: 'Finnair'},
    'LF': {id: 'LF', name: 'FlyNordic'},
    'FP': {id: 'FP', name: 'Freedom Air'},
    'F9': {id: 'F9', name: 'Frontier Airlines'},
    '2F': {id: '2F', name: 'Frontier Flying Service'},
    'G7': {id: 'G7', name: 'GoJet Airlines'},
    'ZK': {id: 'ZK', name: 'Great Lakes Airlines'},
    'H6': {id: 'H6', name: 'Hageland Aviation Services'},
    'HA': {id: 'HA', name: 'Hawaiian Airlines'},
    'QX': {id: 'QX', name: 'Horizon Air'},
    'IB': {id: 'IB', name: 'Iberia Airlines'},
    'I4': {id: 'I4', name: 'International AirLink'},
    '9X': {id: '9X', name: 'Regionalia Venezuela'},
    'JL': {id: 'JL', name: 'Japan Airlines Domestic'},
    'B6': {id: 'B6', name: 'JetBlue Airways'},
    'KD': {id: 'KD', name: 'KD Avia'},
    'KL': {id: 'KL', name: 'KLM Royal Dutch Airlines'},
    'KV': {id: 'KV', name: 'Kavminvodyavia'},
    'KE': {id: 'KE', name: 'Korean Air'},
    'LA': {id: 'LA', name: 'LAN Airlines'},
    'LP': {id: 'LP', name: 'LAN Peru'},
    'LO': {id: 'LO', name: 'LOT Polish Airlines'},
    'L7': {id: 'L7', name: 'Lugansk Airlines'},
    'LH': {id: 'LH', name: 'Lufthansa Cargo'},
    '5V': {id: '5V', name: 'Lviv Airlines'},
    'L2': {id: 'L2', name: 'Lynden Air Cargo'},
    'MP': {id: 'MP', name: 'Martinair'},
    'MW': {id: 'MW', name: 'Maya Island Air'},
    'YV': {id: 'YV', name: 'Mesa Airlines'},
    'YX': {id: 'YX', name: 'Midwest Airlines'},
    'NC': {id: 'NC', name: 'Northern Air Cargo'},
    'KZ': {id: 'KZ', name: 'Dense Connection'},
    'U7': {id: 'U7', name: 'USA Jet Airlines'},
    'DY': {id: 'DY', name: 'Norwegian Air Shuttle'},
    'O6': {id: 'O6', name: 'Oceanair'},
    'OJ': {id: 'OJ', name: 'Overland Airways'},
    'PF': {id: 'PF', name: 'Primera Air'},
    'KS': {id: 'KS', name: 'Peninsula Airways'},
    'PR': {id: 'PR', name: 'Philippine Airlines'},
    '9E': {id: '9E', name: 'Pinnacle Airlines'},
    'PO': {id: 'PO', name: 'FlyPortugal'},
    'PH': {id: 'PH', name: 'Polynesian Airlines'},
    'QF': {id: 'QF', name: 'Qantas'},
    'RJ': {id: 'RJ', name: 'Royal Jordanian'},
    'SK': {id: 'SK', name: 'Scandinavian Airlines System'},
    'SY': {id: 'SY', name: 'Sun Country Airlines'},
    'SQ': {id: 'SQ', name: 'Singapore Airlines Cargo'},
    'WN': {id: 'WN', name: 'Southwest Airlines'},
    'WG': {id: 'WG', name: 'Sunwing'},
    'LX': {id: 'LX', name: 'Swiss International Air Lines'},
    '9S': {id: '9S', name: 'Spring Airlines'},
    'NK': {id: 'NK', name: 'Spirit Airlines'},
    'OO': {id: 'OO', name: 'SkyWest'},
    'JJ': {id: 'JJ', name: 'TAM Brazilian Airlines'},
    'TP': {id: 'TP', name: 'TAP Portugal'},
    'TK': {id: 'TK', name: 'Turkish Airlines'},
    'PM': {id: 'PM', name: 'Tropic Air'},
    'AX': {id: 'AX', name: 'Trans States Airlines'},
    'UA': {id: 'UA', name: 'United Airlines'},
    '5X': {id: '5X', name: 'United Parcel Service'},
    'VI': {id: 'VI', name: 'Volga-Dnepr Airlines'},
    'VX': {id: 'VX', name: 'Virgin America'},
    'VS': {id: 'VS', name: 'Virgin Atlantic Airways'},
    'WS': {id: 'WS', name: 'WestJet'},
    'SE': {id: 'SE', name: 'XL Airways France'},
    'XP': {id: 'XP', name: 'XPTO'},
    'VH': {id: 'VH', name: 'Virgin Pacific'},
    'VB': {id: 'VB', name: 'Pacific Express'},
    '3E': {id: '3E', name: 'Air Choice One'},
    'J5': {id: 'J5', name: 'Alaska Seaplane Service'},
    '3F': {id: '3F', name: 'Fly Colombia ( Interliging Flights )'},
    'KH': {id: 'KH', name: 'Kharkiv Airlines'},
    '7H': {id: '7H', name: 'Era Alaska'},
    'YR': {id: 'YR', name: 'SENIC AIRLINES'},
    'PP': {id: 'PP', name: 'Air Indus'},
    'WL': {id: 'WL', name: 'CheapFlyingInternational'},
    'X9': {id: 'X9', name: 'Islands Express'},
    '4B': {id: '4B', name: 'Boutique Air (Priv)'},
    '3M': {id: '3M', name: 'Silver Airways (3M)'},
    'K3': {id: 'K3', name: 'Atlantic Air Cargo'},
    '': {id: '', name: 'undefined'}
}
const airlineCodes = Object.keys(airlines)
const generateRoutes = (num, options={origin: null, destination: null, airline: null}) => {
    let routes = []
    for(let i = 0; i < num; i++){
        let origin = options.origin 
        let destination = options.destination
        let airline = options.airline
        if(!origin)
            origin = airports[airportCodes[Math.floor(Math.random() * airportCodes.length)]]

        if(destination){
            while(destination === origin){
                origin = airports[airportCodes[Math.floor(Math.random() * airportCodes.length)]]
            }
        }else{
            destination = airports[airportCodes[Math.floor(Math.random() * airportCodes.length)]]
            while(destination === origin){
                destination = airports[airportCodes[Math.floor(Math.random() * airportCodes.length)]]
            }
        }

        if(!airline)
            airline = airlines[airlineCodes[Math.floor(Math.random() * airlineCodes.length)]]
        
        routes.push({origin: origin, destination: destination, airline: airline})
    }
    return routes
}

const aircraft = {
    '007': {id: '007', description: 'Aero Commander 200'},
    '008': {id: '008', description: 'Aero Macchi AL-60'},
    '009': {id: '009', description: 'Aeronca 7-AC'},
    '010': {id: '010', description: 'Beech Bonanza 35A/C/D/E/G/H/J/K/S/V/  36A'},
    '020': {id: '020', description: 'Bellanca CH-300'},
    '024': {id: '024', description: 'Beech B-23 Musketeer'},
    '026': {id: '026', description: 'Gipps Aero Ga8 Airvan'},
    '029': {id: '029', description: 'Cessna 150/152'},
    '030': {id: '030', description: 'Cessna 180'},
    '031': {id: '031', description: 'Cessna 180A/B'},
    '032': {id: '032', description: 'Cessna 180C/D/E/F'},
    '033': {id: '033', description: 'Cessna 185A/B/C Skywagon'},
    '034': {id: '034', description: 'Helio H-250/295/395'},
    '035': {id: '035', description: 'Cessna C206/207/209/210 Stationair'},
    '036': {id: '036', description: 'Cessna 172 Skyhawk'},
    '037': {id: '037', description: 'Cessna 195'},
    '038': {id: '038', description: 'Cessna 177 Cardinal'},
    '039': {id: '039', description: 'Cessna 182 Skylane'},
    '040': {id: '040', description: 'De Havilland DHC2 Beaver'},
    '041': {id: '041', description: 'Cessna 205'},
    '042': {id: '042', description: 'De Havilland DHC3 Otter'},
    '044': {id: '044', description: 'Lake LA-4'},
    '050': {id: '050', description: 'Howard DGA-15P'},
    '051': {id: '051', description: 'Mooney M-21'},
    '052': {id: '052', description: 'Mooney M-20C/E/G'},
    '065': {id: '065', description: 'Noorduyn UC-64AS'},
    '070': {id: '070', description: 'Pilatus Porter PC6'},
    '071': {id: '071', description: 'Pilatus Porter PC6/350'},
    '079': {id: '079', description: 'Piper PA-32 (Cherokee 6)'},
    '080': {id: '080', description: 'Piper PA-18 (Super-Cub)'},
    '081': {id: '081', description: 'Piper PA-14 (Family-Cruiser)'},
    '082': {id: '082', description: 'Piper PA-22 (Tri-Pacer)'},
    '083': {id: '083', description: 'Piper PA-24 (Comanche)'},
    '084': {id: '084', description: 'Piper PA-28 (Cherokee)'},
    '085': {id: '085', description: 'Stinson SR-9'},
    '086': {id: '086', description: 'Piper PA-12 (Supercruiser)'},
    '087': {id: '087', description: 'Stinson V-77'},
    '088': {id: '088', description: 'Stinson SR-10E Bushman'},
    '091': {id: '091', description: 'Float/Amphib Turbine'},
    '092': {id: '092', description: 'Float/Amphib Piston-Lt 450 Hp'},
    '093': {id: '093', description: 'Float/Amphib Piston-450+ Hp'},
    '094': {id: '094', description: 'Land-Turbine'},
    '095': {id: '095', description: 'Land-Piston-Lt 450 Hp'},
    '096': {id: '096', description: 'Land-Piston-450+ Hp'},
    '097': {id: '097', description: 'Stinson F.W. 300-450 Hp'},
    '098': {id: '098', description: 'Stinson 0-299 Hp'},
    '103': {id: '103', description: 'Aero Commander (500/600 Series Excpt 680FL)'},
    '104': {id: '104', description: 'Grand Commander 680FL'},
    '105': {id: '105', description: 'Beech C-50 (Twin Bonanza)'},
    '110': {id: '110', description: 'Beechcraft Beech 18 C-185 (Federal Express has waiver to report all its small aircraft under code 110'},
    '111': {id: '111', description: 'Beech King Air 90'},
    '113': {id: '113', description: 'Beech B-95 (Travelair)'},
    '115': {id: '115', description: 'Beech AT-11'},
    '117': {id: '117', description: 'Beech Baron (55 Series)'},
    '120': {id: '120', description: 'Cessna T-50 (Bobcat)'},
    '121': {id: '121', description: 'Cessna C-421'},
    '122': {id: '122', description: 'Cessna C-310 Series'},
    '123': {id: '123', description: 'Cessna C-340/335'},
    '125': {id: '125', description: 'Cessna C-402/402A/402B'},
    '128': {id: '128', description: 'Cessna 404'},
    '130': {id: '130', description: 'C-28 5ACF PBY'},
    '131': {id: '131', description: 'Pilatus Britten-Norman BN2/A Islander'},
    '132': {id: '132', description: 'C-28 5ACF-PBY-EMQ'},
    '133': {id: '133', description: 'Beech 65/65A-80/65B-80 (Queen Air)'},
    '140': {id: '140', description: 'Convair CV-240'},
    '143': {id: '143', description: 'Convair CV-340/440'},
    '148': {id: '148', description: 'Cessna C-337 (Super Sky Master)'},
    '149': {id: '149', description: 'Cessna C-401'},
    '150': {id: '150', description: 'Curtiss C46/20t/A/D/F/R Commando'},
    '152': {id: '152', description: 'Cessna C-411'},
    '153': {id: '153', description: 'De Havilland DHC4 Caribou'},
    '158': {id: '158', description: 'McDonnell Douglas DC-2'},
    '159': {id: '159', description: 'Hamilton B-18s Little Liner (Converted)'},
    '160': {id: '160', description: 'McDonnell Douglas DC-3/A/C'},
    '161': {id: '161', description: 'Dornier Do-28 Skyservant'},
    '166': {id: '166', description: 'Cessna C-336'},
    '167': {id: '167', description: 'Fairchild C-82A'},
    '170': {id: '170', description: 'Grumman G-21A (Goose)'},
    '171': {id: '171', description: 'Grumman SA-16A-GR (Albatross)'},
    '172': {id: '172', description: 'Grumman G-44/44A (Widgeon)'},
    '173': {id: '173', description: 'Grumman G-73 (Mallard)'},
    '174': {id: '174', description: 'De Havilland Dove DH-104'},
    '175': {id: '175', description: 'Lockheed L-12A/L-10/10A'},
    '180': {id: '180', description: 'Martin 202/202A'},
    '185': {id: '185', description: 'Martin 404'},
    '190': {id: '190', description: 'Piper PA-23-250 (Aztec/Apache)'},
    '193': {id: '193', description: 'Piper T-1020'},
    '194': {id: '194', description: 'Piper PA-31 (Navajo)/T-1020'},
    '195': {id: '195', description: 'Piper PA-34/39 (Twin Commanche)'},
    '200': {id: '200', description: 'Boeing 377 Stratocruiser'},
    '201': {id: '201', description: 'Pilatus Britten-Norman BN2A Trislander'},
    '205': {id: '205', description: 'De Havilland DH-114 Heron'},
    '210': {id: '210', description: 'McDonnell Douglas DC-4(C54/C54A/C54B/C54E)'},
    '216': {id: '216', description: 'McDonnell Douglas DC-6'},
    '218': {id: '218', description: 'McDonnell Douglas DC-6A'},
    '220': {id: '220', description: 'McDonnell Douglas DC-6B'},
    '225': {id: '225', description: 'McDonnell Douglas DC-7A/B'},
    '228': {id: '228', description: 'McDonnell Douglas DC-7C'},
    '240': {id: '240', description: 'Lockheed L-049'},
    '242': {id: '242', description: 'Lockheed L-649'},
    '244': {id: '244', description: 'Lockheed L-749/749A'},
    '247': {id: '247', description: 'Lockheed L-1049'},
    '248': {id: '248', description: 'Lockheed L-1049C/D/E'},
    '252': {id: '252', description: 'Lockheed L-1049G/H'},
    '258': {id: '258', description: 'Lockheed L-1649A'},
    '280': {id: '280', description: 'Sikorsky VS-44A (Amphibian)'},
    '303': {id: '303', description: 'Sud Alouette'},
    '311': {id: '311', description: 'Bell B-47D'},
    '312': {id: '312', description: 'Bell B-47G'},
    '313': {id: '313', description: 'Bell B-47G2'},
    '314': {id: '314', description: 'Bell B-47J2'},
    '315': {id: '315', description: 'Bell B-206A'},
    '317': {id: '317', description: 'Hu-1h 204B'},
    '320': {id: '320', description: 'Boeing Vertol BV-107'},
    '321': {id: '321', description: 'Boeing Vertol BV-44'},
    '322': {id: '322', description: 'Brantley B-2'},
    '323': {id: '323', description: 'Fairchild-Hiller FH-1100'},
    '325': {id: '325', description: 'Agusta A-119 Koala'},
    '330': {id: '330', description: 'Boelkow Bo-105c'},
    '339': {id: '339', description: 'Airbus Industrie A330-900'},
    '340': {id: '340', description: 'Eurocompter AS350 B2 AStar'},
    '343': {id: '343', description: 'Airbus Industrie A330-223/234'},
    '345': {id: '345', description: 'Bell 212 Twin Two Twelve'},
    '350': {id: '350', description: 'Hughes 300'},
    '355': {id: '355', description: 'Hughes-500/530'},
    '359': {id: '359', description: 'Airbus Industrie A350-900'},
    '360': {id: '360', description: 'Robinson R44'},
    '362': {id: '362', description: 'Bht 206 Lt Long Ranger'},
    '364': {id: '364', description: 'Bht 206 L4 Long Ranger'},
    '366': {id: '366', description: 'Bell Bht 407'},
    '368': {id: '368', description: 'Bell Bht 412'},
    '370': {id: '370', description: 'Air Bus Euro Bo-105'},
    '380': {id: '380', description: 'Sikorsky S-51'},
    '381': {id: '381', description: 'Sikorsky S-55'},
    '385': {id: '385', description: 'Sikorsky S-58A/B/C'},
    '386': {id: '386', description: 'Sikorsky S-61N'},
    '387': {id: '387', description: 'Sikorsky S-61'},
    '388': {id: '388', description: 'Sikorsky S-61L'},
    '389': {id: '389', description: 'Sikorsky S-62/A'},
    '390': {id: '390', description: 'Sikorsky S-76'},
    '393': {id: '393', description: 'Agustawestland AW139'},
    '395': {id: '395', description: 'DHC-6-400 Twin Otter'},
    '396': {id: '396', description: 'Westland SR-N5 (Acv)'},
    '401': {id: '401', description: 'Beech 1300'},
    '402': {id: '402', description: 'Beech Model 18 Turbo-Prop Conversions'},
    '403': {id: '403', description: 'Beech 99 Airliner'},
    '404': {id: '404', description: 'Beech C99'},
    '405': {id: '405', description: 'Beech 1900 A/B/C/D'},
    '406': {id: '406', description: 'Beech 200 Super Kingair'},
    '407': {id: '407', description: 'British Aerospace (Hawker-Siddeley) BAe-748'},
    '408': {id: '408', description: 'British Aerospace BAe-ATP'},
    '409': {id: '409', description: 'Beechcraft King Air B100'},
    '410': {id: '410', description: 'Rockwell Turbo-Commander 680-W/690'},
    '411': {id: '411', description: 'Beech King Air 65-A90 Queen Air'},
    '412': {id: '412', description: 'Casa/Nurtanio C212 Aviocar'},
    '413': {id: '413', description: 'Casa 235'},
    '415': {id: '415', description: 'Cessna C208B/Grand Caravan'},
    '416': {id: '416', description: 'Cessna 208 Caravan'},
    '417': {id: '417', description: 'Cessna 406 Caravan II'},
    '418': {id: '418', description: 'Cessna C-441'},
    '420': {id: '420', description: 'Convair CV-540'},
    '422': {id: '422', description: 'Quest Kodiak 100'},
    '425': {id: '425', description: 'Piaggio P180 Avanti'},
    '430': {id: '430', description: 'Convair CV-580'},
    '431': {id: '431', description: 'Socata TBM850'},
    '432': {id: '432', description: 'Saab 2000'},
    '433': {id: '433', description: 'Socata TBM-700'},
    '434': {id: '434', description: 'Raytheon King Air A100'},
    '435': {id: '435', description: 'Convair CV-600'},
    '437': {id: '437', description: 'Raytheon Beechcraft Baron B-58'},
    '440': {id: '440', description: 'Convair CV-640'},
    '441': {id: '441', description: 'Aerospatiale/Aeritalia ATR-42'},
    '442': {id: '442', description: 'Aerospatiale/Aeritalia ATR-72'},
    '443': {id: '443', description: 'Air Tractor AT-802'},
    '444': {id: '444', description: 'Antonov 24/26/32'},
    '445': {id: '445', description: 'Convair CV-660'},
    '448': {id: '448', description: 'Dornier 228'},
    '449': {id: '449', description: 'Dornier 328'},
    '450': {id: '450', description: 'Fokker Friendship F-27/Fairchild F-27/A/B/F/J'},
    '452': {id: '452', description: 'Fokker 50'},
    '454': {id: '454', description: 'Fairchild-Hiller FH-227'},
    '455': {id: '455', description: 'Fairchild Metro 23'},
    '456': {id: '456', description: 'Saab-Fairchild 340/B'},
    '457': {id: '457', description: 'Beech King Air C-90'},
    '458': {id: '458', description: 'Beechcraft Super King Air'},
    '459': {id: '459', description: 'Saab-Fairchild 340/A'},
    '460': {id: '460', description: 'Grumman G-21G (Turbo-Goose)'},
    '461': {id: '461', description: 'Embraer EMB-120 Brasilia'},
    '462': {id: '462', description: 'Swearingen Metro Merlin'},
    '463': {id: '463', description: 'Mitsubishi MU-2/B'},
    '464': {id: '464', description: 'Embraer EMB-110 Bandeirante'},
    '465': {id: '465', description: 'Nihon YS-11'},
    '466': {id: '466', description: 'Swearingen Metro II'},
    '467': {id: '467', description: 'Swearingen Metro III'},
    '468': {id: '468', description: 'Handley Page Jetstream'},
    '469': {id: '469', description: 'British Aerospace Jetstream 31'},
    '470': {id: '470', description: 'Gulfstream I'},
    '471': {id: '471', description: 'British Aerospace Jetstream 41'},
    '473': {id: '473', description: 'Gulfstream I-Commander'},
    '474': {id: '474', description: 'Hawker Siddeley 748'},
    '475': {id: '475', description: 'Nord 262'},
    '476': {id: '476', description: 'Piper PA-30/31T Cheyenne II XL'},
    '477': {id: '477', description: 'Mohawk 298'},
    '478': {id: '478', description: 'Piper T-1040'},
    '479': {id: '479', description: 'Pilatus PC-12'},
    '480': {id: '480', description: 'Pilatus Turbo Porter PC-6A'},
    '481': {id: '481', description: 'Pilatus Turbo Porter PC-6B'},
    '482': {id: '482', description: 'De Havilland DHC8-400 Dash-8'},
    '483': {id: '483', description: 'De Havilland DHC8-100 Dash-8'},
    '484': {id: '484', description: 'De Havilland DHC8-300 Dash 8'},
    '485': {id: '485', description: 'De Havilland Twin Otter DHC-6'},
    '486': {id: '486', description: 'Shorts Harland SC-7 Skyvan'},
    '487': {id: '487', description: 'Shorts 330'},
    '488': {id: '488', description: 'Carstedt CJ-600A'},
    '489': {id: '489', description: 'Shorts 360'},
    '490': {id: '490', description: 'Volpar Turbo 18'},
    '491': {id: '491', description: 'De Havilland DHC8-200Q Dash-8'},
    '495': {id: '495', description: 'Hawker Beechcraft Hawker 4000'},
    '507': {id: '507', description: 'Antonov 12'},
    '508': {id: '508', description: 'Antonov An-22 Freighter'},
    '510': {id: '510', description: 'AW-650'},
    '515': {id: '515', description: 'Bomardier Challenger 350'},
    '520': {id: '520', description: 'Canadair CL-44D'},
    '530': {id: '530', description: 'Bombardier CRJ550'},
    '541': {id: '541', description: 'Ilyushin Il-18'},
    '550': {id: '550', description: 'Lockheed L-188A/C Electra'},
    '552': {id: '552', description: 'Lockheed L-382B'},
    '553': {id: '553', description: 'Lockheed L100-10 Hercules'},
    '555': {id: '555', description: 'Lockheed L100-20 Hercules'},
    '556': {id: '556', description: 'Lockheed L100-30/L-382E'},
    '560': {id: '560', description: 'Shorts Belfast Freighter-Sh5'},
    '570': {id: '570', description: 'De Havilland DHC7 Dash-7'},
    '575': {id: '575', description: 'Bombardier Learjet 75'},
    '580': {id: '580', description: 'Vickers Viscount 700/744/745/745D'},
    '584': {id: '584', description: 'Vickers Viscount V800/810/812'},
    '601': {id: '601', description: 'Fokker F28-1000 Fellowship'},
    '602': {id: '602', description: 'Fokker F28-4000/6000 Fellowship'},
    '603': {id: '603', description: 'Fokker 100'},
    '604': {id: '604', description: 'Fokker 70'},
    '605': {id: '605', description: 'British Aerospace BAC-111-200'},
    '606': {id: '606', description: 'Raytheon Beechraft 390 Premier I'},
    '607': {id: '607', description: 'Antonov An-72/74'},
    '608': {id: '608', description: 'Boeing 717-200'},
    '609': {id: '609', description: 'Bombardier BD-100-1A10 Challenger 300'},
    '610': {id: '610', description: 'British Aerospace BAC-111-400'},
    '611': {id: '611', description: 'Aero Commander 1121'},
    '612': {id: '612', description: 'Boeing 737-700/700LR/Max 7'},
    '613': {id: '613', description: 'Aerospatiale Corvette'},
    '614': {id: '614', description: 'Boeing 737-800'},
    '615': {id: '615', description: 'Boeing 737-5/600LR'},
    '616': {id: '616', description: 'Boeing 737-500'},
    '617': {id: '617', description: 'Boeing 737-400'},
    '618': {id: '618', description: 'Boeing 737-300LR'},
    '619': {id: '619', description: 'Boeing 737-300'},
    '620': {id: '620', description: 'Boeing 737-100/200'},
    '621': {id: '621', description: 'Boeing 737-200C'},
    '622': {id: '622', description: 'Boeing 757-200'},
    '623': {id: '623', description: 'Boeing 757-300'},
    '624': {id: '624', description: 'Boeing 767-400/ER'},
    '625': {id: '625', description: 'Boeing 767-200/ER/EM'},
    '626': {id: '626', description: 'Boeing 767-300/300ER'},
    '627': {id: '627', description: 'Boeing 777-200ER/200LR/233LR'},
    '628': {id: '628', description: 'Canadair RJ-100/RJ-100ER'},
    '629': {id: '629', description: 'Canadair RJ-200ER /RJ-440'},
    '630': {id: '630', description: 'McDonnell Douglas DC-9-10'},
    '631': {id: '631', description: 'Canadair RJ-700'},
    '632': {id: '632', description: 'Dornier 328 Jet'},
    '633': {id: '633', description: 'Boeing 737-600'},
    '634': {id: '634', description: 'Boeing 737-900'},
    '635': {id: '635', description: 'McDonnell Douglas DC-9-15F'},
    '636': {id: '636', description: 'Cessna Citation II/ Bravo'},
    '637': {id: '637', description: 'Boeing 777-300/300ER/333ER'},
    '638': {id: '638', description: 'Canadair CRJ 900'},
    '639': {id: '639', description: 'Cessna Citationjet/CJ1/CJ2/CJ3'},
    '640': {id: '640', description: 'McDonnell Douglas DC-9-30'},
    '641': {id: '641', description: 'Gulfstream Aerospace G-III/G-IV'},
    '642': {id: '642', description: 'Raytheon Beechcraft Hawker 400XP'},
    '643': {id: '643', description: '1124A Westwind II'},
    '644': {id: '644', description: 'Airbus Industrie A-318'},
    '645': {id: '645', description: 'McDonnell Douglas DC-9-40'},
    '646': {id: '646', description: 'Cessna Citation X Model 650/550B/550XL'},
    '647': {id: '647', description: 'Cessna Citation X Model CE750 X'},
    '648': {id: '648', description: 'Gulfstream G200'},
    '649': {id: '649', description: 'Tupolev TU-204-300'},
    '650': {id: '650', description: 'McDonnell Douglas DC-9-50'},
    '651': {id: '651', description: 'Gulfstream G150'},
    '652': {id: '652', description: 'Canadair CL-600 Challenger'},
    '653': {id: '653', description: 'Cessna CE-680 Citation Sovereign'},
    '654': {id: '654', description: 'McDonnell Douglas DC9 Super 87'},
    '655': {id: '655', description: 'McDonnell Douglas DC9 Super 80/MD81/82/83/88'},
    '656': {id: '656', description: 'McDonnell Douglas MD-90'},
    '657': {id: '657', description: 'Bombardier CRJ 705'},
    '658': {id: '658', description: 'Bombardier BD-700 Global Express'},
    '659': {id: '659', description: 'Bombardier (Gates) Learjet 60'},
    '660': {id: '660', description: 'Gates Learjet Lear-23'},
    '661': {id: '661', description: 'Gates Learjet Lear-24'},
    '662': {id: '662', description: 'Gates Learjet Lear-25'},
    '663': {id: '663', description: 'Gates Learjet Lear-31/35/36'},
    '664': {id: '664', description: 'HFB-320 Hansa'},
    '665': {id: '665', description: 'Hawker Siddeley 125'},
    '666': {id: '666', description: 'Lear 55'},
    '667': {id: '667', description: 'Gulfstream III/V/ G-V Exec/ G-5/550'},
    '668': {id: '668', description: 'Canadair (Bombardier) Challlenger 601'},
    '669': {id: '669', description: 'Bombardier Challenger 604/605'},
    '670': {id: '670', description: 'Rockwell Sabreliner'},
    '671': {id: '671', description: 'Gulfstream G450'},
    '673': {id: '673', description: 'Embraer ERJ-175'},
    '674': {id: '674', description: 'Embraer-135'},
    '675': {id: '675', description: 'Embraer-145'},
    '676': {id: '676', description: 'Embraer-140'},
    '677': {id: '677', description: 'Embraer-Emb-170'},
    '678': {id: '678', description: 'Embraer 190'},
    '679': {id: '679', description: 'Grumman G-1159 Gulfstream II/III'},
    '680': {id: '680', description: 'Aerospatiale Caravelle SE-210'},
    '681': {id: '681', description: 'Dassault-Breguet Mystere-Falcon'},
    '682': {id: '682', description: 'Dassault Falcon 2000EX/2000lxs'},
    '683': {id: '683', description: 'Boeing B777-F'},
    '684': {id: '684', description: 'Raytheon Beechcraft Hawker 800XP'},
    '685': {id: '685', description: 'Cessna 510 Mustang/560XL Citation Excel'},
    '686': {id: '686', description: 'Learjet45'},
    '687': {id: '687', description: 'Airbus Industrie A330-300'},
    '688': {id: '688', description: 'Bombardier Global 5000'},
    '689': {id: '689', description: 'Airbus Industrie A330-600ST (Beluga)'},
    '690': {id: '690', description: 'Airbus Industrie A300B/C/F-100/200'},
    '691': {id: '691', description: 'Airbus Industrie A300-600/R/CF/RCF'},
    '692': {id: '692', description: 'Airbus Industrie A310-200C/F'},
    '693': {id: '693', description: 'Airbus Industrie A310-300'},
    '694': {id: '694', description: 'Airbus Industrie A320-100/200'},
    '695': {id: '695', description: 'Airbus Industrie A300-B2'},
    '696': {id: '696', description: 'Airbus Industrie A330-200'},
    '697': {id: '697', description: 'Airbus Industrie A340'},
    '698': {id: '698', description: 'Airbus Industrie A319'},
    '699': {id: '699', description: 'Airbus Industrie A321/Lr'},
    '710': {id: '710', description: 'Boeing 727-100'},
    '711': {id: '711', description: 'Boeing 727-100C/QC'},
    '714': {id: '714', description: 'Sukhoi Superjet 100'},
    '715': {id: '715', description: 'Boeing 727-200/231A'},
    '717': {id: '717', description: 'Mrj-70/Std/ER/Lr'},
    '718': {id: '718', description: 'Mrj-90/Std/Sr/Lr'},
    '719': {id: '719', description: 'Airbus Industrie A319-200n'},
    '720': {id: '720', description: 'Bombardier C Series Cs100'},
    '721': {id: '721', description: 'Airbus Industrie A321-200n'},
    '722': {id: '722', description: 'Airbus Industrie A320-200n'},
    '723': {id: '723', description: 'A200-100 BD-500-1A10'},
    '724': {id: '724', description: 'A220-300 BD-500-1A11'},
    '725': {id: '725', description: 'Dassault Falcon 8x'},
    '730': {id: '730', description: 'McDonnell Douglas DC-10-10'},
    '731': {id: '731', description: 'McDonnell Douglas DC-10-20'},
    '732': {id: '732', description: 'McDonnell Douglas DC-10-30'},
    '733': {id: '733', description: 'McDonnell Douglas DC-10-40'},
    '735': {id: '735', description: 'McDonnell Douglas DC-10-30CF'},
    '737': {id: '737', description: 'Boeing 737 Max 7'},
    '740': {id: '740', description: 'McDonnell Douglas MD-11'},
    '745': {id: '745', description: 'Embraer Legacy 500'},
    '750': {id: '750', description: 'Gulfstream G650'},
    '751': {id: '751', description: 'Bombardier Global 7500 BD-7500'},
    '755': {id: '755', description: 'Embraer Legacy 600'},
    '760': {id: '760', description: 'Lockheed L-1011-1/100/200'},
    '765': {id: '765', description: 'Lockheed L-1011-500 Tristar'},
    '770': {id: '770', description: 'Dassault Falcon 900/900EX'},
    '771': {id: '771', description: 'Dassault Falcon 50'},
    '774': {id: '774', description: 'Dassault Falcon 2000'},
    '775': {id: '775', description: 'Dassault Falcon 7X'},
    '780': {id: '780', description: 'Tupolev TU-154'},
    '788': {id: '788', description: 'Bombardier Global 6000/Global Xrs'},
    '792': {id: '792', description: 'Yakolev Yak-42'},
    '800': {id: '800', description: 'Boeing 707-100'},
    '802': {id: '802', description: 'Boeing 707-100B'},
    '804': {id: '804', description: 'Boeing 707-200'},
    '806': {id: '806', description: 'Boeing 707-300'},
    '808': {id: '808', description: 'Boeing 707-300B'},
    '809': {id: '809', description: 'Boeing 707-300C'},
    '810': {id: '810', description: 'Boeing 707-400'},
    '812': {id: '812', description: 'Boeing 720-000'},
    '814': {id: '814', description: 'Boeing 720-000B'},
    '816': {id: '816', description: 'Boeing 747-100'},
    '817': {id: '817', description: 'Boeing 747-200/300'},
    '818': {id: '818', description: 'Boeing 747C'},
    '819': {id: '819', description: 'Boeing 747-400'},
    '820': {id: '820', description: 'Boeing 747-400F'},
    '821': {id: '821', description: 'Boeing B747-8'},
    '822': {id: '822', description: 'Boeing 747SP'},
    '823': {id: '823', description: 'Boeing 747-200F'},
    '824': {id: '824', description: 'Airbus A330-900neo'},
    '825': {id: '825', description: 'Convair 880 (CV-22/22m)'},
    '830': {id: '830', description: 'Convair 990 Coronado (CV-30)'},
    '833': {id: '833', description: 'Embraer Legacy 650'},
    '835': {id: '835', description: 'Avroliner RJ85'},
    '836': {id: '836', description: 'Airbus 350-1000'},
    '837': {id: '837', description: 'Boeing 787-10 Dreamliner'},
    '838': {id: '838', description: 'Boeing B737 Max 800'},
    '839': {id: '839', description: 'Boeing B737 Max 900'},
    '840': {id: '840', description: 'McDonnell Douglas DC-8-10'},
    '842': {id: '842', description: 'McDonnell Douglas DC-8-20'},
    '844': {id: '844', description: 'McDonnell Douglas DC-8-30'},
    '846': {id: '846', description: 'McDonnell Douglas DC-8-40'},
    '848': {id: '848', description: 'McDonnell Douglas DC-8-50'},
    '850': {id: '850', description: 'McDonnell Douglas DC-8-50F'},
    '851': {id: '851', description: 'McDonnell Douglas DC-8-61'},
    '852': {id: '852', description: 'McDonnell Douglas DC-8-63F'},
    '854': {id: '854', description: 'McDonnell Douglas DC-8-62'},
    '856': {id: '856', description: 'McDonnell Douglas DC-8-63'},
    '860': {id: '860', description: 'McDonnell Douglas DC-8-71'},
    '862': {id: '862', description: 'McDonnell Douglas DC-8-72'},
    '864': {id: '864', description: 'McDonnell Douglas DC-8-73'},
    '865': {id: '865', description: 'McDonnell Douglas DC-8-73F'},
    '866': {id: '866', description: 'British Aerospace BAe-146-100/RJ70'},
    '867': {id: '867', description: 'British Aerospace BAe-146-200'},
    '868': {id: '868', description: 'British Aerospace BAe-146-300'},
    '870': {id: '870', description: 'Lockheed Jetstar'},
    '871': {id: '871', description: 'Airbus Industrie A340-300'},
    '872': {id: '872', description: 'Airbus Industrie A340-500'},
    '873': {id: '873', description: 'Airbus Industrie A340-200'},
    '874': {id: '874', description: 'Airbus Industrie A340-600'},
    '875': {id: '875', description: 'Aerospatiale/British Aerospace Concorde'},
    '876': {id: '876', description: 'Ilyushin 62'},
    '877': {id: '877', description: 'Ilyushin 76/TD'},
    '878': {id: '878', description: 'Ilyushin 86'},
    '879': {id: '879', description: 'Ilyushin 96'},
    '880': {id: '880', description: 'Antonov 124'},
    '881': {id: '881', description: 'Ilyushiin Il-96-400t'},
    '882': {id: '882', description: 'Airbus Industrie A380-800'},
    '887': {id: '887', description: 'B787-800 Dreamliner'},
    '888': {id: '888', description: 'Boeing 737-900ER'},
    '889': {id: '889', description: 'B787-900 Dreamliner'},
    '890': {id: '890', description: 'Antonov 225 (6 Engine)'},
    '999': {id: '999', description: 'Used for capturing expenses not attributed to specific aircraft types'}
}
let aircraftCodes = Object.keys(aircraft)

module.exports = {
    states: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        for(let state of Object.keys(states)){
            test.states.incoming.push({
                state: state,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000)
            })
            test.states.outgoing.push({
                state: state,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }
        res.send(test.states)
    },

    //state
    state: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        test.state.state = ['IN', 'IL'][Math.floor(Math.random() * 2)]
        for(let a of Object.keys(airports)){
            airport = airports[a]
            if(airport.state == test.state.state){
                test.state.airports.push({
                    airport: {id: airport.id, name: airport.name, city: airport.city},
                    passenger: Math.floor(Math.random() * 1000000),
                    mail: Math.floor(Math.random() * 1000000),
                    freight: Math.floor(Math.random() * 1000000 )
                })
            }    
        }

        for(let a of Object.keys(airlines)){
            airline = airlines[a]
            test.state.airlines.push({
                airline: {id: airline.id, name: airline.name},
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }

        for(let i = 2018; i < 2021; i++){   
            test.state.annual.push({
                year: i, 
                passenger: 0,
                mail: 0,
                freight: 0  
            }) 
            let p, m , f = 0
            for(let j = 1; j < 13; j++){
                p = Math.floor(Math.random() * 1000000)
                m = Math.floor(Math.random() * 1000000)
                f = Math.floor(Math.random() * 1000000)
                test.state.monthly.push({
                    year: i,
                    month: j,
                    passenger: p,
                    mail: m,
                    freight: f          
                })    
                test.state.annual[i - 2018].passenger += p        
                test.state.annual[i - 2018].mail += m
                test.state.annual[i - 2018].freight += f    
            }    
        }
        res.send(test.state)
    },
    //airports
    airports: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        for(let a of Object.keys(airports)){
            let airport = airports[a]
            test.airports.incoming.push({
                airport: airport,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000)
            })
            test.airports.outgoing.push({
                airport: airport,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }
        res.send(test.airports)
    },
    //airport
    airport: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        test.airport.airport = airports[airportCodes[Math.floor(Math.random() * airportCodes.length)]]
        let incomingRoutes = generateRoutes(10 + Math.floor(Math.random() * 40), {destination:test.airport.airport})
        for(let route of incomingRoutes){
            test.airport.incoming.push({
                route: route, 
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })    
        }
        let outgoingRoutes = generateRoutes(10 + Math.floor(Math.random() * 40), {origin:test.airport.airport})
        for(let route of outgoingRoutes){
            test.airport.outgoing.push({
                route: route, 
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }

        for(let i = 2018; i < 2021; i++){   
            test.airport.annual.push({
                year: i, 
                passenger: 0,
                mail: 0,
                freight: 0  
            }) 
            let p, m , f = 0
            for(let j = 1; j < 13; j++){
                p = Math.floor(Math.random() * 1000000)
                m = Math.floor(Math.random() * 1000000)
                f = Math.floor(Math.random() * 1000000)
                test.airport.monthly.push({
                    year: i,
                    month: j,
                    passenger: p,
                    mail: m,
                    freight: f          
                })    
                test.airport.annual[i - 2018].passenger += p        
                test.airport.annual[i - 2018].mail += m
                test.airport.annual[i - 2018].freight += f    
            }    
        }
        res.send(test.airport)
    },

    //airlines
    airlines: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        for(let a in airlines){
            let airline = airlines[a]
            test.airlines.airlines.push({
                airline: airline,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }
        res.send(test.airlines)
    },

    //airline
    airline: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        test.airline.airline = airlines[airlineCodes[Math.floor(Math.random() * airlineCodes.length)]]
        let arlineRoutes = generateRoutes(10 + Math.floor(Math.random() * 40), {airline: test.airline.airline}) 
        for(let route of arlineRoutes){
            test.airline.routes.push({
                origin: route.origin,
                destination: route.destination, 
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 )
            })
        }
        for(let i = 2018; i < 2021; i++){   
            test.airline.annual.push({
                year: i, 
                passenger: 0,
                mail: 0,
                freight: 0  
            }) 
            let p, m , f = 0
            for(let j = 1; j < 13; j++){
                p = Math.floor(Math.random() * 1000000)
                m = Math.floor(Math.random() * 1000000)
                f = Math.floor(Math.random() * 1000000)
                test.airline.monthly.push({
                    year: i,
                    month: j,
                    passenger: p,
                    mail: m,
                    freight: f          
                })    
                test.airline.annual[i - 2018].passenger += p        
                test.airline.annual[i - 2018].mail += m
                test.airline.annual[i - 2018].freight += f    
            }    
        }
        res.send(test.airline)
    },

    //routes
    routes: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        let routes = generateRoutes(10 + Math.floor(Math.random() * 60)) 
        for(let route of routes){
            test.routes.routes.push({
                airline: route.airline,
                origin: route.origin,
                destination: route.destination,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 ),
                distance: Math.floor(Math.random() * 100000 )
            })
        }
        res.send(test.routes)
    },

    //route
    route: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        test.route.route = generateRoutes(1)[0]
        for(let i = 2018; i < 2021; i++){   
            test.route.annual.push({
                year: i, 
                passenger: 0,
                mail: 0,
                freight: 0, 
                airtime: 0
            }) 
            let p, m , f, a= 0
            for(let j = 1; j < 13; j++){
                p = Math.floor(Math.random() * 1000000)
                m = Math.floor(Math.random() * 1000000)
                f = Math.floor(Math.random() * 1000000)
                a = Math.floor(Math.random() * 10000)
                test.route.monthly.push({
                    year: i,
                    month: j,
                    passenger: p,
                    mail: m,
                    freight: f   ,
                    airtime: a       
                })    
                test.route.annual[i - 2018].passenger += p        
                test.route.annual[i - 2018].mail += m
                test.route.annual[i - 2018].freight += f    
                test.route.annual[i - 2018].airtime += a 
            }    
        }
        res.send(test.route)
    },
    aircrafts: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        for(let a in aircraft){
            test.aircrafts.aircraft.push({
                aircraft: aircraft[a],
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 ),
                airtime: Math.floor(Math.random() * 10000 )
            })    
        }
        res.send(test.aircrafts)
    },

    //aircraft
    aircraft: (req, res) => {
        test = {
            states:{
                incoming:[],
                outgoing:[]
            },
            state:{
                state: '',
                airports:[], 
                airlines:[], 
                annual:[], 
                monthly:[]
            },
            airports:{
                incoming:[],
                outgoing:[]
            },
            airport:{
                airport: {id: '', name: '', city: '', state: ''},
                incoming:[],
                outgoing:[],
                annual:[],
                monthly:[]
            },
            airlines:{
                airlines:[]
            }, 
            airline: {
                airline: {id: '', name: '', country: ''},
                routes:[],
                annual:[], 
                monthly:[]
            },
            routes:{
                routes:[]
            },
            route:{
                route: {
                    origin: {id: '', name: '', city: ''},
                    destination: {id: '', name: '', city: ''},
                    airline: {id: '', name: ''}
                },
                annual:[], 
                monthly:[]
            },
            aircrafts:{
                aircraft:[]
            },
            aircraft:{
                aircraft: {id: '', description: ''},
                routes:[], 
                annual:[], 
                monthly:[]
            }
        }
        test.aircraft.aircraft = aircraft[aircraftCodes[Math.floor(Math.random() * aircraftCodes.length)]]
        let aircraftRoutes = generateRoutes(5 + Math.floor(Math.random() * 20))
        for(let route of aircraftRoutes){
            test.aircraft.routes.push({
                airline: route.airline,
                origin: route.origin, 
                destination: route.destination,
                passenger: Math.floor(Math.random() * 1000000),
                mail: Math.floor(Math.random() * 1000000),
                freight: Math.floor(Math.random() * 1000000 ),
                distance: Math.floor(Math.random() * 10000 )
            })
        }
        for(let i = 2018; i < 2021; i++){   
            test.aircraft.annual.push({
                year: i, 
                passenger: 0,
                mail: 0,
                freight: 0, 
                airtime: 0
            }) 
            let p, m , f, a= 0
            for(let j = 1; j < 13; j++){
                p = Math.floor(Math.random() * 1000000)
                m = Math.floor(Math.random() * 1000000)
                f = Math.floor(Math.random() * 1000000)
                a = Math.floor(Math.random() * 10000)
                test.aircraft.monthly.push({
                    year: i,
                    month: j,
                    passenger: p,
                    mail: m,
                    freight: f,
                    airtime: a       
                })    
                test.aircraft.annual[i - 2018].passenger += p        
                test.aircraft.annual[i - 2018].mail += m
                test.aircraft.annual[i - 2018].freight += f    
                test.aircraft.annual[i - 2018].airtime += a 
            }    
        }
        res.send(test.aircraft)
    }
}