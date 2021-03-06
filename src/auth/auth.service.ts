import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dtos/login.dto';
import * as argon2 from 'argon2';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

type UserInfo = {
  email: string;
  id: string;
  name: string;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signIn(request: LoginDto) {
    try {
      const user = await this.userService.findUser(request.email);

      if (!user) throw new ForbiddenException('Invalid email or password');

      const correctPassword = await argon2.verify(
        user.password,
        request.password,
      );

      if (!correctPassword)
        throw new ForbiddenException('Invalid email or password');

      return {
        user: {
          name: user.name,
          email: user.email,
        },
        token: this.generateToken(user),
      };
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Invalid email or password');
    }
  }

  public async validateToken(token: string): Promise<UserDocument> {
    const decoded = this.jwtService.decode(token) as UserInfo;

    if (!decoded) return null;

    const user = await this.userService.findUser(decoded.email);
    
    return user;
  }

  private generateToken(user: UserDocument) {
    const payload: UserInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    return this.jwtService.sign(payload);
  }
}
