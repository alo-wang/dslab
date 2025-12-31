import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetail, deleteBoard, getAttachments } from '../service/bbsService';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useBacks } from '../hooks/useBacks';

const BoardDetail = () => {
    const { pstSn } = useParams(); // URL의 :pstSn 값, 라우터에서 정보 꺼내오기
    const navigate = useNavigate(); // 리액트 라우터 훅, '페이지 이동을 제어하는 함수' 하나 리턴
    const location = useLocation(); // '주소 정보 전체'를 가져오는 훅
    const { handBack } = useBacks('/boards');
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
    const [attachments, setAttachments] = useState([]);
    const [error, setError] = useState(null);   // 상세 조회 중 발생한 에러 메시지 저장용

    const from = location.state?.from;    // 목록 화면에서 넘어온 정보 꺼내기
    console.log('location :', location);  // 이전 페이지의 location 즉 주소 정보
    console.log('from :', from);          // 이전 페이지의 from 정보

    useEffect(() => {
        const fetchDetail = async () => { // 비동기 함수 정의
            try{
                const data = await getDetail(pstSn);    // 여기서 BoardDto 리턴
                setDetail(data); // 불러온 상세 데이터를 detail 상태에 저장
                console.log('data : ',data);
                // console.log('detail : ',detail);    // null 호출
                // console.log('setDetail : ',setDetail); // 안팍으로 찍어도, 함수 자체로 나옴
                const files = await getAttachments(pstSn);
                setAttachments(files);
            } catch(err){
                console.error('상세 조회 에러:',err);
                setError(err.message || '상세 조회 중 오류가 발생했습니다.')
            }
        };
        if(pstSn) fetchDetail(); // URL 파라미터인 pstSn 이 있을때만 호출, '/boards/'처럼 id 없이 잘못 들어온 경우를 방어하는 용도
    }, [pstSn]); // pstSn 값이 바뀔 때마다 이 안의 함수가 실행

    // useEffect 내 fetchDetail 선언 후
    console.log('after detail : ',detail);    // data 호출, 즉 다시 렌더된 상태

    const deleteItem = async (pstSn) => {
        if(!pstSn) return;  // pstSn이 없거나 잘못 넘어온 상황방지용!

        const ok = window.confirm('정말 삭제 할꺼니?');
        if(!ok) return

        try{
            const data = await deleteBoard(pstSn);
            // setDetail(data); // 삭제후 바로 나가 버리기 때문에 setDetail(data)은 의미가 없음
            // console.log('data : ', data);
            navigate('/boards');
        }catch(err){
            console.error('삭제 에러:',err);
            setError(err.message || '삭제 중 에러가 발생했습니다.');
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
            <List>
                {attachments.length === 0 && (
                    <ListItem>
                        <ListItemText primary="첨부파일 없음"/>
                    </ListItem>
                )}

                {attachments.map((f) => (
                    <ListItem key={f.fileSn} divider>
                        <ListItemText
                            primary={f.fileNm}
                            secondary={`${(f.fileSz/1024).toFixed(1)}KB ${f.fileExtnNm}`}
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" onClick={handBack}>목록</Button>
            <Button variant="contained" onClick={() => goEdit(detail?.pstSn)}>수정</Button>
            <Button variant="contained" onClick={() => deleteItem(detail?.pstSn)}>삭제</Button>
        </>
    )
}

export default BoardDetail;