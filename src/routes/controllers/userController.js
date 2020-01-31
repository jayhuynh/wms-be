const {
    db,
    Sequelize
} = require('../../db');

const {
    Op
} = Sequelize

const User = require('../../db/models/user')(db, Sequelize);

exports.getUsers = (req, res) => {
    User.findAll({
        raw: true
    }).then((rs) => {
        if (rs) {
            res.status(200).json(rs);
        } else {
            res.status(404).json(`{"error":"users not found"}`);
        }
    }).catch((e) => {
        console.log('Error: ', e.message);
        res.status(500).send({
            error: e.message
        });
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
        console.log('Error: ', e.message);
        res.status(500).send({
            error: e.message
        });
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
        console.log('Error: ', e.message);
        res.status(500).send({
            error: e.message
        });
    })
}