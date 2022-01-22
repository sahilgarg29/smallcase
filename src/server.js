const app = require("./app");
const connect = require("./configs/db");

app.listen(5001, async function () {
  try {
    await connect();
    console.log("listening on port 2345");
  } catch (err) {
    console.log(err);
  }
});
