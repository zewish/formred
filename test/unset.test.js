import unset from '../src/unset.js';

describe('unset.js', () => {
    it('unsets object key (shallow)', () => {
        unset({
            a: 'wow!'
            , b: 'yay!'
        }, 'b')
        .should.eql({
            a: 'wow!'
        });
    });

    it('unsets object key (deep)', () => {
        unset({
            a: 'wow!'
            , b: { c: { d: 'cool!' } }
        }, 'b.c.d')
        .should.eql({
            a: 'wow!',
            b: { c: { } }
        });
    });
});