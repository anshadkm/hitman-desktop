/**
 * Method updates the url with the matched path variable
 * @param {*} url URL with the path variables e.g. http://localhost/api/projects/{name}
 * @param {*} pathVariables Array of path variables with values [{key: name, value: project-1}]
 * @returns URL with applied path variables http://localhost/api/projects/project-1
 */
const updatePathVariables = (url, pathVariables) => {
  const regex = /{(.*?)}/g;
  const matches = url?.match(regex);

  const updatedUrl = matches
    ? matches.reduce((acc, match) => {
      const placeholder = match.substring(1, match.length - 1);
      const matchingParam = pathVariables?.find((_var) => _var.key === placeholder,);
        return matchingParam ? acc.replace(match, matchingParam.value) : acc;
      }, url) : url;
  return updatedUrl;
};

/**
 * Method updates the url with the matched profile properties
 * @param {*} url URL with the profile properties e.g. {{baseUrl}}/api/projects
 * @param {*} properties Array of properties [{name: baseUrl, value: http://localhost}]
 */
const updateProfileProperties = (url, properties) => {

  const regex = /{{(.*?)}}/g;
  const matches = url?.match(regex);

  const updatedUrl = matches
    ? matches.reduce((acc, match) => {
      const placeholder = match.substring(2, match.length - 2);
      const matchingParam = properties?.find((_var) => _var.name === placeholder,);
        return matchingParam ? acc.replace(match, matchingParam.value) : acc;
      }, url) : url;
  return updatedUrl;
}

/**
 * Find the path variables and query params for the provided URL
 * @param {*} url 
 * @returns 
 */
const findPathAndQueryParams = (url) => {
    const pathVariables = [];
    const queryParams = [];
    const pathSegments = url.split(/\/|\?/);
    pathSegments.forEach((segment) => {
      if (segment.startsWith("{") && segment.endsWith("}")) {
        const variableName = segment.slice(1, -1);
        if (!variableName.startsWith("{")) { // Handling profile variables
          pathVariables.push({
            key: variableName,
            value: pathVariables.find((v) => v.key === variableName)?.value || "",
          });
        }
      }
    });
    const searchParams = new URLSearchParams(url.split("?")[1]);
    searchParams.forEach((value, key) => {
      queryParams.push({ key, value });
    });
    return { pathVariables, queryParams }
}

export { updatePathVariables, updateProfileProperties, findPathAndQueryParams }