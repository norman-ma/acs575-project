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
    'RI': 'Rhode Island',
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
    'WV': 'West Virginia',
    'WY': 'Wyoming'
}

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

const units = {
    'passenger': 'passengers',
    'passengers': 'passengers',
    'mail': 'lbs',
    'freight': 'lbs',
    'distance': 'miles',
    'airtime': 'hrs'
}

let parseDescription = (desc) => {
    return {name: desc.split('(')[0], notes: desc.match(/\(.*\)/) ? desc.match(/\(.*\)/)[0] : ''}
}

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

const app = angular.module('DashboardApp', ['ngRoute', 'chart.js'])

app.config((function (ChartJsProvider) {
    ChartJsProvider.setOptions({ 
        chartColors : [ '#235789', '#F1D302', '#C1292E', '#F5F5F5',  '#D183C9', '#57A773', 'FF9F1C'], 
        font: {
            size: 20
        },
        elements: {
            point: {
                radius: 5
            }
        },
        responsive: true
    })

    ChartJsProvider.setOptions('radar', {
        scale:{
            gridLines:{
                circular: true,
                color: '#F5F5F5'
            },
            ticks:{
                backdropColor: '#1F2333',
                fontColor: '#F5F5F5',
                callback: (value, index, values) => `${value/1000000000}B`
            },
            pointLabels:{
                fontColor: '#F5F5F5',
                fontSize: 12
            }
        }
    })

    ChartJsProvider.setOptions('bar', {
        scales:{
            yAxes: [{
                gridLines: {
                    zeroLineColor: '#F5F5F5'                    
                },                
                ticks:{
                    fontColor: '#F5F5F5',
                    callback: (value, index, values) => `${value/1000000}M`
                }
            }],
            xAxes: [{
                gridLines: {
                    zeroLineColor: '#F5F5F5'                    
                },
                ticks:{
                    fontColor: '#F5F5F5'
                }
            }],         
        }
    })

    ChartJsProvider.setOptions('line', {
        scales:{
            yAxes: [{
                gridLines: {
                    display: false,
                    zeroLineColor: '#F5F5F5'
                },
                ticks:{
                    fontColor: '#E0E0E0'
                }
            }],
            xAxes: [{
                ticks:{
                    fontColor: '#E0E0E0',
                    zeroLineColor: '#F5F5F5'
                }
            }]           
        }
    })
    

  }))

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: '/templates/index.htm',
            controller: 'HomeController'
        })
        .when("/states", {
            templateUrl: '/templates/display.htm',
            controller: 'StatesController'
        })
        .when("/states/:state", {
            templateUrl: '/templates/display.htm',
            controller: 'StateController'
        })
        .when("/airports", {
            templateUrl: '/templates/display.htm',
            controller: 'AirportsController'
        })
        .when("/airports/:airport", {
            templateUrl: '/templates/display.htm',
            controller: 'AirportController'
        })
        .when("/airlines", {
            templateUrl: '/templates/display.htm',
            controller: 'AirlinesController'
        })
        .when("/airlines/:airline", {
            templateUrl: '/templates/display.htm',
            controller: 'AirlineController'
        })
        .when("/routes", {
            templateUrl: '/templates/display.htm',
            controller: 'RoutesController'
        })
        .when("/routes/:origin/:destination/:airline", {
            templateUrl: '/templates/display.htm',
            controller: 'RouteController'
        })
        .when("/aircraft", {
            templateUrl: '/templates/display.htm',
            controller: 'AircraftController'
        })
        .when("/aircraft/:aircraft", {
            templateUrl: '/templates/display.htm',
            controller: 'CraftController'
        })
        .when("/compare", {
            templateUrl: '/templates/compare.htm'
        })
        .when("/import", {
            templateUrl: '/templates/import.htm'
        })
        .when('/manage',{
            templateUrl: '/templates/manage.htm'
        })
})

app.controller('AppController', ['$http', '$rootScope', function( $http, $rootScope){
    
    $rootScope.lists = {
        states: [],
        airports: [],
        airlines: [],
        routes: [], 
        aircraft: []
    }        

    $rootScope.init = () => {
        $http
        .get('/init')
        .then((result)=>{
            if(result.status !== 200){
                console.error(result.statusText)
                return
            }

            let res = result.data
            if(res){
                $rootScope.lists = res 
            }
        })
    }
    $rootScope.init()
}])

app.controller('SearchController', ['$scope', function($scope){
    $scope.suggestions = []
    $scope.current = {
        name: "",
        value: ""
    }

    $scope.updateSuggestions = () => {
        if($scope.current.name.length < 2){
            $scope.suggestions = []
            return
        }
        let values = $.extend([], $scope.$parent.values)
        $scope.suggestions = values.filter((value) => value.name.toUpperCase().search(new RegExp($scope.current.name.toUpperCase())) >= 0)
    }

    $scope.updateSearchBar = (suggestion) => {  
        $scope.current = suggestion 
        $scope.suggestions = []
    }
}])

