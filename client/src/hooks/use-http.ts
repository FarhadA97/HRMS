import {useState } from 'react';
import Axios, {AxiosError} from 'axios';
import { IPayload } from '../store/auth';

type userData = {
    name: string,
    email:string,
    password: string
}

const emptyUser = {
    name: '',
    email: '',
    _id:''
}

declare interface IConfig{
    method: string;
    url:string;
    data: userData;
}



const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errCount, setErrCount] = useState(0);
    //console.log("http=",errorMessage);
    const [data, setData] = useState<NonNullable<IPayload>>({user:emptyUser,token:''});
    const sendRequest : (requestConfig:IConfig) => void =  async (requestConfig) => {
        //console.log(requestConfig)
        setIsLoading(true);
        try {
          const response = await Axios({
            method: requestConfig.method ,
            url: requestConfig.url ,
            data: requestConfig.data, 
          })
          setData(response.data);
          setErrorMessage('');
         
          
          
        } catch (error) {
            const errObj = error as AxiosError;
            const err = errObj.response?.data;
            const response = err as AxiosError;
            const message = response?.message;
            setErrorMessage(message);
            setErrCount((prevState) => prevState+1);
        }
        setIsLoading(false);
      }
     
    return {
        isLoading,
        errorMessage,
        errCount,
        data,
        sendRequest
    }
};


export default useHttp;