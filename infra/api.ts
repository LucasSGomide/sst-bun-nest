import { databaseUrl } from "./secrets";

export const api = new sst.aws.ApiGatewayV2("ApiGateway", {
  accessLog: {
    retention: "1 day",
  },
});

api.route("GET /api", {
  handler: "packages/subscription/src/infra/lambda.helloWorldHandler",
  environment: {
    DATABASE_URL: databaseUrl.value
  }
});
