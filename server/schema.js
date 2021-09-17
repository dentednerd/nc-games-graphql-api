const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Query {
    getReviews(sort_by: String, order: String, limit: Int, p: Int, category: String): [Review]
    getReviewsByUser(username: String!): [Review]
    getReviewById(review_id: Int!): Review

    getCommentsByReviewId(review_id: Int!): [Comment]
    getCommentsByUser(username: String!): [Comment]

    getAllUsers: [User]
    getUserByUsername(username: String!): User

    getAllCategories: [Category]
  }

  type Mutation {
    addCommentToReview(review_id: Int!, body: String!, username: String!): Comment
    voteOnComment(comment_id: Int!, votes: Int!): Comment
    removeComment(comment_id: Int!): Deletion

    addReview(title: String!, review_body: String!, designer: String!, category: String!, owner: String!): Review
    removeReview(review_id: Int!): Deletion
    voteOnReview(review_id: Int!, votes: Int!): Review
  }

  type Review {
    review_id: Int
    title: String
    designer: String
    owner: String
    review_img_url: String
    review_body: String
    category: String
    created_at: String
    votes: Int
  }

  type User {
    username: String
    name: String
    avatar_url: String
  }

  type Comment {
    comment_id: Int
    author: String
    review_id: Int
    votes: Int
    created_at: String
    body: String
  }

  type Category {
    slug: String
    description: String
  }

  type Deletion {
    numberOfDeletions: Int
  }
`);
