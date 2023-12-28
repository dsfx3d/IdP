import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "~/modules/user/entities/user.entity";

@Entity({name: "applications"})
export class Application {
  @PrimaryGeneratedColumn("uuid")
  clientId: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn()
  ownerId: number;

  @Column({unique: true})
  secret: string;
}