app.controller('HomeController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    
    $scope.states = 0
    $scope.airports = $rootScope.lists.airports.length
    $scope.airlines = $rootScope.lists.airlines.length
    $scope.routes = $rootScope.lists.routes.length
    $scope.aircraft = $rootScope.lists.aircraft.length

    $rootScope.$watch('lists', (newVal, oldVal) => {
        $scope.airports = newVal.airports.length
        $scope.airlines = newVal.airlines.length
        $scope.routes = newVal.routes.length
        $scope.aircraft = newVal.aircraft.length
    })

    $http
    .get('/overview')
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }

        let res = result.data
        if(res){
            $scope.states = res.states

            let labels = Object.keys(res)
            labels.splice(labels.indexOf('states'), 1)
            labels.splice(labels.indexOf('freight'), 1)

            let values = labels.map((value) => res[value])

            let min = Math.min(...values) * 0.66

            $scope.insight = {
                chart: {
                    labels: labels,
                    series: ['A'],
                    colors: ['#235789'],
                    data: [values], 
                    override: {
                        fill: true
                    }, 
                    options: {
                        scale: {
                            ticks: {
                                min: min
                            }
                        },
                        tooltips: {
                            callbacks: {
                                label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} `
                            }
                        }
                    }
                }
            }
        }
    })
}])

app.controller('StatesController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.title = 'States'
    $scope.values =  $rootScope.lists.states
    $scope.insights = []
    $scope.trends = []
    $scope.error = ''
    $scope.category = 'State'

    $scope.search = (value) => $location.path(`/states/${value}`)
    
    $http
    .get('/state/overview')
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.insights = [
                {description: "Most popular states for incoming passengers", elements: []},
                {description: "Most popular states for incoming mail", elements: []},
                {description: "Most popular states for incoming freight", elements: []},
                {description: "Most popular states for outgoing passengers", elements: []},
                {description: "Most popular states for outgoing mail", elements: []},
                {description: "Most popular states for outgoing freight", elements: []}
            ]    
            for(let state of res.incoming){
                $scope.insights[0].elements.push({name: states[state.state], value: state.passenger, link: `/#!states/${state.state}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: states[state.state], value: state.mail, link: `/#!states/${state.state}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: states[state.state], value: state.freight, link: `/#!states/${state.state}`, unit: 'lbs'})
            }
            for(let state of res.outgoing){
                $scope.insights[3].elements.push({name: states[state.state], value: state.passenger, link: `/#!states/${state.state}`, unit: 'passengers'})
                $scope.insights[4].elements.push({name: states[state.state], value: state.mail, link: `/#!states/${state.state}`, unit: 'lbs'})
                $scope.insights[5].elements.push({name: states[state.state], value: state.freight, link: `/#!states/${state.state}`, unit: 'lbs'})
            }

            for(let i = 0; i < 6; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            }   
        }
    })    
}])

app.controller('StateController', ['$scope', '$http', '$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){
    $scope.values = $rootScope.lists.states
    $scope.insights = []
    $scope.trends = []
    $scope.charts = []
    $scope.error = ''
    $scope.category = 'State'

    $scope.search = (value) => $location.path(`/states/${value}`)
    $scope.updateDimensions = (index) => {
        $(`#trend-${index} canvas`)[0].width = $scope.trends[index].chart.width
        $(`#trend-${index} canvas`)[0].height = $scope.trends[index].chart.height
    }
    
    $http
    .get(`/state/${$routeParams.state}`)
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        $scope.title = states[res.state]
        if(res){
            $scope.insights = [
                {description: "Most popular airports in the state for passengers", elements: []},                
                {description: "Most popular airports in the state for mail", elements: []},                
                {description: "Most popular airports in the state for freight", elements: []},
                {description: "Most popular airlines in the state for passengers", elements: []},
                {description: "Most popular airlines in the state for mail", elements: []},
                {description: "Most popular airlines in the state for freight", elements: []}
            ]    
            for(let airport of res.airports){
                $scope.insights[0].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}`, value: airport.passenger, link: `/#!airports/${airport.airport.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}`, value: airport.mail, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}`, value: airport.freight, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
            }
            for(let airline of res.airlines){
                $scope.insights[3].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.passenger, link: `/#!airlines/${airline.airline.id}`, unit: 'passengers'})
                $scope.insights[4].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.mail, link: `/#!airlines/${airline.airline.id}`, unit: 'lbs'})
                $scope.insights[5].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.freight, link: `/#!airlines/${airline.airline.id}`, unit: 'lbs'})
            }

            for(let i = 0; i < 6; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            } 
            
            $scope.trends.bar = [
                {description: "Annual Passengers 2018 - 2020", chart: {labels:[], data: [], options: {tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Annual Mail 2018 - 2020", chart: {labels:[], data: [], options: {tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Annual Freight 2018 - 2020", chart: {labels:[], data: [], options: { tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}}
            ]
            for(let year of res.annual){
                $scope.trends.bar[0].chart.labels.push(`${year.year}`)
                $scope.trends.bar[0].chart.data.push(year.passenger)
                $scope.trends.bar[1].chart.labels.push(`${year.year}`)
                $scope.trends.bar[1].chart.data.push(year.mail)
                $scope.trends.bar[2].chart.labels.push(`${year.year}`)
                $scope.trends.bar[2].chart.data.push(year.freight)
            }

            $scope.trends.line = [
                {description: "Monthly Passengers 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], override: {type: 'line', fill: false, borderWidth:3}, options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K lbs`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Monthly Mail 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Monthly Freight 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
            ]

            for(let month of res.monthly){
                $scope.trends.line[0].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[0].chart.data[0].push(month.passenger)
                $scope.trends.line[1].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[1].chart.data[0].push(month.mail)
                $scope.trends.line[2].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[2].chart.data[0].push(month.freight)
            }
        }
    })    
}])

app.controller('AirportsController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    $scope.title = 'Airports'
    $scope.values = $rootScope.lists.airports
    $scope.insights = []
    $scope.trends = []
    $scope.error = ''
    $scope.category = 'Airport'
    
    $scope.search = (value) => $location.path(`/airports/${value}`)
    
    $http
    .get('/airport/overview')
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.insights = [
                {description: "Most popular destination airport for incoming passengers", elements: []},
                {description: "Most popular destination airport for incoming mail", elements: []},
                {description: "Most popular destination airport for incoming freight", elements: []},
                {description: "Most popular origin airport for outgoing passengers", elements: []},
                {description: "Most popular origin airport for outgoing mail", elements: []},
                {description: "Most popular origin airport for outgoing freight", elements: []}
            ]    
            for(let airport of res.incoming){
                $scope.insights[0].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.passenger, link: `/#!airports/${airport.airport.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.mail, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.freight, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
            }
            for(let airport of res.outgoing){
                $scope.insights[3].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.passenger, link: `/#!airports/${airport.airport.id}`, unit: 'passengers'})
                $scope.insights[4].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.mail, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
                $scope.insights[5].elements.push({name: `${airport.airport.id} ${airport.airport.name}, ${airport.airport.city}, ${airport.airport.state}`, value: airport.freight, link: `/#!airports/${airport.airport.id}`, unit: 'lbs'})
            }

            for(let i = 0; i < 6; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            }   
        }
    })    
}])

