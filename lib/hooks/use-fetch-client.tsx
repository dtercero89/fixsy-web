"use client"

import { useCallback } from 'react'
import { isArray, isString, isNumber } from 'lodash'
import { useLoading } from '../context/LoadingContext'
import { toast } from 'react-toastify'
import { useCurrentUser } from './use-current-user'

const getUrl = () => {

  const baseAddress =  process.env.NEXT_PUBLIC_CDMP_WEB_API_ENDPOINT;
   return baseAddress ? baseAddress : "http://localhost:8855";

}

export const objectParametize = (obj:any, q:any, parent?:any) => {
      const str:any[] = [];
      const delimeter = '&';
      let objKey;
      const a = Object.keys(obj);
      a.forEach(key => {
        switch (typeof obj[key]) {
          case 'object':
            if (obj[key]) {
              if (isArray(obj[key])) {
                obj[key].forEach((arrObject:any) => {
                  if (parent) {
                    objKey = `${parent}.${key}`;
                  } else {
                    objKey = key;
                  }
                  if (isString(arrObject) || isNumber(arrObject)) {
                    if (parent) {
                      str[str.length] = `${parent}.${key}=${arrObject}`;
                    }
                    str[str.length] = `${key}=${arrObject}`;
                  } else if (!isString(arrObject)) {
                    str[str.length] = objectParametize(arrObject, false, objKey);
                  }
                });
              } else if (isArray(obj[key])) {
                str[str.length] = `${parent}.${key}=${obj[key]}`;
              } else {
                if (parent) {
                  objKey = `${parent}.${key}`;
                } else {
                  objKey = key;
                }
                str[str.length] = objectParametize(obj[key], false, objKey);
              }
            }
            break;
          default: {
            if (obj[key]) {
              if (parent) {
                str[str.length] = `${parent}.${key}=${obj[key]}`;
              } else {
                str[str.length] = `${key}=${obj[key]}`;
              }
            }
          }
        }
      });
    
      return (q === true ? '?' : '') + str.join(delimeter);
    };

const urlBase = getUrl()

export const useFetchClient = () => {
  const { startLoading, stopLoading } = useLoading();
  const user = useCurrentUser();
  //const { toast } = useToast();


  const showValidationMessage = useCallback((response:any, useTostify:boolean=true) => {
    if (response && useTostify) {
      if (response.exceptionMessage) {
        toast.error(response.exceptionMessage)
      } else if (response.validationErrorMessage) {
       toast.warn(response.validationErrorMessage)
      } else if (response.successMessage) {
        toast.success(response.successMessage)
      }
    }
    return response
  }, [])

  const httpGet = useCallback(
    async (
      url: string, 
      obj: any, 
      useWaitControl: boolean = true, 
      isEvaluateMessage: boolean = true,
      useCache: boolean = false 
    ): Promise<any> => {
  
      if (useWaitControl) {
        startLoading();
      }
  
      const request = {
        ...obj,
        ...user,
      };
  
      let urlparam = '';
      if (request) {
        urlparam = `&${objectParametize(request, false)}`;
      }
  
      const cacheBuster = useCache ? "" : `&_=${new Date().getTime()}`; 
      const paramUrl = `${url}?format=json${urlparam}${cacheBuster}`;
  
      try {
        const response = await fetch(`${urlBase}${paramUrl}`, {
          headers: {
            "Cache-Control": useCache ? "default" : "no-cache",
            "Pragma": useCache ? "default" : "no-cache",       
          },
        });
  
        if (response.status === 404) {
          console.warn("Resource not found:", paramUrl);
          return response;
        }
  
        const data = await response.json();
  
        return isEvaluateMessage ? showValidationMessage(data) : data;
  
      } catch (error: any) {
        console.error("Error during HTTP GET request:", error);
        throw error;
      } finally {
        if (useWaitControl) {
          stopLoading();
        }
      }
    }, 
    [startLoading, stopLoading, showValidationMessage]
  );

  const httpPost = useCallback(async (url:any, obj:any, useWaitControl = true, useToastify=true) => {

    if (useWaitControl) {
      startLoading()
    }

    const request = {
      ...obj,
     ...user,
    }

    try {
      const response = await fetch(`${urlBase}${url}`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-type': 'application/json' },
      })
      const data = await response.json();

      return showValidationMessage(data,useToastify);
      
    } catch (error:any) {
    } finally {
      if (useWaitControl) {
        stopLoading();
      }
    }
  }, [startLoading, stopLoading, showValidationMessage])

  const httpPut = useCallback(async (url:any, obj:any, useWaitControl = true) => {

    if (useWaitControl) {
      startLoading()
    }

    const request = {
      ...obj,
      ...user,
    }

    try {
      const response = await fetch(`${urlBase}${url}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: { 'Content-type': 'application/json' },
      })
      const data = await response.json()
      return showValidationMessage(data)
    } catch (error:any) {
    } finally {
      if (useWaitControl) {
        stopLoading()
      }
    }
  }, [startLoading, stopLoading, showValidationMessage])

  const httpDelete = useCallback(async (url:any, obj:any, useWaitControl = true) => {

    if (useWaitControl) {
      startLoading()
    }

    const request = {
      ...obj,
      ...user,
    }

    try {
      const response = await fetch(`${urlBase}${url}`, {
        method: 'DELETE',
        body: JSON.stringify(request),
        headers: { 'Content-type': 'application/json' },
      })
      const data = await response.json()
      return showValidationMessage(data)
    } catch (error:any) {
    } finally {
      if (useWaitControl) {
        stopLoading()
      }
    }
  }, [startLoading, stopLoading, showValidationMessage])

  return { httpGet, httpPost, httpPut, httpDelete }
}