
# Logger
a node.js module used for logging and saving application messages and events. 

### Options
 - **logDebug** *Boolean* - Defines if debug messages should be logged. 
 - **logDetail** *Boolean* - Defines if detail messages should be logged. 
 - **logGeneral** *Boolean* - Defines if general messages should be logged. 
 - **logWarning** *Boolean* - Defines if warning messages should be logged. 
 - **logError** *Boolean* - Defines if error messages should be logged. 
 - **writeLog** *Boolean* - Defines if console messages should also be saved to disk. 
    - *Note: If writeLog is true, all below options are required.*
 - **fileName** *String* - The base name of the log files.
 - **filePath** *String* - The Path that the log files should be saved to.
 - **fileSize** *String* - The maximum size for each log file. Example (100M)
    - Byte = B
    - KiloByte = K
    - MegaByte = M
    - GigaByte = G
 - **fileAge** *Integer* - The maximum number of days to write to one log file.
 - **fileCount** *Integer* - The maximum number of log files to keep in rotation. 

 ## Functions
 - debug(message)   - green [year-month-day HH:MM:SS] DEBUG *message*
 - general(message) - white [year-month-day HH:MM:SS] DEBUG *message*
 - detail(message)  - black [year-month-day HH:MM:SS] DEBUG *message*
 - warning(message) - yellow [year-month-day HH:MM:SS] DEBUG *message*
 - error(message)   - red [year-month-day HH:MM:SS] DEBUG *message*

### Usage
```
const logger = require('./Logger');

const log = new logger({
    logGeneral:  true,
    logWarning:  true,
    logError:  true,
    writeLog:  true,
    fileName: 'testLog.txt',
    filePath: 'c:\\logs\\testing\\',
    fileSize: '300M',
    fileAge: 1,
    fileCount: 5
});

log.general('Starting application...');

```