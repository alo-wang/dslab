import axios from 'axios';

const backendHost = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: backendHost,
    timeout: 10000, // 10초
})

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 에러 구조 백엔드 구체화시 수정예정
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const normalizedError = {
            type: 'unknown',
            status: null,
            message: '알 수 없는 오류가 발생했습니다.',
            data: null,
            raw: error,
        }

        if(error.response){
            // 4xx, 5xx
            const {status, data} = error.response;
            normalizedError.type = 'server';
            normalizedError.status = status;
            normalizedError.data = data;

            if(data){
                if(typeof data === 'string'){
                    normalizedError.message = data;
                }else if(data.message){
                    normalizedError.message = data.message;
                }else if(data.error){
                    normalizedError.message = data.error;
                }else{
                    normalizedError.message = `서버 에러가 발생했습니다. (status ${status})`;
                }
            }else {
                normalizedError.message = `서버 에러가 발생했습니다. (status ${status})`;
            }
        }else if(error.request){
            normalizedError.type = 'network';
            normalizedError.message =
            '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.';
        }else{
            normalizedError.type = 'config';
            normalizedError.message =
            error.message || '요청을 준비하는 중 오류가 발생했습니다.';
        }
        console.error('[API ERROR]', normalizedError);
        return Promise.reject(normalizedError);
    }
);

export default api;