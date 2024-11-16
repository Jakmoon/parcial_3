import jwt from 'jsonwebtoken';
import {
  validateDoctor,
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../services/doctorService.js';

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await validateDoctor(email, password);
    if (!doctor) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor.id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getDoctorAppointments = async (req, res) => {
  const { id: doctorId } = req.user;
  const { date } = req.query;

  try {
    const appointments = await fetchAppointments(doctorId, date);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

export const postDoctorAppointment = async (req, res) => {
  const { patient_id, appointment_date, appointment_time } = req.body;
  const { id: doctorId } = req.user;

  try {
    const result = await createAppointment(doctorId, patient_id, appointment_date, appointment_time);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putDoctorAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { patient_id, appointment_date, appointment_time } = req.body;

  try {
    const result = await updateAppointment(appointmentId, patient_id, appointment_date, appointment_time);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDoctorAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    await deleteAppointment(appointmentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
