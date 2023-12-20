/* eslint-disable no-await-in-loop, no-restricted-syntax */
const fs = require("fs").promises;
const jsdoc = require("jsdoc-api");

async function getMetadataFromJSDoc(handler) {
  try {
    const rutaArchivo = handler.replace(".init", ".js");
    const contenido = await fs.readFile(rutaArchivo, "utf8");
    const jsdocComments = jsdoc.explainSync({ source: contenido });

    const metadata = {};
    for (const obj of jsdocComments) {
      if (!obj.undocumented) {
        if (obj.description) metadata.description = obj.description;
        if (obj.params) metadata.params = obj.params;
        if (obj.tags) metadata.tags = obj.tags;
        if (obj.return || obj.returns)
          metadata.returns = [...obj.return, ...obj.returns];
        if (obj.exceptions) metadata.exceptions = obj.exceptions;
      }
    }
    return metadata;
  } catch (error) {
    return `Error al leer el archivo: ${error.message}`;
  }
}

const getMetadataFunction = async (functions) => {
  const funcResult = [];
  let tagsResult = [];
  for (const func of functions) {
    const detail = [];
    for (const funcDet of func.detail) {
      const metadata = await getMetadataFromJSDoc(funcDet.handler);
      funcDet.description = metadata.description;
      funcDet.paramsManual = metadata.params;
      funcDet.exceptions = metadata.exceptions;
      if (metadata.tags) {
        funcDet.additional = metadata.tags;
        tagsResult = [...tagsResult, ...new Set(metadata.tags)];
      }
      detail.push(funcDet);
    }
    func.detail = detail;
    funcResult.push(func);
  }
  return { functions: funcResult, tags: tagsResult };
};

module.exports = {
  getMetadataFunction
};
