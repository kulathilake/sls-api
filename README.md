# Only So Much Life Core Services

This repository contains the core service apis of Only So Much Life.
This is a monorepo of several modules that can work in isolation as long as the `common` 
dependencies and `libs` are made available.

For deployment purposes, Serverless framework is used. It will expose features (found inside `src/apis`)
through their own handler functions as AWS lambda functions.

`typeDi` is used for dependency injection.

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

### Local development

It is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).

To install local dynamodb emulator, execute the following command:

```bash
serverless dynamodb install
```

