# Contributing

Use Node 22.20+ and run `npm install`. Changes must pass `npm run check` and `npm run build`.

Add original vector geometry to `packages/core/src/artwork` and register it in the canonical catalog. Do not edit generated React components. Run `npm run build:packages` after changing the source. Review artwork at 16, 24, 32, 64 and 96 pixels, with supported stroke bounds, all available treatments, and light/dark backgrounds.

Maintain one primary category per concept. Add descriptive tags and named semantic parts, preserve existing IDs, and record provenance. Follow the existing stateless SVG API and avoid client directives or new runtime dependencies in the icon packages. No animation contributions are in scope.

Website pages fetch data through `lib/api`; sections own layout and interactions; UI primitives remain stateless. Add matching skeleton and error boundaries for new asynchronous routes. Preserve keyboard access and accessible names.

When reporting a security issue, avoid including credentials or private data in public issues. Describe the affected version and a minimal reproduction to the maintainer through a private GitHub contact channel when available.
