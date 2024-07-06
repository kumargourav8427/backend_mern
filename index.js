const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

require('./db/connection')
const Users = require('./Modals/User')

app.post('/', async(req, res) => {
    const user = new Users(req.body)
    try{
        await user.save();
        res.status(201).json(user);    
    }
    catch (error) {
        res.status(400).json({ message: error.message });
      }
})

app.get('/', async(req, res) => {
    try {
        const user = await Users.find();
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})


app.listen(4000)