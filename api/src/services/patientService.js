import db from '../config/db.js';

export const fetchPatientById = async (patientId) => {
  const query = 'SELECT * FROM patient WHERE id = $1';
  const result = await db.query(query, [patientId]);
  return result.rows[0];
};

export const fetchAppointmentsByPatientId = async (patientId) => {
  const query = 'SELECT * FROM medicalappointments WHERE patient_id = $1';
  const result = await db.query(query, [patientId]);
  return result.rows;
};
