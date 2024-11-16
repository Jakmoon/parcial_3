import express from 'express';
import {
  loginDoctor,
  getDoctorAppointments,
  postDoctorAppointment,
  putDoctorAppointment,
  deleteDoctorAppointment,
} from '../controllers/doctorControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginDoctor);

router.get('/appointment', authMiddleware('doctor'), getDoctorAppointments);
router.post('/appointment', authMiddleware('doctor'), postDoctorAppointment);
router.put('/appointment/:appointmentId', authMiddleware('doctor'), putDoctorAppointment);
router.delete('/appointment/:appointmentId', authMiddleware('doctor'), deleteDoctorAppointment);

export default router;
