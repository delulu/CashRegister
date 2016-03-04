
function getEnv() {
    var environment = "development";
    if (process.env.NODE_ENV) {
        environment = process.env.NODE_ENV.toLowerCase();
    }
    return environment;
}

var settingsFile = "./settings/" + getEnv() + ".json";
var settings = require(settingsFile);

module.exports = settings;