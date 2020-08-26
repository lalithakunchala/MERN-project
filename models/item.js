var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ItemSchema = new Schema({
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true
    },
    posted_date: {
      type: Date,
      default: Date.now
    },
    posted_by: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('item', ItemSchema);