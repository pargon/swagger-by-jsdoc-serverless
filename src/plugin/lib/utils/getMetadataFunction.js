/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
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
      }
    }
    return metadata;
  } catch (error) {
    return `Error al leer el archivo: ${error.message}`;
  }
}

const getMetadataFunction = async (functions) => {
  const funcResult = [];
  for (const func of functions) {
    const detail = [];
    for (const funcDet of func.detail) {
      const metadata = await getMetadataFromJSDoc(funcDet.handler);
      funcDet.description = metadata.description;
      funcDet.paramsManual = metadata.params;
      if (metadata.tags) funcDet.additional = metadata.tags;
      detail.push(funcDet);
    }
    func.detail = detail;
    funcResult.push(func);
  }
  return funcResult;
};

module.exports = {
  getMetadataFunction
};
