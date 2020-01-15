module.exports ={
  development: {
    username: "root",
    password: "str0ngp@ssword",
    database: "wms_be",
    host: "127.0.0.1",
    dialect: "mariadb",
    dialectOptions:{
      timezone:""
    },
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
}
