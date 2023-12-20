/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax */
const {
  getParmsPathQuery,
  getRequestBody,
  getBodyRequestByParm,
  getResponses,
  getParamsJson,
  getHeaderJson
} = require("./getBodyParm");

const getJsonFunction = async (
  elemFunction,
  paramPath,
  reqBodiesPath,
  schemaPath,
  respPath
) => {
  const key = `/${elemFunction.path}`;
  const objJsonFunc = {};
  objJsonFunc[key] = {};

  // metodos para el path
  for (let index = 0; index < elemFunction.detail.length; index++) {
    const funcDetail = elemFunction.detail[index];
    const subKey = funcDetail.method;
    const headerInfo = getHeaderJson(funcDetail);
    const allParameters = await getParamsJson(
      funcDetail.paramsManual,
      funcDetail.name,
      paramPath
    );
    const parameters = getParmsPathQuery(allParameters);
    let requestBody = await getBodyRequestByParm(
      allParameters,
      elemFunction.path,
      subKey,
      schemaPath,
      reqBodiesPath
    );
    if (!requestBody && (subKey === "post" || subKey === "patch"))
      requestBody = await getRequestBody(
        elemFunction.path,
        subKey,
        schemaPath,
        reqBodiesPath
      );

    const responses = await getResponses(
      elemFunction.path,
      funcDetail.exceptions,
      subKey,
      schemaPath,
      respPath
    );
    objJsonFunc[key][subKey] = {
      description: headerInfo.description,
      operationId: funcDetail.name,
      tags: headerInfo.tags,
      requestBody,
      parameters,
      responses
    };
  }
  return objJsonFunc;
};

module.exports = {
  getJsonFunction
};
