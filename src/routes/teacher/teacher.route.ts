import express from 'express';

import userController from '../../controllers/teacher.controller';
import teacherSchema from '../../constants/schema/teacher.schema';

const router = express.Router();

const schemaValidator = require('express-joi-validator');

router.get(
    '/',
    userController.self,
);

router.post(
  '/register',
  schemaValidator(teacherSchema.register),
  userController.register,
);
router.get(
  '/commonstudents',
  schemaValidator(teacherSchema.commonStudents),
  userController.commonStudents,
);

router.post(
    '/suspend',
    schemaValidator(teacherSchema.suspendStudent),
    userController.suspendStudent,
);

router.post(
    '/retrievefornotifications',
    schemaValidator(teacherSchema.retrieveForNotifications),
    userController.retrieveForNotifications,
);


export default router;
