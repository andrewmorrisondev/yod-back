const { Profile, LikedMeals, PassedMeals } = require('../models')
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



module.exports = { 
  index, 
  addPhoto,
  associateLikedMealCards,
  associatePassedMealCards
}
