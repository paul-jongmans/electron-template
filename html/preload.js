window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    window.$ = window.jQuery = require('jquery');

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }

    $('#btn-test').click(function () {
        alert('test');
        console.log('lalala');
    });
});
