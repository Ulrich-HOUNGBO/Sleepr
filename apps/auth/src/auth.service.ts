import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/model/users.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expire = new Date();
    expire.setSeconds(
      expire.getSeconds() + this.configService.get('JWT_EXPIRATION_TIME'),
    );

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expire,
    });
  }
}
