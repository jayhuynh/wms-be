const DEBUG = process.env.NODE_ENV === 'development';

const {
    db,
    Sequelize
} = require('../../db');

const {
    Op
} = Sequelize

const { validationResult } = require('express-validator');

const User = require('../../db/models/user')(db, Sequelize);

exports.getUsers = (req, res) => {
    // VALIDATE
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (DEBUG) {
            console.log('Error: ', errors);
        }

        return res.status(400).json({ errors: errors.array() });
    }

    const { limit, offset } = req.query;

    User.findAll({
        limit,
        offset,
        raw: true
    }).then((rs) => {
        if (rs) {
            res.status(200).json(rs);
        } else {
            res.status(404).json(`{"error":"users not found"}`);
        }
    }).catch((e) => {
        if (DEBUG) {
            console.log('Error: ', e.message);
            res.status(500).send({
                error: e.message
            });
        } else {
            res.status(500).send();
        }
    });
}

exports.getUser = (req, res) => {
    const id = escape(req.params.id);
    User.findByPk(id, {
        raw: true
    }).then((rs) => {
        if (rs) {
            res.status(200).json(rs);
        } else {
            res.status(404).json(`{'error':'user ${id} not found'}`);
        }
    }).catch((e) => {
        if (DEBUG) {
            console.log('Error: ', e.message);
            res.status(500).send({
                error: e.message
            });
        } else {
            res.status(500).send();
        }
    });
};

exports.deleteUser = async (req, res) => {
    const id = escape(req.params.id);

    User.update({
        deletedAt: Sequelize.fn('NOW')
    }, {
        where: {
            id,
            deletedAt: {
                [Op.is]: null
            }
        }
    }).then((rs) => {
        //return [0] if there is no row updated(not existed id or deleted_at is not null)
        if (rs[0] === 0) {
            //not existed id or user with id is already deleted
            return res.status(400).send({
                error: "Invalid id. Either user is already deleted or it is not existed."
            })
        } else {
            return res.send();
        }

    }).catch((e) => {
        if (DEBUG) {
            console.log('Error: ', e.message);
            res.status(500).send({
                error: e.message
            });
        } else {
            res.status(500).send();
        }
    })
}

exports.createUser = async (req, res) => {
    // VALIDATE
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (DEBUG) {
            console.log('Error: ', errors);
        }

        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, fullName, role } = req.body;
    //find or create new
    await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            email,
            password,
            fullName,
            role
        }
    }).then(([user, created]) => {
        //if not created => email existed 
        if (created) {
            return res.json({
                success: `User ${user.email} created successfully`
            });
        } else {
            return res.status(400).json({
                errors: [{
                    value: "",
                    msg: "Email is existed",
                    param: "email",
                    location: "body"
                }]
            });
        }

    }).catch((e) => { //throws errors 500 internal server error
        if (DEBUG) {
            console.log('Error: ', e.message);
            res.status(500).send({
                error: e.message
            });
        } else {
            res.status(500).send();
        }
    })

}