import {Teacher} from '../database/entities/teacher/teacher.entity';
import studentService from './student.service';
import errors from '../constants/errors';
import teacherRepository from '../database/repository/teacher.repository';
import studentRepository from '../database/repository/student.repository';

// EXPORTED FUNCTIONS

const getCommonStudents = async (tEmails: string[] | any[]) => {
    const tEntities = await teacherRepository.findManyByEmails(tEmails);
    if (tEntities.length == tEmails.length) {
        const tStudents = tEntities.map(t => t.students != undefined ? t.students.map(s => s.email) : []);
        return tStudents.shift().reduce(function (res, v) {
            if (res.indexOf(v) === -1 && tStudents.every(function (a) {
                return a.indexOf(v) !== -1;
            })) res.push(v);
            return res;
        }, []);
    } else {
        throw new Error(errors.TEACHER_DOES_NOT_EXIST)
    }
}

const register = async (tEmail: string, sEmails: string[]) => {
    try {
        const tEntity = await createIfNotExist(tEmail);
        await registerStudents(tEntity, sEmails);
    } catch (e) {
        throw e;
    }
}

const retrieveForNotifications = async (tEmail: string, notification: string) => {
    const symbol = '@';
    const tEntity = await findByEmail(tEmail);
    const studentEmails = notification.split(' ')
        .reduce((filtered, word) => {
            if (word.indexOf(symbol) != -1) {
                filtered.push(word.substring(1));
            }
            return filtered;
        }, []);
    const students = await studentService.getStudentsByEmails(studentEmails);

    const notifiedStudents = !tEntity.students ? students : tEntity.students.concat(students).reduce((filtered, s) => {
        if (s.isActive) {
            filtered.push(s.email);
        }
        return filtered;
    }, [])
    return uniqueEmails(notifiedStudents);
}

const suspendStudent = async (studentEmail: string) => {
    const student = await studentRepository.findOne({
        email: studentEmail
    });

    if (!student) throw new Error(errors.STUDENT_DOES_NOT_EXIST);
    student.isActive = false;
    await studentRepository.save(student);
}

// NOT EXPORTED FUNCTIONS

const createIfNotExist = async (tEmail: string) => {
    let teacher;
    teacher = await teacherRepository.findOne({
        email: tEmail
    });

    if (teacher == undefined) {
        teacher = new Teacher();
        teacher.email = tEmail;
        return await teacherRepository.save(teacher);
    }

    return teacher;
}

const findByEmail = async (tEmail: string) => {
    const entity = await teacherRepository.findOne({
        email: tEmail
    });

    if (!entity) throw new Error(errors.TEACHER_DOES_NOT_EXIST);
    return entity;
}

const registerStudents = async (tEntity: Teacher, sEmails: string[]) => {
    await studentService.createIfNotExist(sEmails);
    const sEntities = await studentService.getStudentsByEmails(sEmails);
    tEntity.students = tEntity.students != undefined ? tEntity.students.concat(sEntities) : sEntities;
    return await teacherRepository.save(tEntity);
}

const uniqueEmails = (emails: string[]) => {
    const seen: any = {};
    const out: string[] = [];
    emails.forEach(e => {
        if (seen[e] !== 1) {
            seen[e] = 1;
            out.push(e);
        }
    })
    return out;
}
export default {
    getCommonStudents,
    register,
    retrieveForNotifications,
    suspendStudent
};
