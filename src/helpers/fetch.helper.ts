import { decorAccessToken } from "./token.helper";

export const defaultFetcher = async (url : string) : Promise<Record<string,[] | Record<string,any>> | any> => {
  const res = await fetch(url , {
      headers : {
          Accept : 'application/json'
      }
  })
  return res.json();
}

export const adminFetcher = async (url : string) : Promise<Record<string,[] | Record<string,any>> | any> => {
  const res = await fetch(url , {
      headers : {
          Authorization : `Bearer ${decorAccessToken()}`,
          Accept : 'application/json'
      }
  })
  return res.json();
}

export const fetchHeader = () : Record<string,any> => {
  return(
    {
      Authorization : `Bearer ${decorAccessToken()}`,
      accept : 'application/json'
    }
  )
}