app.controller('AirportController', ['$scope', '$http', '$routeParams', '$location', '$rootScope', '$sce', function($scope, $http, $routeParams, $location, $rootScope, $sce){

   $scope.values = $rootScope.lists.airports
    $scope.insights = []
    $scope.trends = []
    $scope.charts = []
    $scope.error = ''
    $scope.category = 'Airport'
    
    $scope.search = (value) => $location.path(`/airports/${value}`)
    $scope.coords ={
        latitude: null, 
        longitude: null
    }
    $scope.mapUrl = null;

    $http
    .get('/apikey')
    .then((key) => {
        $scope.apikey = key.data;  
    
        $http
        .get(`/airport/${$routeParams.airport}`)
        .then((result) => {
            if(result.status !== 200){
                console.error(result.statusText)
                return
            }
            let res = result.data
            if(res){
                let airport = res.airport

                $scope.title = `${airport.id} ${airport.name}`
                $scope.subtitle = `${airport.city}, ${airport.state}`
                $scope.coords.latitude = airport.latitude
                $scope.coords.longitude = airport.longitude

                $scope.mapUrl = $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/view?key=${$scope.apikey}&center=${$scope.coords.latitude}, ${$scope.coords.longitude}&zoom=14&maptype=satellite`)

                $scope.insights = [
                    {description: "Most popular incoming route for passengers", elements: []},                
                    {description: "Most popular incoming route for mail", elements: []},                
                    {description: "Most popular incoming route for freight", elements: []},
                    {description: "Most popular outgoing route for passengers", elements: []},
                    {description: "Most popular outgoing route for mail", elements: []},
                    {description: "Most popular outgoing route for freight", elements: []}
                ]    
                for(let route of res.incoming){
                    $scope.insights[0].elements.push({name: `${route.route.airline.id}: ${route.route.origin.id} to ${airport.id}`, value: route.passenger, link: `/#!routes/${route.route.origin.id}/${airport.id}/${route.route.airline.id}`, unit: 'passengers'})
                    $scope.insights[1].elements.push({name: `${route.route.airline.id}: ${route.route.origin.id} to ${airport.id}`, value: route.mail, link: `/#!routes/${route.route.origin.id}/${airport.id}/${route.route.airline.id}`, unit: 'lbs'})
                    $scope.insights[2].elements.push({name: `${route.route.airline.id}: ${route.route.origin.id} to ${airport.id}`, value: route.freight, link: `/#!routes/${route.route.origin.id}/${airport.id}/${route.route.airline.id}`, unit: 'lbs'})
                }
                for(let route of res.outgoing){
                    $scope.insights[3].elements.push({name: `${route.route.airline.id}: ${airport.id} to ${route.route.destination.id}`, value: route.passenger, link: `/#!routes/${airport.id}/${route.route.destination.id}/${route.route.airline.id}`, unit: 'passengers'})
                    $scope.insights[4].elements.push({name: `${route.route.airline.id}: ${airport.id} to ${route.route.destination.id}`, value: route.mail, link: `/#!routes/${airport.id}/${route.route.destination.id}/${route.route.airline.id}`, unit: 'lbs'})
                    $scope.insights[5].elements.push({name: `${route.route.airline.id}: ${airport.id} to ${route.route.destination.id}`, value: route.freight, link: `/#!routes/${airport.id}/${route.route.destination.id}/${route.route.airline.id}`, unit: 'lbs'})
                }

                for(let i = 0; i < 6; i++){
                    $scope.insights[i].elements.sort((a, b) => b.value - a.value)
                } 

                $scope.trends.bar = [
                    {description: "Annual Passengers 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                    {description: "Annual Mail 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Annual Freight 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                ]
                for(let year of res.annual){
                    $scope.trends.bar[0].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[0].chart.data.push(year.passenger)
                    $scope.trends.bar[1].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[1].chart.data.push(year.mail)
                    $scope.trends.bar[2].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[2].chart.data.push(year.freight)
                }

                $scope.trends.line = [
                    {description: "Monthly Passengers 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], override: {type: 'line', fill: false, borderWidth:3}, options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K lbs`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                    {description: "Monthly Mail 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Monthly Freight 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                ]

                for(let month of res.monthly){
                    $scope.trends.line[0].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[0].chart.data[0].push(month.passenger)
                    $scope.trends.line[1].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[1].chart.data[0].push(month.mail)
                    $scope.trends.line[2].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[2].chart.data[0].push(month.freight)
                }             
            }
        })   
    }) 
}])

app.controller('AirlinesController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    $scope.values = $rootScope.lists.airlines
    $scope.insights = []
    $scope.trends = []
    $scope.error = ''
    $scope.category = 'Airline'

    $scope.title = 'Airlines'
    $scope.search = (value) => $location.path(`/airlines/${value}`)
    
    $http
    .get('/airline/overview')
    .then((result) => {        
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.insights = [
                {description: "Most popular airlines for passengers", elements: []},
                {description: "Most popular airlines for mail", elements: []},
                {description: "Most popular airlines for freight", elements: []}
            ]    
            for(let airline of res.airlines){
                $scope.insights[0].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.passenger, link: `/#!airlines/${airline.airline.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.mail, link: `/#!airlines/${airline.airline.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${airline.airline.id} ${airline.airline.name}`, value: airline.freight, link: `/#!airlines/${airline.airline.id}`, unit: 'lbs'})
            }

            for(let i = 0; i < 3; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            }   
        }
    })    
}])

