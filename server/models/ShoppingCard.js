const {Schema, model} = require('mongoose')

const schema = new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:'User', required:true},
    products:[{product_id:String, count:Number}],
},{
    timestamps:true
})

module.exports = model('ShoppingCard', schema)