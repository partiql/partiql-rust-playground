/**
 * Handles the click event for the given event and tab.
 * @param evt the event Object
 * @param tabId the id of the tab element
 */
export function tabClick(evt, tabId) {
    let i, tabContent, tablinks;

    tabContent = document.getElementsByClassName('tab-content');

    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablinks');

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', "");
    }

    document.getElementById(tabId).style.display = 'block';
    evt.currentTarget.className += ' active';

    if (tabId === 'rawjson') {
        document.getElementById('copyToClip').style.display = 'block';
    } else {
        document.getElementById('copyToClip').style.display = 'none';
    }
}

/**
 * Copies the exported-url to the Clipboard.
 */
export function copyUrlClip() {
    copyToClip(document.getElementById('export-url').value);
}

/**
 * Copies the raw-json to the Clipboard.
 */
export function copyRawJsonToClip() {
    copyToClip(document.getElementById('rendered-json').innerText)
}

/**
 * Copies the contents of `rendered-json` tab to clipboard.
 */
export function copyToClip(text) {
    if (text) {
        navigator.clipboard.writeText(text);
        document.getElementById('copyToClip').innerText = 'copied'
    }
}

/**
 * Opens the exported-url in a new window.
 */
export function openNewUrlWindow() {
    openNewWindow(document.getElementById('export-url').value);
}

/**
 * Opens the given URL in a new window or notifies the user if this is blocked by the browser.
 * @param url
 */
export function openNewWindow(url) {
    var win = window.open(url, '_blank');
    if (win) {
        win.focus();
    } else {
        // TODO: use another way than plain alert dialog to notify the user.
        alert('Please allow popups for this website');
    }
}
