var path = require('path');
module.exports = {
    DB_PATH: path.resolve(__dirname, "./db/database/database.db"),
    DB_TEST_PATH: path.resolve(__dirname, "./db/database/test.db"),
    DB_MODELS_PATH: path.resolve(__dirname, "./db/models")
}