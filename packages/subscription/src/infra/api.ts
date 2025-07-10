import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import type { Handler, Callback, Context } from 'aws-lambda';
import awsLambdaFastify from '@fastify/aws-lambda';
import { SubscriptionModule } from './nest-js/subscription.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  console.time('Start');

  const app = await NestFactory.create<NestFastifyApplication>(
    SubscriptionModule,
    new FastifyAdapter(),
  );

  await app.init();
  const fastifyApp = app.getHttpAdapter().getInstance();
  const lambdaHandler = awsLambdaFastify(fastifyApp);
  console.timeEnd('Start');

  return lambdaHandler;
}

export const subscriptionsHandler: Handler = async (
  event,
  context,
  callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

// Serverless Express

// import { NestFactory } from '@nestjs/core';
// import type { Callback, Context, Handler } from 'aws-lambda';
// import serverlessExpress from '@codegenie/serverless-express';
// import { SubscriptionModule } from './nest-js/subscription.module';

// let server: Handler;

// async function bootstrap(): Promise<Handler> {
//     const app = await NestFactory.create(SubscriptionModule);
//     await app.init();
//     const expressApp = app.getHttpAdapter().getInstance();
//     return serverlessExpress({ app: expressApp });
// }

// export const subscriptionsHandler: Handler = async (
//     event: any,
//     context: Context,
//     callback: Callback,
// ) => {
//     server = server ?? (await bootstrap());
//     return server(event, context, callback);
// };
