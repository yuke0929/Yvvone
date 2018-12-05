//get data by performance.getEntries()
const getDataFromEntries = (entries) => {
  let dwrTime = dwrRequest = dwrSize = 0;
  let odataTime = odataRequest = odataSize = 0;
  let cssTime = cssRequest = cssSize = 0;
  let jsTime = jsRequest = jsSize = 0;
  let getTileInitializer = getCompletePercent = getInitializer = getLearningTodoDetails = 0;

  entries.forEach((item) => {
    if (item.name.match(/\.dwr$/)) {
      if (item.name.match('homepage3ControllerProxy.getTileInitializer')) {
        getTileInitializer = formatNum(item.duration);
      } else if (item.name.match('myInfoControllerProxy.getCompletePercent')) {
        getCompletePercent = formatNum(item.duration);
      } else if (item.name.match('myInfoControllerProxy.getInitializer')) {
        getInitializer = formatNum(item.duration);
      } else if (item.name.match('hp3TodoPanelControllerProxy.getLearningTodoDetails')) {
        getLearningTodoDetails = formatNum(item.duration);
      }
      dwrTime = dwrTime + Number(item.duration);
      dwrRequest++;
      dwrSize = dwrSize + Number(item.transferSize);
    } else if (item.name.match(/\/odata\//)) {
      odataTime = odataTime + Number(item.duration);
      odataRequest++;
      odataSize = odataSize + Number(item.transferSize);
    } else if (item.name.match(/\.css/)) {
      cssTime = cssTime + Number(item.duration);
      cssRequest++;
      cssSize = cssSize + Number(item.encodedBodySize);
    } else if (item.name.match(/\.js/)) {
      jsTime = jsTime + Number(item.duration);
      jsRequest++;
      jsSize = jsSize + Number(item.encodedBodySize);
    }
  });
  return [formatNum(dwrTime), formatNum(odataTime), formatNum(cssTime), formatNum(jsTime), dwrRequest, odataRequest, cssRequest, jsRequest, dwrSize, odataSize, cssSize, jsSize, getTileInitializer, getCompletePercent, getInitializer, getLearningTodoDetails];
};

//get data from performance.timing
const getDataFromTiming = (timing) => {
  loadTime = formatNum(timing.loadEventEnd - timing.navigationStart); //全部时间
  TTFB = formatNum(timing.responseStart - timing.requestStart); //time to first byte
  //downloadTime: timing.responseEnd - timing.responseStart, //加载html页面时间
  whiteScreenTime = formatNum(timing.domInteractive - timing.navigationStart); //白屏时间
  //domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart, //用户可操作时间
  afterDOMReadyDownloadTime = formatNum(timing.domComplete - timing.domInteractive); //dom完成后资源加载时间
  return [loadTime, TTFB, whiteScreenTime, afterDOMReadyDownloadTime];
};

const formatNum = (number) => {
  return (number / 1000).toFixed(3);
}

module.exports = {
  getDataFromTiming,
  getDataFromEntries,
};