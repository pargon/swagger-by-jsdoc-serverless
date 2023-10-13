const {
  getParmsPathQuery,
  getRequestBody,
  getBodyRequestByParm,
  getBodySuccess,
  getParamsJson,
  getHeaderJson
} = require("./getBodyParm");

const getJsonFunction = (
  elemFunction,
  paramPath,
  reqBodiesPath,
  filePath,
  respPath
) => {
  const key = `/${elemFunction.path}`;
  const funcion = {};
  funcion[key] = {};

  // metodos para el path
  elemFunction.detail.forEach((funcDetail) => {
    const subKey = funcDetail.method;
    const headerInfo = getHeaderJson(funcDetail);
    const allParameters = getParamsJson(
      funcDetail.paramsManual,
      funcDetail.name,
      paramPath
    );
    const parameters = getParmsPathQuery(allParameters);
    let requestBody = getBodyRequestByParm(
      allParameters,
      elemFunction.path,
      subKey,
      filePath,
      reqBodiesPath
    );
    if (!requestBody && (subKey === "post" || subKey === "patch"))
      requestBody = getRequestBody(
        elemFunction.path,
        subKey,
        filePath,
        reqBodiesPath
      );

    const bodySuccess = getBodySuccess(
      elemFunction.path,
      subKey,
      filePath,
      respPath
    );
    funcion[key][subKey] = {
      description: headerInfo.description,
      operationId: funcDetail.name,
      tags: headerInfo.tags,
      requestBody,
      parameters,
      responses: { 200: { $ref: `#/components/responses/${bodySuccess}` } }
    };
  });
  return funcion;
};

module.exports = {
  getJsonFunction
};
