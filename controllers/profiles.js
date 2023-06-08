const { Profile, LikedMeals, PassedMeals, MealCard } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll()
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.id)
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url

    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function associateLikedMealCards(req, res) {
  try {
    const { id, mealCardId } = req.params
    const association = await LikedMeals.create({ swiperId: id, mealCardId: mealCardId })
    res.status(200).json(association)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function associatePassedMealCards(req, res) {
  try {
    const { id, mealCardId } = req.params
    const association = await PassedMeals.create({ swiperId: id, mealCardId: mealCardId })
    res.status(200).json(association)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getLikedMealCards(req, res) {
  try {
    const likedMeals = await LikedMeals.findAll({ where: { swiperId: req.params.id }})
    res.json(likedMeals)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getPassedMealCards(req, res) {
  try {
    const passedMeals = await PassedMeals.findAll({ where: { swiperId: req.params.id }})
    res.json(passedMeals)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getFilteredMealCards(req, res) {
  try {
    const mealCards = await MealCard.findAll()
    const passedMeals = await PassedMeals.findAll({ where: { swiperId: req.params.id }})
    const likedMeals = await LikedMeals.findAll({ where: { swiperId: req.params.id }})

    const passedMealsIds = passedMeals.map(meal => meal.mealCardId)
    const likedMealsIds = likedMeals.map(meal => meal.mealCardId)

    const filteredMealCards = mealCards.filter(meal => {
      if (!passedMealsIds.includes(meal.id) && !likedMealsIds.includes(meal.id)) {
        return meal
      }
    })

    res.json(filteredMealCards)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

module.exports = { 
  index,
  show,
  addPhoto,
  associateLikedMealCards,
  associatePassedMealCards,
  getLikedMealCards,
  getPassedMealCards,
  getFilteredMealCards,
}
