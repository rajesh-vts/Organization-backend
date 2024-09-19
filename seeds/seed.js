const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const User = require('../models/User');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seed = async () => {
  for (let i = 0; i < 5; i++) {
    const org = new Organization({
      name: faker.company.name(),
      address: faker.location.streetAddress() 
    });
    await org.save();

    for (let j = 0; j < 10; j++) {
      const user = new User({
        name: faker.person.fullName(), 
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(['admin', 'user']),
        organization: org._id,
        privileges: faker.helpers.arrayElements(['read', 'write', 'delete'], 2)
      });
      await user.save();
    }
  }

  console.log('Seed data inserted');
  mongoose.connection.close();
};

seed();
