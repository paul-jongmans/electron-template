const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    window.$ = window.jQuery = require('jquery');

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    $('#minimize').on('click', () => {
        ipcRenderer.send('user-input', 'minimize');
    });

    $('#close').on('click', () => {
        ipcRenderer.send('user-input', 'close');
    });
});
