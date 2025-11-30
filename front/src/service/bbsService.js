import axios from "../config/axiosConfig";

// 목록 호출(+페이징)
export const getBbsList = async (page = 0, size = 0) => {
    try{// axios.get('/api/boards') 자체가 Promise를 리턴하는 함수
        const res = await axios.get('/api/boards/page',{
            params: {page, size},
        });
        console.log("[getBbsList] 응답데이터 : ",res.data);
        return res.data;
    }catch(error){
        console.error("목록 조회 실패 : ", error.message);
        throw error;
    }
};

// 목록 호출(전체 게시글)
export const getAllBbsList = async () => {
    try{
        const res = await axios.get('/api/boards');
        console.log("[getAllBbsList] 응답데이터 : ",res.data);
        return res.data;
    }catch(error){
        console.error("목록 조회 실패 : ", error.message);
        throw error;
    }
};