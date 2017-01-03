const authorize = require('../modules/authorize')

describe('authorization', function() {
    it('should fail when there is no basic authorization header', async function() {
        try {
            await authorize()
            fail()
        } catch (err) {
            expect(err.name).toEqual('AuthorizationError')
        }
    })

})