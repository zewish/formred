# Form

Using `formRed()` decorator function.

This decorator uses [`connectToForm()`](./docs/Connect-to-Form.md) decorator internally. It gives you access the form actions, form state, parses your form options (opts) and passes the needed props to your opts.

## List of available form opts (defaults shown)

```javascript
{
    autoDestroy: true
    , touchOnBlur: true
    , values: null
    , validate(values, opts) {}
    , onSubmitSuccess() {}
    , onSubmitError(formError, fieldErrors) {}
}
```

## Example: create a form

```javascript
import React, { Component } from 'react';
import { formRed, Field } from 'formred';

const FormField = ({ field, handlers, extra: { touched, error } }) => (
    <span>
        <input {...field} {...handlers} />
        {touched && error && <div>Field error: {error}</div>}
    </span>
);

class MyForm extends Component {
    render() {
        let {
            formActions: { submit }
            , form: { error, submitting }
        } = this.props;

        return (
            <div>
                {error && <div>Form error occured: {error}</div>}

                <form noValidate onSubmit={ev => submit(ev)}>
                    <Field
                      name="field1"
                      type="text"
                      component={FormField}
                    />

                    <input
                      type="submit"
                      value="Submit"
                      disabled={submitting}
                    />

                    {submitting && <div><Loader /></div>}
                </form>
            </div>
        );
    }
};

const formOpts = {
    name: 'myForm'
    , values: {
        field1: 'example value'
    }
    , validate(values) {
       const errors = {};

        if (values.field1 === 'no') {
            errors.field1 = 'value of field1 cannot be "no"';
        }

        return errors;
    }
};

const mapPropsToOpts = ({ onSubmit, onSubmitSuccess, onSubmitError }) => {
    return {
        onSubmit
        , onSubmitSuccess
        , onSubmitError
    };
};

export default formRed(
	formOpts
    , mapPropsToOpts
)(MyForm);
```