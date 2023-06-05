const router = require('express').Router()
const mealCardsCtrl = require('../controllers/mealCards.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, mealCardsCtrl.create)
router.get('/', checkAuth, mealCardsCtrl.index)
router.put('/:id', checkAuth, mealCardsCtrl.update)
router.delete('/:id', checkAuth, mealCardsCtrl.destroy)


module.exports = router