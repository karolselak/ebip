//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}
_xhttpPrint = function(method, url, data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(JSON.parse(xhttp.responseText))        
        console.log(xhttp);
    };
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('accept', 'application/json')
    xhttp.send(data);

}
JSON.stringifyCircular = function(obj) {
    var cache = [];
    var str = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return 'CIRCULAR';
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    return str;
}
capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
decapitalizeFirstLetter = function(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