app.controller('AirlineController', ['$scope', '$http', '$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){

    $scope.values = $rootScope.lists.airlines
    $scope.insights = []
    $scope.trends = []
    $scope.charts = []
    $scope.error = ''
    $scope.category = 'Airline'

    $scope.search = (value) => $location.path(`/airlines/${value}`)
    
    $http
    .get(`/airline/${$routeParams.airline}`)
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            let airline = res.airline

            $scope.title = `${airline.id} ${airline.name}`
            $scope.subtitle = `${airline.country} | Alias: ${airline.alias === '' ? 'N/A' : airline.alias} | Callsign: ${airline.callsign === '' ? 'N/A' : airline.callsign}`

            $scope.insights = [
                {description: "Most popular routes for passengers", elements: []},                
                {description: "Most popular routes for mail", elements: []},                
                {description: "Most popular routes for freight", elements: []}
            ]    
            for(let route of res.routes){
                $scope.insights[0].elements.push({name: `${airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.passenger, link: `/#!routes/${route.origin.id}/${route.destination.id}/${airline.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.mail, link: `/#!routes/${route.origin.id}/${route.destination.id}/${airline.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.freight, link: `/#!routes/${route.origin.id}/${route.destination.id}/${airline.id}`, unit: 'lbs'})
            }

            for(let i = 0; i < 3; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            } 
            
            $scope.trends.bar = [
                {description: "Annual Passengers 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Annual Mail 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Annual Freight 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
            ]
            for(let year of res.annual){
                $scope.trends.bar[0].chart.labels.push(`${year.year}`)
                $scope.trends.bar[0].chart.data.push(year.passenger)
                $scope.trends.bar[1].chart.labels.push(`${year.year}`)
                $scope.trends.bar[1].chart.data.push(year.mail)
                $scope.trends.bar[2].chart.labels.push(`${year.year}`)
                $scope.trends.bar[2].chart.data.push(year.freight)
            }

            $scope.trends.line = [
                {description: "Monthly Passengers 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], override: {type: 'line', fill: false, borderWidth:3}, options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K lbs`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Monthly Mail 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Monthly Freight 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
            ]

            for(let month of res.monthly){
                $scope.trends.line[0].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[0].chart.data[0].push(month.passenger)
                $scope.trends.line[1].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[1].chart.data[0].push(month.mail)
                $scope.trends.line[2].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[2].chart.data[0].push(month.freight)
            }
        }         
    })    
}])

app.controller('RoutesController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    $scope.values = $rootScope.lists.routes
    $scope.insights = []
    $scope.trends = []
    $scope.error = ''
    $scope.category = 'Route'

    $scope.title = 'Routes'
    $scope.search = (value) => {
        let values = value.split(':')
        $location.path(`/routes/${values[0]}/${values[1]}/${values[2]}`)
    }    
    
    $http
    .get('/route/overview')
    .then((result) => {        
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.insights = [
                {description: "Most popular routes for passengers", elements: []},
                {description: "Most popular routes for mail", elements: []},
                {description: "Most popular routes for freight", elements: []},
                {description: "Longest routes", elements: []}
            ]    
            for(let route of res.routes){
                $scope.insights[0].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.passenger, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.mail, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.freight, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'lbs'})
                $scope.insights[3].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.distance, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'miles'})
            }

            for(let i = 0; i < 4; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            }   
        }
    })    
}])

app.controller('RouteController', ['$scope', '$http', '$routeParams', '$location', '$rootScope', '$sce', function($scope, $http, $routeParams, $location, $rootScope, $sce){

    $scope.values = $rootScope.lists.routes
    $scope.insights = []
    $scope.trends = []
    $scope.charts = []
    $scope.category = 'Route'

    $scope.search = (values) => {
        values = $('#search-bar')[0].name.split(':')
        $location.path(`/routes/${values[0]}/${values[1]}/${values[2]}`)
    }

    $scope.coords ={
        origin: {
            latitude: null, 
            longitude: null
        },
        destination: {
            latitude: null, 
            longitude: null
        }
    }
    $scope.mapUrl = null;

    $http
    .get('/apikey')
    .then((key) => {
        $scope.apikey = key.data; 
    
        $http
        .get(`/route/${$routeParams.origin}/${$routeParams.destination}/${$routeParams.airline}`)
        .then((result) => {
            if(result.status !== 200){
                console.error(result.statusText)
                return
            }
            let res = result.data
            if(res){
                $scope.title = `${res.route.airline.id}: ${res.route.origin.id} to ${res.route.destination.id}`
                $scope.subtitle = `${res.route.airline.name}: ${res.route.origin.name}, ${res.route.origin.city} to ${res.route.destination.name}, ${res.route.destination.city}`
                                
                $scope.coords.origin = {
                    latitude: res.route.origin.latitude,
                    longitude: res.route.origin.longitude,
                }
                $scope.coords.destination = {
                    latitude: res.route.destination.latitude,
                    longitude: res.route.destination.longitude,
                }

                $scope.mapUrl = $sce.trustAsResourceUrl(`https://www.google.com/maps/embed/v1/directions?key=${$scope.apikey}&origin=${$scope.coords.origin.latitude}, ${$scope.coords.origin.longitude}&destination=${$scope.coords.destination.latitude}, ${$scope.coords.destination.longitude}&mode=flying&zoom=6&maptype=satellite`)

                $scope.trends.bar = [
                    {description: "Annual Passengers 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                    {description: "Annual Mail 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Annual Freight 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Annual Airtime 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value.toLocaleString()}`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} mins`}}}}},
                ]
                for(let year of res.annual){
                    $scope.trends.bar[0].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[0].chart.data.push(year.passenger)
                    $scope.trends.bar[1].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[1].chart.data.push(year.mail)
                    $scope.trends.bar[2].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[2].chart.data.push(year.freight)
                    $scope.trends.bar[3].chart.labels.push(`${year.year}`)
                    $scope.trends.bar[3].chart.data.push(year.airtime)
                }

                $scope.trends.line = [
                    {description: "Monthly Passengers 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], override: {type: 'line', fill: false, borderWidth:3}, options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K lbs`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                    {description: "Monthly Mail 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Monthly Freight 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                    {description: "Monthly Airtime 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value.toLocaleString()}`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} mins`}}}}}
                ]

                for(let month of res.monthly){
                    $scope.trends.line[0].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[0].chart.data[0].push(month.passenger)
                    $scope.trends.line[1].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[1].chart.data[0].push(month.mail)
                    $scope.trends.line[2].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[2].chart.data[0].push(month.freight)
                    $scope.trends.line[3].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                    $scope.trends.line[3].chart.data[0].push(month.airtime)
                }       
            }     
        })
    })    
}])

