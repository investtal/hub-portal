# hub-portal
The hub shares our work to execute our vision about ...

## Plugins

- [bundlesize-limiter](./plugins/bundlesize-limiter)
- [vite-runtime-env](./plugins/vite-runtime-env)

## Development

```bash
bun install
```
## Build

```bash
bun run build
```

## Test in local

1. Run `bun run build` to build the project
2. Cd to `plugins/name-of-plugin` and run `bun link` to link the package to global node_modules
3. Can go to the application and install the package from local like: `"@investtal/name-of-plugin": "workspace:*"`
