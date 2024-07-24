# nodejs-express-typescript-docker

The Nodejs + Express + TypeScript + Docker codebase.

## Features

- `Monorepo` tooling using [Nx](https://nx.dev/).
- [SOLID](https://www.bmc.com/blogs/solid-design-principles/) codebase following the [Hexagonal Architecture](https://www.expatdev.com/posts/hexagonal-architecture-in-java/).
- [DRY](https://zapier.com/blog/dont-repeat-yourself/) codebase using `Nx Libraries`.
- [12 Factor](https://12factor.net/) compliant codebase.
- Strict type checking using `TypeScript`.
- Logging library using `pino`
- Linting & Static Code Analysis using `ESLint`.
- Code Formatting using `Prettier`.
- Git hooks using `husky`.
- Conventional Commits using `Commitlint` & `Commitizen`.
- Sorting imports using `TypeScript Import Sorter`
- Unit testing using `Jest`.
- Integration testing using `Supertest`.
- Load testing using `k6`.
- CI/CD using `CircleCi`.

## Read about the best practices/patterns we follow

- [Organizing projects and shared libraries in a Monorepo](https://monorepo.tools/)
- [Backend Best Practices](https://github.com/Sairyss/backend-best-practices)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Node.js Integration Tests Best Practices](https://github.com/testjavascript/nodejs-integration-tests-best-practices)

## How to setup the environment

The guide assumes you are running on a UNIX based OS for consistency and reproducible dev environments, so either Linux or MacOS. If you are using Windows, then you must use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about).

1. Install the following tools if you don't have them installed on your machine:

   - `Docker`: Latest Version
   - `Docker Compose`: Latest Version
   - `nvm`: Latest Version
   - `Node.js`: v18.x.x using NVM
   - `AWS CLI`: v2.x.x (Please ensure that you install it using the official AWS installers and not via a package manager like pip or homebrew as it causes compatibility issues with other tools)
   - `AWS SAM CLI`: v1.103.0 (Please ensure that you install it using the official AWS installers and not via a package manager like pip or homebrew as it causes compatibility issues with other tools)
   - `AWS SAM CLI Local (Localstack)`: v1.67.0
   - `Make`: v3.x.x
   - `k6`: v0.46.0
   - `jq`
   - `rsync`

2. Configure `AWS CLI` to use your personal AWS IAM User credentials if you are planning to use any of AWS services

   ```
   aws configure
   ```

## How to run for development

1. Start `Docker`
2. Run the development `Docker` container: `npm run dev`

## How to run the tests

1. Start `Docker`
2. Run the test `Docker` container: `npm run test`

## How to run the load test

1. Start `Docker`
2. Run the test `Docker` container: `npm run dev`
3. Run the k6 script in another terminal: `k6 run k6-tests/script.js`

## How to commit your work

1. Stage the changes you want to commit using the command `git add .` or using the VSCode Git interface (just stage the files but not commit)
2. Run `npm run commit` and follow the interactive prompt to write concise and accurate git commit messages.
3. Select the appropriate type of change like `feat`, `fix`, `chore` etc... depending on the change. In a feature branch, only the final commit should be of type `feature` or `fix`, the intermediate/wip commits should use the appropriate other types so they don't show up in the automatically generated changelog.
4. Mention the endpoint which will be effected in the scope. If the change affects multiple endpoints, list them all comma separated, if the change affects one or more modules, write their names comma separated Ex: `product, order, user` etc... If your change is a cross cutting concern that affects the entire app, leave the scope empty.
5. Write a short description of the change in the imperative tense, ex: `add x, y and z` not `added x, y and z` or `x,y and z added`.
6. Write a more detailed description of the functionality added with the change. The details should be useful information for the API consumers/product team if any, otherwise empty.
7. Mention whether there is a breaking change with y/n flag, then write the breaking changes line separated in a format that is easily understood by the API consumers/product team.
8. Mention any open tickets affected by the changes.
9. Push the changes with the command `git push origin ${branch-name}` or using the VSCode Git interface.
