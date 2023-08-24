const {Schema, model} = require('mongoose')

const schema = new Schema({
    country:String,
    url:String,
    name: String,
    aboutShop:String,
    user_id:{type:Schema.Types.ObjectId, ref:'User', required:true},
},{
    timestamps:true
})

module.exports = model('Shop', schema)