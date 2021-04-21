const router = express.Router()

const appController = require('./controllers/appController')
const queryController = require('./controllers/queryController')

module.exports = router

router.get('/', appController.showHome)
router.get('/query', queryController.getState)
router.get('404')