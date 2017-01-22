# Form

The `Field` component can only be used inside a [`formRed()`](./Form.md) decorated component. This component uses context to connect to the current form.

There are three object props that your custom `FormField` component will receive:

1. `field` - contains all the field props you passed, including the `value` from the redux store;
2. `handlers` - contains all the event handlers needed by `formRed()` - mainly `onChange()`, `onFocus()` and `onBlur()`;
3. `extra` - contains some meta data for the field like `touched` and `error` values plus the form state inside `form` and the form action creators inside `formActions`;

## Example usage
```javascript
// my-form.js
import React, { Component } from 'react';
import { formRed, Field } from 'formred';

const FormField = ({ field, handlers, extra: { touched, error, form, formActions } }) => (
    <span>
        <input
          {...field} // { value: '', myProp1: '1', myProp2: '2' }
          {...handlers} // { onChange(), onFocus(), onBlur() }
        />

        {touched && error && <div>Field error: {error}</div>}
    </span>
);

class MyForm extends Component {
    render() {
        return (
            ...
            <form ...>
               ...
                <Field
                  name="field1"
                  type="text"
                  myProp1="1"
                  myProp2="2"
                  component={FormField}
                />
                ...
            </form>
        );
    }
};

const formOpts = {
    name: 'myForm'
};

export default formRed(formOpts)(MyForm);
```