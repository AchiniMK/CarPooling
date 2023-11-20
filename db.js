const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://achinimadhuwanthi29:ak97kAK@cluster0.vpbyomb.mongodb.net/CarPooling'

module.exports = ()=>{
    return mongoose.connect(dbUri)
}