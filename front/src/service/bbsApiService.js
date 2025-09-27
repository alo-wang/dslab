import axios from "axios";

const backendHost = "http://localhost:9099";

// 목록 호출
export const getBbsList = async () => {
    try{
        const res = await axios.get(`${backendHost}/api/boards`);
        console.log("[목록] 응답데이터 : ",res.data);
        return res.data;
    }catch(error){
        console.log("목록 조회 실패 : ", error);
        throw error;
    }
};