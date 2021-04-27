const router = express.Router()

const appController = require('./controllers/appController')
const queryController = require('./controllers/queryController')
const importController = require('./controllers/importController')
const manageController = require('./controllers/manageController')



module.exports = router

router.get('/', appController.showHome)

router.get('/init', appController.init)
router.get('/overview', queryController.overview)
router.get('/apikey', appController.getAPIKey)

router.get('/state/overview', queryController.statesOverview)
router.get('/state/:state', queryController.stateOverview)
router.get('/airport/overview', queryController.airportsOverview)
router.get('/airport/:airport', queryController.airportOverview)
router.get('/airline/overview', queryController.airlinesOverview)
router.get('/airline/:airline', queryController.airlineOverview)
router.get('/route/overview', queryController.routesOverview)
router.get('/route/:origin/:destination/:airline', queryController.routeOverview)
router.get('/aircraft/overview', queryController.aircraftOverview)
router.get('/aircraft/:aircraft', queryController.craftOverview)

router.post('/import/:category', importController.import)
router.post('/import/:category/file', importController.importFile)

router.post('/manage/:table', manageController.getTable)
router.post('/update/:table', manageController.updateTable)
router.delete('/manage/:table/:keys', manageController.deleteFromTable)