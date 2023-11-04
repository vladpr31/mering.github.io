const patientDAL = require("../../DALs/patientDAL");

const createNewPatient = (patientInfo) => {
  const { patientInfo: newPatient, account } = patientInfo;
  newPatient.account = account;
  return patientDAL.createNewPatient(newPatient);
};

const updateApotroposOfPatient = (id, apotropos) => {
  return patientDAL.updateApotroposOfPatient(id, apotropos);
};

const getPatientByID = async (id) => {
  return patientDAL.getPatientByID(id);
};

const addNewAppointment = (patientID, appointment) => {
  return patientDAL.addNewAppointment(patientID, appointment);
};

const getPatientByAccountID = (accountID) => {
  return patientDAL.getPatientByAccountID(accountID);
};

const getPatientAppointmentsByDoctor = (doctorId) => {
  return patientDAL.getPatientAppointmentsByDoctor(doctorId);
};

module.exports = {
  createNewPatient,
  updateApotroposOfPatient,
  getPatientByID,
  addNewAppointment,
  getPatientByAccountID,
  getPatientAppointmentsByDoctor,
};