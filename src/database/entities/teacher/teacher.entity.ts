import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {DateTimeEntity} from '../base/dateTimeEntity';
import {Student} from "../student/student.entity";

@Entity('teacher', { orderBy: {  id: 'ASC' } })
export class Teacher extends DateTimeEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @Unique(['email'])
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(() => Student, {
        eager: true,
        cascade: ["insert", "update"],
        onDelete: "CASCADE"
    })
    @JoinTable({
        name: "teacher_student",
        joinColumn: {
            name: "teacher",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "student",
            referencedColumnName: "id"
        }
    })
    students: Student[];
}
