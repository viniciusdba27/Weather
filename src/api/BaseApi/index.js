const get = async (query) => {
  return await fetch(query)
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw Error(`Error: ${data}`);
      }
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export { get };
