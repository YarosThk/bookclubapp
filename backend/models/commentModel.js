// Probably would need a commentModel because when we make a query of all Books in the main page
// we don't need to bring book documents with all the comments embedded in them. Instead
// maybe it's better to have a separate comment collection and query that when we query a spcific book.
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    userName: { type: String, required: true },
    edited: { type: Boolean, default: false, requiered: true },
    commentBody: { type: String, required: [true, 'Please provide comment body.'] },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
