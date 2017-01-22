# Using Form Actions

There are three ways to use the provided form actions:

1. Using `formActions` after decorating with the `connectToForm()` function when you're outside your form.
2. Using `formActions` object prop when you're inside your form - `formRed()` decorator function
3. Using the form actions directly: `import { actions } from 'formred'`.

The first two approaches are almost the same because `formRed()` decorator internally uses `connectToForm()`.

The only difference is that you may specify the prefix that `connectToForm()` uses (defaults to "form").

## Example with formRed() decorator

```javascript
import React, { Component } from 'react';
import { formRed } from 'formred';

class FormOne extends Component {
    render() {
        console.log(this.props.formActions); // formOne actions
        return <div>...</div>;
    }
}

export formRed({
    name: 'formOne'
})(FormOne);
```

## Example with connectToForm() decorator

```javascript
import React, { Component } from 'react';
import { connectToForm } from 'formred';

class OtherComponent extends Component {
    render() {
        console.log(this.props.formActions); // formOne actions
        return <div>...</div>;
    }
}

export connectToForm('formOne')(OtherComponent);
```

## Example with connectToForm() decorator (change prefix)

```javascript
import React, { Component } from 'react';
import { connectToForm } from 'formred';

class OtherComponent extends Component {
    render() {
        console.log(this.props.otherFormActions); // formOne actions
        return <div>...</div>;
    }
}

export connectToForm(
    'formOne'
    , 'otherForm' // prefix
)(OtherComponent);
```

For more information please have a look at the [`connectToForm()`](./Connect-to-Form.md) documentation page.

## Example using actions directly - submit form name 'formOne'

```javascript
import { actions } from 'formred';
import store from 'your/redux/store/location';

store.dispatch(actions.submit('formOne'));
```