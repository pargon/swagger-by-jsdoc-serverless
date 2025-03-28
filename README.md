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
### Schemas

The **schemas** mentioned in this project refer to the JSON objects used in both the **request body** and the **response body**. These schemas define the structure and validation of the data sent or received in the API operations.

If you need help creating a schema, you can refer to the [json-to-schema-swagger](https://www.npmjs.com/package/json-to-schema-swagger) package, where you will find a detailed guide on how to generate schemas compatible with Swagger.

For example:
- **Request Body Schema**: Defines the data that the client must send to the server.
- **Response Body Schema**: Defines the data that the server returns to the client.

Make sure to properly document these schemas in your Swagger definitions to ensure a well-structured and easy-to-understand API.