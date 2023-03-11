const passport = require('./passport')
const restrict = passport.authenticate('jwt', {
    session: false
})

module.exports = {
    restrict
}