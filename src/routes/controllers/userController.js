const DEBUG = process.env.NODE_ENV === 'development';

const validator = require('validator')

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
const validateCreateNew = (rawParams) => {
    return new Promise((resolve, reject) => {
        const {
            email,
            password,
            fullName,
            role
        } = rawParams;

        // VALIDATE

        let errors = [];
        //null params
        const isNull = email == null || password == null || role == null;
        //no params
        const noParams = !(email || password || role);

        //if no email,password or role => throws reject
        if (isNull || noParams) {
            errors = {
                error: "Some fields are missing!"
            };
            reject(errors);
        }

        //validate password
        if ((password + '').trim().length == 0) {
            errors.push({
                field: "password",
                error: "Password is empty"
            });
        } else if ((password + '').trim().length < 8) {
            errors.push({
                field: "password",
                error: "Password is too short (<8 characters)"
            });
        } else if (password.trim().length > 100) {
            errors.push({
                field: "password",
                error: "Password is too long (>50 characters)"
            });
        }

        //validate email
        const isEmailValid = validator.isEmail(email.trim(), {
            //not allow non english character
            allow_utf8_local_part: false,
            //check for standard max length of an email
            ignore_max_length: false,
            //disallowing certain syntactically valid email addresses that are rejected by Gmail
            domain_specific_validation: true
        });

        if ((email + '').trim() === "") {
            errors.push({
                field: "email",
                error: "Email is empty"
            });
        } else if (!isEmailValid) {
            errors.push({
                field: "email",
                error: "Invalid email"
            });
        }

        //validate role
        if ((role + '').trim() === "") {
            errors.push({
                field: "role",
                error: "Role is empty"
            });
        }

        if (errors.length > 0) {
            reject(errors);
        }

        resolve({
            email,
            password,
            fullName,
            role
        })
    })
};
exports.createNewUser = async (req, res) => {
    //get body params
    const raw = req.body;

    // VALIDATE
    validateCreateNew(raw).then((rs) => {
        const {
            email,
            password,
            fullName,
            role
        } = rs;

        //find or create new
        User.findOrCreate({
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
                    message: `User ${user.email} created successfully`
                })
            } else {
                return res.status(400).json({
                    errors: [{
                        field: "email",
                        error: "Email is existed"
                    }]
                })
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

    }).catch((errors) => { //400 bad request
        if (DEBUG) {
            console.log('Error: ', errors);
        }
        return res.status(400).json({
            errors
        });
    })

}