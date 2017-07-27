'use strict';

var express = require('express');
var controller = require('./thesis.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/', auth.hasRole('admin'),controller.index);
router.get('/group', auth.hasRole('admin'),controller.indexGroup);
router.get('/name/:name', controller.showThesis);
router.get('/:id', controller.show);
router.get('/studentId/:id', controller.showStudent);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
