import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetail } from '../service/bbsService';
import { Button } from '@mui/material';

const BoardDetail = () => {
    const { pstSn } = useParams(); // URL의 :pstSn 값
    const navigate = useNavigate();
    const location = useLocation();

    const [detail, setDetail] = useState(null);
    const [error, setError] = useState(null);

    const from = location.state?.from;

    useEffect(() => {
        const fetchDetail = async () => {
            try{
                const data = await getDetail(pstSn);    // 여기서 BoardDto 리턴
                setDetail(data);
                console.log('data : ',data);
            } catch(err){
                console.error('상세 조회 에러:',err);
                setError(err.message || '상세 조회 중 오류가 발생했습니다.')
            }
        };
        if(pstSn) fetchDetail();
    }, [pstSn]);

    const handBack = () => {
        if(from){
            // navigate(`/boards?page=${from.page}&size=${from.rowsPerPage}`);
            navigate('/boards',{
                state: {from},
            });
        }else{
            navigate('/boards')
        }
    }

    return(
        <>
            <h1>{detail?.ttl}</h1>
            <div>{detail?.cn}</div>
            <Button variant="contained" onClick={handBack}>목록</Button>
        </>
    )
}

export default BoardDetail;