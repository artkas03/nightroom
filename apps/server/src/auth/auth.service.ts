import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: PayloadDto = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
