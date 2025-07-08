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
});

api.route('ANY /subscriptions/{proxy+}', {
    handler: 'packages/subscription/src/infra/api.subscriptionsHandler',
    environment: {
        DATABASE_URL: databaseUrl.value,
    },
});
