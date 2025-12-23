import axios from "../config/axiosConfig";

// 목록 호출(+페이징)
export const getBbsList = async (page = 0, size = 0) => {
    const res = await axios.get('/api/boards/page',{
        params: {page, size},
    });
    console.log("[getBbsList] 응답데이터 : ",res.data);
    const apiRes = res.data;    // {success, data, error}
    if (!apiRes.success){
        // 에러 응답일 경우
        // 필요하면 여기서 throw 해도 됨
        throw apiRes.error || new Error('게시한 목록 조회 실패');
    }
    return apiRes.data;
};

// 목록 호출(전체 게시글)
export const getAllBbsList = async () => {
    const res = await axios.get('/api/boards');
    console.log("[getAllBbsList] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('게시판 전체 목록 조회 실패');
    }
    return apiRes.data;
};

// 상세 보기 호출(선택글)
export const getDetail = async (pstSn) => {
    const res = await axios.get('/api/boards/'+pstSn);
    console.log("[getDetail] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('상세 조회 실패');
    }
    return apiRes.data;
}

// 상세 보기 호출(수정글)
export const getDetailForEdit = async (pstSn) => {
                    const res = await axios.get(`/api/boards/${pstSn}/edit`);
    console.log("[getDetailForEdit] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('수정용 상세 조회 실패');
    }
    return apiRes.data;
}

// 게시글 작성
export const createBoard = async (dto) => {
    // 작성, 수정 필요
    const res = await axios.post('/api/boards', dto);
    console.log("[getWrite] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('게시글 작성 실패');
    }
    return apiRes.data;
}

// 게시글 수정
export const updateBoard = async (pstSn, dto) => {
    // 작성, 수정 필요
    const res = await axios.put(`/api/boards/${pstSn}`, dto);
    console.log("[getWrite] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('게시글 수정 실패');
    }
    return apiRes.data;
}

// 게시글 삭제
export const deleteBoard = async (pstSn) => {
    const res = await axios.delete(`/api/boards/${pstSn}`);
    console.log("[deleteBoard] 응답데이터 : ",res.data);
    const apiRes = res.data;
    if(!apiRes.success){
        throw apiRes.error || new Error('게시글 삭제 실패');
    }
    return apiRes.data;
}