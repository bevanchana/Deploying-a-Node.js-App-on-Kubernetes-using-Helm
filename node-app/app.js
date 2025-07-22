const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Hello from Helm-Deployed Node.js App!');
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

