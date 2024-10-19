require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Use the port provided by Render

app.use(cors());
app.use(express.json());

const connection = require('./database/db.config');

const usersRoutes = require('./routes/users.routes');
const questionsRoutes = require('./routes/question.routes');
const answerRoutes = require('./routes/answers.routes');
const auth = require('./middleware/auth.middleware');

app.use('/api/users', usersRoutes);
app.use('/api/questions', auth, questionsRoutes);
app.use('/api/answers', auth, answerRoutes);

(async () => {
  try {
    const result = await connection.execute("SELECT 'test'");
    // Uncomment the following line if you want to see the result of the test query
    // console.log(result); 

    await app.listen(port);
    console.log('Database connection established :)'); // Correct the message to indicate success
    console.log(`Listening on port ${port}`); // Log the port number without localhost
  } catch (err) {
    console.error('Error connecting to the database:', err.message); // More informative error logging
  }
})();
