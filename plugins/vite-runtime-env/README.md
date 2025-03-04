# Vite-plugin-runtime-env

## Problem

The default Vite config mechanism doesn't separate code and env following [12-Factors](https://12factor.net/)

## Solution

This plugin solves the problem above by separating the env config into a separate module from the code bundle, opening the door for mounting and updating runtime config when running in a container environment.

## Usage

Declare env following Vite convention: <https://vitejs.dev/guide/env-and-mode.html> .env.production

.vite.config.ts

```javascript
import RuntimeEnv from '@investtal/vite-runtime-env';
import ViteReactRefresh from '@vitejs/plugin-react';
import { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [...plugins, RuntimeEnv()],
};
```

client code:

```javascript
console.log(window.__RUNTIME_ENV__);
console.log(window.__APP_METADATA__);
```
