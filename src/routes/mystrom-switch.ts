import express from 'express';
import controller from '../controllers/mystrom-switch';

const router = express.Router();

// Report
// GET /report -> {"power":0,"Ws":0,"relay":true,"temperature":26.93}
router.get('/report', controller.getReport);

// Turn On
// GET /relay?state=1
// Turn Off
// GET /relay?state=0
router.get('/relay', controller.setRelay);

// Toggle
// GET /toggle -> {"relay":true}
router.get('/toggle', controller.toggleRelay);

// Set Power
// POST /power
router.post('/power', controller.setPower);

export = router;
