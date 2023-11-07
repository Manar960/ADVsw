const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const messages = require('./routes/messages');
const source = require('./routes/data.source');
const environmentRouter = require('./routes/environment.router');
const image = require('./routes/image.router');
const comment = require('./routes/comment.router');

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/messages', messages);
app.use('/api/dataSources', source);
app.use('/api/environment', environmentRouter);
app.use('/api/img', image);
app.use('/api/comm', comment);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
