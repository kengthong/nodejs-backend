import * as express from 'express';

import teacherRoute from './teacher/teacher.route';

const router = express.Router();

router.use('/', teacherRoute);

export default router;
