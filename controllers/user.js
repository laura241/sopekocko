const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return (res.status(400).send(new Error('Bad request!')))
    } else {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                })
                user
                    .save()
                    .then(() =>
                        res.status(201).json({
                            message: 'user created!',
                            userId: user._id,
                        })
                    )
                    .catch((error) =>
                        res.status(400).json({
                            error,
                        })
                    )
            })
            .catch((error) =>
                res.status(500).json({
                    error,
                })
            )

        res.status(201).json({
            message: 'user added to the database'
        })
    }
    next();
}


exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return (res.status(400).send(new Error('Bad request!')))
    } else {
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        error: 'User not found !',
                    })
                }
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                error: 'incorrect password !',
                            })
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign({
                                    userId: user._id,
                                },
                                'RANDOM_TOKEN_SECRET', {
                                    expiresIn: '2h',
                                }
                            ),
                        })
                    })
                    .catch((error) =>
                        res.status(500).json({
                            error,
                        })
                    )
            })
            .catch((error) =>
                res.status(500).json({
                    error,
                })
            )
    }
}