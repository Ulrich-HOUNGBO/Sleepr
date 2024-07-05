import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notyfy-email.dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(data: NotifyEmailDto) {
    // Send email
  }
}
