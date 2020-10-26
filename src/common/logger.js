const { getFormatedData } = require('./utils');
const ERR_LOG_TYPE = 'error';
const REQUEST_LOG_TYPE = 'request';

const getOutputRequestLogString = ({ name, data }) => {
  const notSettedDataPrompt = 'Not set';
  return `Request ${name}: ${getFormatedData(data) || notSettedDataPrompt}`;
};

const getOutputErrorLogString = ({ name, data }) => {
  return `Error ${name}: ${data}`;
};

// TODO: add date stamp
// TODO: log to file
const addLogToConsole = logData => {
  const { type, data } = logData;
  for (const [key, value] of Object.entries(data)) {
    const outputString =
      type === REQUEST_LOG_TYPE
        ? getOutputRequestLogString({ name: key, data: value })
        : getOutputErrorLogString({ name: key, data: value });

    console.info(outputString);
  }
};

const addLog = logData => {
  if (logData.data) {
    addLogToConsole(logData);
  }
};

const shouldSkipLogByUrl = url => {
  const skipLogUrls = ['/doc/'];

  if (url && url.indexOf) {
    for (const skipLogUrl of skipLogUrls) {
      if (url.indexOf(skipLogUrl) > -1) {
        return true;
      }
    }
  }
  return false;
};

const logger = {};

logger.setUpRequestLogger = (url = '', logData = {}) => {
  if (shouldSkipLogByUrl(url)) return;
  logData = {
    type: REQUEST_LOG_TYPE,
    data: {
      ...logData
    }
  };
  addLog(logData);
};

logger.setUpErrorLogger = err => {
  const { code, status, message, stack } = err;
  const logData = {
    type: ERR_LOG_TYPE,
    data: {
      code,
      status,
      message,
      stack
    }
  };
  addLog(logData);
};

module.exports = logger;
