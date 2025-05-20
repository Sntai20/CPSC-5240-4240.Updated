const which = require('which');

function isChromeInstalled() {
  return !!which.sync('google-chrome', { nothrow: true }) ||
         !!which.sync('chrome', { nothrow: true }) ||
         !!which.sync('chromium', { nothrow: true }) ||
         !!which.sync('chrome.exe', { nothrow: true });
}

function isFirefoxInstalled() {
  return !!which.sync('firefox', { nothrow: true }) ||
         !!which.sync('firefox.exe', { nothrow: true });
}

function isSafariInstalled() {
  // Safari is only available on macOS
  return process.platform === 'darwin' && !!which.sync('safari', { nothrow: true });
}

function isEdgeInstalled() {
  return !!which.sync('microsoft-edge', { nothrow: true }) ||
         !!which.sync('msedge', { nothrow: true }) ||
         !!which.sync('msedge.exe', { nothrow: true });
}

module.exports = function (config) {
  let browsers = [];
  if (isChromeInstalled()) {
    browsers.push('ChromeHeadless');
  } else if (isFirefoxInstalled()) {
    browsers.push('FirefoxHeadless');
  } else if (isSafariInstalled()) {
    browsers.push('Safari');
  } else if (isEdgeInstalled()) {
    browsers.push('EdgeHeadless');
  } else {
    console.warn('No supported browser found. Please install Chrome, Firefox, Safari, or Edge.');
  }

  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: browsers,
  });
};