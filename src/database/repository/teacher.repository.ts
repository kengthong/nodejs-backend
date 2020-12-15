import {getRepository} from 'typeorm';
import {Teacher} from '../entities/teacher/teacher.entity';

const findOne = async(conditions: any) => {
    return await getRepository(Teacher).findOne(conditions);
}

const save = async(entity: Teacher) => {
    return await getRepository(Teacher).save(entity);
}

const findManyByEmails = async(tEmails: string[]) => {
    return await getRepository(Teacher).createQueryBuilder('teacher')
        .leftJoinAndSelect("teacher.students", "students")
        .where("teacher.email IN (:tEmails)", { tEmails })
        .getMany();
}
export default {
    findOne,
    save,
    findManyByEmails,
};
