//const { designer } = require('../designer/designer');
const designerModule = require('../designer/designer');

function parseUrl(urlString) {
    var result = {
        path : null,
        query : {}
    };
    urlString = urlString.split('?');
    result.path = urlString[0];
    if (result.path[0] == '/') {
        result.path = result.path.substr(1);
    }
    if (urlString.length <= 1) {
        return result;
    } 
    let query = urlString[1].split('&');
    query.forEach(function(element) {
      element = element.split('=');
      result.query[element[0]] = element[1];
    });
    return result;
};

module.exports = function (request, response, next) {
    var url = parseUrl(request.url);
    switch(url.path) {
        case 'getComponentSource':
            designerModule.getComponentSource(url, response);
            return;
            break;
        case 'setComponentSource':

          break;
    }
    response.writeHead(404, {
        'Content-Type': 'text/plain',
        'charset':'utf-8',
        'X-Powered-By': 'designer'
    });
    response.write('command not found');
    response.end();
    return;
}