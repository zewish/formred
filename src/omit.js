export default (obj, keys = []) => {
    const omitted = [].concat(keys)
    .reduce((dest, key) => {
        dest[key] = true;
        return dest;
    }, {});

    return Object.keys(obj || {})
    .reduce((dest, key) => {
        if (!omitted[key]) {
            dest[key] = obj[key];
        }

        return dest;
    }, {});
};