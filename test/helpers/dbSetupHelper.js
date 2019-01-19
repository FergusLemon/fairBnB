'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TestFairBnB', {useNewUrlParser: true});
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (err) => {
        console.log('Something went wrong : ', err);
    });
beforeEach(() => {
    mongoose.connection.collections['users'].drop((err) => {
      console.log('Collection dropped');
    });
});
