import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';
import {
  getPatientById,
  getPatientAppointments,
} from '../controllers/patientControllers.js';

const router = express.Router();

// GET patient details
router.get(
  '/:patientId',
  [
    authMiddleware('doctor'),
    param('patientId').isInt().withMessage('Patient ID must be an integer'),
    handleValidationErrors,
  ],
  getPatientById
);

// GET patient appointments
router.get(
  '/:patientId/appointment',
  [
    authMiddleware('doctor'),
    param('patientId').isInt().withMessage('Patient ID must be an integer'),
    handleValidationErrors,
  ],
  getPatientAppointments
);

export default router;
