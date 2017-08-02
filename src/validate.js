import get from 'oget';
import set from 'o.set';

export default (form) => {
    const { fields, values, opts } = form;

    form.errors = null;
    if (!opts || !opts.validate) {
        return form;
    }

    const errors = opts.validate(values, opts);
    if (!(typeof errors == 'object')) {
        return form;
    }

    Object.keys(fields)
    .forEach(fieldName => {
        const error = get(
            errors, fieldName, errors[fieldName] || null
        );

        if (error) {
            form.errors = form.errors || {};
            set(form.errors, fieldName, error);
        }

        form.fields[fieldName] = {
            ...(fields[fieldName] || {})
            , error
        };
    });

    return form;
};