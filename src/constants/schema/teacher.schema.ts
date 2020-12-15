import joi from 'joi';

export default {
  register: {
    body: {
      teacher: joi.string().email().required(),
      students: joi.array().items(joi.string())
    },
  },
  commonStudents: {
    query: {
      teacher: joi.alternatives().try(
          joi.string().email().required(),
          joi.array().items(joi.string().email().required())
      )
    }
  },
  suspendStudent: {
    body: {
      student: joi.string().email().required()
    }
  },
  retrieveForNotifications: {
    body: {
      teacher: joi.string().email().required(),
      notification: joi.string().required()
    }
  }
};
