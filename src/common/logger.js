const { getFormatedData } = require('./utils');

const getOutputString = ({ name, data }) => {
    const notSettedDataPrompt = 'Not set';
    return `Request ${name}: ${getFormatedData(data) || notSettedDataPrompt}`;
};

const addLogToConsole = ({ name, data }) => {
    const outputString = getOutputString({name, data});
    console.info(outputString)
};

const addLog = ({ name, data }) => {
    if (data) {
        addLogToConsole({name, data})
    }
};

const shouldSkipLogByUrl = url => {
    const skipLogUrls = ['/doc/'];

    if (url && url.indexOf) {
        for (let skipLogUrl of skipLogUrls) {
            if (url.indexOf(skipLogUrl) > -1) {
                return true;
            }
        }
    }
    return false;
};

const logger = {
};

logger.setUpLogger = (url = '', logData = []) => {
    if (shouldSkipLogByUrl(url)) return;
    for (let item of logData) {
        addLog(item);
    }
};

module.exports = logger;