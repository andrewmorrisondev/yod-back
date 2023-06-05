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

module.exports = {
  create,
  index,
  update,
  destroy
}