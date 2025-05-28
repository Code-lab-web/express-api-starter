import { greet } from './greet'
describe('greet', () => {
    It('should print "Hello World"', () => {
        expect(greet('World')).toEqual('Hello World')

    })
})
'