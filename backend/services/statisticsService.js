const WhichBrowser = require('which-browser');
const statisticsRepository = require('../repositories/statisticsRepository');

function getUserAgentInfo(uaString) {
  const result = new WhichBrowser(uaString);
  return {
    browser: result.browser.name,
    browserVersion: result.browser.version.toString(),
    os: result.os.toString(),
    deviceType: result.device.type,
  };
}

function parseStatisticsAndUpdate(statistics) {
  const parsedStatistics = Object.assign({}, statistics, getUserAgentInfo(statistics.userAgent));
  return statisticsRepository.updateByVisitorId(parsedStatistics.visitorId, parsedStatistics);
}

function parseStatisticsAndCreate(statistics) {
  const parsedStatistics = Object.assign({}, statistics, getUserAgentInfo(statistics.userAgent));
  return statisticsRepository.parseAndCreate(parsedStatistics);
}

module.exports = {
  parseStatisticsAndUpdate,
  parseStatisticsAndCreate,
};
