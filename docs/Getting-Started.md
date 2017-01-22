# Getting Started

FormRed contains the following parts:

* Action creators, that allow you to manage the form state completely programatically.
* Reducer that listens to all of the form's actions and mutates the form state in Redux.
* Two React decorators - one for your form component, the other one can connect any component to your form state.
* Field component that connects each of your fields to the form state in the Redux store.

### Add FormRed reducer to your store

```javascript
import { createStore, combineReducers } from 'redux';
import { reducer as formRed } from 'formred';

const reducer = combineReducers({
    formRed,
    // other reducers you have...
});

const store = createStore(reducer);
```

### Create a form component

```javascript
// my-form.js
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

const mapPropsToOpts = (props) => {
    return {
        onSubmit: props.onSubmit
        , onSubmitSuccess: props.onSubmitSuccess
    };
};

export default formRed(
	formOpts
    , mapPropsToOpts
)(MyForm);
```

### Pass some events to the form component

```javascript
import React, { Component } from 'react';
import MyForm from './my-form.js';

class MyPage extends Component {
    render() {
        return (
            <MyForm
              onSubmit={(values, formActions) => {
                  console.log('Form values:', values);

                  // You may do something async here
                  // and call submitEnd when done
                  // (see "form actions" for details)
                  if (values.field1 === 'error') {
                      formActions.submitEnd(
                          'sample form error'
                          , { field1: 'sample field error' }
                      });
                   }

                   submitEnd();
              }}
              onSubmitSuccess={() => {
                  console.log('Yay, success!');
              }}
            />
        );
    }
}
```