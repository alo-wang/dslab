import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDetail } from '../service/bbsService';
import { Box, TextField } from '@mui/material';

const BoardForm = () => {
    const { pstSn } = useParams();
    const [ detail, setDetail ] = useState(null);   // {}안에 내용을 담은 setDetail에 내용이 안담겨.. 왜냐면 useState는 배열을 돌려주지, 객체를 돌려주는게 아님
    console.log("pstSn : ",pstSn);

    useEffect(() => {
        const fetch = async () => {
            try{
                const data = await getDetail(pstSn);
                console.log("data : ",data);
                setDetail(data);
            } catch(error){
                console.log('Error!!',error);
            }
        }
        if(pstSn) fetch();
    },[pstSn]); // ,[pstSn] 안 넣으면 계ㅔㅔㅔㅔㅔㅔ속 내용을 부른다.
    console.log("detail : ",detail);
    return(
        <>
            {/* 상세에서 쓰기 페이지로 넘어올 경우 해당하는 정보들을 물고 들어와야함 */}
            <br/>test form
            <Box sx={{ width:500 }}>
                <TextField fullWidth id="fullWidth" value={detail?.ttl || ''}/>
            </Box>
            <Box sx={{ width:500 }}>
                <TextField
                    fullWidth id="Multiline"
                    multiline
                    rows={10}
                    defaultValue="내용을 입력하세요."
                    value={detail?.cn || ''}
                />
            </Box>
        </>
    );
}

export default BoardForm;