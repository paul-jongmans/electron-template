const { version } = require('../package.json');

module.exports = () => {
    console.info(`Software Version ${version}`);
};
