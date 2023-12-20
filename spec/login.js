/* eslint-disable max-len */
module.exports = {
  "/token": {
    post: {
      servers: [
        {
          url: "https://serverauth/oauth2", // url
          description: "Login Server" // name
        }
      ],
      parameters: [
        {
          in: "query",
          name: "grant_type",
          required: true,
          schema: {
            type: "array",
            items: { type: "string", enum: ["client_credentials"] }
          }
        }
      ],
      security: [{ basicAuth: [] }],
      tags: ["Token"], // operation's tag.
      description: "Api Login ", // operation's desc.
      operationId: "token", // unique operation id.
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": { schema: { type: "object" } }
        }
      },
      responses: {
        // response code
        200: {
          description: "Success" // response desc.
        }
      }
    }
  }
};
