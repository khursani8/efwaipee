'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newThesis;

describe('Thesis API:', function() {
  describe('GET /api/thesis', function() {
    var thesiss;

    beforeEach(function(done) {
      request(app)
        .get('/api/thesis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thesiss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(thesiss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/thesis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/thesis')
        .send({
          name: 'New Thesis',
          info: 'This is the brand new thesis!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newThesis = res.body;
          done();
        });
    });

    it('should respond with the newly created thesis', function() {
      expect(newThesis.name).to.equal('New Thesis');
      expect(newThesis.info).to.equal('This is the brand new thesis!!!');
    });
  });

  describe('GET /api/thesis/:id', function() {
    var thesis;

    beforeEach(function(done) {
      request(app)
        .get(`/api/thesis/${newThesis._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thesis = res.body;
          done();
        });
    });

    afterEach(function() {
      thesis = {};
    });

    it('should respond with the requested thesis', function() {
      expect(thesis.name).to.equal('New Thesis');
      expect(thesis.info).to.equal('This is the brand new thesis!!!');
    });
  });

  describe('PUT /api/thesis/:id', function() {
    var updatedThesis;

    beforeEach(function(done) {
      request(app)
        .put(`/api/thesis/${newThesis._id}`)
        .send({
          name: 'Updated Thesis',
          info: 'This is the updated thesis!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThesis = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThesis = {};
    });

    it('should respond with the updated thesis', function() {
      expect(updatedThesis.name).to.equal('Updated Thesis');
      expect(updatedThesis.info).to.equal('This is the updated thesis!!!');
    });

    it('should respond with the updated thesis on a subsequent GET', function(done) {
      request(app)
        .get(`/api/thesis/${newThesis._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thesis = res.body;

          expect(thesis.name).to.equal('Updated Thesis');
          expect(thesis.info).to.equal('This is the updated thesis!!!');

          done();
        });
    });
  });

  describe('PATCH /api/thesis/:id', function() {
    var patchedThesis;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/thesis/${newThesis._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Thesis' },
          { op: 'replace', path: '/info', value: 'This is the patched thesis!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThesis = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThesis = {};
    });

    it('should respond with the patched thesis', function() {
      expect(patchedThesis.name).to.equal('Patched Thesis');
      expect(patchedThesis.info).to.equal('This is the patched thesis!!!');
    });
  });

  describe('DELETE /api/thesis/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/thesis/${newThesis._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thesis does not exist', function(done) {
      request(app)
        .delete(`/api/thesis/${newThesis._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
