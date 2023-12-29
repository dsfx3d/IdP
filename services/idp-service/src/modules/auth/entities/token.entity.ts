import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "~/modules/user/user.entity";

@Entity("tokens")
export class Token {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
