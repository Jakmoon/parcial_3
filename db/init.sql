-- Create the specialties table first, as doctors depend on it
CREATE TABLE IF NOT EXISTS specialties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  specialty_id INT REFERENCES specialties(id)
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  doctor_id INT REFERENCES doctors(id),
  patient_id INT REFERENCES patients(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  UNIQUE (doctor_id, appointment_date, appointment_time),
  UNIQUE (patient_id, appointment_date, appointment_time)
);

-- Insert specialties
INSERT INTO specialties (name) VALUES
('Medicina General'),
('Cardiología'),
('Urología'),
('Fisiología'),
('Pediatría');

-- Insert sample doctors
INSERT INTO doctors (name, email, password, specialty_id) VALUES
('Dr. Juan Pérez', 'juan.perez@hospital.com', 'hashed_password_1', 1),
('Dr. Ana Gómez', 'ana.gomez@hospital.com', 'hashed_password_2', 2),
('Dr. Carlos Ruiz', 'carlos.ruiz@hospital.com', 'hashed_password_3', 3),
('Dr. Laura Sánchez', 'laura.sanchez@hospital.com', 'hashed_password_4', 4),
('Dr. Mario López', 'mario.lopez@hospital.com', 'hashed_password_5', 5);

-- Insert sample patients
INSERT INTO patients (name, email, password) VALUES
('Paciente 1', 'paciente1@hospital.com', 'hashed_password_1'),
('Paciente 2', 'paciente2@hospital.com', 'hashed_password_2'),
('Paciente 3', 'paciente3@hospital.com', 'hashed_password_3'),
('Paciente 4', 'paciente4@hospital.com', 'hashed_password_4'),
('Paciente 5', 'paciente5@hospital.com', 'hashed_password_5'),
('Paciente 6', 'paciente6@hospital.com', 'hashed_password_6'),
('Paciente 7', 'paciente7@hospital.com', 'hashed_password_7'),
('Paciente 8', 'paciente8@hospital.com', 'hashed_password_8'),
('Paciente 9', 'paciente9@hospital.com', 'hashed_password_9'),
('Paciente 10', 'paciente10@hospital.com', 'hashed_password_10');
