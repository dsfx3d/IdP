import {Application} from "~/modules/applications/entities/application.entity";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Application, application => application.ownerId)
  applications: Application[];
}
