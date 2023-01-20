const jwt = require('jsonwebtoken')

const adminAuth = async function (req, res, next) {
    try {
        let token = req.headers['x-auth-token'];
        if (!token) return res.status(400).send({ status: false, message: "Token must be present." })
        jwt.verify(token, 'secretKey', function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: 'Authentication failed.' })
            } else {
                if (decodedToken.Type != 'admin') {
                    return res.status(403).send({ status: false, message: 'Not accesible to user.' })
                }
                req.decodedToken = decodedToken
                next()
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { adminAuth }