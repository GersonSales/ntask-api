const bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
    logger = require('./logger');

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message)
            }
        }
    }));
    app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELTE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};