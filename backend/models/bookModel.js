const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    user: {
      // We need to associate a user with a Book
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: [true, 'Please add a title.'] },
    author: { type: String, required: [true, 'Please add the author.'] },
    description: { type: String, required: [true, 'Please add a description.'] },
    comments: [{ user: String, body: String, date: Date }],
    // meta: {
    //   likes: { type: Number, default: 0 },
    // },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
