
const users = [
  {
    username: 'alice',
    password: 'alice'
  },
  {
    username: 'bob',
    password: 'bob'
  }
]

exports.authorize = function authorize (req, res, next) {
  next()
}