app.controller('AircraftController', ['$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){

    $scope.values = $rootScope.lists.aircraft
    $scope.insights = []
    $scope.trends = []
    $scope.error = ''
    $scope.category = 'Aircraft'

    $scope.title = 'Aircraft'
    $scope.search = (value) => $location.path(`/aircraft/${value}`)
    
    $http
    .get('/aircraft/overview')
    .then((result) => {        
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.insights = [
                {description: "Most popular aircraft for passengers", elements: []},
                {description: "Most popular aircraft for mail", elements: []},
                {description: "Most popular aircraft for freight", elements: []},
                {description: "Aircraft with the most airtime", elements: []}
            ]    
            for(let aircraft of res.aircraft){
                $scope.insights[0].elements.push({name: `${parseDescription(aircraft.aircraft.description).name}`, value: aircraft.passenger, link: `/#!aircraft/${aircraft.aircraft.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${parseDescription(aircraft.aircraft.description).name}`, value: aircraft.mail, link: `/#!aircraft/${aircraft.aircraft.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${parseDescription(aircraft.aircraft.description).name}`, value: aircraft.freight, link: `/#!aircraft/${aircraft.aircraft.id}`, unit: 'lbs'})
                $scope.insights[3].elements.push({name: `${parseDescription(aircraft.aircraft.description).name}`, value: aircraft.airtime / 60, link: `/#!aircraft/${aircraft.aircraft.id}`, unit: 'hours'})
            }

            for(let i = 0; i < 4; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            }   
        }
    })    
}])

