const jwt = require('jwt-simple');

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.Users;

    app.post('/token', (req, res) => {
        if (req.body.email && req.body.password) {
            const email  = req.body.email,
                password = req.body.password;

            Users.findOne({where: {email: email}})
                .then(user => {
                    if (Users.isPassword(user.password, password)) {
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => {
                    res.status(401).json({errorMessage: error.message});
                });

        }else {
            res.sendStatus(401);
        }

    });
};