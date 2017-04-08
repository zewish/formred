import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'oget';

export default
class Form extends Component {
    static propTypes = {
        opts: PropTypes.object.isRequired
        , wrappedProps: PropTypes.object.isRequired
    }

    static childContextTypes = {
        formActions: PropTypes.object
        , form: PropTypes.object
        , opts: PropTypes.object
    }

    getChildContext() {
        const { formActions, form, opts } = this.props;
        return { formActions, form, opts };
    }

    componentWillMount() {
        const { formActions, opts } = this.props;
        formActions.create(opts);
    }

    componentWillUnmount() {
        const { formActions, opts } = this.props;

        if (opts.autoDestroy) {
            formActions.destroy();
        }
    }

    valuesSet = false

    componentWillReceiveProps({ opts, formActions }) {
        if (this.valuesSet) {
            return;
        }

        const values = get(opts, 'values');

        if (values) {
            this.valuesSet = true;
            formActions.setAll(values);
        }
    }

    render() {
        const {
            Wrapped
            , wrappedProps
            , form
            , formActions
        } = this.props;

        return (
            <Wrapped
              {...wrappedProps}
              form={form}
              formActions={formActions}
            />
        );
    }
};