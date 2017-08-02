import get from 'oget';
import set from 'o.set';
import unset from './unset';
import omit from './omit';
import validate from './validate';
import { empty } from './make-value';

import {
    CREATE
    , DESTROY

    , OPTS
    , VALIDATE

    , ADD
    , REMOVE

    , SET
    , SET_ALL

    , TOUCH
    , UNTOUCH
    , TOUCH_ALL
    , UNTOUCH_ALL

    , SUBMIT
    , SUBMIT_END
    , RESET

    , FORM_ERROR
    , FIELD_ERROR
} from './actions';

const emptyField = {
    touched: false
    , error: null
    , type: 'text'
};

const parseValues = (fields, values = {}) => Object
.keys(fields)
.reduce((obj, fieldName) => {
    if (!get(obj, fieldName)) {
        set(
            obj
            , fieldName
            , empty(fields[fieldName].type)
        );
    }

    return obj;
}, values);

export default (state = {}, { type, payload }) => {
    const formName = get(payload, 'formName')
        , fieldName = get(payload, 'fieldName');

    let form = get(state, `${formName || ''}`, {
        opts: {}
        , fields: {}
        , values: {}
        , submitting: false
        , errors: null
        , error: null
    });

    let fields = get(form, 'fields', {})
        , values = get(form, 'values', {});

    const nextOpts = get(payload, 'opts', {});

    switch (type) {
        case CREATE:
            return {
                ...state
                , [formName]: {
                    ...form
                    , values: nextOpts.values
                      ? parseValues(fields, nextOpts.values)
                      : {}
                    , opts: nextOpts
                }
            };

        case DESTROY:
            return {
                ...omit(state, formName)
            };

        case OPTS:
            return {
                ...state
                , [formName]: {
                    ...form
                    , opts: {
                        ...form.opts
                        , ...nextOpts
                    }
                }
            };

        case VALIDATE:
            return {
                ...state
                , [formName]: {
                    ...validate(form)
                }
            };

        case ADD:
            if (get(values, fieldName) === undefined) {
                set(form.values, `${fieldName}`, payload.fieldValue);
            }

            form.fields = {
                ...fields
                , [fieldName]: fields[fieldName] || {
                    ...emptyField
                    , type: payload.fieldType
                }
            };

            return {
                ...state
                , [formName]: {
                    ...validate(form)
                }
            };

        case REMOVE:
            form.fields = omit(fields, fieldName);
            form.values = unset(values, fieldName);

            return {
                ...state
                , [formName]: {
                    ...validate(form)
                }
            };

        case SET:
            set(form.values, `${fieldName}`, payload.fieldValue);

            return {
                ...state
                , [formName]: {
                    ...validate(form)
                }
            };

        case SET_ALL:
            values = parseValues(fields, payload.values);

            return {
                ...state
                , [formName]: {
                    ...validate({
                        ...form
                        , values
                        , opts: {
                            ...(form.opts || {})
                            , values
                        }
                    })
                }
            };

        case TOUCH:
        case UNTOUCH:
            if (!fields[fieldName]) {
                return state;
            }

            const field = fields[fieldName];
            field.touched = type == TOUCH;

            return {
                ...state
                , [formName]: {
                    ...form
                    , fields: {
                        ...fields
                        , [fieldName]: field
                    }
                }
            };

        case TOUCH_ALL:
        case UNTOUCH_ALL:
            fields = Object.keys(fields).reduce((obj, name) => {
                obj[name] = {
                    ...obj[name]
                    , touched: type == TOUCH_ALL
                };

                return obj;
            }, fields);

            return {
                ...state
                , [formName]: {
                    ...form
                    , fields
                }
            };

        case SUBMIT:
            return {
                ...state
                , [formName]: {
                    ...form
                    , submitting: true
                }
            };

        case SUBMIT_END:
            const { fieldErrors } = payload;

            if (fieldErrors) {
                fields = Object.keys(fields).reduce((obj, fieldName) => {
                    const error = get(fieldErrors, fieldName);

                    if (!error) {
                        return obj;
                    }

                    obj[fieldName].error = error;

                    form.errors = form.errors || {};
                    set(form, `errors.${fieldName}`, payload.error);

                    return obj;
                }, fields);

                form = {
                    ...form, fields
                };
            }

            return {
                ...state
                , [formName]: {
                    ...form
                    , submitting: false
                    , error: payload.formError
                }
            };

        case RESET:
            fields = Object.keys(fields).reduce((obj, field) => {
                obj[field] = {
                    ...emptyField
                    , type: fields[field].type
                };

                return obj;
            }, {});

            values = form.opts.values;

            if (payload.full) {
                values = Object.keys(fields).reduce((obj, field) => {
                    set(
                        obj
                        , field
                        , empty(fields[field].type)
                    );

                    return obj;
                }, {});
            }

            return {
                ...state
                , [formName]: validate({
                    ...form
                    , fields
                    , values
                    , submitting: false
                    , error: null
                })
            };

        case FORM_ERROR:
            return {
                ...state
                , [formName]: {
                    ...form
                    , error: payload.error
                }
            };

        case FIELD_ERROR:
            if (!fields[fieldName]) {
                return state;
            }

            form.fields[fieldName].error = payload.error;
            form.errors = form.errors || {};

            set(form, `errors.${fieldName}`, payload.error);

            return {
                ...state
                , [formName]: { ...form }
            };
    }

    return state;
};
