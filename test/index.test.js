describe('index.js', () => {
    let index = require('../src/index.js');

    it('exports proper keys', () => {
        index.should.have.keys(
            'actions'
            , 'reducer'
            , 'connectToForm'
            , 'Field'
            , 'formRed'
        );
    });

    it('exports actions', () => {
        index.actions.should.eql(
            require('../src/actions.js')
        );
    });

    it('exports reducer', () => {
        index.reducer.should.eql(
            require('../src/reducer.js').default
        );
    });

    it('exports connectToForm', () => {
        index.connectToForm.should.eql(
            require('../src/connect-to-form.js').default
        );
    });

    it('exports field', () => {
        index.Field.should.eql(
            require('../src/field.js').default
        );
    });

    it('exports formRed', () => {
        index.formRed.should.be.a('function');
    });
});