const DEBUG = process.env.NODE_ENV === 'development';
const {
    db,
    Sequelize
} = require('../../db');

const {
    Op
} = Sequelize

const User = require('../../db/models/user')(db, Sequelize);

//validate raw params that need to convert to int
const validIntReqParam = (rawParam) => {
    const isNumericRegex = /^[0-9]+$/;

    if (rawParam !== undefined) {
        //escape raw parameter
        rawParam = escape(rawParam);
        //check for numeric => do parseInt, else return null
        rawParam = rawParam.match(isNumericRegex) ? parseInt(rawParam) : null;
        //return false if null, else continue
        if (rawParam === null) {
            return false;
        }
    }
    //return undefined or an int
    return rawParam;
}

exports.getUsers = (req, res) => {

    //PAGINATION//
    //Get raw params
    let limit = req.query.limit;
    let offset = req.query.offset;

    //validate
    limit = validIntReqParam(limit);
    offset = validIntReqParam(offset);

    //return bad request if false
    if (limit === false || offset === false) {
        return res.status(400).send();
    }

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