const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const route=require("./routes/userRoutes");
app.use(route);

const userRoutes = require('./routes/userRoutes');
const messages = require('./routes/messages');


app.use('/api/users', userRoutes);
app.use('/api/messages', messages);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
