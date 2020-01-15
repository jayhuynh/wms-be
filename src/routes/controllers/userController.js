const {db,Sequelize}=require('../../db')

const User = require('../../db/models/user')(db,Sequelize)
 
// Display list of all BookInstances.
exports.listAll = function(req, res) {
    User.findAll({raw: true}).then((rs)=>{
        res.status(200).send(rs)
    }).catch((e)=>
        console.log('Error: ',e)
    )
}
exports.listById = function(req, res) {
    const id=req.params.id
    User.findByPk(id,{raw: true}).then((rs)=>{
        res.status(200).send(rs)
    }).catch((e)=>
        console.log('Error: ',e)
    )
}

