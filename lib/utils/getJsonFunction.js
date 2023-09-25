const {
  getParmsPathQuery,
  getBodyRequestByParm,
  getBodySuccess,
  getParamsJson,
  getHeaderJson
} = require("./getBodyParm");

const getJsonFunction = (
  elemFunction,
  parametersPath,
  requestBodiesPath,
  schemasPath,
  responsesPath
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
      parametersPath
    );
    const parameters = getParmsPathQuery(allParameters);
    const requestBody = getBodyRequestByParm(
      allParameters,
      elemFunction.path,
      subKey,
      schemasPath,
      requestBodiesPath
    );
    const bodySuccess = getBodySuccess(
      elemFunction.path,
      subKey,
      schemasPath,
      responsesPath
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
