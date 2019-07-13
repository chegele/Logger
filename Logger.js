
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

    constructor(options) {
        options.logDebug    ? this.logDebug = true     : this.logDebug = false
        options.logDetail   ? this.logDetail = true   : this.logDetail = false;
        options.logGeneral  ? this.logGeneral = true   : this.logGeneral = false;
        options.logWarning  ? this.logWarning = true   : this.logWarning = false;
        options.logError    ? this.logError = true     : this.logError = false;

        this.write = false;
        if (options.writeLog) {
            if (!options.fileName) throw new Error('When writeLog is enabled, fileName must be defined.');
            if (!options.filePath) throw new Error('When writeLog is enabled, filePath must be defined.');
            if (!options.fileSize) throw new Error('When writeLog is enabled, fileSize must be defined.');
            if (!options.fileAge)  throw new Error('When writeLog is enabled, fileAge must be defined.');

            this.write = true;
            this.stream = rfs(options.fileName, {
                path: options.filePath,
                size: options.fileSize,
                interval: options.fileAge + 'd',
                maxFiles: options.fileCount
            });
        }
    }

    detail(message) {
        if (this.logDetail) {
            const label = 'DETAIL ';
            const color = black;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label, message);
            if(this.write) this.stream.write(time + label + ' ' + message + os.EOL);
        }
    }
    
    general(message) {
        if (this.logGeneral) {
            const label = 'GENERAL';
            const color = white;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label, message);
            if(this.write) this.stream.write(time + label + ' ' + message + os.EOL);
        }
    }
    
    warning(message) {
        if (this.logWarning) {
            const label = 'WARNING';
            const color = yellow
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label, message);
            if(this.write) this.stream.write(time + label + ' ' + message + os.EOL);
        }
    }
    
    error(message) {
        if (this.logError) {
            const label = 'ERROR  ';
            const color = red
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label, message);
            if(this.write) this.stream.write(time + label + ' ' + message + os.EOL);
        }
    }
    
    debug(message) {
        if (this.logDebug) {
            const label = 'DEBUG  ';
            const color = green;
            const time = '[' + new Date().toLocaleString() + '] ';
            console.log(color, time + label, message);
            if(this.write) this.stream.write(time + label + ' ' + message + os.EOL);
        }
    }

}