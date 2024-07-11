/**
 * Method updates the body with the matched profile properties
 * @param {*} body The request body
 * @param {*} properties Array of properties [{name: baseUrl, value: http://localhost}]
 */
const updateBodyWithProfileProperties = (body, properties) => {
  const regex = /{{([\w\d-_]+)}}/g;
  const matches = body?.match(regex);

  const updatedBody = matches
    ? matches.reduce((acc, match) => {
        const placeholder = match.substring(2, match.length - 2);
        const matchingParam = properties?.find((_var) => _var.name === placeholder,);
        return matchingParam ? acc.replace(match, matchingParam.value) : acc;
    }, body) : body;
  return updatedBody;
}

export { updateBodyWithProfileProperties }