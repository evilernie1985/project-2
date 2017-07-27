const Apod = require('./apod_model')

function create (params) {
  Todo.create(params, function (err, todo) {
    if (err) {
      console.log(err)
      return
    }
    console.log(todo)
  })
}
