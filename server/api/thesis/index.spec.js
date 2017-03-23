'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var thesisCtrlStub = {
  index: 'thesisCtrl.index',
  show: 'thesisCtrl.show',
  create: 'thesisCtrl.create',
  upsert: 'thesisCtrl.upsert',
  patch: 'thesisCtrl.patch',
  destroy: 'thesisCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var thesisIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './thesis.controller': thesisCtrlStub
});

describe('Thesis API Router:', function() {
  it('should return an express router instance', function() {
    expect(thesisIndex).to.equal(routerStub);
  });

  describe('GET /api/thesis', function() {
    it('should route to thesis.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'thesisCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/thesis/:id', function() {
    it('should route to thesis.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'thesisCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/thesis', function() {
    it('should route to thesis.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'thesisCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/thesis/:id', function() {
    it('should route to thesis.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'thesisCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/thesis/:id', function() {
    it('should route to thesis.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'thesisCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/thesis/:id', function() {
    it('should route to thesis.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'thesisCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
