const { map, filter, difference } = require("lodash");

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateRequiredSubElements(elem, schema) {
  const requiredSubElemsDef = filter(schema.elements, _ => _.required === true);
  const requiredElemNames = map(requiredSubElemsDef, _ => _.name);

  const actualSubElemNameNames = map(elem.subElements, _ => _.name);
  const missingSubElemNames = difference(
    requiredElemNames,
    actualSubElemNameNames
  );

  const issues = map(missingSubElemNames, _ => {
    return {
      msg: `Missing Required Sub-Element: <${_}>`,
      node: elem,
      severity: "error"
    };
  });
  return issues;
}

module.exports = {
  validateRequiredSubElements: validateRequiredSubElements
};
