const router = require('express').Router()
const profilesCtrl = require('../controllers/profiles.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

router.get('/:id/likedMeals', checkAuth, profilesCtrl.getLikedMealCards)
router.get('/:id/passedMeals', checkAuth, profilesCtrl.getPassedMealCards)
router.post('/:id/likedMeals/:mealCardId', checkAuth, profilesCtrl.associateLikedMealCards)
router.post('/:id/passedMeals/:mealCardId', checkAuth, profilesCtrl.associatePassedMealCards)

module.exports = router
