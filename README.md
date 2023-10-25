# swagger-by-jsdoc-serverless
Read serverless and jsdoc to make a swagger json

## Install
```sh
npm i swagger-by-jsdoc-serverless
```

## Post install
Add to pachage.json "scripts"
```json
"scripts": {
  "swagger-init": "node -r swagger-by-jsdoc-serverless/scripts/init.js",
  "swagger-spec": "node -r swagger-by-jsdoc-serverless/scripts/spec.js",
  "swagger-html": "node -r swagger-by-jsdoc-serverless/scripts/html.js"
}
```  

## Init
```sh
npm run swagger-init
```

## Spec first
Create folders and default shcemas files
```sh
npm run swagger-spec
```
Update schema files in `\swagger\components\schemas` and now run again
```sh
npm run swagger-spec
```

## Make html
```sh
npm run swagger-html
```