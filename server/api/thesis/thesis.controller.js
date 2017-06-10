/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/thesis              ->  index
 * POST    /api/thesis              ->  create
 * GET     /api/thesis/:id          ->  show
 * PUT     /api/thesis/:id          ->  upsert
 * PATCH   /api/thesis/:id          ->  patch
 * DELETE  /api/thesis/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Thesis from './thesis.model';
import Log from '../log/log.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  
  return function(entity) {

  patches.value = entity.checkpoint+1

  if(patches.value==2){  //update all document to CGS SEND
    Thesis.find({'studentId':entity.studentId}).exec()
      .then((res1)=>{
        res1.forEach(function(el) {
          if(el.checkpoint<3){
            try {
            jsonpatch.apply(el, [patches], /*validate*/ true);
            Log.create({'thesisId':el._id,'checkpoint':el.checkpoint,time:new Date(),'studentId':el.studentId})
          } catch(err) {
            return Promise.reject(err);
          }
          el.save();
          }
        }, this);
      })
  }

    try {
      jsonpatch.apply(entity, [patches], /*validate*/ true);
      Log.create({'thesisId':entity._id,'checkpoint':entity.checkpoint,time:new Date(),'studentId':entity.studentId})
    } catch(err) {
      return Promise.reject(err);
    }
    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Thesiss
export function index(req, res) {
  return Thesis.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thesis from the DB
export function show(req, res) {
  return Thesis.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Thesis based on student Idfrom the DB
export function showStudent(req, res) {
  return Thesis.find({"studentId":req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function showThesis(req, res) {
  // console.log("show Thesis",req.params.name);
  return Thesis.find({"name":{'$regex':req.params.name,'$options':'i'}}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Thesis in the DB
export function create(req, res) {
  return Thesis.create(req.body)
    .then((el)=>{
      Log.create({'thesisId':el._id,'checkpoint':el.checkpoint,time:new Date(),'studentId':el.studentId})
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Thesis in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Thesis.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Thesis in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  
  return Thesis.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Thesis from the DB
export function destroy(req, res) {
  return Thesis.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
