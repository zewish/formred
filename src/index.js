import React from 'react';
import * as actions from './actions';
import reducer from './reducer';
import connectToForm from './connect-to-form';
import Form from './form';
import Field from './field';

export {
    actions
    , reducer
    , connectToForm
    , Field
};

export const formRed = (
    opts
    , mapPropsToOpts = () => ({})
) => Wrapped => {
    if (!opts.name) {
        throw Error('Form name required');
    }

    opts = {
        autoDestroy: true
        , touchOnBlur: true
        , validate() {}
        , onSubmitSuccess() {}
        , onSubmitError(formError, fieldErrors) {}
        , ...opts
    };

    let ConnectedForm = connectToForm(opts.name)(Form);
    ConnectedForm.displayName = `formRed(${Wrapped.displayName || Wrapped.name || 'Component'})`;

    return props => {
        opts = {
            ...opts
            , ...mapPropsToOpts(props)
        };

        return (
            <ConnectedForm
              opts={opts}
              Wrapped={Wrapped}
              wrappedProps={props}
            />
        );
    };
};