import express from 'express';
import { loginDoctor, getAppointments, createAppointment, editAppointment, deleteAppointment } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/login', loginDoctor);
router.get('/appointment', getAppointments);
router.post('/appointment', createAppointment);
router.put('/appointment/:appointmentId', editAppointment);
router.delete('/appointment/:appointmentId', deleteAppointment);

export default router;
