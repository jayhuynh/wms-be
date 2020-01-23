const {
    db,
    Sequelize
} = require('../../db');

const User = require('../../db/models/user')(db, Sequelize);
const {
    Op
} = Sequelize

exports.getUsers = (req, res) => {
    User.findAll({
        raw: true
    }).then((rs) => {
        if (rs) {
            res.status(200).json(rs);
        } else {
            res.status(404).json({
                error: "users not found"
            });
        }
    }).catch((e) => {
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
            res.status(404).json({
                error: `user ${id} not found`
            });
        }
    }).catch((e) => {
        res.status(500).send({
            error: e.message
        });
    });
};

exports.deleteUsers = async (req, res) => {
    let toDeleteIds = null;

    //VALIDATE QUERIES
    //check null
    if (req.query.id) {
        try {

            //Get ids in query strings
            const rawIds = [...req.query.id];

            //replace the queries by Number(escape()) to ids 
            toDeleteIds = rawIds.map(id => {
                const newId = Number(escape(id));

                //throw Error if it's not a number
                if (newId == NaN) {
                    throw new Error("Invalid query string. Number only");
                }

                return newId;
            });

            //remove duplicates
            toDeleteIds = [...new Set(toDeleteIds)]

        } catch (e) {
            //return 400 if it's not a number
            return res.status(400).send({
                error: e.message
            });
        }
    } else {
        //204 Status Code: No Content
        return res.status(204).send();
    }

    //Set updatedAt to current time use transaction

    // get transaction
    const transaction = await db.transaction();
    try {
        //loop through toDeleteIds
        for (id of toDeleteIds) {

            await User.update({
                deletedAt: Sequelize.fn('NOW')
            }, {
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                transaction
            }).then((rs) => {
                //return [0] if there is no row updated(not existed id or deleted_at is not null)
                if (rs[0] === 0) {
                    //not existed id or user with id is already deleted
                    throw new Error("Invalid id. Either user is already deleted or it is not existed.");
                }
            });

        };

        // commit
        await transaction.commit();

        //success => return 200
        return res.send();

    } catch (e) {

        if (transaction) {
            await transaction.rollback();
        };
        //can be either server error or just invalid id error, can be both 400 and 500 status code
        return res.status(400).send({
            error: e.message
        });
    }
}

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
        res.status(500).send({
            error: e.message
        });
    });
}