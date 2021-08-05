const {
  postCommentToReview,
  deleteComment,
  updateComment
} = require('../models/comments');

const addCommentToReview = (req, res, next) => {
  const { review_id } = req.params;
  const { body } = req;

  postCommentToReview(review_id, body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const removeComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
}

const patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  updateComment(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
}

module.exports = {
  addCommentToReview,
  removeComment,
  patchComment
};