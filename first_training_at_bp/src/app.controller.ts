import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    const message = this.appService.getHello();

    return {
      "status": "success",
      "message": "Successfully queried",
      "data": message
    }
  }
}
