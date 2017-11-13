const Mock = require('mockjs');
Mock.Random.extend(require("./YName"));
Mock.Random.extend(require("./YRoad"));
Mock.Random.extend(require("./YEmail"));
Mock.Random.extend(require("./YTel"));
Mock.Random.extend(require("./YCard"));
Mock.Random.extend(require("./YAddress"));
Mock.Random.extend(require("./YMinorities"));
module.exports = Mock;