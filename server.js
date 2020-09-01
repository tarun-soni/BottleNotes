const express = require('express');
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;
require('dotenv').config()

connectDB();

app.get('/', (req, res) =>
  res.send('API Running')
)

//Init middleware
app.use(express.json({ extended: false }))


app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/note', require('./routes/api/note'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {

  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)
