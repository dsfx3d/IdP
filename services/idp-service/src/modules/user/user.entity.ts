import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "~/modules/session/session.entity";
import {Token} from "~/modules/auth/entities/token.entity";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Token, tokens => tokens.user)
  tokens: Token[];

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];
}
