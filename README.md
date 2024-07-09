# nodejs-express-typescript-docker

The Nodejs + Express + TypeScript + Docker codebase.

## How to setup the environment

1. Install `Docker` and `Docker Compose`

## How to run for development

1. Start `Docker`
2. Run the development `Docker` container: `npm run dev`

## How to run the tests

1. Start `Docker`
2. Run the test `Docker` container: `npm run test`

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