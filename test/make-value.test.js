import * as makeValue from '../src/make-value.js';

describe('make-value.js', () => {
    it('exports empty() and fromEvent()', () => {
        makeValue.should.have.keys(
            'empty'
            , 'fromEvent'
        );
    });

    describe('empty()', () => {
        it('returs false', () => {
            makeValue.empty('checkbox')
            .should.be.false;

            makeValue.empty('radio')
            .should.be.false;
        });

        it('returns an empty string', () => {
            makeValue.empty('anything else')
            .should.equal('');
        });
    });

    describe('fromEvent()', () => {
        let ev;

        beforeEach(() => {
            ev = {
                stopPropagation() {}
                , preventDefault() {}
                , target: {}
            };
        });

        it('returns param when no event given', () => {
            makeValue.fromEvent('not event')
            .should.equal('not event');
        });

        it('returns ev.target.checked', () => {
            ev.target.type = 'radio';
            ev.target.checked = true;

            makeValue.fromEvent(ev).should.be.true;

            ev.target.type = 'checkbox';
            ev.target.checked = false;

            makeValue.fromEvent(ev).should.be.false;
        });

        it('returns ev.target.files', () => {
            ev.target.type = 'file';
            ev.target.files = [ 'file1', 'file2' ];

            makeValue.fromEvent(ev).should.eql(
                ev.target.files
            );
        });

        it('returns ev.dataTransfer.files', () => {
            ev.target.type = 'file';
            ev.dataTransfer = {
                files: [ 'file3', 'file4' ]
            };

            makeValue.fromEvent(ev).should.eql(
                ev.dataTransfer.files
            );
        });

        it('returns ev.target.value', () => {
            ev.target.type = 'anything else';
            ev.target.value = 'yay!';

            makeValue.fromEvent(ev).should.equal(
                'yay!'
            );
        });
    });
});