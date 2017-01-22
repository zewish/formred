(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-redux')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-redux'], factory) :
	(factory((global.FormRed = global.FormRed || {}),global.React,global.ReactRedux));
}(this, (function (exports,React,reactRedux) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

var PREFIX = '@@formRed';

var CREATE = PREFIX + '_CREATE';
var DESTROY = PREFIX + '_DESTROY';

var ADD = PREFIX + '_ADD';
var REMOVE = PREFIX + '_REMOVE';

var SET = PREFIX + '_SET';
var SET_ALL = PREFIX + '_SET_ALL';

var TOUCH = PREFIX + '_TOUCH';
var UNTOUCH = PREFIX + '_UNTOUCH';
var TOUCH_ALL = PREFIX + '_TOUCH_ALL';
var UNTOUCH_ALL = PREFIX + '_UNTOUCH_ALL';

var SUBMIT = PREFIX + '_SUBMIT';
var SUBMIT_END = PREFIX + '_SUBMIT_END';

var FORM_ERROR = PREFIX + '_FORM_ERROR';
var FIELD_ERROR = PREFIX + '_FIELD_ERROR';

var RESET = PREFIX + '_RESET';

var create = function create(formName, opts) {
    return {
        type: CREATE,
        payload: {
            formName: formName,
            opts: opts
        }
    };
};

var destroy = function destroy(formName) {
    return {
        type: DESTROY,
        payload: { formName: formName }
    };
};

var add = function add(formName, fieldName, fieldValue) {
    var fieldType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
    return {
        type: ADD,
        payload: {
            formName: formName,
            fieldName: fieldName,
            fieldValue: fieldValue,
            fieldType: fieldType
        }
    };
};

var remove = function remove(formName, fieldName) {
    return {
        type: REMOVE,
        payload: {
            formName: formName,
            fieldName: fieldName
        }
    };
};

var set = function set(formName, fieldName, fieldValue) {
    return {
        type: SET,
        payload: {
            formName: formName,
            fieldName: fieldName,
            fieldValue: fieldValue
        }
    };
};

var setAll = function setAll(formName, values) {
    return {
        type: SET_ALL,
        payload: {
            formName: formName,
            values: values
        }
    };
};

var touch = function touch(formName, fieldName) {
    return {
        type: TOUCH,
        payload: {
            formName: formName,
            fieldName: fieldName
        }
    };
};

var untouch = function untouch(formName, fieldName) {
    return {
        type: UNTOUCH,
        payload: {
            formName: formName,
            fieldName: fieldName
        }
    };
};

var touchAll = function touchAll(formName) {
    return {
        type: TOUCH_ALL,
        payload: { formName: formName }
    };
};

var untouchAll = function untouchAll(formName) {
    return {
        type: UNTOUCH_ALL,
        payload: { formName: formName }
    };
};

var submit = function submit(formName) {
    return {
        type: SUBMIT,
        payload: { formName: formName }
    };
};

var submitEnd = function submitEnd(formName) {
    var formError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var fieldErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return {
        type: SUBMIT_END,
        payload: {
            formName: formName,
            formError: formError,
            fieldErrors: fieldErrors
        }
    };
};

var reset = function reset(formName) {
    var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
        type: RESET,
        payload: {
            formName: formName,
            full: full
        }
    };
};

var formError = function formError(formName) {
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return {
        type: FORM_ERROR,
        payload: {
            formName: formName,
            error: error
        }
    };
};

var fieldError = function fieldError(formName, fieldName) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return {
        type: FIELD_ERROR,
        payload: {
            formName: formName,
            fieldName: fieldName,
            error: error
        }
    };
};


var actions = Object.freeze({
	PREFIX: PREFIX,
	CREATE: CREATE,
	DESTROY: DESTROY,
	ADD: ADD,
	REMOVE: REMOVE,
	SET: SET,
	SET_ALL: SET_ALL,
	TOUCH: TOUCH,
	UNTOUCH: UNTOUCH,
	TOUCH_ALL: TOUCH_ALL,
	UNTOUCH_ALL: UNTOUCH_ALL,
	SUBMIT: SUBMIT,
	SUBMIT_END: SUBMIT_END,
	FORM_ERROR: FORM_ERROR,
	FIELD_ERROR: FIELD_ERROR,
	RESET: RESET,
	create: create,
	destroy: destroy,
	add: add,
	remove: remove,
	set: set,
	setAll: setAll,
	touch: touch,
	untouch: untouch,
	touchAll: touchAll,
	untouchAll: untouchAll,
	submit: submit,
	submitEnd: submitEnd,
	reset: reset,
	formError: formError,
	fieldError: fieldError
});

