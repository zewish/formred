import { connect } from 'react-redux';
import get from 'oget';

import {
    create
    , destroy

    , opts
    , validate

    , add
    , remove

    , set
    , setAll

    , touch
    , untouch
    , touchAll
    , untouchAll

    , reset
    , formError
    , fieldError

    , submit
    , submitEnd
} from './actions';

export default (formName, key = 'form') => connect(
    ({ formRed }) => ({
        [key]: get(formRed, `${formName}`, {
            opts: {}
            , fields: {}
            , values: {}
        })
    })
    , dispatch => ({
        [`${key}Actions`]: {
            formName
            , dispatch

            , create: (opts) => dispatch(
                create(formName, opts)
            )
            , destroy: () => dispatch(
                destroy(formName)
            )

            , opts: (opts) => dispatch(
                opts(formName, opts)
            )
            , validate: () => dispatch(
                validate(formName)
            )

            , add: (fieldName, fieldValue, fieldType) => dispatch(
                add(formName, fieldName, fieldValue, fieldType)
            )
            , remove: fieldName => dispatch(
                remove(formName, fieldName)
            )

            , set: (fieldName, fieldValue) => dispatch(
                set(formName, fieldName, fieldValue)
            )
            , setAll: values => dispatch(
                setAll(formName, values)
            )

            , touch: fieldName => dispatch(
                touch(formName, fieldName)
            )
            , untouch: fieldName => dispatch(
                untouch(formName, fieldName)
            )
            , touchAll: () => dispatch(
                touchAll(formName)
            )
            , untouchAll: () => dispatch(
                untouchAll(formName)
            )

            , reset: (full) => dispatch(
                reset(formName, full)
            )
            , formError: err => dispatch(
                formError(formName, err)
            )
            , fieldError: (fieldName, err) => dispatch(
                fieldError(formName, fieldName, err)
            )
        }
    })
    , (stateProps, dispatchProps, ownProps) => {
        const keyActions = `${key}Actions`
            , formActions = dispatchProps[keyActions]
            , form = stateProps[key]
            , opts = ownProps.opts || {};

        const dispatch = formActions.dispatch;

        formActions.submit = (ev, onSubmit) => {
            if (ev && ev.preventDefault) {
                ev.preventDefault();
            }

            let onSubmitFn = (typeof ev == 'function')
              ? ev
              : onSubmit;

            onSubmitFn = onSubmitFn || opts.onSubmit;

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

        formActions.submitEnd = (formError, fieldErrors) => {
            dispatch(submitEnd(formName, formError, fieldErrors));

            const {
                onSubmitError
                , onSubmitSuccess
            } = opts;

            if (formError || fieldErrors) {
                return onSubmitError(formError, fieldErrors);
            }

            onSubmitSuccess();
        };

        return {
            ...stateProps
            , ...dispatchProps
            , ...ownProps
            , [keyActions]: formActions
        };
    }
);
