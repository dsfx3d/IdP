import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "../user/user.entity";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, user => user.sessions)
  @JoinColumn()
  user: User;

  @Column({nullable: true})
  userId: number;

  @Column()
  ipAddress: string;
}
