import get from 'oget';
import set from 'o.set';
import omit from './omit';

export default (obj, path) => {
    const [ , parentPath, key ] = path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .replace(/^\./, '')
    .split(/(.*[^.])(?:\.)/);

    let parent = get(obj, parentPath);

    if (!parent) {
        return obj;
    }

    if (Array.isArray(parent)) {
        set(parent, key, null);
    }
    else {
        parent = omit(parent, key);
    }

    set(obj, parentPath, parent);
    return obj;
};