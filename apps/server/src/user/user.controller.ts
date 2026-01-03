import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('user/:username')
  async getUserByUsername(username: string) {
    return this.userService.findByUsername(username);
  }
}
