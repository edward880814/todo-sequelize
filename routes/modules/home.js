const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

//試著用async跟await的方式寫寫看
router.get('/', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      throw new Error('user not found')
    }
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId: req.user.id }
    })
    res.render('index', { todos })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router