app.controller('CraftController', ['$scope', '$http', '$routeParams', '$location', '$rootScope', function($scope, $http, $routeParams, $location, $rootScope){

    $scope.values = $rootScope.lists.aircraft
    $scope.insights = []
    $scope.trends = []
    $scope.charts = []
    $scope.error = ''
    $scope.category = 'Aircraft'

    $scope.search = (value) => $location.path(`/aircraft/${value}`)
    
    
    $http
    .get(`/aircraft/${$routeParams.aircraft}`)
    .then((result) => {
        if(result.status !== 200){
            console.error(result.statusText)
            return
        }
        let res = result.data
        if(res){
            $scope.title = `${res.aircraft.id} ${parseDescription(res.aircraft.description).name}`
            $scope.subtitle = parseDescription(res.aircraft.description).notes

            $scope.insights = [
                {description: "Most popular routes for passengers", elements: []},                
                {description: "Most popular routes for mail", elements: []},                
                {description: "Most popular routes for freight", elements: []},
                {description: "Longest routes", elements: []}
            ]    
            for(let route of res.routes){
                $scope.insights[0].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.passenger, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'passengers'})
                $scope.insights[1].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.mail, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'lbs'})
                $scope.insights[2].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.freight, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'passengers'})
                $scope.insights[3].elements.push({name: `${route.airline.id}: ${route.origin.id} to ${route.destination.id}`, value: route.distance, link: `/#!routes/${route.origin.id}/${route.destination.id}/${route.airline.id}`, unit: 'miles'})
            }

            for(let i = 0; i < 4; i++){
                $scope.insights[i].elements.sort((a, b) => b.value - a.value)
            } 
            
            $scope.trends.bar = [
                {description: "Annual Passengers 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Annual Mail 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Annual Freight 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Annual Airtime 2018 - 2020", chart: {labels:[], data: [], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} mins`}}}}},
            ]
            for(let year of res.annual){
                $scope.trends.bar[0].chart.labels.push(`${year.year}`)
                $scope.trends.bar[0].chart.data.push(year.passenger)
                $scope.trends.bar[1].chart.labels.push(`${year.year}`)
                $scope.trends.bar[1].chart.data.push(year.mail)
                $scope.trends.bar[2].chart.labels.push(`${year.year}`)
                $scope.trends.bar[2].chart.data.push(year.freight)
                $scope.trends.bar[3].chart.labels.push(`${year.year}`)
                $scope.trends.bar[3].chart.data.push(year.airtime)
            }

            $scope.trends.line = [
                {description: "Monthly Passengers 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], override: {type: 'line', fill: false, borderWidth:3}, options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000}K lbs`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} passengers`}}}}},
                {description: "Monthly Mail 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Monthly Freight 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} lbs`}}}}},
                {description: "Monthly Airtime 2018 - 2020", chart: {labels:[], data: [[]], series: ['0'], options: {scales: {yAxes: [{ticks: {callback: (value, index, values) => {return `${value/1000000}M`}}}]}, tooltips: {callbacks: {label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} mins`}}}}}
            ]

            for(let month of res.monthly){
                $scope.trends.line[0].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[0].chart.data[0].push(month.passenger)
                $scope.trends.line[1].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[1].chart.data[0].push(month.mail)
                $scope.trends.line[2].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[2].chart.data[0].push(month.freight)
                $scope.trends.line[3].chart.labels.push(`${months[month.month - 1]} ${month.year}`)
                $scope.trends.line[3].chart.data[0].push(month.airtime)
            }    
        }         
    })    
}])

app.controller('ComparisonController', ['$scope', '$rootScope', '$location', '$http', function($scope, $rootScope, $location, $http){
    $scope.categories = [
        {name: 'State', value: $rootScope.lists.states, getRoute: (value) => `/state/${value}`, getName: (value) => value},
        {name: 'Airport', value: $rootScope.lists.airports, getRoute: (value) => `/airport/${value}`, getName: (value) => value.id},
        {name: 'Airline', value: $rootScope.lists.airlines, getRoute: (value) => `/airline/${value}`, getName: (value) => value.id},
        {
            name: 'Route', 
            value: $rootScope.lists.routes,
            getRoute: (value) => {
                let values = value.split(':')
                return `/route/${values[0]}/${values[1]}/${values[2]}`
            },
            getName: (value) => `${value.airline.id}: ${value.origin.id} to ${value.destination.id}`
        },
        {name: 'Aircraft', value: $rootScope.lists.aircraft, getRoute: (value) => `/aircraft/${value}`, getName: (value) => parseDescription(value.description).name}
    ]    

    $scope.currentCategory = null

    $scope.suggestions = [[], []]
    $scope.current = [
        {name: "", value: ""},
        {name: "", value: ""}
    ]

    $scope.insight = {}
    $scope.trends = []

    $scope.updateSuggestions = (index) => {
        if($scope.current[index]){
            if($scope.current[index].name.length < 2){
                $scope.suggestions[index] = []
                return
            }
            let values = $.extend([], $scope.currentCategory.value)
            $scope.suggestions[index] = values.filter((value) => value.name.toUpperCase().search(new RegExp($scope.current[index].name.toUpperCase())) >= 0)
        }
    }

    $scope.updateSearchBar = (index, suggestion) => {  
        $scope.current[index] = suggestion 
        $scope.suggestions = []
    }

    $scope.compare = async () => {
    
        $scope.insight = {}
        $scope.trends = []

        let data = [
            await $http.get(`${$scope.currentCategory.getRoute($scope.current[0].value)}`),
            await $http.get(`${$scope.currentCategory.getRoute($scope.current[1].value)}`)
        ]

        $scope.title = `${$scope.current[0].name} vs ${$scope.current[1].name}`

        let series = []

        let insights = [null, null]

        series.push($scope.currentCategory.getName(data[0].data[$scope.currentCategory.name.toLowerCase()]))
        series.push($scope.currentCategory.getName(data[1].data[$scope.currentCategory.name.toLowerCase()]))    

        for(let i = 0; i < 2; i++){
            for(field in data[i].data){
                if(field != 'annual' && field != 'monthly' && field != $scope.currentCategory.name.toLowerCase()){
                    insights[i] = $scope.parse(data[i].data[field])
                }
            }            
        }

        if(insights[0]){
            let description = ''
            for(let i = 0; i < insights[0].labels.length; i++){
                let label = insights[0].labels[i]
                if(i === insights[0].labels.length - 1){
                    description += ` & `
                }else  if(i !== 0){               
                    description += `, `
                }
                description += `${titleCase(label)}`
            }
            description += ' 2018 - 2020'

            let max = 0
            for(let i of insights){
                if(max < Math.max(...i.values)){
                    max = Math.max(...i.values)
                }
            }
            let min = 0 - max/2
            $scope.insight = {
                description: description, 
                chart: {
                    series: series,
                    labels: insights[0].labels.map((value) => `${value} (${units[value]})`),
                    data: [
                        insights[0].values,
                        insights[1].values
                    ], 
                    override: {
                        //type: 'radar',
                        fill: false
                        //borderWidth:3
                    }, 
                    options: {
                        scale: {
                            ticks: {
                                min: min
                            }
                        },
                        tooltips: {
                            callbacks: {
                                label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} `
                            }
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            }
        }else{
            $scope.insight = null
        }

        let trends = $scope.parse(data[0].data.annual).labels
        let trendData = [
            {
                annual: data[0].data.annual,
                monthly: data[0].data.monthly
            },
            {
                annual: data[1].data.annual,
                monthly: data[1].data.monthly
            }
        ]
        for(let period of ['annual', 'monthly']){
            for(let i = 0; i < trends.length; i++){
                let unit = ''
                let trendName = trends[i]
                let trend = {
                    description: "",
                    chart: {
                        labels:[], 
                        series: series,
                        data: [
                            [],
                            []
                        ], 
                        override: {
                            type: 'line', 
                            fill: false, 
                            borderWidth:3
                        }, 
                        options: { 
                            tooltips: {
                                callbacks: {
                                    label: (tooltipItem, data) => `${tooltipItem.yLabel.toLocaleString()} ${unit}`
                                }
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }
                    }
                }
                for(let j = 0; j < 2; j++ ){
                    let tData = trendData[j][period]
                    for(let point of tData){
                        if(period === 'annual'){
                            if(!trend.chart.labels.includes(`${point.year}`)){                            
                                trend.chart.labels.push(`${point.year}`)
                            }
                        }
                        else if(period === 'monthly'){
                            if(!trend.chart.labels.includes(`${months[point.month - 1]}-${point.year}`)){
                                trend.chart.labels.push(`${months[point.month - 1]}-${point.year}`)
                            }
                        }
                        trend.description = `${titleCase(period)} ${titleCase(trendName)} 2018 - 2020`
                        trend.chart.data[j].push(point[trendName])
                        unit = units[trendName]
                    }
                }
                $scope.trends.push(trend)
            }
        }
        $scope.$apply()
    }

    const isUndefined = (val) => {
        let undefined = void(0)
        return val === undefined
    }

    $scope.parse = (data) => {
        let relevantData = ['passenger', 'mail', 'freight', 'airtime', 'distance']
        let values = []
        let labels = {}
        let index = 0
        for(let element of data){
            for(let field in element){
                if(relevantData.includes(field)){
                    if(isUndefined(labels[field])){
                        labels[field] = index
                        values[index] = 0
                        index++                        
                    }
                    values[labels[field]] += element[field]
                }
            }
        }
        return {
            labels: Object.keys(labels),
            values: values
        }
    }

}])

