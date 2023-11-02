const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const route=require("./routes/userRoutes");
const routeS=require("./routes/data.source");
app.use(route);
app.use(routeS);

const userRoutes = require('./routes/userRoutes');
const messages = require('./routes/messages');
const source = require('./routes/data.source');

app.use('/api/users', userRoutes);
app.use('/api/messages', messages);
app.use('/api/dataSources', source);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
