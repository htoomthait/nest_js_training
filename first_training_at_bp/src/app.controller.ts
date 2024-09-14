import { Controller, Get, Logger, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger: LoggerService = new Logger(AppController.name);

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    const message = this.appService.getHello();

    this.logger.log("This hello world function!");
    this.logger.warn("This is waring message");
    this.logger.debug(`This is debug message ${message}`);
    this.logger.error(`This is sample error message!`);
    this.logger.verbose(`This is sample verbose message!`)

    return {
      "status": "success",
      "message": "Successfully queried",
      "data": message
    }
  }
}
