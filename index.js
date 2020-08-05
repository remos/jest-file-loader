const path = require('path');
const slash = require('slash');

function createTransformer(transformOptions) {
    const esModule = 
        typeof transformOptions !== 'undefined' && typeof transformOptions.esModule !== 'undefined'
        ? transformOptions.esModule
        : false;

    return {
        process(src, filename, config, options) {
            const exportedPath = JSON.stringify(slash(path.relative(config.rootDir, filename)));
    
            return `${esModule ? 'export default' : 'module.exports ='} ${exportedPath};`;
        }
    }
}

module.exports = {
    ...createTransformer(),
    createTransformer,
};