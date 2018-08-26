module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback([
                {title: "Do something"},
                {title: "Do homework"}
            ]);
        }
    };
};