import omit from '../src/omit.js';

describe('omit.js', () => {
    it('omits object key', () => {
        omit({
            a: 1
            , b: 2
            , c: 3
        }, 'b')
        .should.eql({
            a: 1,
            c: 3
        });
    });

    it('omits object keys', () => {
        omit({
            a: 1
            , b: 2
            , c: 3
            , d: 4
        }, [ 'b', 'd' ])
        .should.eql({
            a: 1,
            c: 3
        });
    });
});