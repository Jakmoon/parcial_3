import pool from '../config/db.js';

class DoctorService {
  static async login(email, password) {
    // Query database for doctor and validate credentials
  }

  static async getAppointments(doctorId, date) {
    // Query database for appointments by doctor and optionally by date
  }

  static async createAppointment(doctorId, patientId, date, time) {
    // Insert new appointment into the database
  }

  static async editAppointment(appointmentId, newDetails) {
    // Update appointment details in the database
  }

  static async deleteAppointment(appointmentId) {
    // Delete appointment from the database
  }
}

export default DoctorService;
