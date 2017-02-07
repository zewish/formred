import Form from '../src/form.js';

describe('form.js', () => {
    let inst
        , formActions
        , form
        , opts
        , props;

    beforeEach(() => {
        formActions = {
            create: sinon.spy(() => {})
            , destroy: sinon.spy(() => {})
            , setAll: sinon.spy(() => {})
        };

        form = { '3': '4' };
        opts = { autoDestroy: true };

        props = {
            formActions
            , form
            , opts
        };

        inst = new Form(props);
    });

    it('propTypes', () => {
        Form.propTypes.should.have.keys(
            'opts'
            , 'wrappedProps'
        );
    });

    it('childContextTypes', () => {
        Form.childContextTypes.should.have.keys(
            'formActions'
            , 'form'
            , 'opts'
        );
    });

    it('getChildContext()', () => {
        inst.getChildContext().should.eql({
            formActions
            , form
            , opts
        });
    });

    it('componentWillMount()', () => {
        inst.componentWillMount();
        formActions.create.should.be.calledWith(opts);
    });

    describe('componentWillUnmount()', () => {
        it('calls formActions.destroy()', () => {
            inst.componentWillUnmount();
            formActions.destroy.should.have.callCount(1);
        });

        it('does not call formActions.destroy()', () => {
            props.opts = { autoDestroy: false };
            inst = new Form(props);

            inst.componentWillUnmount();
            formActions.destroy.should.have.callCount(0);
        });
    });

    describe('componentWillReceiveProps()', () => {
        it('does not call formActions.setAll() - values set', () => {
            inst.valuesSet = true;

            inst.componentWillReceiveProps({
                opts: { values: 'bla' }
                , formActions
            });

            formActions.setAll.should.have.callCount(0);
        });

        it('does not call formActions.setAll() - no values', () => {
            inst.componentWillReceiveProps({
                opts: { values: null }
                , formActions
            });

            formActions.setAll.should.have.callCount(0);
        });

        it('calls formActions.setAll()', () => {
            inst.componentWillReceiveProps({
                opts: { values: 'bla' }
                , formActions
            });

            formActions.setAll.should.be.calledWith('bla');
        });
    });

    describe('render()', () => {
        let formActions;

        beforeEach(() => {
            formActions = {
                create: sinon.spy(() => {})
            };
        });

        let go = () => mount(
            <Form
              formActions={formActions}
              form={{}}
              opts={{}}
              Wrapped={() => <strong></strong>}
              wrappedProps={{}}
            />
        );

        it('calls formActions.create()', () => {
            go();
            formActions.create.should.have.callCount(1);
        });

        it('renders wrapped component', () => {
            go().should.have.tagName('strong');
        });
    });
});