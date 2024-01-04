import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "~/modules/session/session.entity";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];
}
