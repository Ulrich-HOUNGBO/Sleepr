import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';
import { AUTH_SERVICE } from '@app/common/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookie?.Authentication;
    if (!jwt) return false;
    return this.authClient
      .send<UserDto>('authenticate', { Authentication: jwt })
      .pipe(
        tap((response) => {
          context.switchToHttp().getRequest().user = response;
        }),
        map(() => true),
      );
  }
}
