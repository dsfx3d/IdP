import {Body, Controller, Post} from "@nestjs/common";
import {RegisterUserDto} from "../dto/register-user.dto";
import {User} from "../entities";
import {UserService} from "../services/user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("register")
  registerUser(@Body() userDto: RegisterUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }
}
