module.exports = {
    database: "ntask",
    username: "",
    password: "",
    params: {
        dialect: "sqlite",
        storage: "ntask.sqlite",
        logging: false,
        difine: {
            underscored: true
        }
    },
    jwtSecret: "Nta$k-AP1",
    jwtSession: {session: false}



};