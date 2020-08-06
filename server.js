const express = require('express');
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) =>
  res.send('API Running')
)

//Init middleware
app.use(express.json({ extended: false }))


app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))


app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)
