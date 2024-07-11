const updateHeaderValue = (value, properties) => {

    const regex = /{{(.*?)}}/g;
    const matches = value?.match(regex);
    
    const updatedHeader = matches
      ? matches.reduce((acc, match) => {
          const placeholder = match.substring(2, match.length - 2);
          const matchingParam = properties?.find((_var) => _var.name === placeholder,);
            return matchingParam ? acc.replace(match, matchingParam.value) : acc;
      }, value) : value;
    return updatedHeader;
  }
  
  /**
   * Method updates the headers with the matched profile properties
   * @param {*} headers Array of headers 
   * @param {*} properties Array of properties [{name: baseUrl, value: http://localhost}]
   */
  const updateHeaderWithProfileProperties = (headers, properties) => {
    return headers.map(header => {
      return header.map(value => updateHeaderValue(value, properties));
    });
  }
  
  export { updateHeaderWithProfileProperties }