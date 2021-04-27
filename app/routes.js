const router = express.Router()

const appController = require('./controllers/appController')
const queryController = require('./controllers/queryController')
const { route } = require('./controllers/testController')
const testController = require('./controllers/testController')
const importController = require('./controllers/importController')
const manageController = require('./controllers/manageController')



module.exports = router

router.get('/', appController.showHome)

router.get('/init', appController.init)
router.get('/overview', queryController.overview)

router.get('/state/overview', queryController.statesOverview)
router.get('/state/:state', testController.state)
router.get('/airport/overview', testController.airports)
router.get('/airport/:airport', testController.airport)
router.get('/airline/overview', testController.airlines)
router.get('/airline/:airline', testController.airline)
router.get('/route/overview', testController.routes)
router.get('/route/:origin/:destination/:airline', testController.route)
router.get('/aircraft/overview', testController.aircrafts)
router.get('/aircraft/:aircraft', testController.aircraft)

router.post('/import/:category', importController.import)
router.post('/import/:category/file', importController.importFile)

router.post('/manage/:table', manageController.getTable)
router.post('/update/:table', manageController.updateTable)
router.delete('/manage/:table/:keys', manageController.deleteFromTable)