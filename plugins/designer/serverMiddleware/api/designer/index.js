const templateEditorApi = require('./templateEditorApi.js')

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
        return result
    } 
    let query = urlString[1].split('&');
    query.forEach(function(element) {
      element = element.split('=');
      result.query[element[0]] = element[1];
    });
    return result;
}

function parceQuery (query) {
    var source = query.source.split('.vue')
    var target = query.target.split('.vue')
    return {
        source: {
            path: source.length == 1 ? null : source[1],
            file: source.length == 1 ? source[0] : source[0] + '.vue',
            type: query.source_type || null
        },
        target: {
            path: target[1],
            file: target[0] + '.vue',
            reverse: query.target_reverse == 'true',
            position: query.target_position
        },
        page: {
            component: query.page_component,
            place: query.page_place
        }
    }
}

export default function (request, response, next) {
    // console.log('API_REQUEST')
    var head = {
        status: 404,
        head: {
            'Content-Type': 'text/plain',
            'charset':'utf-8',
            'X-Powered-By': 'designer'
        },
        body: ''
    }

    var url = parseUrl(request.url)
    switch(url.path) {
        case 'move':
            head.body = templateEditorApi.move(parceQuery(url.query))
            head.status = 200
            break;
        case 'insertComponent':
            head.body = templateEditorApi.insertComponent(parceQuery(url.query))
            head.status = 200
            break
        case 'setComponentSource':

            break
        default:
            throw 'command not found'
    }
    response.writeHead(head.status, head.head)
    if (head.body) {
        response.write(head.body)
    }
    response.end()
}