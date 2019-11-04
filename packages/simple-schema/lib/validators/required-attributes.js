const { map, filter, difference } = require("lodash");

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateRequiredAttributes(elem, schema) {
  const requiredAttribsDef = filter(
    schema.attributes,
    _ => _.required === true
  );
  const requiredAttribNames = map(requiredAttribsDef, _ => _.key);

  const actualAttribNames = map(elem.attributes, _ => _.key);
  const missingAttributesNames = difference(
    requiredAttribNames,
    actualAttribNames
  );

  const issues = map(missingAttributesNames, _ => {
    return {
      msg: `Missing Required Attribute: <${_}>`,
      node: elem,
      severity: "error"
    };
  });
  return issues;
}

module.exports = {
  validateRequiredAttributes: validateRequiredAttributes
};
