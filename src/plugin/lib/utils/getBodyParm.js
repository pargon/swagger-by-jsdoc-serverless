/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const { getTagsByNameInList } = require("./getTagsByNameInList");

const createSchemaFile = async (schemasPath, fileName, jsonFunction) => {
  if (!fs.existsSync(schemasPath))
    fs.mkdirSync(schemasPath, { recursive: true });

  const file = `${schemasPath}/${fileName}.js`;
  if (!fs.existsSync(file)) {
    const jsonStr = `module.exports = {"${fileName}": ${JSON.stringify(
      jsonFunction
    )}}`;

    await fs.promises.writeFile(file, jsonStr, (err) => {
      if (err) throw new Error(err);
      return null;
      // file written successfully
    });
  }
};

const getParamsManual = (paramsManual) => {
  if (Array.isArray(paramsManual)) {
    return paramsManual.map((parm) => {
      const name = parm.name.split(".");
      const jsonFunction = {
        name: name[0],
        in: name[1] ? name[1] : "query",
        description: parm.description,
        example: parm.defaultvalue,
        required: !parm.optional,
        schema: { type: parm.type.names[0] }
      };
      return jsonFunction;
    });
  }
  return [];
};

const getParamsListado = (parametersPath) => {
  let strParm = "limite";
  let jsonFunction = {
    name: strParm,
    in: "query",
    description: "Número de items a obtener por página",
    required: false,
    example: 10,
    schema: { type: "integer" }
  };
  createSchemaFile(parametersPath, strParm, jsonFunction);
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
  createSchemaFile(parametersPath, strParm, jsonFunction);
  const objPag = { $ref: `#/components/parameters/${strParm}` };

  return [objLimite, objPag];
};

const getTagListHeader = (additional, tags) => {
  let tagList = [];
  if (additional.title === "tag")
    tagList = [...getTagsByNameInList(additional.value, tags)];
  return tagList;
};

const getHeaderJson = (funcDetail, tags) => {
  const { description } = funcDetail;
  let tagList = [];
  if (funcDetail.additional)
    for (const additional of funcDetail.additional) {
      tagList = getTagListHeader(additional, tags);
    }

  return {
    description,
    tags: tagList
  };
};

const getParamsJson = (params, paramsManual, funcName, parametersPath) => {
  const parameters1 = getParamsManual(paramsManual, funcName, parametersPath);
  let parameters2 = [];
  // si es listado, agrega query limite y paginacion, además crea archivo si no existe
  if (funcName.includes("Listado"))
    parameters2 = getParamsListado(parametersPath);

  return [...parameters1, ...parameters2];
};

const getBodySuccess = (pathName, method, schemasPath, responsesPath) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Output`;
  const schemaName = `${entity}Output`;

  let jsonFunction = {
    description: entity,
    type: "object"
  };
  createSchemaFile(schemasPath, schemaName, jsonFunction);

  jsonFunction = {
    description: "Respuesta Exitosa",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  createSchemaFile(responsesPath, fileName, jsonFunction);

  return fileName;
};

const getRequestBody = (pathName, method, schemasPath, requestBodiesPath) => {
  const fields = pathName.split("/");
  const entity = fields[1];
  const fileName = `${entity}${method}Input`;
  const schemaName = `${entity}Input`;

  let jsonFunction = {
    description: entity,
    type: "object"
  };
  createSchemaFile(schemasPath, schemaName, jsonFunction);

  jsonFunction = {
    description: "Datos de la Entidad",
    content: {
      "application/json": {
        schema: { $ref: `#/components/schemas/${schemaName}` }
      }
    }
  };
  createSchemaFile(requestBodiesPath, fileName, jsonFunction);
  const obj = { $ref: `#/components/requestBodies/${fileName}` };
  return obj;
};

module.exports = {
  getRequestBody,
  getBodySuccess,
  getParamsJson,
  getHeaderJson
};
