import {createQueryBuilder, getRepository} from 'typeorm';
import {Student} from "../database/entities/student/student.entity";

const createIfNotExist = async (studentEmails: string[]) => {
    console.log("student getOrCreateIfNotExist")
    const students = studentEmails.map(e => {
        const s = new Student();
        s.email = e;
        return s;
    });

    await createQueryBuilder()
        .insert()
        .into(Student)
        .values(students)
        .orIgnore()
        .execute();
}

const getStudentsByEmails = async (emails: string[]) => {
    return await getRepository(Student).createQueryBuilder('student')
        .where("student.email IN (:emails)", {emails})
        .getMany();
}

export default {
    createIfNotExist,
    getStudentsByEmails
};
