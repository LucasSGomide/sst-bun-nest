import { databaseUrl } from './secrets';

export const api = new sst.aws.ApiGatewayV2('ApiGateway', {
    accessLog: {
        retention: '1 day',
    },
});

api.route('ANY /subscriptions', {
    handler: 'packages/subscription/src/infra/api.subscriptionsHandler',
    environment: {
        DATABASE_URL: databaseUrl.value,
    },
    nodejs: {
        esbuild: {
            external: [
                '@nestjs/microservices',
                '@nestjs/websockets',
                '@nestjs/platform-express',
                'class-transformer',
                'class-validator',
            ],
        },
    },
});

api.route('ANY /subscriptions/{proxy+}', {
    handler: 'packages/subscription/src/infra/api.subscriptionsHandler',
    environment: {
        DATABASE_URL: databaseUrl.value,
    },
    nodejs: {
        esbuild: {
            external: [
                '@nestjs/microservices',
                '@nestjs/websockets',
                '@nestjs/platform-express',
                'class-transformer',
                'class-validator',
            ],
        },
    },
});
