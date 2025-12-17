import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetail } from '../service/bbsService';
import { Button } from '@mui/material';

const BoardDetail = () => {
    const { pstSn } = useParams(); // URL의 :pstSn 값, 라우터에서 정보 꺼내오기
    const navigate = useNavigate(); // 리액트 라우터 훅, '페이지 이동을 제어하는 함수' 하나 리턴
    const location = useLocation(); // '주소 정보 전체'를 가져오는 훅
    /** useLocation의 형태
     {
       pathname: "/boards/10",        // 현재 경로
       search: "?q=abc",              // ? 뒤의 쿼리스트링
       hash: "#top",                  // # 뒤의 해시
       state: { ... },                // navigate할 때 실어 보낸 추가 데이터
       key: "asdf1234"                // history 내부용
     }
     */
     /**
       detail -> 실제 값(상태)
       setDetail -> 그 값을 바꾸는 함수
     */
    const [detail, setDetail] = useState(null); // 게시글 상세 데이터
    const [error, setError] = useState(null);   // 상세 조회 중 발생한 에러 메시지 저장용
    const [edit, setEdit] = useState(null);

    const from = location.state?.from;    // 목록 화면에서 넘어온 정보 꺼내기
    console.log('location :', location);  // 이전 페이지의 location 즉 주소 정보
    console.log('from :', from);          // 이전 페이지의 from 정보

    useEffect(() => {
        const fetchDetail = async () => { // 비동기 함수 정의
            try{
                const data = await getDetail(pstSn);    // 여기서 BoardDto 리턴
                setDetail(data); // 불러온 상세 데이터를 detail 상태에 저장
                console.log('data : ',data);
                console.log('detail : ',detail);    // null 호출
                console.log('setDetail : ',setDetail); // 안팍으로 찍어도, 함수 자체로 나옴
            } catch(err){
                console.error('상세 조회 에러:',err);
                setError(err.message || '상세 조회 중 오류가 발생했습니다.')
            }
        };
        if(pstSn) fetchDetail(); // URL 파라미터인 pstSn 이 있을때만 호출, '/boards/'처럼 id 없이 잘못 들어온 경우를 방어하는 용도
    }, [pstSn]); // pstSn 값이 바뀔 때마다 이 안의 함수가 실행

    // useEffect 내 fetchDetail 선언 후
    console.log('after detail : ',detail);    // data 호출, 즉 다시 렌더된 상태

    const handBack = () => {
        if(from){ // location.state?.from; 에서 꺼낸 값이 있으면, 즉 '목록 페이지에서 넘어온 경우' 라면 'state'에 'from'정보를 다시 실어서 보내줌
            // navigate(`/boards?page=${from.page}&size=${from.rowsPerPage}`); // 이 방식으로 하면 url에 페이징 정보까지 다 보여짐
            navigate('/boards',{
                state: {from},
            });
        }else{ // 만약 from이 없다면 기본 목록 화면으로 이동
            navigate('/boards')
        }
    }

    const goEdit = (pstSn) => {
        navigate(`/boards/${pstSn}/edit`,{
                state: {from},
            });
    }

    return(
        <>
            <h1>{detail?.ttl}</h1>
            <div>{detail?.cn}</div>
            <Button variant="contained" onClick={handBack}>목록</Button>
            <Button variant="contained" onClick={() => goEdit(detail?.pstSn)}>수정</Button>
        </>
    )
}

export default BoardDetail;