import request from "./axios-wrapper";

export const register = async (url: string, data: {name:string, email:string, password:string}) : Promise<any> => {
    const response = request({
        url,
        method: 'POST',
        data: data,
      });
      return response;
}


export const login = async (url: string, data: {email:string, password:string}) : Promise<any> => {
    const response = request({
        url,
        method: 'POST',
        data: data,
      });
      return response;

}