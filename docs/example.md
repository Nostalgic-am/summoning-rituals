# Example

A complete working example showing all features together.

```js
import { create, Plugin, Logger } from "kubejs";

// Create a new instance with full configuration
const app = create({
  name: "full-example",
  version: "1.0.0",

  // Global settings
  enabled: true,
  output: "./build",

  // Detailed options
  options: {
    debug: true,
    verbose: true,

    // Register plugins
    plugins: [
      {
        name: "logger",
        setup(build) {
          build.onStart(() => {
            Logger.info("Build started at", new Date().toISOString());
          });
          build.onEnd((result) => {
            Logger.info(`Build finished with ${result.errors.length} errors`);
          });
        },
      },
      {
        name: "transformer",
        setup(build) {
          build.onLoad({ filter: /\.ts$/ }, (args) => {
            return {
              contents: transform(args.path),
              loader: "ts",
            };
          });
        },
      },
    ],

    // Configure watchers
    watch: {
      paths: ["./src/**/*.ts", "./src/**/*.js"],
      ignore: ["node_modules", "dist"],
      onChange(file) {
        Logger.info(`File changed: ${file}`);
      },
    },

    // Define custom hooks
    hooks: {
      beforeBuild: async (ctx) => {
        await ctx.clean();
        await ctx.prepare();
      },
      afterBuild: async (ctx) => {
        await ctx.optimize();
        await ctx.deploy();
      },
    },
  },
});

// Run the application
app.run();
```

::: info
This example demonstrates the most common configuration patterns. You can mix and match options to suit your project's needs.
:::
