let endpoint = null;

const headers = {
  'content-type': 'application/json',
};

export const initWithEndpoint = (url) => {
  endpoint = url;
};

export const get = async (resource) => {
  return fetch( [endpoint, resource].join('/') ).then((res) => res.json())
      .then((res) => {
        return res;
      });
};

export const create = async (resource, item) => {
  const result = await fetch( [endpoint, resource].join('/'),
      { headers, body: JSON.stringify(item), method: 'POST' } );
  let data ={};
  if (result.status===200) {
    data = await result.json();
  } else if (!result.ok) {
    throw new Error('Description cannot be empty');
  }
  return {
    data,
  };
};

export const remove = async (resource, id) => {
  const result = await fetch( [endpoint, resource, id].join('/'),
      { headers, method: 'DELETE' } );
  return result;
};

export const updateMerg = async (resource, id, item) => {
  const result = await fetch( [endpoint, resource, id].join('/'),
      { headers, body: JSON.stringify(item), method: 'PATCH' } );
  return result;
};
