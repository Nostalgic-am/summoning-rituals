# Configuration

All available configuration options for KubeJS.

## Global Options

| Option    | Type      | Default   | Description                     |
| --------- | --------- | --------- | ------------------------------- |
| `enabled` | `boolean` | `true`    | Enable or disable the plugin    |
| `output`  | `string`  | `"./dist"`| Output directory for builds     |
| `debug`   | `boolean` | `false`   | Enable debug logging            |
| `verbose` | `boolean` | `false`   | Enable verbose output           |

## Options Object

The `options` object accepts the following properties:

### `options.debug`

- **Type:** `boolean`
- **Default:** `false`

Enables debug mode. When active, additional logging will be printed to the console.

```js
export default {
  options: {
    debug: true,
  },
};
```

### `options.verbose`

- **Type:** `boolean`
- **Default:** `false`

Enables verbose output. This will log detailed information about each step of the build process.

### `options.plugins`

- **Type:** `Plugin[]`
- **Default:** `[]`

An array of plugins to load. Each plugin should be an object with a `name` and `setup` function:

```js
export default {
  options: {
    plugins: [
      {
        name: "my-plugin",
        setup(build) {
          build.onStart(() => {
            console.log("Build started!");
          });
        },
      },
    ],
  },
};
```

## Environment Variables

You can also configure the project using environment variables:

| Variable             | Description                |
| -------------------- | -------------------------- |
| `MY_PROJECT_DEBUG`   | Set to `1` to enable debug |
| `MY_PROJECT_OUTPUT`  | Override the output path   |

::: tip
Environment variables take precedence over configuration file values.
:::

::: warning
Setting `debug: true` in production may expose sensitive information in logs.
:::
