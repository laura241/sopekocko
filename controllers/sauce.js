const Sauce = require('../models/Sauce');

exports.newSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    });
    sauce
        .save()
    Sauce.update({}, {
            likes: 0,
            dislikes: 0,
            usersliked: [''],
            usersdisliked: [''],
        }, {
            multi: true
        })
        .then(() => {
            res.status(201).send({
                message: 'Sauce saved successfully!',
            });
        })
        .catch(error => {
            res.status(409).json({
                message: 'The request cannot be treated',
            });
        });
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => {
            res.status(200).send(sauces);
        })
        .catch(error => {
            res.status(409).send({
                message: 'The request cannot be treated',
            });
        });
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id,
        })
        .then(sauces => {
            res.status(200).send(sauces);
        })
        .catch(error => {
            res.status(404).send({
                message: 'Ressource not found',
            });
        });
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
    } : {
        ...req.body,
    };
    Sauce.updateOne({
            _id: req.params.id,
        }, {
            ...sauceObject,
            _id: req.params.id,
        }, )
        .then(() =>
            res.status(200).send({
                message: 'The sauce was modificated!',
            }),
        )
        .catch(error =>
            res.status(405).send({
                message: 'The request cannot be treated',
            }),
        );
};

exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({
            _id: req.params.id,
        })
        .then(() =>
            res.status(200).send({
                message: 'Deleted object!',
            }),
        )
        .catch(error =>
            res.status(405).send({
                message: 'The request cannot be treated',
            }),
        );
};

exports.postLikeSauce = (req, res) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const findSauceUserLikes = Sauce.findOne({
        _id: req.params.id,
        usersliked: {
            $in: userId,
        },
    });
    const findSauceUserDislikes = Sauce.findOne({
        _id: req.params.id,
        usersdisliked: {
            $in: userId,
        },
    });

    if (like == 1) {
        Sauce.updateOne({
                _id: req.params.id,
                usersliked: {
                    $ne: userId,
                },
            }, {
                $inc: {
                    likes: +1,
                },

                $push: {
                    usersliked: userId,
                },
            }, )
            .then(sauces => {
                res.status(201).send({
                    message: 'The like was saved successfully!',
                });
            })
            .catch(error => {
                res.status(400).json({
                    error: error,
                });
            });
    } else if (like == -1) {
        Sauce.updateOne({
                _id: req.params.id,
                usersdisliked: {
                    $ne: userId,
                },
            }, {
                $inc: {
                    dislikes: +1,
                },

                $push: {
                    usersdisliked: userId,
                },
            }, )
            .then(sauces => {
                res.status(201).send({
                    message: 'The dislike was saved successfully!',
                });
            })
            .catch(error => {
                res.status(400).send({
                    error: error,
                });
            });
    } else {
        if (findSauceUserLikes) {
            Sauce.updateOne({
                    _id: req.params.id,
                    usersliked: {
                        $in: userId,
                    },
                }, {
                    $inc: {
                        likes: -1,
                    },

                    $pull: {
                        usersliked: userId,
                    },
                }, )
                .then(() => {
                    res.status(201).send({
                        message: 'Action saved successfully!',
                    });
                })
                .catch(error => {
                    res.status(400).json({
                        error: error,
                    });
                });
        }
        if (findSauceUserDislikes) {
            Sauce.updateOne({
                    _id: req.params.id,
                    usersdisliked: {
                        $in: userId,
                    },
                }, {
                    $inc: {
                        dislikes: -1,
                    },

                    $pull: {
                        usersdisliked: userId,
                    },
                }, )
                .then(() => {
                    res.status(201).send({
                        message: 'Action saved successfully!',
                    });
                })
                .catch(error => {
                    res.status(400).json({
                        error: error,
                    });
                });
        }
    }
};