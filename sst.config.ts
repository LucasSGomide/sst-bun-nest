/// <reference path="./.sst/platform/config.d.ts" />
const fs = await import("node:fs");

export default $config({
  app(input) {
    return {
      name: "sst-bun",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "evol-dev",
          region: "sa-east-1",
        },
      },
    };
  },
  async run() {
    const outputs = {};
    // Important! file paths of files imported evaluate on root level
    for (const value of fs.readdirSync("./infra/")) {
      if (value === "utils.ts") return;
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
