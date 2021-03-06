const mongoose = require('mongoose');

const validate = require('mongoose-validator');

const linkValidator = [
  validate({
    validator: 'isURL',
    message: 'There should be a link in this field',
  }),
];


const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  image: {
    type: String,
    required: true,
    validate: linkValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);
