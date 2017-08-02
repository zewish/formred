import get from 'oget';

export const empty = (fieldType) => {
    if (fieldType == 'checkbox' || fieldType == 'radio') {
        return false;
    }

    return '';
}

export const fromEvent = (ev) => {
    if (!ev || !ev.stopPropagation || !ev.preventDefault) {
        return ev;
    }

    switch (ev.target.type) {
        case 'radio':
        case 'checkbox':
            return ev.target.checked;
        case 'file':
            return ev.target.files || get(ev, 'dataTransfer.files');
    }

    return ev.target.value;
};