(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
var toString = Object.prototype.toString;
module.exports = function _throwArgumentException(unexpected, expected) {
    throw Error('"' + toString.call(unexpected) + '" is not ' + expected);
};
},{}],2:[function(require,module,exports){
'use strict';
var type = require('./type');
var lastRes = 'undefined';
var lastVal;
module.exports = function _type(val) {
    if (val === lastVal) {
        return lastRes;
    }
    return lastRes = type(lastVal = val);
};
},{"./type":59}],3:[function(require,module,exports){
'use strict';
module.exports = function _unescape(string) {
    return string.replace(/\\(\\)?/g, '$1');
};
},{}],4:[function(require,module,exports){
'use strict';
var isset = require('../isset');
var undefined;
var defineGetter = Object.prototype.__defineGetter__, defineSetter = Object.prototype.__defineSetter__;
function baseDefineProperty(object, key, descriptor) {
    var hasGetter = isset('get', descriptor), hasSetter = isset('set', descriptor), get, set;
    if (hasGetter || hasSetter) {
        if (hasGetter && typeof (get = descriptor.get) !== 'function') {
            throw TypeError('Getter must be a function: ' + get);
        }
        if (hasSetter && typeof (set = descriptor.set) !== 'function') {
            throw TypeError('Setter must be a function: ' + set);
        }
        if (isset('writable', descriptor)) {
            throw TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
        }
        if (defineGetter) {
            if (hasGetter) {
                defineGetter.call(object, key, get);
            }
            if (hasSetter) {
                defineSetter.call(object, key, set);
            }
        } else {
            throw Error('Cannot define getter or setter');
        }
    } else if (isset('value', descriptor)) {
        object[key] = descriptor.value;
    } else if (!isset(key, object)) {
        object[key] = undefined;
    }
    return object;
}
module.exports = baseDefineProperty;
},{"../isset":42}],5:[function(require,module,exports){
'use strict';
module.exports = function baseExec(regexp, string) {
    var result = [], value;
    regexp.lastIndex = 0;
    while (value = regexp.exec(string)) {
        result.push(value);
    }
    return result;
};
},{}],6:[function(require,module,exports){
'use strict';
var callIteratee = require('../call-iteratee'), isset = require('../isset');
module.exports = function baseForEach(arr, fn, ctx, fromRight) {
    var i, j, idx;
    for (i = -1, j = arr.length - 1; j >= 0; --j) {
        if (fromRight) {
            idx = j;
        } else {
            idx = ++i;
        }
        if (isset(idx, arr) && callIteratee(fn, ctx, arr[idx], idx, arr) === false) {
            break;
        }
    }
    return arr;
};
},{"../call-iteratee":15,"../isset":42}],7:[function(require,module,exports){
'use strict';
var callIteratee = require('../call-iteratee');
module.exports = function baseForIn(obj, fn, ctx, fromRight, keys) {
    var i, j, key;
    for (i = -1, j = keys.length - 1; j >= 0; --j) {
        if (fromRight) {
            key = keys[j];
        } else {
            key = keys[++i];
        }
        if (callIteratee(fn, ctx, obj[key], key, obj) === false) {
            break;
        }
    }
    return obj;
};
},{"../call-iteratee":15}],8:[function(require,module,exports){
'use strict';
var isset = require('../isset');
module.exports = function baseGet(obj, path, off) {
    var l = path.length - off, i = 0, key;
    for (; i < l; ++i) {
        key = path[i];
        if (isset(key, obj)) {
            obj = obj[key];
        } else {
            return;
        }
    }
    return obj;
};
},{"../isset":42}],9:[function(require,module,exports){
'use strict';
var baseToIndex = require('./base-to-index');
var indexOf = Array.prototype.indexOf, lastIndexOf = Array.prototype.lastIndexOf;
function baseIndexOf(arr, search, fromIndex, fromRight) {
    var l, i, j, idx, val;
    if (search === search && (idx = fromRight ? lastIndexOf : indexOf)) {
        return idx.call(arr, search, fromIndex);
    }
    l = arr.length;
    if (!l) {
        return -1;
    }
    j = l - 1;
    if (typeof fromIndex !== 'undefined') {
        fromIndex = baseToIndex(fromIndex, l);
        if (fromRight) {
            j = Math.min(j, fromIndex);
        } else {
            j = Math.max(0, fromIndex);
        }
        i = j - 1;
    } else {
        i = -1;
    }
    for (; j >= 0; --j) {
        if (fromRight) {
            idx = j;
        } else {
            idx = ++i;
        }
        val = arr[idx];
        if (val === search || search !== search && val !== val) {
            return idx;
        }
    }
    return -1;
}
module.exports = baseIndexOf;
},{"./base-to-index":13}],10:[function(require,module,exports){
'use strict';
var baseIndexOf = require('./base-index-of');
var support = require('../support/support-keys');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var k, fixKeys;
if (support === 'not-supported') {
    k = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    fixKeys = function fixKeys(keys, object) {
        var i, key;
        for (i = k.length - 1; i >= 0; --i) {
            if (baseIndexOf(keys, key = k[i]) < 0 && hasOwnProperty.call(object, key)) {
                keys.push(key);
            }
        }
        return keys;
    };
}
module.exports = function baseKeys(object) {
    var keys = [];
    var key;
    for (key in object) {
        if (hasOwnProperty.call(object, key)) {
            keys.push(key);
        }
    }
    if (support !== 'not-supported') {
        return keys;
    }
    return fixKeys(keys, object);
};
},{"../support/support-keys":54,"./base-index-of":9}],11:[function(require,module,exports){
'use strict';
var get = require('./base-get');
module.exports = function baseProperty(object, path) {
    if (object != null) {
        if (path.length > 1) {
            return get(object, path, 0);
        }
        return object[path[0]];
    }
};
},{"./base-get":8}],12:[function(require,module,exports){
'use strict';
module.exports = function baseRandom(lower, upper) {
    return lower + Math.random() * (upper - lower);
};
},{}],13:[function(require,module,exports){
'use strict';
module.exports = function baseToIndex(v, l) {
    if (!l || !v) {
        return 0;
    }
    if (v < 0) {
        v += l;
    }
    return v || 0;
};
},{}],14:[function(require,module,exports){
'use strict';
var _throwArgumentException = require('./_throw-argument-exception');
var defaultTo = require('./default-to');
module.exports = function before(n, fn) {
    var value;
    if (typeof fn !== 'function') {
        _throwArgumentException(fn, 'a function');
    }
    n = defaultTo(n, 1);
    return function () {
        if (--n >= 0) {
            value = fn.apply(this, arguments);
        }
        return value;
    };
};
},{"./_throw-argument-exception":1,"./default-to":24}],15:[function(require,module,exports){
'use strict';
module.exports = function callIteratee(fn, ctx, val, key, obj) {
    if (typeof ctx === 'undefined') {
        return fn(val, key, obj);
    }
    return fn.call(ctx, val, key, obj);
};
},{}],16:[function(require,module,exports){
'use strict';
var baseExec = require('./base/base-exec'), _unescape = require('./_unescape'), isKey = require('./is-key'), toKey = require('./to-key'), _type = require('./_type');
var rProperty = /(^|\.)\s*([_a-z]\w*)\s*|\[\s*((?:-)?(?:\d+|\d*\.\d+)|("|')(([^\\]\\(\\\\)*|[^\4])*)\4)\s*\]/gi;
function stringToPath(str) {
    var path = baseExec(rProperty, str), i = path.length - 1, val;
    for (; i >= 0; --i) {
        val = path[i];
        if (val[2]) {
            path[i] = val[2];
        } else if (val[5] != null) {
            path[i] = _unescape(val[5]);
        } else {
            path[i] = val[3];
        }
    }
    return path;
}
function castPath(val) {
    var path, l, i;
    if (isKey(val)) {
        return [toKey(val)];
    }
    if (_type(val) === 'array') {
        path = Array(l = val.length);
        for (i = l - 1; i >= 0; --i) {
            path[i] = toKey(val[i]);
        }
    } else {
        path = stringToPath('' + val);
    }
    return path;
}
module.exports = castPath;
},{"./_type":2,"./_unescape":3,"./base/base-exec":5,"./is-key":34,"./to-key":57}],17:[function(require,module,exports){
'use strict';
module.exports = function clamp(value, lower, upper) {
    if (value >= upper) {
        return upper;
    }
    if (value <= lower) {
        return lower;
    }
    return value;
};
},{}],18:[function(require,module,exports){
'use strict';
var create = require('./create'), getPrototypeOf = require('./get-prototype-of'), toObject = require('./to-object'), each = require('./each'), isObjectLike = require('./is-object-like');
module.exports = function clone(deep, target, guard) {
    var cln;
    if (typeof target === 'undefined' || guard) {
        target = deep;
        deep = true;
    }
    cln = create(getPrototypeOf(target = toObject(target)));
    each(target, function (value, key, target) {
        if (value === target) {
            this[key] = this;
        } else if (deep && isObjectLike(value)) {
            this[key] = clone(deep, value);
        } else {
            this[key] = value;
        }
    }, cln);
    return cln;
};
},{"./create":20,"./each":27,"./get-prototype-of":30,"./is-object-like":36,"./to-object":58}],19:[function(require,module,exports){
'use strict';
module.exports = {
    ERR: {
        INVALID_ARGS: 'Invalid arguments',
        FUNCTION_EXPECTED: 'Expected a function',
        STRING_EXPECTED: 'Expected a string',
        UNDEFINED_OR_NULL: 'Cannot convert undefined or null to object',
        REDUCE_OF_EMPTY_ARRAY: 'Reduce of empty array with no initial value',
        NO_PATH: 'No path was given'
    },
    MAX_ARRAY_LENGTH: 4294967295,
    MAX_SAFE_INT: 9007199254740991,
    MIN_SAFE_INT: -9007199254740991,
    DEEP: 1,
    DEEP_KEEP_FN: 2,
    PLACEHOLDER: {}
};
},{}],20:[function(require,module,exports){
'use strict';
var defineProperties = require('./define-properties');
var setPrototypeOf = require('./set-prototype-of');
var isPrimitive = require('./is-primitive');
function C() {
}
module.exports = Object.create || function create(prototype, descriptors) {
    var object;
    if (prototype !== null && isPrimitive(prototype)) {
        throw TypeError('Object prototype may only be an Object or null: ' + prototype);
    }
    C.prototype = prototype;
    object = new C();
    C.prototype = null;
    if (prototype === null) {
        setPrototypeOf(object, null);
    }
    if (arguments.length >= 2) {
        defineProperties(object, descriptors);
    }
    return object;
};
},{"./define-properties":26,"./is-primitive":39,"./set-prototype-of":52}],21:[function(require,module,exports){
'use strict';
var baseForEach = require('../base/base-for-each'), baseForIn = require('../base/base-for-in'), isArrayLike = require('../is-array-like'), toObject = require('../to-object'), iteratee = require('../iteratee').iteratee, keys = require('../keys');
module.exports = function createEach(fromRight) {
    return function each(obj, fn, ctx) {
        obj = toObject(obj);
        fn = iteratee(fn);
        if (isArrayLike(obj)) {
            return baseForEach(obj, fn, ctx, fromRight);
        }
        return baseForIn(obj, fn, ctx, fromRight, keys(obj));
    };
};
},{"../base/base-for-each":6,"../base/base-for-in":7,"../is-array-like":32,"../iteratee":43,"../keys":44,"../to-object":58}],22:[function(require,module,exports){
'use strict';
module.exports = function createGetElementDimension(name) {
    return function (e) {
        var v, b, d;
        if (e.window === e) {
            v = Math.max(e['inner' + name] || 0, e.document.documentElement['client' + name]);
        } else if (e.nodeType === 9) {
            b = e.body;
            d = e.documentElement;
            v = Math.max(b['scroll' + name], d['scroll' + name], b['offset' + name], d['offset' + name], b['client' + name], d['client' + name]);
        } else {
            v = e['client' + name];
        }
        return v;
    };
};
},{}],23:[function(require,module,exports){
'use strict';
var castPath = require('../cast-path'), noop = require('../noop');
module.exports = function createProperty(baseProperty, useArgs) {
    return function (path) {
        var args;
        if (!(path = castPath(path)).length) {
            return noop;
        }
        if (useArgs) {
            args = Array.prototype.slice.call(arguments, 1);
        }
        return function (object) {
            return baseProperty(object, path, args);
        };
    };
};
},{"../cast-path":16,"../noop":47}],24:[function(require,module,exports){
'use strict';
module.exports = function defaultTo(value, defaultValue) {
    if (value != null && value === value) {
        return value;
    }
    return defaultValue;
};
},{}],25:[function(require,module,exports){
'use strict';
var mixin = require('./mixin'), clone = require('./clone');
module.exports = function defaults(defaults, object) {
    if (object == null) {
        return clone(true, defaults);
    }
    return mixin(true, clone(true, defaults), object);
};
},{"./clone":18,"./mixin":46}],26:[function(require,module,exports){
'use strict';
var support = require('./support/support-define-property');
var defineProperties, baseDefineProperty, isPrimitive, each;
if (support !== 'full') {
    isPrimitive = require('./is-primitive');
    each = require('./each');
    baseDefineProperty = require('./base/base-define-property');
    defineProperties = function defineProperties(object, descriptors) {
        if (support !== 'not-supported') {
            try {
                return Object.defineProperties(object, descriptors);
            } catch (e) {
            }
        }
        if (isPrimitive(object)) {
            throw TypeError('defineProperties called on non-object');
        }
        if (isPrimitive(descriptors)) {
            throw TypeError('Property description must be an object: ' + descriptors);
        }
        each(descriptors, function (descriptor, key) {
            if (isPrimitive(descriptor)) {
                throw TypeError('Property description must be an object: ' + descriptor);
            }
            baseDefineProperty(this, key, descriptor);
        }, object);
        return object;
    };
} else {
    defineProperties = Object.defineProperties;
}
module.exports = defineProperties;
},{"./base/base-define-property":4,"./each":27,"./is-primitive":39,"./support/support-define-property":53}],27:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-each')();
},{"./create/create-each":21}],28:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-get-element-dimension')('Height');
},{"./create/create-get-element-dimension":22}],29:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-get-element-dimension')('Width');
},{"./create/create-get-element-dimension":22}],30:[function(require,module,exports){
'use strict';
var ERR = require('./constants').ERR;
var toString = Object.prototype.toString;
module.exports = Object.getPrototypeOf || function getPrototypeOf(obj) {
    var prototype;
    if (obj == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    prototype = obj.__proto__;
    if (typeof prototype !== 'undefined') {
        return prototype;
    }
    if (toString.call(obj.constructor) === '[object Function]') {
        return obj.constructor.prototype;
    }
    return obj;
};
},{"./constants":19}],31:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like'), isLength = require('./is-length'), isWindowLike = require('./is-window-like');
module.exports = function isArrayLikeObject(value) {
    return isObjectLike(value) && isLength(value.length) && !isWindowLike(value);
};
},{"./is-length":35,"./is-object-like":36,"./is-window-like":41}],32:[function(require,module,exports){
'use strict';
var isLength = require('./is-length'), isWindowLike = require('./is-window-like');
module.exports = function isArrayLike(value) {
    if (value == null) {
        return false;
    }
    if (typeof value === 'object') {
        return isLength(value.length) && !isWindowLike(value);
    }
    return typeof value === 'string';
};
},{"./is-length":35,"./is-window-like":41}],33:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like'), isLength = require('./is-length');
var toString = {}.toString;
module.exports = Array.isArray || function isArray(value) {
    return isObjectLike(value) && isLength(value.length) && toString.call(value) === '[object Array]';
};
},{"./is-length":35,"./is-object-like":36}],34:[function(require,module,exports){
'use strict';
var _type = require('./_type');
var rDeepKey = /(^|[^\\])(\\\\)*(\.|\[)/;
function isKey(val) {
    var type;
    if (!val) {
        return true;
    }
    if (_type(val) === 'array') {
        return false;
    }
    type = typeof val;
    if (type === 'number' || type === 'boolean' || _type(val) === 'symbol') {
        return true;
    }
    return !rDeepKey.test(val);
}
module.exports = isKey;
},{"./_type":2}],35:[function(require,module,exports){
'use strict';
var MAX_ARRAY_LENGTH = require('./constants').MAX_ARRAY_LENGTH;
module.exports = function isLength(value) {
    return typeof value === 'number' && value >= 0 && value <= MAX_ARRAY_LENGTH && value % 1 === 0;
};
},{"./constants":19}],36:[function(require,module,exports){
'use strict';
module.exports = function isObjectLike(value) {
    return !!value && typeof value === 'object';
};
},{}],37:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like');
var toString = {}.toString;
module.exports = function isObject(value) {
    return isObjectLike(value) && toString.call(value) === '[object Object]';
};
},{"./is-object-like":36}],38:[function(require,module,exports){
'use strict';
var getPrototypeOf = require('./get-prototype-of');
var isObject = require('./is-object');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var toString = Function.prototype.toString;
var OBJECT = toString.call(Object);
module.exports = function isPlainObject(v) {
    var p, c;
    if (!isObject(v)) {
        return false;
    }
    p = getPrototypeOf(v);
    if (p === null) {
        return true;
    }
    if (!hasOwnProperty.call(p, 'constructor')) {
        return false;
    }
    c = p.constructor;
    return typeof c === 'function' && toString.call(c) === OBJECT;
};
},{"./get-prototype-of":30,"./is-object":37}],39:[function(require,module,exports){
'use strict';
module.exports = function isPrimitive(value) {
    return !value || typeof value !== 'object' && typeof value !== 'function';
};
},{}],40:[function(require,module,exports){
'use strict';
var type = require('./type');
module.exports = function isSymbol(value) {
    return type(value) === 'symbol';
};
},{"./type":59}],41:[function(require,module,exports){
'use strict';
var isObjectLike = require('./is-object-like');
module.exports = function isWindowLike(value) {
    return isObjectLike(value) && value.window === value;
};
},{"./is-object-like":36}],42:[function(require,module,exports){
'use strict';
module.exports = function isset(key, obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[key] !== 'undefined' || key in obj;
};
},{}],43:[function(require,module,exports){
'use strict';
var isArrayLikeObject = require('./is-array-like-object'), matchesProperty = require('./matches-property'), property = require('./property');
exports.iteratee = function iteratee(value) {
    if (typeof value === 'function') {
        return value;
    }
    if (isArrayLikeObject(value)) {
        return matchesProperty(value);
    }
    return property(value);
};
},{"./is-array-like-object":31,"./matches-property":45,"./property":50}],44:[function(require,module,exports){
'use strict';
var baseKeys = require('./base/base-keys');
var toObject = require('./to-object');
var support = require('./support/support-keys');
if (support !== 'es2015') {
    module.exports = function keys(v) {
        var _keys;
        if (support === 'es5') {
            _keys = Object.keys;
        } else {
            _keys = baseKeys;
        }
        return _keys(toObject(v));
    };
} else {
    module.exports = Object.keys;
}
},{"./base/base-keys":10,"./support/support-keys":54,"./to-object":58}],45:[function(require,module,exports){
'use strict';
var castPath = require('./cast-path'), get = require('./base/base-get'), ERR = require('./constants').ERR;
module.exports = function matchesProperty(property) {
    var path = castPath(property[0]), value = property[1];
    if (!path.length) {
        throw Error(ERR.NO_PATH);
    }
    return function (object) {
        if (object == null) {
            return false;
        }
        if (path.length > 1) {
            return get(object, path, 0) === value;
        }
        return object[path[0]] === value;
    };
};
},{"./base/base-get":8,"./cast-path":16,"./constants":19}],46:[function(require,module,exports){
'use strict';
var isPlainObject = require('./is-plain-object');
var toObject = require('./to-object');
var isArray = require('./is-array');
var keys = require('./keys');
module.exports = function mixin(deep, object) {
    var l = arguments.length;
    var i = 2;
    var names, exp, j, k, val, key, nowArray, src;
    if (typeof deep !== 'boolean') {
        object = deep;
        deep = true;
        i = 1;
    }
    if (i === l) {
        object = this;
        --i;
    }
    object = toObject(object);
    for (; i < l; ++i) {
        names = keys(exp = toObject(arguments[i]));
        for (j = 0, k = names.length; j < k; ++j) {
            val = exp[key = names[j]];
            if (deep && val !== exp && (isPlainObject(val) || (nowArray = isArray(val)))) {
                src = object[key];
                if (nowArray) {
                    if (!isArray(src)) {
                        src = [];
                    }
                    nowArray = false;
                } else if (!isPlainObject(src)) {
                    src = {};
                }
                object[key] = mixin(true, src, val);
            } else {
                object[key] = val;
            }
        }
    }
    return object;
};
},{"./is-array":33,"./is-plain-object":38,"./keys":44,"./to-object":58}],47:[function(require,module,exports){
'use strict';
module.exports = function noop() {
};
},{}],48:[function(require,module,exports){
'use strict';
module.exports = Date.now || function now() {
    return new Date().getTime();
};
},{}],49:[function(require,module,exports){
'use strict';
var before = require('./before');
module.exports = function once(target) {
    return before(1, target);
};
},{"./before":14}],50:[function(require,module,exports){
'use strict';
module.exports = require('./create/create-property')(require('./base/base-property'));
},{"./base/base-property":11,"./create/create-property":23}],51:[function(require,module,exports){
'use strict';
var baseRandom = require('./base/base-random');
module.exports = function random(lower, upper, floating) {
    if (typeof lower === 'undefined') {
        floating = false;
        upper = 1;
        lower = 0;
    } else if (typeof upper === 'undefined') {
        if (typeof lower === 'boolean') {
            floating = lower;
            upper = 1;
        } else {
            floating = false;
            upper = lower;
        }
        lower = 0;
    } else if (typeof floating === 'undefined') {
        if (typeof upper === 'boolean') {
            floating = upper;
            upper = lower;
            lower = 0;
        } else {
            floating = false;
        }
    }
    if (floating || lower % 1 || upper % 1) {
        return baseRandom(lower, upper);
    }
    return Math.round(baseRandom(lower, upper));
};
},{"./base/base-random":12}],52:[function(require,module,exports){
'use strict';
var isPrimitive = require('./is-primitive'), ERR = require('./constants').ERR;
module.exports = Object.setPrototypeOf || function setPrototypeOf(target, prototype) {
    if (target == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    if (prototype !== null && isPrimitive(prototype)) {
        throw TypeError('Object prototype may only be an Object or null: ' + prototype);
    }
    if ('__proto__' in target) {
        target.__proto__ = prototype;
    }
    return target;
};
},{"./constants":19,"./is-primitive":39}],53:[function(require,module,exports){
'use strict';
var support;
function test(target) {
    try {
        if ('' in Object.defineProperty(target, '', {})) {
            return true;
        }
    } catch (e) {
    }
    return false;
}
if (test({})) {
    support = 'full';
} else if (typeof document !== 'undefined' && test(document.createElement('span'))) {
    support = 'dom';
} else {
    support = 'not-supported';
}
module.exports = support;
},{}],54:[function(require,module,exports){
'use strict';
var support;
if (Object.keys) {
    try {
        support = Object.keys(''), 'es2015';
    } catch (e) {
        support = 'es5';
    }
} else if ({ toString: null }.propertyIsEnumerable('toString')) {
    support = 'not-supported';
} else {
    support = 'has-a-bug';
}
module.exports = support;
},{}],55:[function(require,module,exports){
'use strict';
var timestamp = require('./timestamp');
var requestAF, cancelAF;
if (typeof window !== 'undefined') {
    cancelAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame;
    requestAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
}
var noRequestAnimationFrame = !requestAF || !cancelAF || typeof navigator !== 'undefined' && /iP(ad|hone|od).*OS\s6/.test(navigator.userAgent);
if (noRequestAnimationFrame) {
    var lastRequestTime = 0, frameDuration = 1000 / 60;
    exports.request = function request(animate) {
        var now = timestamp(), nextRequestTime = Math.max(lastRequestTime + frameDuration, now);
        return setTimeout(function () {
            lastRequestTime = nextRequestTime;
            animate(now);
        }, nextRequestTime - now);
    };
    exports.cancel = clearTimeout;
} else {
    exports.request = function request(animate) {
        return requestAF(animate);
    };
    exports.cancel = function cancel(id) {
        return cancelAF(id);
    };
}
},{"./timestamp":56}],56:[function(require,module,exports){
'use strict';
var now = require('./now');
var navigatorStart;
if (typeof performance === 'undefined' || !performance.now) {
    navigatorStart = now();
    module.exports = function timestamp() {
        return now() - navigatorStart;
    };
} else {
    module.exports = function timestamp() {
        return performance.now();
    };
}
},{"./now":48}],57:[function(require,module,exports){
'use strict';
var _unescape = require('./_unescape'), isSymbol = require('./is-symbol');
module.exports = function toKey(val) {
    var key;
    if (typeof val === 'string') {
        return _unescape(val);
    }
    if (isSymbol(val)) {
        return val;
    }
    key = '' + val;
    if (key === '0' && 1 / val === -Infinity) {
        return '-0';
    }
    return _unescape(key);
};
},{"./_unescape":3,"./is-symbol":40}],58:[function(require,module,exports){
'use strict';
var ERR = require('./constants').ERR;
module.exports = function toObject(value) {
    if (value == null) {
        throw TypeError(ERR.UNDEFINED_OR_NULL);
    }
    return Object(value);
};
},{"./constants":19}],59:[function(require,module,exports){
'use strict';
var create = require('./create');
var toString = {}.toString, types = create(null);
module.exports = function getType(value) {
    var type, tag;
    if (value === null) {
        return 'null';
    }
    type = typeof value;
    if (type !== 'object' && type !== 'function') {
        return type;
    }
    type = types[tag = toString.call(value)];
    if (type) {
        return type;
    }
    return types[tag] = tag.slice(8, -1).toLowerCase();
};
},{"./create":20}],60:[function(require,module,exports){
'use strict';

var LightEmitter = require( 'light_emitter' );

/**
 * @constructor Controls
 * @extends {LightEmitter}
 * @event Controls#touchstart
 * @event Controls#touchend
 */
function Controls ()
{

  var self = this;

  LightEmitter.apply( this, arguments );

  function touchstart ( event )
  {
    self.emit( 'touchstart', event, ! event.type.indexOf( 'key' ) );
  }

  window.addEventListener( 'touchstart', touchstart );
  window.addEventListener( 'mousedown', touchstart );

  function keydown ( event )
  {
    if ( event.which === 32 ) {
      touchstart( event );
    }
  }

  window.addEventListener( 'keydown', keydown );

  function touchend ( event )
  {
    self.emit( 'touchend', event, ! event.type.indexOf( 'key' ) );
  }

  window.addEventListener( 'touchend', touchend );
  window.addEventListener( 'mouseup', touchend );

  function keyup ( event )
  {
    if ( event.which === 32 ) {
      touchend( event );
    }
  }

  window.addEventListener( 'keyup', keyup );
}

LightEmitter.prototype = Object.create( LightEmitter.prototype );
LightEmitter.prototype.constructor = LightEmitter;

module.exports = Controls;

},{"light_emitter":66}],61:[function(require,module,exports){
'use strict';

var LightEmitter = require( 'light_emitter' );

var Controls     = require( './Controls' );

/**
 * @constructor Game
 * @extends {LightEmitter}
 */
function Game ()
{
  LightEmitter.apply( this, arguments );
  this.controls = new Controls();
  this.shapes   = [];
  this.pipes    = [];
}

Game.prototype = Object.create( LightEmitter.prototype );
Game.prototype.constructor = Game;

module.exports = Game;

},{"./Controls":60,"light_emitter":66}],62:[function(require,module,exports){
'use strict';

var Vector2D = require( 'v6.js/math/Vector2D' );
var random   = require( 'peako/random' );

var renderer = require( './objects/renderer' );
var ticker   = require( './objects/ticker' );
var game     = require( './objects/game' );

var position = new Vector2D( renderer.w * 0.5, renderer.h * 0.5 );

controls.on( 'touchstart', function ( event, keyboard )
{
  if ( keyboard ) {
    console.log( 'pressed on a keyboard' ); // jshint ignore: line
  } else {
    console.log( 'touched on a screen' ); // jshint ignore: line
  }
} );

ticker.on( 'render', function ()
{
  renderer.background( 0 );
  renderer.fill( 255 );
  renderer.stroke( 'lightpink' );
  renderer.lineWidth( 5 );
  renderer.polygon( position.x, position.y, 20, 3 );
} );

ticker.on( 'update', function ( elapsedTime )
{
  var v = 50;
  var x = random( -v, v ) * elapsedTime;
  var y = random( -v, v ) * elapsedTime;
  position.add( x, y );
} );

ticker.start();

},{"./objects/game":63,"./objects/renderer":64,"./objects/ticker":65,"peako/random":51,"v6.js/math/Vector2D":91}],63:[function(require,module,exports){
'use strict';

var Game = require( '../core/Game' );

module.exports = new Game();

},{"../core/Game":61}],64:[function(require,module,exports){
'use strict';

var createRenderer  = require( 'v6.js/create_renderer' );
var constants       = require( 'v6.js/constants' );

module.exports = createRenderer( { mode: constants.get( 'RENDERER_AUTO' ) } );

},{"v6.js/constants":78,"v6.js/create_renderer":79}],65:[function(require,module,exports){
'use strict';

var Ticker = require( 'v6.js/Ticker' );

module.exports = new Ticker();

},{"v6.js/Ticker":72}],66:[function(require,module,exports){
'use strict';

/**
 * A lightweight implementation of Node.js EventEmitter.
 * @constructor LightEmitter
 * @example
 * var LightEmitter = require( 'light_emitter' );
 */
function LightEmitter () {}

LightEmitter.prototype = {
  /**
   * @method LightEmitter#emit
   * @param {string} type
   * @param {...any} [data]
   * @chainable
   */
  emit: function emit ( type ) {
    var list = _getList( this, type );
    var data, i, l;

    if ( ! list ) {
      return this;
    }

    if ( arguments.length > 1 ) {
      data = [].slice.call( arguments, 1 );
    }

    for ( i = 0, l = list.length; i < l; ++i ) {
      if ( ! list[ i ].active ) {
        continue;
      }

      if ( list[ i ].once ) {
        list[ i ].active = false;
      }

      if ( data ) {
        list[ i ].listener.apply( this, data );
      } else {
        list[ i ].listener.call( this );
      }
    }

    return this;
  },

  /**
   * @method LightEmitter#off
   * @param {string}   [type]
   * @param {function} [listener]
   * @chainable
   */
  off: function off ( type, listener ) {
    var list, i;

    if ( ! type ) {
      this._events = null;
    } else if ( ( list = _getList( this, type ) ) ) {
      if ( listener ) {
        for ( i = list.length - 1; i >= 0; --i ) {
          if ( list[ i ].listener === listener && list[ i ].active ) {
            list[ i ].active = false;
          }
        }
      } else {
        list.length = 0;
      }
    }

    return this;
  },

  /**
   * @method LightEmitter#on
   * @param {string}   type
   * @param {function} listener
   * @chainable
   */
  on: function on ( type, listener ) {
    _on( this, type, listener );
    return this;
  },

  /**
   * @method LightEmitter#once
   * @param {string}   type
   * @param {function} listener
   * @chainable
   */
  once: function once ( type, listener ) {
    _on( this, type, listener, true );
    return this;
  },

  constructor: LightEmitter
};

/**
 * @private
 * @method _on
 * @param  {LightEmitter} self
 * @param  {string}       type
 * @param  {function}     listener
 * @param  {boolean}      once
 * @return {void}
 */
function _on ( self, type, listener, once ) {
  var entity = {
    listener: listener,
    active:   true,
    type:     type,
    once:     once
  };

  if ( ! self._events ) {
    self._events = Object.create( null );
  }

  if ( ! self._events[ type ] ) {
    self._events[ type ] = [];
  }

  self._events[ type ].push( entity );
}

/**
 * @private
 * @method _getList
 * @param  {LightEmitter}   self
 * @param  {string}         type
 * @return {array<object>?}
 */
function _getList ( self, type ) {
  return self._events && self._events[ type ];
}

module.exports = LightEmitter;

},{}],67:[function(require,module,exports){
(function (global){
/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 * Copyright 2011-2013 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (rhino) {
          try {
            version = context.require('ringo/engine').version.join('.');
            name = 'RingoJS';
          } catch(e) {
            if ((data = context.system) && data.global.system == context.system) {
              name = 'Narwhal';
              os || (os = data[0].os || null);
            }
          }
          if (!name) {
            name = 'Rhino';
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          }
          if (!name) {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version);
            version = version ? version[0] : null;
          }
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    define(function() {
      return platform;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],68:[function(require,module,exports){
'use strict';
var isObjectLike = require('peako/is-object-like');
var getElementW = require('peako/get-element-w');
var getElementH = require('peako/get-element-h');
var setDefaultDrawingSettings = require('./internal/set_default_drawing_settings');
var getWebGL = require('./internal/get_webgl');
var copyDrawingSettings = require('./internal/copy_drawing_settings');
var createPolygon = require('./internal/create_polygon');
var polygons = require('./internal/polygons');
var constants = require('./constants');
var options = require('./options');
function AbstractRenderer(options, type) {
    var context;
    if (options.canvas) {
        this.canvas = options.canvas;
    } else {
        this.canvas = document.createElement('canvas');
        this.canvas.innerHTML = 'Unable to run this application.';
    }
    if (typeof options.append === 'undefined' || options.append) {
        this.append();
    }
    if (type === constants.RENDERER_2D) {
        context = '2d';
    } else if (type !== constants.RENDERER_GL) {
        throw Error('Got unknown renderer type. The known are: `v6.constants.RENDERER_2D` and `v6.constants.RENDERER_GL`');
    } else if (!(context = getWebGL())) {
        throw Error('Cannot get WebGL context. Try to use `v6.constants.RENDERER_2D` as the renderer type or `v6.Renderer2D` instead of `v6.RendererGL`');
    }
    this.context = this.canvas.getContext(context, { alpha: options.alpha });
    this.settings = options.settings;
    this.type = type;
    this._stack = [];
    this._stackIndex = -1;
    this._vertices = [];
    if ('w' in options || 'h' in options) {
        this.resize(options.w, options.h);
    } else {
        this.resizeTo(window);
    }
    setDefaultDrawingSettings(this, this);
}
AbstractRenderer.prototype = {
    append: function append(parent) {
        (parent || document.body).appendChild(this.canvas);
        return this;
    },
    destroy: function destroy() {
        this.canvas.parentNode.removeChild(this.canvas);
        return this;
    },
    push: function push() {
        if (this._stack[++this._stackIndex]) {
            copyDrawingSettings(this._stack[this._stackIndex], this);
        } else {
            this._stack.push(setDefaultDrawingSettings({}, this));
        }
        return this;
    },
    pop: function pop() {
        if (this._stackIndex >= 0) {
            copyDrawingSettings(this, this._stack[this._stackIndex--]);
        } else {
            setDefaultDrawingSettings(this, this);
        }
        return this;
    },
    resize: function resize(w, h) {
        var canvas = this.canvas;
        var scale = this.settings.scale;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = this.w = Math.floor(w * scale);
        canvas.height = this.h = Math.floor(h * scale);
        return this;
    },
    resizeTo: function resizeTo(element) {
        return this.resize(getElementW(element), getElementH(element));
    },
    rescale: function rescale() {
        return this.resizeTo(this.canvas);
    },
    background: function background(r, g, b, a) {
        if (isObjectLike(r)) {
            return this.backgroundImage(r);
        }
        return this.backgroundColor(r, g, b, a);
    },
    _polygon: function _polygon(x, y, rx, ry, n, a, degrees) {
        var polygon = polygons[n];
        var matrix = this.matrix;
        if (!polygon) {
            polygon = polygons[n] = createPolygon(n);
        }
        if (degrees) {
            a *= Math.PI / 180;
        }
        matrix.save();
        matrix.translate(x, y);
        matrix.rotate(a);
        this.vertices(polygon, polygon.length * 0.5, null, rx, ry);
        matrix.restore();
        return this;
    },
    polygon: function polygon(x, y, r, n, a) {
        if (n % 1) {
            n = Math.floor(n * 100) * 0.01;
        }
        if (typeof a !== 'undefined') {
            this._polygon(x, y, r, r, n, a, options.degrees);
        } else {
            this._polygon(x, y, r, r, n, -Math.PI * 0.5);
        }
        return this;
    },
    lineWidth: function lineWidth(number) {
        this._lineW = number;
        return this;
    },
    stroke: create$1('_stroke', '_strokeColor', '_doStroke'),
    fill: create$1('_fill', '_fillColor', '_doFill'),
    setTransform: function setTransform(m11, m12, m21, m22, dx, dy) {
        var position, zoom;
        if (typeof m11 === 'object') {
            position = m11.position;
            zoom = m11.zoom;
            this.matrix.setTransform(zoom, 0, 0, zoom, position[0] * zoom, position[1] * zoom);
        } else {
            this.matrix.setTransform(m11, m12, m21, m22, dx, dy);
        }
        return this;
    },
    transform: function transform(m11, m12, m21, m22, dx, dy) {
        this.matrix.transform(m11, m12, m21, m22, dx, dy);
        return this;
    },
    constructor: AbstractRenderer
};
function create$1(_$var, _$varcolor, _do$var) {
    return function (r, g, b, a) {
        if (typeof r === 'undefined') {
            this[_$var]();
        } else if (typeof r !== 'boolean') {
            if (typeof r === 'string' || this[_$varcolor].type !== this.settings.color.type) {
                this[_$varcolor] = new this.settings.color(r, g, b, a);
            } else {
                this[_$varcolor].set(r, g, b, a);
            }
            this[_do$var] = true;
        } else {
            this[_do$var] = r;
        }
        return this;
    };
}
[
    'transform',
    'translate',
    'restore',
    'scale',
    'save'
].forEach(function (name) {
    AbstractRenderer.prototype[name] = Function('a, b, c, d, e, f', 'return this.matrix.' + name + '( a, b, c, d, e, f ), this;');
});
module.exports = AbstractRenderer;
},{"./constants":78,"./internal/copy_drawing_settings":81,"./internal/create_polygon":82,"./internal/get_webgl":86,"./internal/polygons":87,"./internal/set_default_drawing_settings":88,"./options":92,"peako/get-element-h":28,"peako/get-element-w":29,"peako/is-object-like":36}],69:[function(require,module,exports){
'use strict';
var defaults = require('peako/defaults');
var constants = require('./constants');
var AbstractRenderer = require('./AbstractRenderer');
var _options = require('./options');
var align = require('./internal/align');
function Renderer2D(options) {
    options = defaults(_options, options);
    AbstractRenderer.call(this, options, constants.RENDERER_2D);
    this.matrix = this.context;
    this._beginPath = false;
}
Renderer2D.prototype = Object.create(AbstractRenderer.prototype);
Renderer2D.prototype.constructor = Renderer2D;
Renderer2D.prototype.backgroundColor = function backgroundColor(r, g, b, a) {
    var context = this.context;
    context.save();
    context.setTransform(this.settings.scale, 0, 0, this.settings.scale, 0, 0);
    context.fillStyle = new this.settings.color(r, g, b, a);
    context.fillRect(0, 0, this.w, this.h);
    context.restore();
    return this;
};
Renderer2D.prototype.backgroundImage = function backgroundImage(image) {
    var _rectAlignX = this._rectAlignX, _rectAlignY = this._rectAlignY;
    this._rectAlignX = constants.CENTER;
    this._rectAlignY = constants.MIDDLE;
    this.image(image, this.w * 0.5, this.h * 0.5);
    this._rectAlignX = _rectAlignX;
    this._rectAlignY = _rectAlignY;
    return this;
};
Renderer2D.prototype.image = function image(image, x, y, w, h) {
    if (image.get().loaded) {
        if (typeof w === 'undefined') {
            w = image.dw;
        }
        if (typeof h === 'undefined') {
            h = image.dh;
        }
        x = Math.floor(align(x, w, this._rectAlignX));
        y = Math.floor(align(y, h, this._rectAlignY));
        this.context.drawImage(image.get().image, image.x, image.y, image.w, image.h, x, y, w, h);
    }
    return this;
};
Renderer2D.prototype.clear = function clear(x, y, w, h) {
    if (typeof x === 'undefined') {
        x = y = 0;
        w = this.w;
        h = this.h;
    } else {
        x = Math.floor(align(x, w, this._rectAlignX));
        y = Math.floor(align(y, h, this._rectAlignY));
    }
    this.context.clearRect(x, y, w, h);
    return this;
};
Renderer2D.prototype.rect = function rect(x, y, w, h) {
    x = Math.floor(align(x, w, this._rectAlignX));
    y = Math.floor(align(y, h, this._rectAlignY));
    if (this._beginPath) {
        this.context.rect(x, y, w, h);
    } else {
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        if (this._doFill) {
            this._fill();
        }
        if (this._doStroke) {
            this._stroke();
        }
    }
    return this;
};
Renderer2D.prototype.arc = function arc(x, y, r) {
    if (this._beginPath) {
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
    } else {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
        if (this._doFill) {
            this._fill();
        }
        if (this._doStroke) {
            this._stroke(true);
        }
    }
    return this;
};
Renderer2D.prototype.vertices = function vertices(verts, count, _mode, _sx, _sy) {
    var context = this.context, i;
    if (count < 2) {
        return this;
    }
    if (_sx == null) {
        _sx = _sy = 1;
    }
    context.beginPath();
    context.moveTo(verts[0] * _sx, verts[1] * _sy);
    for (i = 2, count *= 2; i < count; i += 2) {
        context.lineTo(verts[i] * _sx, verts[i + 1] * _sy);
    }
    if (this._doFill) {
        this._fill();
    }
    if (this._doStroke && this._lineW > 0) {
        this._stroke(true);
    }
    return this;
};
Renderer2D.prototype._fill = function _fill() {
    this.context.fillStyle = this._fillColor;
    this.context.fill();
};
Renderer2D.prototype._stroke = function (close) {
    var context = this.context;
    if (close) {
        context.closePath();
    }
    context.strokeStyle = this._strokeColor;
    if ((context.lineWidth = this._lineWidth) <= 1) {
        context.stroke();
    }
    context.stroke();
};
module.exports = Renderer2D;
},{"./AbstractRenderer":68,"./constants":78,"./internal/align":80,"./options":92,"peako/defaults":25}],70:[function(require,module,exports){
'use strict';
var defaults = require('peako/defaults');
var align = require('./internal/align');
var AbstractRenderer = require('./AbstractRenderer');
var ShaderProgram = require('./ShaderProgram');
var Transform = require('./Transform');
var constants = require('./constants');
var shaders = require('./shaders');
var options_ = require('./options');
var square = new Float32Array([
        0,
        0,
        1,
        0,
        1,
        1,
        0,
        1
    ]);
function RendererGL(options) {
    AbstractRenderer.call(this, options = defaults(options_, options), constants.RENDERER_GL);
    this.matrix = new Transform();
    this.buffers = {
        default: this.context.createBuffer(),
        square: this.context.createBuffer()
    };
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffers.square);
    this.context.bufferData(this.context.ARRAY_BUFFER, square, this.context.STATIC_DRAW);
    this.programs = { default: new ShaderProgram(shaders.basic, this.context) };
    this.blending(options.blending);
}
RendererGL.prototype = Object.create(AbstractRenderer.prototype);
RendererGL.prototype.constructor = RendererGL;
RendererGL.prototype.resize = function resize(w, h) {
    AbstractRenderer.prototype.resize.call(this, w, h);
    this.context.viewport(0, 0, this.w, this.h);
    return this;
};
RendererGL.prototype.blending = function blending(blending) {
    var gl = this.context;
    if (blending) {
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);
    } else {
        gl.disable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }
    return this;
};
RendererGL.prototype._clear = function _clear(r, g, b, a) {
    var gl = this.context;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};
RendererGL.prototype.backgroundColor = function backgroundColor(r, g, b, a) {
    var rgba = new this.settings.color(r, g, b, a).rgba();
    this._clear(rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, rgba[3]);
    return this;
};
RendererGL.prototype.clear = function clear() {
    this._clear(0, 0, 0, 0);
    return this;
};
RendererGL.prototype.vertices = function vertices(verts, count, mode, _sx, _sy) {
    var program = this.programs.default;
    var gl = this.context;
    if (count < 2) {
        return this;
    }
    if (verts) {
        if (mode == null) {
            mode = gl.STATIC_DRAW;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.default);
        gl.bufferData(gl.ARRAY_BUFFER, verts, mode);
    }
    if (_sx != null) {
        this.matrix.scale(_sx, _sy);
    }
    program.use().setUniform('utransform', this.matrix.matrix).setUniform('ures', [
        this.w,
        this.h
    ]).pointer('apos', 2, gl.FLOAT, false, 0, 0);
    if (this._doFill) {
        program.setUniform('ucolor', this._fillColor.rgba());
        gl.drawArrays(gl.TRIANGLE_FAN, 0, count);
    }
    if (this._doStroke && this._lineWidth > 0) {
        program.setUniform('ucolor', this._strokeColor.rgba());
        gl.lineWidth(this._lineWidth);
        gl.drawArrays(gl.LINE_LOOP, 0, count);
    }
    return this;
};
RendererGL.prototype.arc = function arc(x, y, r) {
    return this._polygon(x, y, r, r, 24, 0);
};
RendererGL.prototype.rect = function rect(x, y, w, h) {
    var alignedX = align(x, w, this._rectAlignX);
    var alignedY = align(y, h, this._rectAlignY);
    this.matrix.save();
    this.matrix.translate(alignedX, alignedY);
    this.matrix.scale(w, h);
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffers.rect);
    this.vertices(null, 4);
    this.matrix.restore();
    return this;
};
module.exports = RendererGL;
},{"./AbstractRenderer":68,"./ShaderProgram":71,"./Transform":73,"./constants":78,"./internal/align":80,"./options":92,"./shaders":95,"peako/defaults":25}],71:[function(require,module,exports){
'use strict';
var createProgram = require('./internal/create_program');
var createShader = require('./internal/create_shader');
function ShaderProgram(sources, gl) {
    var vert = createShader(sources.vert, gl.VERTEX_SHADER, gl);
    var frag = createShader(sources.frag, gl.FRAGMENT_SHADER, gl);
    this._program = createProgram(vert, frag, gl);
    this._gl = gl;
    this._uniforms = {};
    this._attrs = {};
    this._uniformIndex = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
    this._attrIndex = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
}
ShaderProgram.prototype = {
    use: function use() {
        this._gl.useProgram(this._program);
        return this;
    },
    pointer: function pointer(name, size, type, normalized, stride, offset) {
        var location = this.getAttr(name).location;
        this._gl.enableVertexAttribArray(location);
        this._gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        return this;
    },
    getUniform: function getUniform(name) {
        var uniform = this._uniforms[name];
        var info, index;
        if (uniform) {
            return uniform;
        }
        while (--this._uniformIndex >= 0) {
            info = this._gl.getActiveUniform(this._program, this._uniformIndex);
            uniform = {
                location: this._gl.getUniformLocation(this._program, info.name),
                size: info.size,
                type: info.type
            };
            if (info.size > 1 && ~(index = info.name.indexOf('['))) {
                uniform.name = info.name.slice(0, index);
            } else {
                uniform.name = info.name;
            }
            this._uniforms[uniform.name] = uniform;
            if (uniform.name === name) {
                return uniform;
            }
        }
        throw ReferenceError('No "' + name + '" uniform found');
    },
    getAttr: function getAttr(name) {
        var attr = this._attrs[name];
        if (attr) {
            return attr;
        }
        while (--this._attrIndex >= 0) {
            attr = this._gl.getActiveAttrib(this._program, this._attrIndex);
            attr.location = this._gl.getAttribLocation(this._program, name);
            this._attrs[name] = attr;
            if (attr.name === name) {
                return attr;
            }
        }
        throw ReferenceError('No "' + name + '" attribute found');
    },
    constructor: ShaderProgram
};
ShaderProgram.prototype.setUniform = function setUniform(name, value) {
    var uniform = this.getUniform(name);
    var _gl = this._gl;
    switch (uniform.type) {
    case _gl.BOOL:
    case _gl.INT:
        if (uniform.size > 1) {
            _gl.uniform1iv(uniform.location, value);
        } else {
            _gl.uniform1i(uniform.location, value);
        }
        break;
    case _gl.FLOAT:
        if (uniform.size > 1) {
            _gl.uniform1fv(uniform.location, value);
        } else {
            _gl.uniform1f(uniform.location, value);
        }
        break;
    case _gl.FLOAT_MAT2:
        _gl.uniformMatrix2fv(uniform.location, false, value);
        break;
    case _gl.FLOAT_MAT3:
        _gl.uniformMatrix3fv(uniform.location, false, value);
        break;
    case _gl.FLOAT_MAT4:
        _gl.uniformMatrix4fv(uniform.location, false, value);
        break;
    case _gl.FLOAT_VEC2:
        if (uniform.size > 1) {
            _gl.uniform2fv(uniform.location, value);
        } else {
            _gl.uniform2f(uniform.location, value[0], value[1]);
        }
        break;
    case _gl.FLOAT_VEC3:
        if (uniform.size > 1) {
            _gl.uniform3fv(uniform.location, value);
        } else {
            _gl.uniform3f(uniform.location, value[0], value[1], value[2]);
        }
        break;
    case _gl.FLOAT_VEC4:
        if (uniform.size > 1) {
            _gl.uniform4fv(uniform.location, value);
        } else {
            _gl.uniform4f(uniform.location, value[0], value[1], value[2], value[3]);
        }
        break;
    default:
        throw TypeError('The uniform type is not supported');
    }
    return this;
};
module.exports = ShaderProgram;
},{"./internal/create_program":83,"./internal/create_shader":84}],72:[function(require,module,exports){
'use strict';
var LightEmitter = require('light_emitter');
var timestamp = require('peako/timestamp');
var timer = require('peako/timer');
function Ticker() {
    var self = this;
    LightEmitter.call(this);
    this.lastRequestAnimationFrameID = 0;
    this.lastRequestTime = 0;
    this.skippedTime = 0;
    this.totalTime = 0;
    this.running = false;
    function start(_now) {
        var elapsedTime;
        if (!self.running) {
            if (!_now) {
                self.lastRequestAnimationFrameID = timer.request(start);
                self.lastRequestTime = timestamp();
                self.running = true;
            }
            return this;
        }
        if (!_now) {
            _now = timestamp();
        }
        elapsedTime = Math.min(1, (_now - self.lastRequestTime) * 0.001);
        self.skippedTime += elapsedTime;
        self.totalTime += elapsedTime;
        while (self.skippedTime >= self.step && self.running) {
            self.skippedTime -= self.step;
            self.emit('update', self.step, _now);
        }
        self.emit('render', elapsedTime, _now);
        self.lastRequestTime = _now;
        self.lastRequestAnimationFrameID = timer.request(start);
        return this;
    }
    this.start = start;
    this.fps(60);
}
Ticker.prototype = Object.create(LightEmitter.prototype);
Ticker.prototype.constructor = Ticker;
Ticker.prototype.fps = function fps(fps) {
    this.step = 1 / fps;
    return this;
};
Ticker.prototype.clear = function clear() {
    this.skippedTime = 0;
    return this;
};
Ticker.prototype.stop = function stop() {
    this.running = false;
    return this;
};
module.exports = Ticker;
},{"light_emitter":66,"peako/timer":55,"peako/timestamp":56}],73:[function(require,module,exports){
'use strict';
var mat3 = require('./mat3');
function Transform() {
    this.matrix = mat3.identity();
    this._index = -1;
    this._stack = [];
}
Transform.prototype = {
    save: function save() {
        if (++this._index < this._stack.length) {
            mat3.copy(this._stack[this._index], this.matrix);
        } else {
            this._stack.push(mat3.clone(this.matrix));
        }
    },
    restore: function restore() {
        if (this._index >= 0) {
            mat3.copy(this.matrix, this._stack[this._index--]);
        } else {
            mat3.setIdentity(this.matrix);
        }
    },
    setTransform: function setTransform(m11, m12, m21, m22, dx, dy) {
        mat3.setTransform(this.matrix, m11, m12, m21, m22, dx, dy);
    },
    translate: function translate(x, y) {
        mat3.translate(this.matrix, x, y);
    },
    rotate: function rotate(angle) {
        mat3.rotate(this.matrix, angle);
    },
    scale: function scale(x, y) {
        mat3.scale(this.matrix, x, y);
    },
    transform: function transform(m11, m12, m21, m22, dx, dy) {
        mat3.transform(this.matrix, m11, m12, m21, m22, dx, dy);
    },
    constructor: Transform
};
module.exports = Transform;
},{"./mat3":89}],74:[function(require,module,exports){
'use strict';
module.exports = HSLA;
var clamp = require('peako/clamp');
var RGBA = require('./RGBA');
var parse = require('./internal/parse');
function HSLA(h, s, l, a) {
    this.set(h, s, l, a);
}
HSLA.prototype = {
    perceivedBrightness: function perceivedBrightness() {
        return this.rgba().perceivedBrightness();
    },
    luminance: function luminance() {
        return this.rgba().luminance();
    },
    brightness: function brightness() {
        return this.rgba().brightness();
    },
    toString: function toString() {
        return 'hsla(' + this[0] + ', ' + this[1] + '%, ' + this[2] + '%, ' + this[3] + ')';
    },
    set: function set(h, s, l, a) {
        switch (true) {
        case typeof h === 'string':
            h = parse(h);
        case typeof h === 'object' && h != null:
            if (h.type !== this.type) {
                h = h[this.type]();
            }
            this[0] = h[0];
            this[1] = h[1];
            this[2] = h[2];
            this[3] = h[3];
            break;
        default:
            switch (void 0) {
            case h:
                a = 1;
                l = s = h = 0;
                break;
            case s:
                a = 1;
                l = Math.floor(h);
                s = h = 0;
                break;
            case l:
                a = s;
                l = Math.floor(h);
                s = h = 0;
                break;
            case a:
                a = 1;
            default:
                h = Math.floor(h);
                s = Math.floor(s);
                l = Math.floor(l);
            }
            this[0] = h;
            this[1] = s;
            this[2] = l;
            this[3] = a;
        }
        return this;
    },
    rgba: function rgba() {
        var rgba = new RGBA();
        var h = this[0] % 360 / 360, s = this[1] * 0.01, l = this[2] * 0.01;
        var tr = h + 1 / 3, tg = h, tb = h - 1 / 3;
        var q;
        if (l < 0.5) {
            q = l * (1 + s);
        } else {
            q = l + s - l * s;
        }
        var p = 2 * l - q;
        if (tr < 0) {
            ++tr;
        }
        if (tg < 0) {
            ++tg;
        }
        if (tb < 0) {
            ++tb;
        }
        if (tr > 1) {
            --tr;
        }
        if (tg > 1) {
            --tg;
        }
        if (tb > 1) {
            --tb;
        }
        rgba[0] = foo(tr, p, q);
        rgba[1] = foo(tg, p, q);
        rgba[2] = foo(tb, p, q);
        rgba[3] = this[3];
        return rgba;
    },
    lerp: function lerp(h, s, l, value) {
        var color = new HSLA();
        color[0] = h;
        color[1] = s;
        color[2] = l;
        return this.lerpColor(color, value);
    },
    lerpColor: function lerpColor(color, value) {
        return this.rgba().lerpColor(color, value).hsla();
    },
    shade: function shade(value) {
        var hsla = new HSLA();
        hsla[0] = this[0];
        hsla[1] = this[1];
        hsla[2] = clamp(this[2] + value, 0, 100);
        hsla[3] = this[3];
        return hsla;
    },
    constructor: HSLA,
    type: 'hsla'
};
function foo(t, p, q) {
    if (t < 1 / 6) {
        return Math.round((p + (q - p) * 6 * t) * 255);
    }
    if (t < 0.5) {
        return Math.round(q * 255);
    }
    if (t < 2 / 3) {
        return Math.round((p + (q - p) * (2 / 3 - t) * 6) * 255);
    }
    return Math.round(p * 255);
}
},{"./RGBA":75,"./internal/parse":77,"peako/clamp":17}],75:[function(require,module,exports){
'use strict';
module.exports = RGBA;
var HSLA = require('./HSLA');
var parse = require('./internal/parse');
function RGBA(r, g, b, a) {
    this.set(r, g, b, a);
}
RGBA.prototype = {
    perceivedBrightness: function perceivedBrightness() {
        var r = this[0], g = this[1], b = this[2];
        return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
    },
    luminance: function luminance() {
        return this[0] * 0.2126 + this[1] * 0.7152 + this[2] * 0.0722;
    },
    brightness: function brightness() {
        return 0.299 * this[0] + 0.587 * this[1] + 0.114 * this[2];
    },
    toString: function toString() {
        return 'rgba(' + this[0] + ', ' + this[1] + ', ' + this[2] + ', ' + this[3] + ')';
    },
    set: function set(r, g, b, a) {
        switch (true) {
        case typeof r === 'string':
            r = parse(r);
        case typeof r === 'object' && r != null:
            if (r.type !== this.type) {
                r = r[this.type]();
            }
            this[0] = r[0];
            this[1] = r[1];
            this[2] = r[2];
            this[3] = r[3];
            break;
        default:
            switch (void 0) {
            case r:
                a = 1;
                b = g = r = 0;
                break;
            case g:
                a = 1;
                b = g = r = Math.floor(r);
                break;
            case b:
                a = g;
                b = g = r = Math.floor(r);
                break;
            case a:
                a = 1;
            default:
                r = Math.floor(r);
                g = Math.floor(g);
                b = Math.floor(b);
            }
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this[3] = a;
        }
        return this;
    },
    hsla: function hsla() {
        var hsla = new HSLA();
        var r = this[0] / 255, g = this[1] / 255, b = this[2] / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var l = (max + min) * 50, h, s;
        var diff = max - min;
        if (diff) {
            if (l > 50) {
                s = diff / (2 - max - min);
            } else {
                s = diff / (max + min);
            }
            switch (max) {
            case r:
                if (g < b) {
                    h = 1.0472 * (g - b) / diff + 6.2832;
                } else {
                    h = 1.0472 * (g - b) / diff;
                }
                break;
            case g:
                h = 1.0472 * (b - r) / diff + 2.0944;
                break;
            default:
                h = 1.0472 * (r - g) / diff + 4.1888;
            }
            h = Math.round(h * 360 / 6.2832);
            s = Math.round(s * 100);
        } else {
            h = s = 0;
        }
        hsla[0] = h;
        hsla[1] = s;
        hsla[2] = Math.round(l);
        hsla[3] = this[3];
        return hsla;
    },
    rgba: function rgba() {
        return this;
    },
    lerp: function lerp(r, g, b, value) {
        r = lerp(this[0], r, value);
        g = lerp(this[0], g, value);
        b = lerp(this[0], b, value);
        return new RGBA(r, g, b, this[3]);
    },
    lerpColor: function lerpColor(color, value) {
        var r, g, b;
        if (typeof color !== 'object') {
            color = parse(color);
        }
        if (color.type !== 'rgba') {
            color = color.rgba();
        }
        r = color[0];
        g = color[1];
        b = color[2];
        return this.lerp(r, g, b, value);
    },
    shade: function shade(value) {
        return this.hsla().shade(value).rgba();
    },
    constructor: RGBA,
    type: 'rgba'
};
},{"./HSLA":74,"./internal/parse":77}],76:[function(require,module,exports){
'use strict';
module.exports = {
    aliceblue: 'f0f8ffff',
    antiquewhite: 'faebd7ff',
    aqua: '00ffffff',
    aquamarine: '7fffd4ff',
    azure: 'f0ffffff',
    beige: 'f5f5dcff',
    bisque: 'ffe4c4ff',
    black: '000000ff',
    blanchedalmond: 'ffebcdff',
    blue: '0000ffff',
    blueviolet: '8a2be2ff',
    brown: 'a52a2aff',
    burlywood: 'deb887ff',
    cadetblue: '5f9ea0ff',
    chartreuse: '7fff00ff',
    chocolate: 'd2691eff',
    coral: 'ff7f50ff',
    cornflowerblue: '6495edff',
    cornsilk: 'fff8dcff',
    crimson: 'dc143cff',
    cyan: '00ffffff',
    darkblue: '00008bff',
    darkcyan: '008b8bff',
    darkgoldenrod: 'b8860bff',
    darkgray: 'a9a9a9ff',
    darkgreen: '006400ff',
    darkkhaki: 'bdb76bff',
    darkmagenta: '8b008bff',
    darkolivegreen: '556b2fff',
    darkorange: 'ff8c00ff',
    darkorchid: '9932ccff',
    darkred: '8b0000ff',
    darksalmon: 'e9967aff',
    darkseagreen: '8fbc8fff',
    darkslateblue: '483d8bff',
    darkslategray: '2f4f4fff',
    darkturquoise: '00ced1ff',
    darkviolet: '9400d3ff',
    deeppink: 'ff1493ff',
    deepskyblue: '00bfffff',
    dimgray: '696969ff',
    dodgerblue: '1e90ffff',
    feldspar: 'd19275ff',
    firebrick: 'b22222ff',
    floralwhite: 'fffaf0ff',
    forestgreen: '228b22ff',
    fuchsia: 'ff00ffff',
    gainsboro: 'dcdcdcff',
    ghostwhite: 'f8f8ffff',
    gold: 'ffd700ff',
    goldenrod: 'daa520ff',
    gray: '808080ff',
    green: '008000ff',
    greenyellow: 'adff2fff',
    honeydew: 'f0fff0ff',
    hotpink: 'ff69b4ff',
    indianred: 'cd5c5cff',
    indigo: '4b0082ff',
    ivory: 'fffff0ff',
    khaki: 'f0e68cff',
    lavender: 'e6e6faff',
    lavenderblush: 'fff0f5ff',
    lawngreen: '7cfc00ff',
    lemonchiffon: 'fffacdff',
    lightblue: 'add8e6ff',
    lightcoral: 'f08080ff',
    lightcyan: 'e0ffffff',
    lightgoldenrodyellow: 'fafad2ff',
    lightgrey: 'd3d3d3ff',
    lightgreen: '90ee90ff',
    lightpink: 'ffb6c1ff',
    lightsalmon: 'ffa07aff',
    lightseagreen: '20b2aaff',
    lightskyblue: '87cefaff',
    lightslateblue: '8470ffff',
    lightslategray: '778899ff',
    lightsteelblue: 'b0c4deff',
    lightyellow: 'ffffe0ff',
    lime: '00ff00ff',
    limegreen: '32cd32ff',
    linen: 'faf0e6ff',
    magenta: 'ff00ffff',
    maroon: '800000ff',
    mediumaquamarine: '66cdaaff',
    mediumblue: '0000cdff',
    mediumorchid: 'ba55d3ff',
    mediumpurple: '9370d8ff',
    mediumseagreen: '3cb371ff',
    mediumslateblue: '7b68eeff',
    mediumspringgreen: '00fa9aff',
    mediumturquoise: '48d1ccff',
    mediumvioletred: 'c71585ff',
    midnightblue: '191970ff',
    mintcream: 'f5fffaff',
    mistyrose: 'ffe4e1ff',
    moccasin: 'ffe4b5ff',
    navajowhite: 'ffdeadff',
    navy: '000080ff',
    oldlace: 'fdf5e6ff',
    olive: '808000ff',
    olivedrab: '6b8e23ff',
    orange: 'ffa500ff',
    orangered: 'ff4500ff',
    orchid: 'da70d6ff',
    palegoldenrod: 'eee8aaff',
    palegreen: '98fb98ff',
    paleturquoise: 'afeeeeff',
    palevioletred: 'd87093ff',
    papayawhip: 'ffefd5ff',
    peachpuff: 'ffdab9ff',
    peru: 'cd853fff',
    pink: 'ffc0cbff',
    plum: 'dda0ddff',
    powderblue: 'b0e0e6ff',
    purple: '800080ff',
    red: 'ff0000ff',
    rosybrown: 'bc8f8fff',
    royalblue: '4169e1ff',
    saddlebrown: '8b4513ff',
    salmon: 'fa8072ff',
    sandybrown: 'f4a460ff',
    seagreen: '2e8b57ff',
    seashell: 'fff5eeff',
    sienna: 'a0522dff',
    silver: 'c0c0c0ff',
    skyblue: '87ceebff',
    slateblue: '6a5acdff',
    slategray: '708090ff',
    snow: 'fffafaff',
    springgreen: '00ff7fff',
    steelblue: '4682b4ff',
    tan: 'd2b48cff',
    teal: '008080ff',
    thistle: 'd8bfd8ff',
    tomato: 'ff6347ff',
    turquoise: '40e0d0ff',
    violet: 'ee82eeff',
    violetred: 'd02090ff',
    wheat: 'f5deb3ff',
    white: 'ffffffff',
    whitesmoke: 'f5f5f5ff',
    yellow: 'ffff00ff',
    yellowgreen: '9acd32ff',
    transparent: '00000000'
};
},{}],77:[function(require,module,exports){
'use strict';
module.exports = parse;
var RGBA = require('../RGBA');
var HSLA = require('../HSLA');
var colors = require('./colors');
var parsed = Object.create(null);
var TRANSPARENT = [
        0,
        0,
        0,
        0
    ];
var regexps = {
        hex3: /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/,
        hex: /^#([0-9a-f]{6})([0-9a-f]{2})?$/,
        rgb: /^rgb\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*\)$|^\s*rgba\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\s*\)$/,
        hsl: /^hsl\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\u0025\s*\)$|^\s*hsla\s*\(\s*(\d+|\d*\.\d+)\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\u0025\s*,\s*(\d+|\d*\.\d+)\s*\)$/
    };
function parse(string) {
    var cache = parsed[string] || parsed[string = string.trim().toLowerCase()];
    if (!cache) {
        if (cache = colors[string]) {
            cache = new ColorData(parseHex(cache), RGBA);
        } else if ((cache = regexps.hex.exec(string)) || (cache = regexps.hex3.exec(string))) {
            cache = new ColorData(parseHex(formatHex(cache)), RGBA);
        } else if (cache = regexps.rgb.exec(string)) {
            cache = new ColorData(compactMatch(cache), RGBA);
        } else if (cache = regexps.hsl.exec(string)) {
            cache = new ColorData(compactMatch(cache), HSLA);
        } else {
            throw SyntaxError(string + ' is not a valid syntax');
        }
        parsed[string] = cache;
    }
    return new cache.color(cache[0], cache[1], cache[2], cache[3]);
}
function formatHex(match) {
    var r, g, b, a;
    if (match.length === 3) {
        return match[1] + (match[2] || 'ff');
    }
    r = match[1];
    g = match[2];
    b = match[3];
    a = match[4] || 'f';
    return r + r + g + g + b + b + a + a;
}
function parseHex(hex) {
    if (hex == 0) {
        return TRANSPARENT;
    }
    hex = parseInt(hex, 16);
    return [
        hex >> 24 & 255,
        hex >> 16 & 255,
        hex >> 8 & 255,
        (hex & 255) / 255
    ];
}
function compactMatch(match) {
    if (match[7]) {
        return [
            +match[4],
            +match[5],
            +match[6],
            +match[7]
        ];
    }
    return [
        +match[1],
        +match[2],
        +match[3]
    ];
}
function ColorData(match, color) {
    this[0] = match[0];
    this[1] = match[1];
    this[2] = match[2];
    this[3] = match[3];
    this.color = color;
}
},{"../HSLA":74,"../RGBA":75,"./colors":76}],78:[function(require,module,exports){
'use strict';
module.exports = {
    RENDERER_AUTO: 1,
    RENDERER_GL: 2,
    RENDERER_2D: 3,
    BOTTOM: 7,
    RIGHT: 8,
    LEFT: 9,
    TOP: 10,
    CENTER: 11,
    MIDDLE: 12
};
},{}],79:[function(require,module,exports){
'use strict';
var getRendererType = require('./internal/get_renderer_type');
var getWebGL = require('./internal/get_webgl');
var RendererGL = require('./RendererGL');
var Renderer2D = require('./Renderer2D');
var constants = require('./constants');
var report = require('./report');
var type = require('./options').type;
function createRenderer(options) {
    var type_ = options && options.type || type;
    if (type_ === constants.RENDERER_AUTO) {
        type_ = getRendererType();
    }
    if (type_ === constants.RENDERER_GL) {
        if (getWebGL()) {
            return new RendererGL(options);
        }
        report('Cannot create WebGL context. Falling back to 2D.');
    }
    if (type_ === constants.RENDERER_2D || type_ === constants.RENDERER_GL) {
        return new Renderer2D(options);
    }
    throw Error('Got unknown renderer type. The known are: `v6.constants.RENDERER_2D` and `v6.constants.RENDERER_GL`');
}
module.exports = createRenderer;
},{"./Renderer2D":69,"./RendererGL":70,"./constants":78,"./internal/get_renderer_type":85,"./internal/get_webgl":86,"./options":92,"./report":93}],80:[function(require,module,exports){
'use strict';
var constants = require('../constants');
function align(value, width, align) {
    switch (align) {
    case constants.LEFT:
    case constants.TOP:
        return value;
    case constants.CENTER:
    case constants.MIDDLE:
        return value - width * 0.5;
    case constants.RIGHT:
    case constants.BOTTOM:
        return value - width;
    }
    throw Error('Got unknown alignment constant. The known are: `constants.LEFT`, `constants.CENTER`, `constants.RIGHT`, `constants.TOP`, `constants.MIDDLE`, and `constants.BOTTOM`');
}
module.exports = align;
},{"../constants":78}],81:[function(require,module,exports){
'use strict';
function copyDrawingSettings(target, source, deep) {
    if (deep) {
        target._fillColor[0] = source._fillColor[0];
        target._fillColor[1] = source._fillColor[1];
        target._fillColor[2] = source._fillColor[2];
        target._fillColor[3] = source._fillColor[3];
        target._strokeColor[0] = source._strokeColor[0];
        target._strokeColor[1] = source._strokeColor[1];
        target._strokeColor[2] = source._strokeColor[2];
        target._strokeColor[3] = source._strokeColor[3];
    }
    target._rectAlignX = source._rectAlignX;
    target._rectAlignY = source._rectAlignY;
    target._lineWidth = source._lineWidth;
    target._doStroke = source._doStroke;
    target._doFill = source._doFill;
    return target;
}
module.exports = copyDrawingSettings;
},{}],82:[function(require,module,exports){
'use strict';
function createPolygon(sides) {
    var i = Math.floor(sides);
    var step = Math.PI * 2 / sides;
    var vertices = new Float32Array(i * 2 + 2);
    for (; i >= 0; --i) {
        vertices[i * 2] = Math.cos(step * i);
        vertices[1 + i * 2] = Math.sin(step * i);
    }
    return vertices;
}
module.exports = createPolygon;
},{}],83:[function(require,module,exports){
'use strict';
function createProgram(vert, frag, gl) {
    var program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        throw Error('Unable to validate the shader program: ' + gl.getProgramInfoLog(program));
    }
    return program;
}
module.exports = createProgram;
},{}],84:[function(require,module,exports){
'use strict';
function createShader(source, type, gl) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw SyntaxError('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    }
    return shader;
}
module.exports = createShader;
},{}],85:[function(require,module,exports){
'use strict';
var once = require('peako/once');
var constants = require('../constants');
if (typeof platform === 'undefined') {
    var platform;
    try {
        platform = require('platform');
    } catch (error) {
    }
}
function getRendererType() {
    var safari, touchable;
    if (platform) {
        safari = platform.os && platform.os.family === 'iOS' && platform.name === 'Safari';
    }
    if (typeof window !== 'undefined') {
        touchable = 'ontouchend' in window;
    }
    if (touchable && !safari) {
        return constants.RENDERER_GL;
    }
    return constants.RENDERER_2D;
}
module.exports = once(getRendererType);
},{"../constants":78,"peako/once":49,"platform":67}],86:[function(require,module,exports){
'use strict';
var once = require('peako/once');
function getWebGL() {
    var canvas = document.createElement('canvas');
    var name = null;
    if (canvas.getContext('webgl')) {
        name = 'webgl';
    } else if (canvas.getContext('experimental-webgl')) {
        name = 'experimental-webgl';
    }
    canvas = null;
    return name;
}
module.exports = once(getWebGL);
},{"peako/once":49}],87:[function(require,module,exports){
'use strict';
},{}],88:[function(require,module,exports){
'use strict';
var constants = require('../constants');
var copyDrawingSettings = require('./copy_drawing_settings');
var defaultDrawingSettings = {
        _rectAlignX: constants.LEFT,
        _rectAlignY: constants.TOP,
        _lineWidth: 2,
        _doStroke: true,
        _doFill: true
    };
function setDefaultDrawingSettings(target, renderer) {
    copyDrawingSettings(target, defaultDrawingSettings);
    target._strokeColor = new renderer.settings.color();
    target._fillColor = new renderer.settings.color();
    return target;
}
module.exports = setDefaultDrawingSettings;
},{"../constants":78,"./copy_drawing_settings":81}],89:[function(require,module,exports){
'use strict';
exports.identity = function identity() {
    return [
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
    ];
};
exports.setIdentity = function setIdentity(m1) {
    m1[0] = m1[4] = m1[8] = 1;
    m1[1] = m1[2] = m1[3] = m1[5] = m1[6] = m1[7] = 0;
};
exports.copy = function copy(m1, m2) {
    m1[0] = m2[0];
    m1[1] = m2[1];
    m1[2] = m2[2];
    m1[3] = m2[3];
    m1[4] = m2[4];
    m1[5] = m2[5];
    m1[6] = m2[6];
    m1[7] = m2[7];
    m1[8] = m2[8];
};
exports.clone = function clone(m1) {
    return [
        m1[0],
        m1[1],
        m1[2],
        m1[3],
        m1[4],
        m1[5],
        m1[6],
        m1[7],
        m1[8]
    ];
};
exports.translate = function translate(m1, x, y) {
    m1[6] = x * m1[0] + y * m1[3] + m1[6];
    m1[7] = x * m1[1] + y * m1[4] + m1[7];
    m1[8] = x * m1[2] + y * m1[5] + m1[8];
};
exports.rotate = function rotate(m1, angle) {
    var m10 = m1[0], m11 = m1[1], m12 = m1[2], m13 = m1[3], m14 = m1[4], m15 = m1[5];
    var x = Math.cos(angle), y = Math.sin(angle);
    m1[0] = x * m10 + y * m13;
    m1[1] = x * m11 + y * m14;
    m1[2] = x * m12 + y * m15;
    m1[3] = x * m13 - y * m10;
    m1[4] = x * m14 - y * m11;
    m1[5] = x * m15 - y * m12;
};
exports.scale = function scale(m1, x, y) {
    m1[0] *= x;
    m1[1] *= x;
    m1[2] *= x;
    m1[3] *= y;
    m1[4] *= y;
    m1[5] *= y;
};
exports.transform = function transform(m1, m11, m12, m21, m22, dx, dy) {
    m1[0] *= m11;
    m1[1] *= m21;
    m1[2] *= dx;
    m1[3] *= m12;
    m1[4] *= m22;
    m1[5] *= dy;
    m1[6] = 0;
    m1[7] = 0;
};
exports.setTransform = function setTransform(m1, m11, m12, m21, m22, dx, dy) {
    m1[0] = m11;
    m1[1] = m12;
    m1[3] = m21;
    m1[4] = m22;
    m1[6] = dx;
    m1[7] = dy;
};
},{}],90:[function(require,module,exports){
'use strict';
var settings = require('../settings');
function AbstractVector() {
}
AbstractVector.prototype = {
    normalize: function normalize() {
        var mag = this.mag();
        if (mag && mag !== 1) {
            this.div(mag);
        }
        return this;
    },
    setAngle: function setAngle(angle) {
        var mag = this.mag();
        if (settings.degrees) {
            angle *= Math.PI / 180;
        }
        this.x = mag * Math.cos(angle);
        this.y = mag * Math.sin(angle);
        return this;
    },
    setMag: function setMag(value) {
        return this.normalize().mul(value);
    },
    rotate: function rotate(angle) {
        var x = this.x, y = this.y;
        var c, s;
        if (settings.degrees) {
            angle *= Math.PI / 180;
        }
        c = Math.cos(angle);
        s = Math.sin(angle);
        this.x = x * c - y * s;
        this.y = x * s + y * c;
        return this;
    },
    getAngle: function getAngle() {
        if (settings.degrees) {
            return Math.atan2(this.y, this.x) * 180 / Math.PI;
        }
        return Math.atan2(this.y, this.x);
    },
    limit: function limit(value) {
        var mag = this.magSquare();
        if (mag > value * value) {
            this.div(Math.sqrt(mag)).mul(value);
        }
        return this;
    },
    mag: function mag() {
        return Math.sqrt(this.magSquare());
    },
    constructor: AbstractVector
};
module.exports = AbstractVector;
},{"../settings":94}],91:[function(require,module,exports){
'use strict';
var settings = require('../settings');
var AbstractVector = require('./AbstractVector');
function Vector2D(x, y) {
    this.set(x, y);
}
Vector2D.prototype = Object.create(AbstractVector.prototype);
Vector2D.prototype.constructor = Vector2D;
Vector2D.prototype.set = function set(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    return this;
};
Vector2D.prototype.add = function add(x, y) {
    this.x += x || 0;
    this.y += y || 0;
    return this;
};
Vector2D.prototype.sub = function sub(x, y) {
    this.x -= x || 0;
    this.y -= y || 0;
    return this;
};
Vector2D.prototype.mul = function mul(value) {
    this.x *= value;
    this.y *= value;
    return this;
};
Vector2D.prototype.div = function div(value) {
    this.x /= value;
    this.y /= value;
    return this;
};
Vector2D.prototype.dot = function dot(x, y) {
    return this.x * (x || 0) + this.y * (y || 0);
};
Vector2D.prototype.lerp = function (x, y, value) {
    this.x += (x - this.x) * value || 0;
    this.y += (y - this.y) * value || 0;
    return this;
};
Vector2D.prototype.setVector = function setVector(vector) {
    return this.set(vector.x, vector.y);
};
Vector2D.prototype.addVector = function addVector(vector) {
    return this.add(vector.x, vector.y);
};
Vector2D.prototype.subVector = function subVector(vector) {
    return this.sub(vector.x, vector.y);
};
Vector2D.prototype.mulVector = function mulVector(vector) {
    return this.mul(vector.x, vector.y);
};
Vector2D.prototype.divVector = function divVector(vector) {
    return this.div(vector.x, vector.y);
};
Vector2D.prototype.dotVector = function dotVector(vector) {
    return this.dot(vector.x, vector.y);
};
Vector2D.prototype.lerpVector = function lerpVector(vector, value) {
    return this.lerp(vector.x, vector.y, value);
};
Vector2D.prototype.magSquare = function magSquare() {
    return this.x * this.x + this.y * this.y;
};
Vector2D.prototype.clone = function clone() {
    return new Vector2D(this.x, this.y);
};
Vector2D.prototype.dist = function dist(vector) {
    var x = vector.x - this.x;
    var y = vector.y - this.y;
    return Math.sqrt(x * x + y * y);
};
Vector2D.prototype.cross = function cross(vector) {
    return this.x * vector.y - this.y * vector.x;
};
Vector2D.prototype.toString = function toString() {
    return 'Vector2D { ' + this.x.toFixed(2) + ', ' + this.y.toFixed(2) + ' }';
};
Vector2D.random = function random() {
    var value;
    if (settings.degrees) {
        value = 360;
    } else {
        value = Math.PI * 2;
    }
    return Vector2D.fromAngle(Math.random() * value);
};
Vector2D.fromAngle = function fromAngle(angle) {
    if (settings.degrees) {
        angle *= Math.PI / 180;
    }
    return new Vector2D(Math.cos(angle), Math.sin(angle));
};
module.exports = Vector2D;
},{"../settings":94,"./AbstractVector":90}],92:[function(require,module,exports){
'use strict';
var color = require('./colors/RGBA');
var type = require('./constants').RENDERER_2D;
var options = {
        settings: {
            color: color,
            scale: 1
        },
        antialias: true,
        blending: true,
        degrees: false,
        append: true,
        alpha: true,
        type: type
    };
module.exports = options;
},{"./colors/RGBA":75,"./constants":78}],93:[function(require,module,exports){
'use strict';
var report, reported;
if (typeof console !== 'undefined' && console.warn) {
    reported = {};
    report = function report(message) {
        if (reported[message]) {
            return;
        }
        console.warn(message);
        reported[message] = true;
    };
} else {
    report = require('peako/noop');
}
module.exports = report;
},{"peako/noop":47}],94:[function(require,module,exports){
'use strict';
module.exports = { degress: false };
},{}],95:[function(require,module,exports){
'use strict';
var shaders = {
        basic: {
            vert: 'precision mediump float;attribute vec2 apos;uniform vec2 ures;uniform mat3 utransform;void main(){gl_Position=vec4(((utransform*vec3(apos,1.0)).xy/ures*2.0-1.0)*vec2(1,-1),0,1);}',
            frag: 'precision mediump float;uniform vec4 ucolor;void main(){gl_FragColor=vec4(ucolor.rgb/255.0,ucolor.a);}'
        },
        background: {
            vert: 'precision mediump float;attribute vec2 apos;void main(){gl_Position = vec4(apos,0,1);}',
            frag: 'precision mediump float;uniform vec4 ucolor;void main(){gl_FragColor=ucolor;}'
        }
    };
module.exports = shaders;
},{}]},{},[62]);