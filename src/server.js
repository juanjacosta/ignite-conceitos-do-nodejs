const app = require('./');
const port = 3333

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});