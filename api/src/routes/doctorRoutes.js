import express from 'express';
import {
  loginDoctor,
  getDoctorAppointments,
  postDoctorAppointment,
  putDoctorAppointment,
  deleteDoctorAppointment,
} from '../controllers/doctorControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Login Endpoint (No authentication required)
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
  ],
  loginDoctor
);

// Get Doctor Appointments (Requires authentication)
router.get(
  '/appointment',
  authMiddleware('doctor'),
  getDoctorAppointments
);

// Create Appointment (Requires authentication)
router.post(
  '/appointment',
  [
    authMiddleware('doctor'),
    body('patient_id').isInt().withMessage('Patient ID must be an integer'),
    body('appointment_date').isISO8601().withMessage('Invalid date format'),
    body('appointment_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .withMessage('Invalid time format'),
    handleValidationErrors,
  ],
  postDoctorAppointment
);

// Update Appointment (Requires authentication)
router.put(
  '/appointment/:appointmentId',
  [
    authMiddleware('doctor'),
    param('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
    body('patient_id').isInt().withMessage('Patient ID must be an integer'),
    body('appointment_date').isISO8601().withMessage('Invalid date format'),
    body('appointment_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .withMessage('Invalid time format'),
    handleValidationErrors,
  ],
  putDoctorAppointment
);

// Delete Appointment (Requires authentication)
router.delete(
  '/appointment/:appointmentId',
  [
    authMiddleware('doctor'),
    param('appointmentId').isInt().withMessage('Appointment ID must be an integer'),
    handleValidationErrors,
  ],
  deleteDoctorAppointment
);

export default router;
