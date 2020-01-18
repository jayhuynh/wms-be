const {
    db,
    Sequelize
} = require('../../db');

const User = require('../../db/models/user')(db, Sequelize);

exports.getUsers = (req, res) => {
    User.findAll({
        raw: true
    }).then((rs) => {
        res.status(200).json(rs||"{'error':'users not found'}");
    }).catch((e) => {
        console.log('Error: ', e);
        res.status(500);
    });
}
exports.getUser = (req, res) => {
    const id = escape(req.params.id);
    User.findByPk(id, {
        raw: true
    }).then((rs) => {
        console.log(rs)
        res.status(200).json(rs||`{'error':'user ${id} not found'}`);
    }).catch((e) => {
        console.log('Error: ', e);
        res.status(500);
    });
};