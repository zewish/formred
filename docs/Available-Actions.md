# Available Actions

A list of available actions and their corresponding action-creator functions.

When calling these actions directly by `import { actions } from 'formred'` you need to pass the `formName` parameter.

If calling these from `formActions` when `formRed()` or `connectToForm()` decorators are used  the `formName` parameter is skipped.

```javascript
// CREATE
create(formName, opts) {}

// DESTROY
destroy(formName) {}

// ADD
add(formName, fieldName, fieldValue, fieldType = 'text') {}

// REMOVE
remove(formName, fieldName) {}

// SET
set(formName, fieldName, fieldValue) {}

// SET_ALL
setAll(formName, values) {}

// TOUCH
touch(formName, fieldName) {}

// UNTOUCH
untouch(formName, fieldName) {}

// TOUCH_ALL
touchAll(formName) {}

// UNTOUCH_ALL
untouchAll(formName) {}

// SUBMIT
submit(formName) {}

// SUBMIT_END
submitEnd(formName, formError = null, fieldErrors = null) {}

// FORM_ERROR
formError(formName, error = null) {}

// FIELD_ERROR
fieldError(formName, fieldName, error = null) {}

// RESET
reset(formName, full = true) {}
```