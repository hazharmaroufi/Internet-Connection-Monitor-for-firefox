
function updateIcon() {
  if (navigator.onLine) {
    fetch('https://www.mozilla.org/media/img/favicon.ico', { cache: "no-store" })
      .then(response => {
        if (response.ok) {
          browser.browserAction.setIcon({path: "icons/online-48.png"});
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        browser.browserAction.setIcon({path: "icons/offline-48.png"});
      });
  } else {
    browser.browserAction.setIcon({path: "icons/offline-48.png"});
  }
}

browser.alarms.create('checkInternetConnection', { periodInMinutes: 1/12 });
browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkInternetConnection') {
    updateIcon();
  }
});

updateIcon();