app.controller('ImportController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    $scope.categories = [
        {
            name: 'Airport', 
            model: {id: '', name: '', city: '', state: '', longitude: 0, latitude: 0, altitude: 0}, 
            labels: [
                {name: 'ID', type:'text', model: 'id'}, 
                {name: 'Name', type: 'text', model: 'name'}, 
                {name: 'City', type: 'text', model: 'city'}, 
                {name: 'State', type: 'select', options: $rootScope.lists.states, model: 'state'}, 
                {name: 'Longitude', type: 'number', model: 'longitude'}, 
                {name: 'Latitude', type: 'number', model: 'latitude'},
                {name: 'Altitude', type: 'number', model: 'altitude'}
            ]
        },
        {
            name: 'Airline', 
            model: {id: '', name: '', alias: '', callsign: '', country: ''}, 
            labels: [
                {name: 'ID', type:'text', model: 'id'},
                {name: 'Name', type:'text', model: 'name'}, 
                {name: 'Alias', type:'text', model: 'alias'}, 
                {name: 'Callsign', type:'text', model: 'callsign'},
                {name: 'Country', type:'text', model: 'country'}
            ]
        },
        {
            name: 'Route', 
            model: {origin: '', destination: '', airline: ''}, 
            labels: [
                {name: 'Origin', type: 'select', options: $rootScope.lists.airports, model: 'origin'},
                {name: 'Destination', type: 'select', options: $rootScope.lists.airports, model: 'destination'},
                {name: 'Airline', type: 'select', options: $rootScope.lists.airlines, model: 'airline'}
            ]
        },
        {
            name: 'Route Info',
            model: {origin: '', destination: '', airline: '', year: 0, month: 0, aircraft: '', passengers: 0, mail: 0, freight:0,  airtime: 0, serviceclass: 0, config: 0}, 
            labels: [
                {name: 'Origin', type: 'select', options: $rootScope.lists.airports, model: 'origin'},
                {name: 'Destination', type: 'select', options: $rootScope.lists.airports, model: 'destination'},
                {name: 'Airline', type: 'select', options: $rootScope.lists.airlines, model: 'airline'},
                {name: 'Year', type: 'select', options: [2018, 2019, 2020].map((val) => {return {name: `${val}`, value: val}}), model: 'year'}, 
                {name: 'Month', type: 'select', options: months.map((val, index) => {return {name: val, value: index + 1}}), model: 'month'},
                {name: 'Aircraft', type: 'select', options: $rootScope.lists.aircraft, model: 'aircraft'},
                {name: 'Passengers', type: 'number', model: 'passengers'},
                {name: 'Mail', type: 'number', model: 'mail'},
                {name: 'Freight', type: 'number', model: 'freight'},
                {name: 'Airtime', type: 'number', model: 'airtime'},
                {name: 'Service Class', type: 'select', options: $rootScope.lists.classes, model: 'serviceclass'},
                {name: 'Aircraft Configuration', type: 'select', options: $rootScope.lists.configs, model: 'config'}
            ]
        },
        {
            name: 'Aircraft', 
            model: {id: '', description: '', group: 0}, 
            labels: [
                {name: 'ID', type:'text', model: 'id'},
                {name: 'Description', type:'text', model: 'condescriptionfig'}, 
                {name: 'Group', type: 'select', options: $rootScope.lists.groups, model: 'group'}
            ]
        }
    ]    

    $scope.currentCategory = null
    $scope.error = ''
    $scope.message = {
        success: 0,
        fail: 0,
        errors: [],
        show: false
    }

    $scope.import = () => {

        $scope.message = {
            success: 0,
            fail: 0,
            errors: [],
            show: false
        }

        let files = $('#file')[0].files
        let category = $scope.currentCategory.name.toLowerCase().replace(/\s*/g, '')
        if(files.length === 0){            
            $http
            .post(`/import/${category}`, $scope.currentCategory.model)
            .then((result) => {
                if(result.status !== 200){
                    console.error(result.statusText, result.data)
                    $scope.error = result.data
                    return
                }
                let res = result.data
                if(res){
                    $scope.error = res
                }   
            })
            .catch((error) => {
                console.error(error.data)
                $scope.error = error.data
            })
        }else{
            console.log(files)
            let fd = new FormData()
            fd.append('file', files[0])

            $http
            .post(`/import/${category}/file`, fd, {
                headers: {'Content-Type': undefined}
            })
            .then((result) => {
                if(result.status !== 200){
                    console.error(result.statusText, result.data)
                    $scope.error = result.data
                    return
                }

                let res = result.data
                if(res){
                    $scope.message.success = res.success
                    $scope.message.fail = res.fail
                    $scope.message.errors = res.errors
                    $scope.message.show = true
                }

                $scope.error = res.message
            })
            .catch((error) => {
                console.error(error.data)
                $scope.error = error.data
            })
        }  
        $rootScope.init()    
    }        
}])

