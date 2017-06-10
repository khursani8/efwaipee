'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newLog;

describe('Log API:', function() {
  describe('GET /api/logs', function() {
    var logs;

    beforeEach(function(done) {
      request(app)
        .get('/api/logs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          logs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(logs).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/logs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/logs')
        .send({
          name: 'New Log',
          info: 'This is the brand new log!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLog = res.body;
          done();
        });
    });

    it('should respond with the newly created log', function() {
      expect(newLog.name).to.equal('New Log');
      expect(newLog.info).to.equal('This is the brand new log!!!');
    });
  });

  describe('GET /api/logs/:id', function() {
    var log;

    beforeEach(function(done) {
      request(app)
        .get(`/api/logs/${newLog._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          log = res.body;
          done();
        });
    });

    afterEach(function() {
      log = {};
    });

    it('should respond with the requested log', function() {
      expect(log.name).to.equal('New Log');
      expect(log.info).to.equal('This is the brand new log!!!');
    });
  });

  describe('PUT /api/logs/:id', function() {
    var updatedLog;

    beforeEach(function(done) {
      request(app)
        .put(`/api/logs/${newLog._id}`)
        .send({
          name: 'Updated Log',
          info: 'This is the updated log!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLog = {};
    });

    it('should respond with the updated log', function() {
      expect(updatedLog.name).to.equal('Updated Log');
      expect(updatedLog.info).to.equal('This is the updated log!!!');
    });

    it('should respond with the updated log on a subsequent GET', function(done) {
      request(app)
        .get(`/api/logs/${newLog._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let log = res.body;

          expect(log.name).to.equal('Updated Log');
          expect(log.info).to.equal('This is the updated log!!!');

          done();
        });
    });
  });

  describe('PATCH /api/logs/:id', function() {
    var patchedLog;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/logs/${newLog._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Log' },
          { op: 'replace', path: '/info', value: 'This is the patched log!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLog = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLog = {};
    });

    it('should respond with the patched log', function() {
      expect(patchedLog.name).to.equal('Patched Log');
      expect(patchedLog.info).to.equal('This is the patched log!!!');
    });
  });

  describe('DELETE /api/logs/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/logs/${newLog._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when log does not exist', function(done) {
      request(app)
        .delete(`/api/logs/${newLog._id}`)
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
