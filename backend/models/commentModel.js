// Probably would need a commentModel because when we make a query of all Books in the main page
// we don't need to bring book documents with all the comments embedded in them. Instead
// maybe it's better to have a separate comment collection and query that when we query a spcific book.
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    book_id: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    name: { type: String, required: true },
    comment_body: { type: String, required: [true, 'Please provide comment body.'] },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
