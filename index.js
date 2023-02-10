const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use((r,s,n)=>{
  n();
})
app.get("/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
    path: req.route.path
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3000)

module.exports.handler = serverless(app);
