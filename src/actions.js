export const PREFIX = '@@formRed'

export const CREATE = `${PREFIX}_CREATE`;
export const DESTROY = `${PREFIX}_DESTROY`;

export const ADD = `${PREFIX}_ADD`;
export const REMOVE = `${PREFIX}_REMOVE`;

export const SET = `${PREFIX}_SET`;
export const SET_ALL = `${PREFIX}_SET_ALL`;

export const TOUCH = `${PREFIX}_TOUCH`;
export const UNTOUCH = `${PREFIX}_UNTOUCH`;
export const TOUCH_ALL = `${PREFIX}_TOUCH_ALL`;
export const UNTOUCH_ALL = `${PREFIX}_UNTOUCH_ALL`;

export const SUBMIT = `${PREFIX}_SUBMIT`;
export const SUBMIT_END = `${PREFIX}_SUBMIT_END`;

export const FORM_ERROR = `${PREFIX}_FORM_ERROR`;
export const FIELD_ERROR = `${PREFIX}_FIELD_ERROR`;

export const RESET = `${PREFIX}_RESET`;

export const create = (formName, opts) => ({
    type: CREATE
    , payload: {
        formName
        , opts
    }
});

export const destroy = formName => ({
    type: DESTROY
    , payload: { formName }
});

export const add = (formName, fieldName, fieldValue, fieldType = 'text') => ({
    type: ADD
    , payload: {
        formName
        , fieldName
        , fieldValue
        , fieldType
    }
});

export const remove = (formName, fieldName) => ({
    type: REMOVE
    , payload: {
        formName
        , fieldName
    }
});

export const set = (formName, fieldName, fieldValue) => ({
    type: SET
    , payload: {
        formName
        , fieldName
        , fieldValue
    }
});

export const setAll = (formName, values) => ({
    type: SET_ALL
    , payload: {
        formName
        , values
    }
});

export const touch = (formName, fieldName) => ({
    type: TOUCH
    , payload: {
        formName
        , fieldName
    }
});

export const untouch = (formName, fieldName) => ({
    type: UNTOUCH
    , payload: {
        formName
        , fieldName
    }
});

export const touchAll = (formName) => ({
    type: TOUCH_ALL
    , payload: { formName }
});

export const untouchAll = (formName) => ({
    type: UNTOUCH_ALL
    , payload: { formName }
});

export const submit = formName => ({
    type: SUBMIT
    , payload: { formName }
});

export const submitEnd = (formName, formError = null, fieldErrors = null) => ({
    type: SUBMIT_END
    , payload: {
        formName
        , formError
        , fieldErrors
    }
});

export const reset = (formName, full = true) => ({
    type: RESET
    , payload: {
        formName
        , full
    }
});

export const formError = (formName, error = null) => ({
    type: FORM_ERROR
    , payload: {
        formName
        , error
    }
});

export const fieldError = (formName, fieldName, error = null) => ({
    type: FIELD_ERROR
    , payload: {
        formName
        , fieldName
        , error
    }
});