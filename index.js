const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const messages = require('./routes/messages');
const source = require('./routes/data.source');
const environmentRouter = require('./routes/environment.router');
const image = require('./routes/image.router');

app.use('/api/users', userRoutes);
app.use('/api/messages', messages);
app.use('/api/dataSources', source);
app.use('/api/environment', environmentRouter);
app.use('/api/image', image);




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
