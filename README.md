# swagger-by-jsdoc-serverless
Read serverless and jsdoc to make a swagger json

## Install
```sh
npm i swagger-by-jsdoc-serverless
```

## Post install
Run script
```sh
node -r swagger-by-jsdoc-serverless/scripts/init.js
```
Or manually edit `pachage.json"`:
```json
"scripts": {
  "swagger-spec": "node -r swagger-by-jsdoc-serverless/scripts/spec.js > NUL",
  "swagger-html": "node -r swagger-by-jsdoc-serverless/scripts/html.js > NUL"
}
```  
And edit `.gitignore`:
```sh
swagger/*/*
!swagger/components/schemas/
tmp/*.json
```
The next folders will be created
```sh
./swagger
./tmp
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
Run script
```sh
npm run swagger-html
```
and you can find `tmp\index.html`