var get = (obj, path, def) => {
    let res = path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .replace(/^\./, '')
    .split('.')
    .reduce((prev, curr) => {
        return prev && prev[curr]
    }, obj);

    return (res === undefined)
      ? def
      : res;
};

var set$1 = (obj, path, value) => {
    let parts = path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .replace(/^\./, '')
    .split('.');

    parts.reduce((prev, curr, i) => {
        if (!(typeof prev[curr] == 'object')) {
            prev[curr] = {};
        }

        if (parts.length === i + 1) {
            prev[curr] = value;
        }

        return prev[curr];
    }, obj || {});

    return obj;
};

var omit = (function (obj) {
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var omitted = [].concat(keys).reduce(function (dest, key) {
        dest[key] = true;
        return dest;
    }, {});

    return Object.keys(obj || {}).reduce(function (dest, key) {
        if (!omitted[key]) {
            dest[key] = obj[key];
        }

        return dest;
    }, {});
});

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var validate = (function (form) {
    var fields = form.fields,
        values = form.values,
        opts = form.opts;

    var errors = form.opts.validate(values, opts);

    if (!((typeof errors === 'undefined' ? 'undefined' : _typeof$1(errors)) == 'object')) {
        return form;
    }

    form.errors = null;

    Object.keys(fields).forEach(function (fieldName) {
        var error = get(errors, fieldName, errors[fieldName] || null);

        if (error) {
            form.errors = form.errors || {};
            set$1(form.errors, fieldName, error);
        }

        form.fields[fieldName] = _extends$2({}, fields[fieldName] || {}, { error: error
        });
    });

    return form;
});

var empty = function empty(fieldType) {
    if (fieldType == 'checkbox' || fieldType == 'radio') {
        return false;
    }

    return '';
};

