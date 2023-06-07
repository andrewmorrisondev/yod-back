const { cloudinary } = require('cloudinary')
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
    const { id } = req.params
    const [updated] = await MealCard.update(req.body, {
      where: { id: id }
    })
    if (updated) {
      const updatedMealCard = await MealCard.findOne({ where: { id: id, creatorId: req.user.id } })
      return res.status(200).json({ mealCard: updatedMealCard })
    }
    throw new Error('MealCard not found')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function destroy(req, res) {
  try {
    const { id } = req.params
    const deleted = await MealCard.destroy({
      where: { id: id }
    })
    if (deleted) {
      return res.status(204).send("MealCard deleted")
    }
    throw new Error("MealCard not found")
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  MealCard.findByPk(req.params.id)
    .then(mealCard => {
      cloudinary.uploader.upload(imageFile, { tags: 'mealCard' })
        .then(image => {
          mealCard.photo = image.url
          mealCard.save()
            .then((mealCard) => {
              res.status(200).json(mealCard.photo)
            })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ error: err })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}


module.exports = {
  create,
  index,
  update,
  destroy,
  addPhoto
}