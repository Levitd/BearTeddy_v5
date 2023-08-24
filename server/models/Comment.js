const {Schema, model} = require('mongoose')

const schema = new Schema({
    comment:{type:String, required:true},
    // На каком товаре коментарий
    product_id:{type:Schema.Types.ObjectId, ref:'Product', required: true},
    // Кто оставил комментарий
    user_id:{type:Schema.Types.ObjectId, ref:'User', required: true},
    // к какому комментарию коментарий - цепочка
    parent_comment_id:String
},{
    timestamps:{createdAr:'created_at'}
})

module.exports = model('Comment', schema)