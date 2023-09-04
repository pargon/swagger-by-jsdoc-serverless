const pluralize = require("pluralize");

function listIntersection(list1, list2) {
  const wordsInSingularAndPlural = list1.map((wordFull) => {
    const word = wordFull.toLowerCase();
    return [
      word.toLowerCase(),
      pluralize.singular(word.toLowerCase()),
      pluralize.plural(word.toLowerCase())
    ];
  });

  return list2.filter((wordFull2) => {
    const word2 = wordFull2.toLowerCase();

    const res = wordsInSingularAndPlural.some(
      ([word1, singularword1, pluralword1]) =>
        word2 === word1 ||
        word2 === singularword1 ||
        word2 === pluralword1 ||
        (word2.includes(word1) &&
          word1 !== "" &&
          word2 !== "" &&
          word1 !== "por" &&
          word2 !== "por")
    );
    return res;
  });
}
const getTagsByNameInList = (string, tags) => {  
  const woPrex = string.split("/");
  let result = woPrex.shift();
  if (result.includes("/")) result = result.split("/").join(" ");
  result = result.replace(/{.*?}/g, "");
  result = result.split(" ");
  result = result.filter((word) => word !== "");
  result = listIntersection(result, tags);
  return result;
};

module.exports = {
  getTagsByNameInList
};
