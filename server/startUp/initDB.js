const Currency=require('../models/Currency')
const currencyMock = require('../mock/currency.json')

const SocialMedia=require('../models/SocialMedia')
const socialMediaMock = require('../mock/socialMedia.json')

module.exports= async ()=>{
    const socialMedia= await SocialMedia.find()
    if(socialMedia.length !==socialMediaMock.length){
        await createInitialEntity(SocialMedia, socialMediaMock)
    }
    const currency= await Currency.find()
    if(currency.length !==currencyMock.length){
        await createInitialEntity(Currency, currencyMock)
    }
}

async function createInitialEntity(Model, data){
    await Model.collection.drop()
    return Promise.all(
        data.map(async item=>{
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e){
                return e
            }
        })
    )
}