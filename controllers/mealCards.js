const cloudinary = require('cloudinary').v2
const { MealCard } = require('../models')

async function create(req, res) {
  try {
    const mealCard = await MealCard.create({ ...req.body, creatorId: req.user.id })
    res.status(201).json(mealCard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function index(req, res) {
  try {
    const mealCards = await MealCard.findAll()
    res.status(200).json(mealCards)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function update(req, res) {
  try {
    const mealCard = await MealCard.findByPk(req.params.id)
    if (req.user.profile.id === mealCard.creatorId) {
      mealCard.set(req.body)
      await mealCard.save()
      res.status(200).json(mealCard)
    } else {
      res.status(403).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params
    const deleted = await MealCard.destroy({
      where: { id: id }
    })
    if (deleted) {
      return res.status(201).json({ message: "MealCard deleted" })
    }
    throw new Error("MealCard not found")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  try {
    const mealCard = await MealCard.findByPk(req.params.id)
    if (!mealCard) {
      throw new Error('MealCard not found')
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile, { tags: 'mealCard' })
    mealCard.photo = uploadResult.url
    await mealCard.save()

    res.status(200).json(mealCard.photo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}


module.exports = {
  create,
  index,
  update,
  destroy,
  addPhoto
}