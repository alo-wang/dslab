import axios from "../config/axiosConfig";

// 목록 호출
export const getBbsList = async () => {
    try{
        const res = await axios.get('/api/boards');
        console.log("[목록] 응답데이터 : ",res.data);
        return res.data;
    }catch(error){
        console.error("목록 조회 실패 : ", error.message);
        throw error;
    }
};