var fromEvent = function fromEvent(ev) {
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyField = {
    touched: false,
    error: null,
    type: 'text'
};

var parseValues = function parseValues(fields) {
    var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var omitFieldName = arguments[2];
    return Object.keys(fields).reduce(function (obj, fieldName) {
        if (fieldName === omitFieldName) {
            return obj;
        }

        set$1(obj, fieldName, get(values, fieldName) || empty(fields[fieldName].type));

        return obj;
    }, {});
};

var reducer = (function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    var formName = get(payload, 'formName'),
        fieldName = get(payload, 'fieldName');

    var form = get(state, '' + (formName || ''), {
        opts: {},
        fields: {},
        values: {},
        submitting: false,
        errors: null,
        error: null
    });

    var fields = get(form, 'fields', {}),
        values = get(form, 'values', {});

    var _ret = function () {
        switch (type) {
            case CREATE:
                var opts = get(payload, 'opts', {});

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, state[formName] || _extends$1({}, form, { values: opts.values ? parseValues(fields, opts.values) : {},
                        opts: opts
                    })))
                };

            case DESTROY:
                return {
                    v: _extends$1({}, omit(state, formName))
                };

            case ADD:
                if (get(values, fieldName) === undefined) {
                    set$1(form.values, '' + fieldName, payload.fieldValue);
                }

                form.fields = _extends$1({}, fields, _defineProperty({}, fieldName, fields[fieldName] || _extends$1({}, emptyField, { type: payload.fieldType
                })));

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, validate(form))))
                };

            case REMOVE:
                form.fields = omit(fields, fieldName);
                form.values = parseValues(fields, values, fieldName);

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, validate(form))))
                };

            case SET:
                set$1(form.values, '' + fieldName, payload.fieldValue);

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, validate(form))))
                };

            case SET_ALL:
                values = parseValues(fields, payload.values);

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, validate(_extends$1({}, form, { values: values,
                        opts: _extends$1({}, form.opts || {}, { values: values
                        })
                    })))))
                };

            case TOUCH:
            case UNTOUCH:
                if (!fields[fieldName]) {
                    return {
                        v: state
                    };
                }

                var field = fields[fieldName];
                field.touched = type == TOUCH;

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form, { fields: _extends$1({}, fields, _defineProperty({}, fieldName, field))
                    })))
                };

            case TOUCH_ALL:
            case UNTOUCH_ALL:
                fields = Object.keys(fields).reduce(function (obj, name) {
                    obj[name] = _extends$1({}, obj[name], { touched: type == TOUCH_ALL
                    });

                    return obj;
                }, fields);

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form, { fields: fields
                    })))
                };

            case SUBMIT:
                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form, { submitting: true
                    })))
                };

            case SUBMIT_END:
                var fieldErrors = payload.fieldErrors;


                if (fieldErrors) {
                    fields = Object.keys(fields).reduce(function (obj, fieldName) {
                        var error = get(fieldErrors, fieldName);

                        if (!error) {
                            return obj;
                        }

                        obj[fieldName].error = error;

                        form.errors = form.errors || {};
                        set$1(form, 'errors.' + fieldName, payload.error);

                        return obj;
                    }, fields);

                    form = _extends$1({}, form, { fields: fields
                    });
                }

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form, { submitting: false,
                        error: payload.formError
                    })))
                };

            case RESET:
                fields = Object.keys(fields).reduce(function (obj, field) {
                    obj[field] = _extends$1({}, emptyField, { type: fields[field].type
                    });

                    return obj;
                }, {});

                values = form.opts.values;

                if (payload.full) {
                    values = Object.keys(fields).reduce(function (obj, field) {
                        set$1(obj, field, empty(fields[field].type));

                        return obj;
                    }, {});
                }

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, validate(_extends$1({}, form, { fields: fields,
                        values: values,
                        submitting: false,
                        error: null
                    }))))
                };

            case FORM_ERROR:
                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form, { error: payload.error
                    })))
                };

            case FIELD_ERROR:
                if (!fields[fieldName]) {
                    return {
                        v: state
                    };
                }

                form.fields[fieldName].error = payload.error;
                form.errors = form.errors || {};

                set$1(form, 'errors.' + fieldName, payload.error);

                return {
                    v: _extends$1({}, state, _defineProperty({}, formName, _extends$1({}, form)))
                };
        }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    return state;
});

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connectToForm = (function (formName) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'form';
    return reactRedux.connect(function (_ref) {
        var formRed = _ref.formRed;
        return _defineProperty$1({}, key, get(formRed, '' + formName, {
            opts: {},
            fields: {},
            values: {}
        }));
    }, function (dispatch) {
        return _defineProperty$1({}, key + 'Actions', {
            formName: formName,
            dispatch: dispatch,

            create: function create$$1(opts) {
                return dispatch(create(formName, opts));
            },
            destroy: function destroy$$1() {
                return dispatch(destroy(formName));
            },

            add: function add$$1(fieldName, fieldValue, fieldType) {
                return dispatch(add(formName, fieldName, fieldValue, fieldType));
            },
            remove: function remove$$1(fieldName) {
                return dispatch(remove(formName, fieldName));
            },

            set: function set$$1(fieldName, fieldValue) {
                return dispatch(set(formName, fieldName, fieldValue));
            },
            setAll: function setAll$$1(values) {
                return dispatch(setAll(formName, values));
            },

            touch: function touch$$1(fieldName) {
                return dispatch(touch(formName, fieldName));
            },
            untouch: function untouch$$1(fieldName) {
                return dispatch(untouch(formName, fieldName));
            },
            touchAll: function touchAll$$1() {
                return dispatch(touchAll(formName));
            },
            untouchAll: function untouchAll$$1() {
                return dispatch(untouchAll(formName));
            },

            reset: function reset$$1(full) {
                return dispatch(reset(formName, full));
            },
            formError: function formError$$1(err) {
                return dispatch(formError(formName, err));
            },
            fieldError: function fieldError$$1(fieldName, err) {
                return dispatch(fieldError(formName, fieldName, err));
            }
        });
    }, function (stateProps, dispatchProps, ownProps) {
        var keyActions = key + 'Actions',
            formActions = dispatchProps[keyActions],
            form = stateProps[key];

        var dispatch = formActions.dispatch;

        formActions.submit = function (ev, onSubmit) {
            if (ev && ev.preventDefault) {
                ev.preventDefault();
            }

            var onSubmitFn = typeof ev == 'function' ? ev : onSubmit;

            onSubmitFn = onSubmitFn || form.opts.onSubmit;

            if (!(typeof onSubmitFn == 'function')) {
                throw Error('No onSubmit function given');
            }

            formActions.touchAll();
            formActions.formError(null);

            if (form.errors) {
                return;
            }

            dispatch(submit(formName));
            onSubmitFn(form.values, formActions);
        };

        formActions.submitEnd = function (formError$$1, fieldErrors) {
            dispatch(submitEnd(formName, formError$$1, fieldErrors));

            var _form$opts = form.opts,
                onSubmitError = _form$opts.onSubmitError,
                onSubmitSuccess = _form$opts.onSubmitSuccess;


            if (formError$$1 || fieldErrors) {
                return onSubmitError(formError$$1, fieldErrors);
            }

            onSubmitSuccess();
        };

        return _extends$3({}, stateProps, dispatchProps, ownProps, _defineProperty$1({}, keyActions, formActions));
    });
});

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Form);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.valuesSet = false, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                formActions = _props.formActions,
                form = _props.form,
                opts = _props.opts;

            return { formActions: formActions, form: form, opts: opts };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props2 = this.props,
                formActions = _props2.formActions,
                opts = _props2.opts;

            formActions.create(opts);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props3 = this.props,
                formActions = _props3.formActions,
                opts = _props3.opts;


            if (opts.autoDestroy) {
                formActions.destroy();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref2) {
            var wrappedProps = _ref2.wrappedProps,
                opts = _ref2.opts,
                formActions = _ref2.formActions;

            if (this.valuesSet) {
                return;
            }

            var values = get(opts, 'values');

            if (values) {
                this.valuesSet = true;
                formActions.setAll(values);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                Wrapped = _props4.Wrapped,
                wrappedProps = _props4.wrappedProps,
                form = _props4.form,
                formActions = _props4.formActions;


            return React__default.createElement(Wrapped, _extends$4({}, wrappedProps, {
                form: form,
                formActions: formActions
            }));
        }
    }]);

    return Form;
}(React.Component);