app.controller('ManageController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    $scope.categories = [
        {name: 'Airport', keys: ['airportid'], search: {
            airportid: {value: '', type: 'select', options: [''].concat($rootScope.lists.airports)},
            airportname: {value: '', type: 'text'},
            city: {value: '', type: 'text'},
            state: {value: '', type: 'select', options: [''].concat($rootScope.lists.states)}
        },model: {

        }},
        {name: 'Airline', keys: ['airlineid'], search: {
            airlineid: {value: '', type: 'select', options: $rootScope.lists.airlines},
            airlinename: {value: '', type: 'text'},
            country: {value: '', type: 'text'}
        }},
        {name: 'Airline Route', keys: ['routeid', 'origin', 'destination', 'airline'], search: {
            origin: {value: '', type: 'select', options: [''].concat($rootScope.lists.airports)},
            destination: {value: '', type: 'select', options: [''].concat($rootScope.lists.airports)},
            airline: {value: '', type: 'select', options: [''].concat($rootScope.lists.airlines)}
        }},
        {name: 'Route Info', keys: ['routeid','origin', 'destination', 'airline', 'year', 'month', 'aircraft'], search: {
            origin: {value: '', type: 'select', options: [''].concat($rootScope.lists.airports)},
            destination: {value: '', type: 'select', options: [''].concat($rootScope.lists.airports)},
            airline: {value: '', type: 'select', options: [''].concat($rootScope.lists.airlines)},
            year: {value: '', type: 'select', options: ['', 2018, 2019, 2020].map((val) => {return {name: `${val}`, value: val}})},
            month: {value: '', type: 'select', options: [''].concat(months).map((val, index) => {return {name: val, value: index}})}
        }},
        {name: 'Aircraft', keys: ['aircraftid'], search: {
            aircraftid: {value: '', type: 'select', options: [''].concat($rootScope.lists.aircraft)},
            description: {value: '', type: 'text'},
            aircraftgroup: {value: '', type: 'select', options: [''].concat($rootScope.lists.groups)}
        }},
        {name: 'Service Class', keys: ['scid'], search: {
            scid: {value: '', type: 'select', options: [''].concat($rootScope.lists.classes)},
            description: {value: '', type: 'text'}
        }},
        {name: 'Aircraft Group', keys: ['agid'], search: {
            agid: {value: '', type: 'select', options: [''].concat($rootScope.lists.groups)},
            description: {value: '', type: 'text'}
        }},
        {name: 'Aircraft Configuration', keys: ['acid'], search: {
            acid: {value: '', type: 'select', options: [''].concat($rootScope.lists.configs)},
            description: {value: '', type: 'text'}
        }}          
    ]    

    $scope.currentCategory = null
    $scope.error = ''

    $scope.data = {
        fields: [],
        rows: []
    }

    $scope.toUpdate = {
        index: null,
        data: null
    }
    $scope.setToUpdate = (index) => {
        $scope.toUpdate.index = index
        $scope.toUpdate.data = $scope.data.rows[index]
    }

    $scope.toDelete = {
        index: null,
        data: null
    }
    $scope.setToDelete = (index) => {
        $scope.toDelete.index = index
        $scope.toDelete.data = $scope.data.rows[index]
    }

    $scope.getData = () => {

        if(!$scope.currentCategory){
            return
        }

        let table = $scope.currentCategory.name.toLowerCase().replace(/\s*/g, '')
        let search = {}
        
        for(let field in $scope.currentCategory.search){
            let val = $scope.currentCategory.search[field].value
            if(val !== ''){
                search[field] = val
            }
        }

        $http
        .post(`/manage/${table}`, search)
        .then((result) => {
            if(result.status !== 200){
                console.error(result.statusText, result.data)
                $scope.error = result.data
                return
            }
            let res = result.data
            if(res){
                $scope.data.fields = res.fields
                $scope.data.rows = res.rows
            }   
        })
        .catch((error) => {
            console.error(error)
            $scope.error = error
        })
    }

    $scope.update = async() => {

        let table = $scope.currentCategory.name.toLowerCase().replace(/\s*/g, '')
        let update = {
            values: {},
            keys: {}
        }
        for(let field in $scope.toUpdate.data){
            if($scope.currentCategory.keys.includes(field)){
                update.keys[field] = $scope.toUpdate.data[field]
            }else{
                update.values[field] = $scope.toUpdate.data[field]
            }
        }
        
        if(Object.keys(update.values).length === 0){
            $scope.error = "Nothing to Update"
            return
        }

        $http
        .post(`/update/${table}`, update)
        .then(async (result) => {
            if(result.status !== 200){
                console.error(result.statusText, result.data)
                $scope.error = result.data
                return
            }
            let res = result.data
            $scope.error = res

            await $scope.getData()
            $rootScope.init()

            $scope.toUpdate = {
                index: null,
                data: null
            }
        })
        .catch((error) => {
            console.error(error)
            $scope.error = error
        })
    }

    $scope.delete = () => {
        let table = $scope.currentCategory.name.toLowerCase().replace(/\s*/g, '')
        let keys = []
        for(let field in $scope.toDelete.data){
            if($scope.currentCategory.keys.includes(field)){
                keys.push($scope.toDelete.data[field])
            }
        }
        keys = keys.join(':')
        if(keys === ''){
            $scope.error = "Nothing to Delete"
            return
        }
        $http
        .delete(`/manage/${table}/${keys}`)
        .then(async (result) => {
            if(result.status !== 200){
                console.error(result.statusText, result.data)
                $scope.error = result.data
                return
            }
            let res = result.data
            $scope.error = res

            await $scope.getData()
            $rootScope.init()

            $scope.toDelete = {
                index: null,
                data: null
            }
        })
        .catch((error) => {
            console.error(error)
            $scope.error = error
        })
        
    }

    $scope.cancel = (i) => {
        if(i === 0){
            $scope.toUpdate = {
                index: null,
                data: null
            }
        }else{
            $scope.toDelete = {
                index: null,
                data: null
            }
        }        
    }
}])