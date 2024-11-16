import db from '../config/db.js';

export const validateDoctor = async (email, password) => {
  const query = 'SELECT * FROM doctor WHERE email = $1 AND password = $2';
  const values = [email, password];
  const result = await db.query(query, values);

  return result.rows[0];
};

export const fetchAppointments = async (doctorId, date) => {
  let query = 'SELECT * FROM medicalappointments WHERE doctor_id = $1';
  const values = [doctorId];

  if (date) {
    query += ' AND appointment_date = $2';
    values.push(date);
  }

  const result = await db.query(query, values);
  return result.rows;
};

export const createAppointment = async (doctorId, patientId, date, time) => {
  const conflictQuery = `
    SELECT * FROM medicalappointments
    WHERE (doctor_id = $1 AND appointment_date = $2 AND appointment_time = $3)
       OR (patient_id = $4 AND appointment_date = $2 AND appointment_time = $3)
  `;
  const conflictValues = [doctorId, date, time, patientId];
  const conflictCheck = await db.query(conflictQuery, conflictValues);

  if (conflictCheck.rows.length > 0) {
    throw new Error('Conflicting appointment exists');
  }

  const insertQuery = `
    INSERT INTO medicalappointments (doctor_id, patient_id, appointment_date, appointment_time)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const result = await db.query(insertQuery, [doctorId, patientId, date, time]);
  return result.rows[0];
};

export const updateAppointment = async (appointmentId, patientId, date, time) => {
  const query = `
    UPDATE medicalappointments
    SET patient_id = $1, appointment_date = $2, appointment_time = $3
    WHERE id = $4 RETURNING *
  `;
  const values = [patientId, date, time, appointmentId];
  const result = await db.query(query, values);

  if (result.rows.length === 0) {
    throw new Error('Appointment not found');
  }

  return result.rows[0];
};

export const deleteAppointment = async (appointmentId) => {
  const query = 'DELETE FROM medicalappointments WHERE id = $1';
  const result = await db.query(query, [appointmentId]);

  if (result.rowCount === 0) {
    throw new Error('Appointment not found');
  }
};
