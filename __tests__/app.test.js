const request = require('supertest');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('getReviews', () => {
  it('200: returns an array of the first page of reviews, sorted by created_at in desc order by default', () => {
    return request(app)
    .get('/graphql')
    .send({
      query: "{ getReviews{ review_id, title, designer, owner, review_img_url, review_body, category, created_at, votes } }"
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .then(({ body: { data:  { getReviews } } }) => {
      getReviews.forEach((review) => {
        expect(review).toHaveProperty('review_id');
        expect(review).toHaveProperty('title');
        expect(review).toHaveProperty('designer');
        expect(review).toHaveProperty('owner');
        expect(review).toHaveProperty('review_img_url');
        expect(review).toHaveProperty('review_body');
        expect(review).toHaveProperty('category');
        expect(review).toHaveProperty('created_at');
        expect(review).toHaveProperty('votes');
      });
    });
  });

  it('400: error on invalid field', () => {
    return request(app)
      .get('/graphql')
      .send({
        query: "{ getReviews{ garbage } }"
      })
      .expect(400);
  });
});

describe('getReviewsByUser', () => {
  it('200: returns an array of reviews by a given user', () => {
    return request(app)
      .get('/graphql')
      .send({
        query: '{ getReviewsByUser(username: "mallionaire"){ review_id, title, designer, owner, review_img_url, review_body, category, created_at, votes } }'
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(({ body: { data: { getReviewsByUser } } }) => {
        getReviewsByUser.forEach((review) => {
          expect(review.owner).toBe('mallionaire');
        })
      });
  });
});
