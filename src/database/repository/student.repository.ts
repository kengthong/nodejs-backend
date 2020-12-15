import {getRepository} from "typeorm";
import {Student} from "../entities/student/student.entity";

const findOne = async(conditions: any) => {
    return await getRepository(Student).findOne(conditions);
}

const save = async(student: Student) => {
    return await getRepository(Student).save(student);
}

export default {
    findOne,
    save
}