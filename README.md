# swagger-by-jsdoc-serverless
Read serverless and jsdoc to make a swagger json

## install from Bitbucket
Find `Clone` button on source repository, later option https like this `git clone https://gnparra@bitbucket.org/workspace/repo.git##branch`
Install by npm like this:
```sh
npm i https://gnparra@bitbucket.org/ws/repo.git##branch
```
and you install from bitbucket where `ws` is the workspaces and `repo` is repository to add. At the end we have the `branch` like `main` or `develop` for example. 

## post install
Add to pachage.json "scripts"
```json
"scripts": {
  "swagger-init": "node -r swagger-by-jsdoc-serverless/scripts/init.js",
  "swagger-spec": "node -r swagger-by-jsdoc-serverless/scripts/spec.js",
  "swagger-html": "node -r swagger-by-jsdoc-serverless/scripts/html.js"
}
```  

## init
```sh
npm run swagger-init
```

## spec first
Create folders and default shcemas files
```sh
npm run swagger-spec
```
Update schema files in `\swagger\components\schemas` and now run again
```sh
npm run swagger-spec
```

## make html
```sh
npm run swagger-html
```