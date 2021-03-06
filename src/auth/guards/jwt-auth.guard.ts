import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.token) return false;

    try {
      const user = await this.authService.validateToken(req.token);

      req.user = user;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