Form.propTypes = {
    opts: React.PropTypes.object.isRequired,
    wrappedProps: React.PropTypes.object.isRequired
};
Form.childContextTypes = {
    formActions: React.PropTypes.object,
    form: React.PropTypes.object,
    opts: React.PropTypes.object
};

var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_Component) {
    _inherits$1(Field, _Component);

    function Field(props, context) {
        _classCallCheck$1(this, Field);

        var _this = _possibleConstructorReturn$1(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

        _this.Wrapped = props.component;

        if (!context.form || !context.formActions || !context.opts) {
            throw Error('Field must be inside a formRed() decorated component');
        }
        return _this;
    }

    _createClass$1(Field, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if ('' + this.Wrapped !== '' + props.component) {
                this.Wrapped = props.component;
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                name = _props.name,
                type = _props.type;


            var value = get(this.context.opts.values || {}, name, empty(type));

            this.context.formActions.add(name, value, type);
        }
    }, {
        key: 'render',
        value: function render() {
            var Wrapped = this.Wrapped;
            var _context = this.context,
                form = _context.form,
                formActions = _context.formActions,
                opts = _context.opts;
            var _props2 = this.props,
                name = _props2.name,
                type = _props2.type;


            var extra = get(form, 'fields', {})[name];

            return React__default.createElement(Wrapped, {
                extra: _extends$5({
                    form: form,
                    formActions: formActions,
                    error: get(form, 'errors[' + name + '])')
                }, extra),
                field: _extends$5({}, omit(this.props, 'component'), { value: get(form, 'values[' + name + ']', empty(type))
                }),
                handlers: {
                    onChange: function onChange(ev) {
                        return formActions.set(name, fromEvent(ev));
                    },
                    onFocus: function onFocus() {
                        return !opts.touchOnBlur && formActions.touch(name);
                    },
                    onBlur: function onBlur() {
                        return opts.touchOnBlur && formActions.touch(name);
                    }
                }
            });
        }
    }]);

    return Field;
}(React.Component);

Field.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired
};
Field.contextTypes = {
    formActions: React.PropTypes.object,
    form: React.PropTypes.object,
    opts: React.PropTypes.object
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var formRed = function formRed(opts) {
    var mapPropsToOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return {};
    };
    return function (Wrapped) {
        if (!opts.name) {
            throw Error('Form name required');
        }

        opts = _extends({
            autoDestroy: true,
            touchOnBlur: true,
            validate: function validate() {},
            onSubmitSuccess: function onSubmitSuccess() {},
            onSubmitError: function onSubmitError(formError$$1, fieldErrors) {}
        }, opts);

        var ConnectedForm = connectToForm(opts.name)(Form);
        ConnectedForm.displayName = 'formRed(' + (Wrapped.displayName || Wrapped.name || 'Component') + ')';

        return function (props) {
            opts = _extends({}, opts, mapPropsToOpts(props));

            return React__default.createElement(ConnectedForm, {
                opts: opts,
                Wrapped: Wrapped,
                wrappedProps: props
            });
        };
    };
};

exports.actions = actions;
exports.reducer = reducer;
exports.connectToForm = connectToForm;
exports.Field = Field;
exports.formRed = formRed;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=form-red.js.map
