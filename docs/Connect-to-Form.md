# Connect to Form

Using `connectToForm()` decorator function.

This decorator gives you access to both the actions and the form state, so you can use these outside of your form component.

`connectToForm()` has knowledge about your form's name, so you don't have to pass the form name as a first parameter to your action. Keep in mind that if you need to use the form actions directly the first parameter is always the form name.

## Example scenario one

You have some tabs - on the first tab you have a form called "formOne", on the second you need to read the values of this form in a separate component:

```javascript
import React from 'react';
import { connectToForm } from 'formred';

const tab2 = ({ f1, f1Actions }) => (
    <div>
        {JSON.stringify(f1.values, null, 4)}
    </div>
);

export default connectToForm(
    'formOne'   // form name
    , 'f1' // prefix - useful when you have another form on this page
)(tab2);

```

## Example scenario two

You have some tabs - on the first tab you have a form called "formOne", on the second you need submit the form but you're not in the same component:

```javascript
import React from 'react';
import { connectToForm } from 'formred';

const tab2 = ({ f1Actions }) => (
    <button onClick={() => f1Actions.submit()}>
        Submit formOne
    </button>
);

export default connectToForm(
    'formOne', 'f1'
)(tab2);
```

## Example scenario three

You have some tabs - on the first tab you have a form called "formOne". You want to trigger a field error when a button is clicked inside a component on your second tab:

```javascript
import React from 'react';
import { connectToForm } from 'formred';

const tab2 = ({ f1Actions }) => (
    <button onClick={() => f1Actions.fieldError('field1', 'example error')}>
        Show error for "field1"
    </button>
);

export default connectToForm(
    'formOne', 'f1'
)(tab2);
```