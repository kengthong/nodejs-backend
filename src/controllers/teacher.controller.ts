import httpStatusCodes from 'http-status-codes';

import teacherService from '../services/teacher.service';
import IController from '../types/IController';
import apiResponse from '../utilities/apiResponse'
import errors from '../constants/errors';
import logger from "../config/logger";

const commonStudents: IController = async (req, res) => {
  const {teacher} = req.query;
  let tEmails;
  if(Array.isArray(teacher)) {
    tEmails = teacher;
  } else {
    tEmails = [teacher];
  }

  try {
    const commonStudents = await teacherService.getCommonStudents(tEmails);
    apiResponse.result(res, { students: commonStudents }, httpStatusCodes.OK);
  } catch(e) {
    if(e.message == errors.TEACHER_DOES_NOT_EXIST) {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    } else {
      apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

  }
};

const register: IController = async (req, res) => {
  const { teacher, students } = req.body;
  try {
    await teacherService.register(teacher, students);
    apiResponse.result(res, null,  httpStatusCodes.NO_CONTENT);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    return;
  }
};

const retrieveForNotifications: IController = async(req, res) => {
  try {
    const {teacher, notification } = req.body;
    const students = await teacherService.retrieveForNotifications(teacher, notification);
    apiResponse.result(res, {recipients: students}, httpStatusCodes.OK);
  } catch(e) {
    if(e.message == errors.TEACHER_DOES_NOT_EXIST) {
      logger.error(`${req.method} ${req.path} ${req.protocol} ${httpStatusCodes.BAD_REQUEST} - ${e.message}`)
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    } else {
      apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}


const suspendStudent: IController = async (req, res) => {
  try {
    const {student} = req.body;
    await teacherService.suspendStudent(student);
    apiResponse.result(res, null, httpStatusCodes.NO_CONTENT);
  } catch(e) {
    if(e.message == errors.STUDENT_DOES_NOT_EXIST) {
      logger.error(`${req.method} ${req.path} ${req.protocol} ${httpStatusCodes.BAD_REQUEST} - ${e.message}`)
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    } else {
      apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};

const self: IController = async(req, res) => {
  const response = "Hello World";
  apiResponse.result(res, response, httpStatusCodes.OK)
}

export default {
  commonStudents,
  register,
  retrieveForNotifications,
  suspendStudent,
  self
};
