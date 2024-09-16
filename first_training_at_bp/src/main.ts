import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("MAIN FILE");
  const appEnv: string = "production";

  logger.verbose(` APP ENV = ${appEnv}`)

  /*  Logger.overrideLogger(
     appEnv == "development" ?
       ['error', 'warn', 'debug', 'fatal', 'verbose', 'log'] :
       ['error', 'warn']
   ); */


  await app.listen(9000);
}
bootstrap();
