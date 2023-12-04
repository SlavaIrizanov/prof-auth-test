const {Schema, model} = require('mongoose')


const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}, 
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('User', User) // экспорт модели, 1 парам название модели, 2-й схема по которой эта модель должна создаться