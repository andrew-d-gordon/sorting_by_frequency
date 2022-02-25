// Check if all elements of Array are equal to 'type'
function checkArrayElemType(list, type) {
    if (list === null || list === undefined) return false;
    return list.every(x => (typeof x === type));
}

// Check if all key value pairs of Dict are equal to keyType and valueType
function checkDictPairType(dict, keyType, valueType) {
    if (dict === null || dict === undefined) return false;

    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            // If key or value do not match desired typing, return false
            if (typeof key !== keyType || dict.key !== valueType)
                return false;
        }
    } 

    // All key value pairs match keyType and valueType in dict
    return true;
}

module.exports = { checkArrayElemType, checkDictPairType };