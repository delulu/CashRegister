var log4js = require('log4js');

/**
 * Initialise log4js first at start time
 */
try {
    require('fs').mkdirSync(__dirname + '/../log');
} catch (e) {
    if (e.code != 'EEXIST') {
        console.error("Could not set up log directory, error was: ", e);
        process.exit(1);
    }
}

var appenders = [
    {
        "type": "dateFile",
        "filename": __dirname + "/../../log/access.log",
        "pattern": "-yyyy-MM-dd",
        "category": "http"
    },
    {
        "type": "file",
        "filename": __dirname + "/../../log/app.log",
        "maxLogSize": 10485760,
        "numBackups": 3
    },
    {
        "type": "logLevelFilter",
        "level": "ERROR",
        "appender": {
            "type": "file",
            "filename": __dirname + "/../../log/errors.log"
        }
    }
];


if (process.env.NODE_ENV === "development") {
    appenders.push({ "type": "console" });
}


log4js.configure({ appenders: appenders });