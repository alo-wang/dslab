import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetail, updateBoard, createBoard } from '../service/bbsService';
import { Box, TextField, Button } from '@mui/material';

const BoardForm = () => {
    const { pstSn } = useParams();
    const [ detail, setDetail ] = useState(null);   // {}안에 내용을 담은 setDetail에 내용이 안담겨.. 왜냐면 useState는 배열을 돌려주지, 객체를 돌려주는게 아님
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    console.log("pstSn : ",pstSn);

    const from = location.state?.from;

    useEffect(() => {
        if(!pstSn) return;

        const fetch = async () => {
            try{
                setLoading(true);
                const data = await getDetail(pstSn);
                console.log("data : ",data);
                // setDetail(data); // 수정전 기본 데이터
                setTitle(data.ttl);
                setContent(data.cn);
            } catch(err){
                console.error('수정용 상세 조회 에러 : ',err);
                setError(err.message || '게시글 정보를 불러오는 중 오류 발생');
            } finally{
                setLoading(false);
            }
        }
        fetch();  // if(pstSn) fetch();
    },[pstSn]); // ,[pstSn] 안 넣으면 계ㅔㅔㅔㅔㅔㅔ속 내용을 부른다.
    // console.log("detail : ",detail);

    const handBack = () => {
        if(from) {
            navigate('/boards/', {
                state: {from}
            });
        }else{
            navigate('/boards');
        }
    }

    const handleSubmit = async () => {
        try{
            setLoading(true);
            setError(null);
            const dto = {
                pstSn: pstSn ? Number(pstSn) : null,
                ttl: title,
                cn : content
            }
            let saved;

            if(pstSn){
                saved = await updateBoard(pstSn,dto);
            }else{
                saved = await createBoard(dto);
            }
            console.log('submit pstSn : ',pstSn, typeof pstSn);
            const targetPstSn = saved.pstSn ?? pstSn;
            console.log('targetPstSn :', targetPstSn);
            navigate(`/boards/${targetPstSn}`);
        } catch(err){
            console.error('저장 중 에러 : ',err);
            setError(err.message || '저장 중 오류가 발생');
        } finally{
            setLoading(false);
        }
    }

    return(
        <>
            {/* 상세에서 쓰기 페이지로 넘어올 경우 해당하는 정보들을 물고 들어와야함 */}
            <br/>test form
            <Box sx={{ width:500 }}>
                <TextField
                    fullWidth id="fullWidth"
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box sx={{ width:500 }}>
                <TextField
                    fullWidth id="Multiline"
                    multiline
                    rows={10}
                    defaultValue="내용을 입력하세요."
                    value={content || ''}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Box>
            <Button variant="contained" onClick={handBack}>취소</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={loading}>{pstSn ? '수정' : '등록'}</Button>
        </>
    );
}

export default BoardForm;