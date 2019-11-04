const { isRegExp, isArray, includes, has } = require("lodash");

/**
 * @param {XMLAttribute} attributeNode
 * @param {XSSAttribute }xssAttribute
 *
 * @returns {ValidationIssue[]}
 */
function validateAttributeValue(attributeNode, xssAttribute) {
  const issues = [];

  const valueDef = xssAttribute.value;

  // An XSS Attribute definition may not specify any constraints on a value
  if (has(xssAttribute, "value") === false) {
    return issues;
  }

  const actualValue = attributeNode.value;
  if (actualValue === null) {
    // we cannot validate a partial attribute AST without an actual value...
    return issues;
  }
  /* istanbul ignore else  defensive programming */
  if (typeof valueDef === "string") {
    if (actualValue !== valueDef) {
      issues.push({
        msg: `Expecting Value <${valueDef}> but found <${actualValue}>`,
        node: attributeNode,
        severity: "error"
      });
    }
  } else if (isRegExp(valueDef)) {
    if (valueDef.test(actualValue) === false) {
      issues.push({
        msg: `Expecting Value matching <${valueDef.toString()}> but found <${actualValue}>`,
        node: attributeNode,
        severity: "error"
      });
    }
  } else if (isArray(valueDef)) {
    if (includes(valueDef, actualValue) === false) {
      issues.push({
        msg: `Expecting one of <${valueDef.toString()}> but found <${actualValue}>`,
        node: attributeNode,
        severity: "error"
      });
    }
  } else {
    /* istanbul ignore next  defensive programming */
    throw Error("None Exhaustive Match");
  }

  return issues;
}

module.exports = {
  validateAttributeValue: validateAttributeValue
};
