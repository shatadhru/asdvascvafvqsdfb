const app = require("./src/app")

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ Test route: http://localhost:3000/hardcoded-add-post
`)
)