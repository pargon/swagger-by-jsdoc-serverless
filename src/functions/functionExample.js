/* eslint-disable no-console */
/**
 * @description You have to describe process logic
 * @param {number} id.path - Parameter description
 * @tag TagExample
 */
module.exports.init = async (event, context) => {
  try {
    console.log(event);
    console.log(JSON.stringify(event.detail.car[0]));
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(
      JSON.stringify({
        lambda: context.functionName,
        message: error.message,
      }),
    );
  }
};
