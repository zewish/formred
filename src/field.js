import React, { Component, PropTypes } from 'react';
import connectToForm from './connect-to-form';
import { empty, fromEvent } from './make-value';

import omit from './omit';
import get from 'oget';

export default
class Field extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired
        , type: PropTypes.string.isRequired
        , component: PropTypes.func.isRequired
    }

    static contextTypes = {
        formActions: PropTypes.object
        , form: PropTypes.object
        , opts: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.Wrapped = props.component;

        if (!context.form || !context.formActions || !context.opts) {
            throw Error('Field must be inside a formRed() decorated component');
        }
    }

    componentWillReceiveProps(props) {
        if (`${this.Wrapped}` !== `${props.component}`) {
            this.Wrapped = props.component;
        }
    }

    componentWillMount() {
        const { name, type } = this.props;

        const value = get(
            this.context.opts.values || {}
            , name
            , empty(type)
        );

        this.context.formActions.add(name, value, type);
    }

    render() {
        const { Wrapped } = this;
        const { form, formActions, opts } = this.context;
        const { name, type } = this.props;

        const extra = get(form, 'fields', {})[name];

        return (
            <Wrapped
              extra={{
                  form
                  , formActions
                  , error: get(form, `errors[${name}])`)
                  , ...extra
              }}
              field={{
                  ...omit(this.props, 'component')
                  , value: get(
                      form
                      , `values[${name}]`
                      , empty(type)
                  )
              }}
              handlers={{
                  onChange: ev => formActions.set(
                      name, fromEvent(ev)
                  )
                  , onFocus: () => !opts.touchOnBlur && formActions.touch(name)
                  , onBlur: () => opts.touchOnBlur && formActions.touch(name)
              }}
            />
        );
    };
};