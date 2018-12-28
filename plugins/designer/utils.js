function decodeJSON (jsonString) {
    var map = { '&lt;': '<', '&gt;': '>', '&quot;': '"', '&amp;': '&', '&#10;': '\n', '&#9;': '\t' }
    return jsonString.replace(
        /&(?:lt|gt|quot|amp|#10|#9);/g,
        function (match) { return map[match] }
    )
}
function encodeJSON (jsonString) {
    var map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', '&': '&amp;', '\n': '&#10;', '\t': '&#9;' }
    return jsonString.replace(
        /(?:<|>|"|&|\n|\t)/g,
        function (match) { return map[match] }
    )
}
function normalizeDirective (directive) {
    var result = {}
    if (typeof directive === 'string') {
        result = JSON.parse(directive.replace(/[']/g, '"'))
    }
    if (directive.value && typeof directive.value === 'string') {
        result.value = JSON.parse(directive.value.replace(/[']/g, '"'))
    }
    result = {
        value: result.value,
        arg: directive.arg,
        modifiers: directive.modifiers,
        mode: 'editable'
    }
    if (!result.modifiers) {
        result.mode = 'editable'
    } else if (result.modifiers.false) {
        result.mode = 'not-editable'
    }

    return result
}

function trimLR(str, left, right) {
    if (left) while (str[0] == left) {
        str = str.substr(1)
    }
    if (right) while (str[str.length - 1] == right) {
        str = str.substr(0, str.length - 1)
    }
    return str
}

function stringTime() {
    var d = new Date()
    return ('0' + d.getHours()).substr(-2)
        + ':' + ('0' + d.getMinutes()).substr(-2)
        + ':' + ('0' + d.getSeconds()).substr(-2)
        + ':' + ('00' + d.getMilliseconds()).substr(-3)
}

function normString (str, len) {
    if (!str) {
        return ''
    }
    len = len || 30
    str += ' '.repeat(len)
    return str.substr(0, len)
}

function isObject (value) {
    return value !== null && !Array.isArray(value) && typeof value == 'object'
}

function objectAssignDeep (target, ...sources) {
    if (!sources.length) {
        return target
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} })
                }
                objectAssignDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return objectAssignDeep(target, ...sources)
}

var _guid = 10
function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    //return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
    //return (S4())
    return _guid++
}

export default {
    decodeJSON,
    encodeJSON,
    guid,
    normalizeDirective,
    stringTime,
    normString,
    trimLR,
    objectAssignDeep,
    isObject
}