import axios from 'axios';


export default class fetchApi{
    static async getApi(page: Number, alb:number){
        if(alb >=1 ){
            const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=100&_page=${page}&albumId=${alb}`);
        return response.data
        }
        else{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=100&_page=${page}&`);
        return response.data}
    } 


}