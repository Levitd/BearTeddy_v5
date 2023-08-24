const {Schema, model} = require('mongoose')

const schema = new Schema({
    country:String,
    about:String,
    currencies:{type:String,required:true},
    user_id:{type:Schema.Types.ObjectId, ref:'User', required:true},
    name:{type:String,required:true},
    orderInfo:String,
    paymentOptions:String,
    price:Number,
    rrpolicy:String,
    shipping:Number,
    viewed:Number,
    quantity: Number,
    liked:Number,
    liked_statistic:[new Schema({user_id:String, action:Number},{
        timestamps:true
    })
        ],
    image:[
        {name:String,token:{type: String}}
        ]
},{
    timestamps:true
})

module.exports = model('Product', schema)