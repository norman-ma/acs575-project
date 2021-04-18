const router = express.Router()

const appController = require('./controllers/appController')

module.exports = router

router.get('/', appController.showHome)
router.get('404')