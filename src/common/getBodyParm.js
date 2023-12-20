/* eslint-disable no-await-in-loop, guard-for-in, no-param-reassign, no-restricted-syntax */
const { createJsonFile, writeMultiSchemaFile } = require("./createJsonFile");

const overwrite = true;

const getParamsManual = (paramsManual) => {
  const parmsFormatted = [];
  if (Array.isArray(paramsManual)) {
    let parmNested;

    paramsManual.forEach((parm) => {
      const nameArray = parm.name.split(".");
      if (parm.type.names[0].toLowerCase() === "object") {
        // init nested parm
        parmNested = {
          name: nameArray[0],
          in: nameArray[1],
          description: parm.description,
          type: "Object",
          properties: {}
        };
        parmsFormatted.push(parmNested);
      } else if (parmNested !== undefined && parmNested.name === nameArray[0]) {
        // add properties to nested parm
        const jsonProp = {
          type: parm.type.names.join(" | "),
          description: parm.description,
          example: parm.defaultvalue
        };
        parmNested.properties[nameArray[1]] = jsonProp;
      } else {
        // not-nested parm
        parmsFormatted.push({
          name: nameArray[0],
          in: nameArray[1] ? nameArray[1] : "query",
          description: parm.description,
          example: parm.defaultvalue,
          required: !parm.optional,
          schema: { type: parm.type.names[0] }
        });
      }
    });
  }
  return parmsFormatted;
};

const getParamsListado = async (paramPath) => {
  let strParm = "limite";
  let jsonFunction = {
    name: strParm,
    in: "query",
    description: "Número de items a obtener por página",
    required: false,
    example: 10,
    schema: { type: "integer" }
  };
  await createJsonFile(paramPath, strParm, jsonFunction, overwrite);
  const objLimite = { $ref: `#/components/parameters/${strParm}` };

  strParm = "paginacion";
  jsonFunction = {
    name: strParm,
    in: "query",
    description: "Número de página",
    required: false,
    example: 1,
    schema: { type: "integer" }
  };
  await createJsonFile(paramPath, strParm, jsonFunction, overwrite);
  const objPag = { $ref: `#/components/parameters/${strParm}` };

  return [objLimite, objPag];
};

const getHeaderJson = (funcDetail) => {
  const { description } = funcDetail;
  const tagList = [];
  if (funcDetail.additional)
    for (const additional of funcDetail.additional)
      if (additional.title === "tag")
        if (!tagList.includes(additional.value)) tagList.push(additional.value);

  return {
    description,
    tags: tagList
  };
};

const getParamsJson = async (paramsManual, funcName, paramPath) => {
  const parameters1 = getParamsManual(paramsManual, funcName, paramPath);
  let parameters2 = [];
  // si es listado, agrega query limite y paginacion, además crea archivo si no existe
  if (funcName.includes("Listado"))
    parameters2 = await getParamsListado(paramPath);

  return [...parameters1, ...parameters2];
};

const writeBodySuccess = async (schemaName, entity, method, respPath) => {
  const jsonFunction = {
    description: "Respuesta Exitosa",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  // write file component/responses
  const fileName = `${entity}${method}Output`;
  await createJsonFile(respPath, fileName, jsonFunction, overwrite);
};

const getErrorResponses = async (
  exceptions,
  fileName,
  schemaName,
  respPath
) => {
  const responses = {};
  for (const obj of exceptions) {
    const typeNumber = obj.type.names[0];
    const fileNameError = `${fileName}Error${typeNumber}`;
    const schemaNameError = `${schemaName}Error${typeNumber}`;

    responses[typeNumber] = {
      $ref: `#/components/responses/${fileNameError}`
    };
    const jsonFunction = {
      description: obj.description,
      content: {
        "application/json": {
          schema: { $ref: `#/components/schemas/${schemaNameError}` }
        }
      }
    };
    // write file component/responses
    await createJsonFile(respPath, fileNameError, jsonFunction, overwrite);
  }
  return responses;
};

const getResponses = async (
  pathName,
  exceptions,
  method,
  schemaPath,
  respPath
) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Output`;
  const schemaName = `${entity}Output`;
  await writeBodySuccess(schemaName, entity, method, respPath);

  let responses = {};
  responses[200] = { $ref: `#/components/responses/${fileName}` };

  if (Array.isArray(exceptions)) {
    const errorResp = await getErrorResponses(
      exceptions,
      fileName,
      schemaName,
      respPath
    );
    responses = { ...responses, ...errorResp };
  }
  const jsonFunction = {
    description: entity,
    type: "object"
  };
  await writeMultiSchemaFile(schemaPath, schemaName, exceptions, jsonFunction);

  return responses;
};

const getParmsPathQuery = (parameters) =>
  parameters.filter((parm) => parm.type !== "object");

const getBodyRequestByParm = async (
  parameters,
  pathName,
  method,
  schemaPath,
  reqBodiesPath
) => {
  const result = parameters
    .filter((parm) => parm.type === "object" && !parm.in)
    .map((parm) => {
      delete parm.name;
      delete parm.type;
      return parm;
    });

  let obj;
  if (result.length > 0) {
    const fields = pathName.split("/");
    const entity = fields[1];
    const fileName = `${entity}${method}Input`;
    const schemaName = `${entity}Input`;

    // write file component/schema
    await createJsonFile(schemaPath, schemaName, result[0], overwrite);
    const jsonFunction = {
      description: "Datos de la Entidad",
      content: {
        "application/json": {
          schema: { $ref: `#/components/schemas/${schemaName}` }
        }
      }
    };
    // write file component/requestBodies
    await createJsonFile(reqBodiesPath, fileName, jsonFunction, overwrite);
    obj = { $ref: `#/components/requestBodies/${fileName}` };
  }
  return obj;
};

const getRequestBody = async (pathName, method, schemaPath, reqBodiesPath) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Input`;
  const schemaName = `${entity}Input`;

  let jsonFunction = {
    description: entity,
    type: "object"
  };
  await createJsonFile(schemaPath, schemaName, jsonFunction);

  jsonFunction = {
    description: "Datos de la Entidad",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  await createJsonFile(reqBodiesPath, fileName, jsonFunction);
  const obj = { $ref: `#/components/requestBodies/${fileName}` };
  return obj;
};

module.exports = {
  getParmsPathQuery,
  getBodyRequestByParm,
  getRequestBody,
  getResponses,
  getParamsJson,
  getHeaderJson
};
