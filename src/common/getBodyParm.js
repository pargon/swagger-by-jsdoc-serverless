/* eslint-disable no-param-reassign, no-restricted-syntax */
const { createJsonFile } = require("./createJsonFile");

const overwrite = false;

const getParamsManual = (paramsManual) => {
  const parmsFormatted = [];
  if (Array.isArray(paramsManual)) {
    let parmNested;

    paramsManual.forEach((parm) => {
      const nameArray = parm.name.split(".");
      if (parm.type.names[0] === "Object") {
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

const getParamsListado = (paramPath) => {
  let strParm = "limite";
  let jsonFunction = {
    name: strParm,
    in: "query",
    description: "Número de items a obtener por página",
    required: false,
    example: 10,
    schema: { type: "integer" }
  };
  createJsonFile(paramPath, strParm, jsonFunction, overwrite);
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
  createJsonFile(paramPath, strParm, jsonFunction, overwrite);
  const objPag = { $ref: `#/components/parameters/${strParm}` };

  return [objLimite, objPag];
};

const getHeaderJson = (funcDetail) => {
  const { description } = funcDetail;
  const tagList = [];
  if (funcDetail.additional)
    for (const additional of funcDetail.additional) {
      if (additional.title === "tag")
        if (!tagList.includes(additional.value)) tagList.push(additional.value);
    }

  return {
    description,
    tags: tagList
  };
};

const getParamsJson = (paramsManual, funcName, paramPath) => {
  const parameters1 = getParamsManual(paramsManual, funcName, paramPath);
  let parameters2 = [];
  // si es listado, agrega query limite y paginacion, además crea archivo si no existe
  if (funcName.includes("Listado"))
    parameters2 = getParamsListado(paramPath);

  return [...parameters1, ...parameters2];
};

const getBodySuccess = (pathName, method, filePath, respPath) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Output`;
  const schemaName = `${entity}Output`;

  let jsonFunction = {
    description: entity,
    type: "object"
  };
  // write file component/schema
  createJsonFile(filePath, schemaName, jsonFunction, overwrite);

  jsonFunction = {
    description: "Respuesta Exitosa",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  // write file component/responses
  createJsonFile(respPath, fileName, jsonFunction, overwrite);

  return fileName;
};

const getParmsPathQuery = (parameters) =>
  parameters.filter((parm) => parm.type !== "Object");

const getBodyRequestByParm = (
  parameters,
  pathName,
  method,
  filePath,
  reqBodiesPath
) => {
  const result = parameters
    .filter((parm) => parm.type === "Object" && !parm.in)
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
    createJsonFile(filePath, schemaName, result[0], overwrite);
    const jsonFunction = {
      description: "Datos de la Entidad",
      content: {
        "application/json": {
          schema: { $ref: `#/components/schemas/${schemaName}` }
        }
      }
    };
    // write file component/requestBodies
    createJsonFile(reqBodiesPath, fileName, jsonFunction, overwrite);
    obj = { $ref: `#/components/requestBodies/${fileName}` };
  }
  return obj;
};

const getRequestBody = (pathName, method, filePath, reqBodiesPath) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Input`;
  const schemaName = `${entity}Input`;

  let jsonFunction = {
    description: entity,
    type: "object"
  };
  createJsonFile(filePath, schemaName, jsonFunction);

  jsonFunction = {
    description: "Datos de la Entidad",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  createJsonFile(reqBodiesPath, fileName, jsonFunction);
  const obj = { $ref: `#/components/requestBodies/${fileName}` };
  return obj;
};

module.exports = {
  getParmsPathQuery,
  getBodyRequestByParm,
  getRequestBody,
  getBodySuccess,
  getParamsJson,
  getHeaderJson
};
