const {
    db,
    Sequelize
} = require('../../db');

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
        console.log('Error: ', e);
        res.status(500).send();
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
        console.log('Error: ', e);
        res.status(500).send();
    });
};