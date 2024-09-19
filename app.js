const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const organizationRoutes = require('./routes/OrganizationRoutes');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/Auth');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const cors = require('cors');

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/organizations', organizationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
