# Getting Started

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- A package manager like `npm`, `yarn`, or `pnpm`

## Installation

Add the dependency to your project:

```bash
npm install kubejs
```

Or if you prefer yarn:

```bash
yarn add kubejs
```

## Basic Setup

Create a configuration file in your project root:

```js
// kubejs.config.js
export default {
  // Enable the plugin
  enabled: true,

  // Set the output directory
  output: "./dist",

  // Configure options
  options: {
    debug: false,
    verbose: true,
  },
};
```

## Quick Example

Here's a minimal example to get you up and running:

```js
import { create } from "kubejs";

const instance = create({
  name: "hello-world",
  version: "1.0.0",
});

instance.run();
```

## Next Steps

- Check the [Configuration](/configuration) page for all available options
- See the [Example](/example) page for a full working example
