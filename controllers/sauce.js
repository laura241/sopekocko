const Sauce = require('../models/Sauce');

exports.newSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!',
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
}


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};


exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...sauceObject,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};


exports.deleteOneSauce = (req, res, next) => {
    Sauce.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
};

exports.postLikeSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
    switch (like) {
        case 1:
            usersliked.push(userId);
            break;
        case -1:
            usersliked.remove(userId);
            usersdisliked.push(userId);
            break;
        case 0:

    }
    sauce.save({

        })
        .then(() => res.status(200).json({
            message: 'Action effectuée'
        }))
        .catch(error => res.status(400).json({
            error
        }))
}