const { fetchAllReviews, fetchReviewById, fetchReviewsByUser, fetchCommentsByReviewId, postCommentToReview, insertReview, removeReviewById, updateReviewVotesById } = require('./models/reviews');
const { fetchCommentsByUser, deleteComment, updateComment } = require('./models/comments');
const { fetchUserByUsername, fetchAllUsers } = require('./models/users');
const { fetchAllCategories } = require('./models/categories');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const rootResolver = {
  getReviews: async ({ sort_by, order, limit, p, category }) => await fetchAllReviews(sort_by, order, limit, p, category),
  getReviewsByUser: async ({ username }) => await fetchReviewsByUser(username),
  getReviewById: async ({ review_id }) => await fetchReviewById(review_id),
  voteOnReview: async ({ review_id, votes }) => await updateReviewVotesById(review_id, votes),
  addReview: async ({ title, review_body, designer, category, owner }) => await insertReview({title, review_body, designer, category, owner}),
  removeReview: async ({ review_id }) => await removeReviewById(review_id),

  getCommentsByReviewId: async ({ review_id }) => await fetchCommentsByReviewId(review_id),
  getCommentsByUser: async ({ username }) => await fetchCommentsByUser(username),
  addCommentToReview: async ({ review_id, body, username }) => await postCommentToReview(review_id, { body, username }),
  voteOnComment: async ({ comment_id, votes }) => await updateComment(comment_id, votes),
  removeComment: async ({ comment_id }) => await deleteComment(comment_id),

  getAllUsers: async () => await fetchAllUsers(),
  getUserByUsername: async ({ username }) => await fetchUserByUsername(username),

  getAllCategories: async () => await fetchAllCategories()
};

const graphqlRouter = graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: true,
});

module.exports = graphqlRouter;
