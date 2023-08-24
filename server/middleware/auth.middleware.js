const tokenService = require('../services/token.services')

module.exports=(req,res,next)=>{
    if(req.method==='OPTIONS'){
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
           return res.status(401).json({message: 'Unauthorized not token'})
        }
        const data = tokenService.validateAccess(token)
        if (!data) {
            return res.status(401).json({message: 'Unauthorized not data'})
        }
        req.user = data
        next()
    } catch (e) {
        return res.status(401).json({message: 'Unauthorized error'})
    }
    
}