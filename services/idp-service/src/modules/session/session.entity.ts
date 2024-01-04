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

  @Column({nullable: true})
  userId: number;

  @Column()
  ipAddress: string;

  @Column()
  deviceId: string;

  @Column({nullable: true})
  userAgent: string;

  @Column({nullable: true})
  refreshToken: string;

  @ManyToOne(() => User, user => user.sessions)
  @JoinColumn()
  user: User;
}
