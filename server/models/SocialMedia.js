const {Schema, model} = require('mongoose')

const schema = new Schema({
    name:{type: String, required: true},
    baseUrl:{type: String, required: true},
    icon: String
},{
    timestamps:true
})

module.exports = model('SocialMedia', schema)