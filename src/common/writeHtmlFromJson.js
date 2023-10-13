/* eslint-disable max-len */
const fs = require("fs");

const writeHtmlFromJson = async (
  inputJson,
  target,
  customfavIconP,
  customeSiteTitleP
) => {
  const swaggerDoc = JSON.parse(inputJson);

  const favIconHtml =
    '<link rel="icon" type="image/png" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.11.0/favicon-32x32.png" sizes="32x32" />' +
    '<link rel="icon" type="image/png" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.11.0/favicon-16x16.png" sizes="16x16" />';
  const customfavIcon = customfavIconP || false;
  const customeSiteTitle = customeSiteTitleP || "Swagger UI";
  const html = await fs.readFileSync(`${__dirname}/indexTemplate.html`);

  const favIconString = customfavIcon
    ? `<link rel="icon" href="${customfavIcon}" />`
    : favIconHtml;

  const explorerString =
    ".swagger-ui .topbar .download-url-wrapper { display: none }";
  const htmlWithCustomCss = html
    .toString()
    .replace("<% customCss %>", explorerString);
  const htmlWithFavIcon = htmlWithCustomCss.replace(
    "<% favIconString %>",
    favIconString
  );

  const initOptions = {
    swaggerDoc: swaggerDoc || undefined
  };
  const htmlWithOptions = htmlWithFavIcon
    .replace("<% swaggerOptions %>", JSON.stringify(initOptions))
    .replace("<% title %>", customeSiteTitle);

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  await fs.writeFileSync(`${target}/index.html`, htmlWithOptions);
};

module.exports = {
  writeHtmlFromJson
};
