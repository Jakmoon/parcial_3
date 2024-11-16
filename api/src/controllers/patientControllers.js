import { fetchPatientById, fetchAppointmentsByPatientId } from '../services/patientService.js';

export const getPatientById = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await fetchPatientById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getPatientAppointments = async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await fetchAppointmentsByPatientId(patientId);
    if (appointments.length === 0) return res.status(404).json({ message: 'No appointments found' });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
