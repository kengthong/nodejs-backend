import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {DateTimeEntity} from '../base/dateTimeEntity';

@Entity('student', { orderBy: {  id: 'ASC' } })
export class Student extends DateTimeEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    @Unique(['email'])
    email: string;

    @Column({ default: true })
    isActive: boolean;
}
