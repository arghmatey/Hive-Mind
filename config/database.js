const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});