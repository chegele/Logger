
const os = require('os');
const rfs = require('rotating-file-stream');

const clearColor = "\x1b[0m";
const red = "\x1b[31m%s" + clearColor;
const yellow = "\x1b[33m%s" + clearColor;
const white = "\x1b[37m%s" + clearColor;
const blue = "\x1b[34m%s" + clearColor ;
const green = "\x1b[32m%s" + clearColor;
const magenta = "\x1b[35m%s" + clearColor;
const cyan = "\x1b[36m%s" + clearColor;
const black = "\x1b[30m%s" + clearColor;

module.exports = class Logger {

    /**
     * @typedef Options
     * @param {Boolean} logDebug    enables debug logging
     * @param {Boolean} logDetail   enables detail logging
     * @param {Boolean} logGeneral  enables general logging
     * @param {Boolean} logWarning  enables warning logging
     * @param {Boolean} logError    enables error logging
     * @param {String}  prefix      Prefix each logged message with this string
     * @param {Boolean} writeLog    enables saving log messages to disk
     * @param {String}  fileName    The base name of the file to save logs under
     * @param {String}  filePath    The path log files should be saved under
     * @param {String}  fileSize    The maximum size for each log file
     * @param {Integer} fileAge     The maximum number of days to write to one log file
     * @param {Integer} fileCount   The maximum number log files to keep in rotation
     */

    /**
     * Creates a new logging object using the provided options
     * @param {Options} options An object that defines the behavior of the logger
     */
    constructor(options) {

        // Set instance properties to define which type of messages to log
        options.logDebug    ? this.logDebug = true     : this.logDebug = false
        options.logDetail   ? this.logDetail = true   : this.logDetail = false;
        options.logGeneral  ? this.logGeneral = true   : this.logGeneral = false;
        options.logWarning  ? this.logWarning = true   : this.logWarning = false;
        options.logError    ? this.logError = true     : this.logError = false;

        // Configure the logging prefix
        options.prefix ? this.prefix = ' ' + options.prefix : this.prefix = '';

        // Check if log should be saved to disk and validate options
        this.write = false;
        if (options.writeLog) {
            if (!options.fileName) throw new Error('When writeLog is enabled, fileName must be defined.');
            if (!options.filePath) throw new Error('When writeLog is enabled, filePath must be defined.');
            if (!options.fileSize) throw new Error('When writeLog is enabled, fileSize must be defined.');
            if (!options.fileAge)  throw new Error('When writeLog is enabled, fileAge must be defined.');

            // Create the rotating file system write stream
            this.write = true;
            this.stream = rfs(options.fileName, {
                path: options.filePath,
                size: options.fileSize,
                interval: options.fileAge + 'd',
                maxFiles: options.fileCount
            });
        }
    }

    /**
     * Writes the provided message to log if type is enabled in options
     * @param {String | Object} message The message to write to the log
     */
    detail(message) {
        if (this.logDetail) {
            if (typeof(message) == 'object') message = JSON.stringify(message);
            const label = 'DETAIL ';
            const color = black;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label + this.prefix, message);
            if(this.write) this.stream.write(time + label + this.prefix + message + os.EOL);
        }
    }
    
    /**
     * Writes the provided message to log if type is enabled in options
     * @param {String | Object} message The message to write to the log
     */
    general(message) {
        if (this.logGeneral) {
            if (typeof(message) == 'object') message = JSON.stringify(message);
            const label = 'GENERAL';
            const color = white;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label + this.prefix, message);
            if(this.write) this.stream.write(time + label + this.prefix + message + os.EOL);
        }
    }
    
    /**
     * Writes the provided message to log if type is enabled in options
     * @param {String | Object} message The message to write to the log
     */
    warning(message) {
        if (this.logWarning) {
            if (typeof(message) == 'object') message = JSON.stringify(message);
            const label = 'WARNING';
            const color = yellow
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label + this.prefix, message);
            if(this.write) this.stream.write(time + label + this.prefix + message + os.EOL);
        }
    }
    
    /**
     * Writes the provided message to log if type is enabled in options
     * @param {String | Object | Error} message The message to write to the log
     * @param {Boolean} [trace] Print the stack trace to the log
     */
    error(message, trace) {
        if (this.logError) {
            if (typeof(message) == 'object' && !(message instanceof Error)) message = JSON.stringify(message);
            if (trace && message instanceof Error) message = message.stack;
            const label = 'ERROR  ';
            const color = red
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label + this.prefix, message);
            if(this.write) this.stream.write(time + label + this.prefix + message + os.EOL);
        }
    }
    
    /**
     * Writes the provided message to log if type is enabled in options
     * @param {String | Object} message The message to write to the log
     */
    debug(message) {
        if (this.logDebug) {
            if (typeof(message) == 'object') message = JSON.stringify(message);
            const label = 'DEBUG  ';
            const color = green;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label + this.prefix, message);
            if(this.write) this.stream.write(time + label + this.prefix + message + os.EOL);
        }
    }

}