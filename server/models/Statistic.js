const {Schema, model} = require('mongoose')

const schema = new Schema({
    product_id:{type:Schema.Types.ObjectId, ref:'Product'},
    ip:String,
    country:String,
    user_id:String,
},{
    timestamps:true
})

module.exports = model('Statistics', schema)