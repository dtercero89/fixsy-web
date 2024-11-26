
export const getServerUrl = (): string => {
  const baseAddress =  process.env.NEXT_PUBLIC_WEB_API_ENDPOINT;
  return baseAddress ? baseAddress : "http://localhost:8855";

};

const isArray = Array.isArray;

const isString = (value: any): value is string => typeof value === 'string';

const isNumber = (value: any): value is number => typeof value === 'number';

export const objectParametize = (obj: any, q: boolean, parent?: string): string => {
  const str: string[] = [];
  const delimeter = '&';
  let objKey: string;

  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value && typeof value === 'object') {
      if (isArray(value)) {
        value.forEach((arrObject: any) => {
          objKey = parent ? `${parent}.${key}` : key;
          if (isString(arrObject) || isNumber(arrObject)) {
            str.push(`${objKey}=${arrObject}`);
          } else {
            str.push(objectParametize(arrObject, false, objKey));
          }
        });
      } else {
        objKey = parent ? `${parent}.${key}` : key;
        str.push(objectParametize(value, false, objKey));
      }
    } else {
      if (value) {
        objKey = parent ? `${parent}.${key}` : key;
        str.push(`${objKey}=${value}`);
      }
    }
  });

  return (q ? '?' : '') + str.join(delimeter);
};

const showServerValidationMessage = (response: any) => {
  if (response?.exceptionMessage) {
    console.error('Error:', response.exceptionMessage);
  } else if (response?.validationErrorMessage) {
    console.warn('Warning:', response.validationErrorMessage);
  } else if (response?.mensajeValidacion) {
    console.warn('Warning:', response.mensajeValidacion);
  } else if (response?.mensajeError) {
    console.warn('Error:', response.mensajeError);
  } else if (response?.successMessage) {
    console.log('Success:', response.successMessage);
  } else if (response) {
    console.warn('Response:', response);
  }

  return response;
};

export class fetchServer {
  // Método GET
  static async httpGet(url: string, obj: any, isEvaluateMessage = true) {
    const request = {
      cache: 'no-store', // Evitar almacenar en caché
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Agregar encabezados para evitar el caché
        Pragma: 'no-cache',
        Expires: '0',
      },
      ...obj,
    };
  
    let urlparam = '';
    if (request) {
      urlparam = `&${objectParametize(request, false)}`;
    }
  
    const paramUrl = `${url}?format=json${urlparam}`;
    try {
      const response = await fetch(`${getServerUrl()}${paramUrl}`, request);
  
      if (response && response.status === 404) {
        return response;
      }
  
      const data = await response.json();
  
      return isEvaluateMessage ? showServerValidationMessage(data) : data;
    } catch (error: any) {
      console.error('Fetch GET error:', error);
      throw new Error(error.message);
    }
  }

  // Método POST
  static async httpPost(url: string, obj: any) {
    const request = {
      ...obj,
    };

    try {
      const response = await fetch(`${getServerUrl()}${url}`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      return showServerValidationMessage(data);
    } catch (error: any) {
      console.error('Fetch POST error:', error.message);
      throw new Error(error.message);
    }
  }

  // Método PUT
  static async httpPut(url: string, obj: any) {
    const request = {
      ...obj,
    };

    try {
      const response = await fetch(`${getServerUrl()}${url}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      return showServerValidationMessage(data);
    } catch (error: any) {
      console.error('Fetch PUT error:', error.message);
      throw new Error(error.message);
    }
  }

  // Método DELETE
  static async httpDelete(url: string, obj: any) {
    const request = {
      ...obj,
    };

    try {
      const response = await fetch(`${getServerUrl()}${url}`, {
        method: 'DELETE',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      return showServerValidationMessage(data);
    } catch (error: any) {
      console.error('Fetch DELETE error:', error.message);
      throw new Error(error.message);
    }
  }
}
