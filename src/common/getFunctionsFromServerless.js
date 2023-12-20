const fs = require("fs");
const yaml = require("js-yaml");

const getCustomTypes = () => {
  const customType1 = new yaml.Type("!Sub", {
    kind: "scalar",
    resolve(data) {
      return typeof data === "string";
    },
    construct(data) {
      return data.toUpperCase();
    },
    represent(data) {
      return data.toLowerCase();
    }
  });

  const customType2 = new yaml.Type("!GetAtt", {
    kind: "scalar",
    resolve(data) {
      return typeof data === "string";
    },
    construct(data) {
      return data.toUpperCase();
    },
    represent(data) {
      return data.toLowerCase();
    }
  });
  return [customType1, customType2];
};

const pushArrayFunction = (
  arrayFunc,
  functionName,
  path,
  params,
  method,
  handler
) => {
  // si repite path, acumula en detalle
  const index = arrayFunc.findIndex((objeto) => objeto.path === path);
  const functionDetail = [
    {
      method,
      name: functionName,
      params,
      handler
    }
  ];
  if (index !== -1) {
    arrayFunc[index].detail.push(...functionDetail);
  } else {
    const functionDef = {
      path,
      detail: functionDetail
    };
    arrayFunc.push(functionDef);
  }
};

const getFunctionsFromServerless = async (serverlessFilePath) => {
  const serverlessFile = fs.readFileSync(serverlessFilePath, "utf8");
  if (!serverlessFile) throw new Error(serverlessFilePath);

  // schema custom
  const schema = yaml.DEFAULT_SCHEMA.extend(getCustomTypes());
  // yaml to json
  const serverlessConfig = yaml.load(serverlessFile, { schema });
  const swaggerFunctions = [];
  // parm {}
  const regex = /{([^}]+)}/g;
  // functions in serverless.yml and route every one
  Object.keys(serverlessConfig.functions).forEach((functionName) => {
    const functionConfig = serverlessConfig.functions[functionName];
    const { handler } = functionConfig;

    if (functionConfig.events && Array.isArray(functionConfig.events)) {
      functionConfig.events.forEach((event) => {
        if (event.http) {
          const { path } = event.http;
          const params = path.match(regex);
          const method = event.http.method.toLowerCase();

          pushArrayFunction(
            swaggerFunctions,
            functionName,
            path,
            params,
            method,
            handler
          );
        }
      });
    }
  });
  return swaggerFunctions;
};

module.exports = {
  getFunctionsFromServerless
};
