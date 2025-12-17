import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, TextField } from '@mui/material';

const BoardForm = () => {
    const { pstSn } = useParams();
    const { detail, setDetail } = useState();
    console.log("pstSn : ",pstSn);

    useEffect(() => {
        const fetch = async () => {
            try{
                const data = await getDetail(pstSn);
                console.log("data : ",data);

            } catch(error){
                console.log(error);
            }
        }

    })
    return(
        <>
            {/* 상세에서 쓰기 페이지로 넘어올 경우 해당하는 정보들을 물고 들어와야함 */}
            <br/>test form
            {/* <Box sx={{ width:500, maxWidth: 100% }}>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
            </Box>
            <Box sx={{ width:500, maxWidth: 100% }}>
                <TextField fullWidth label="Multiline" id="Multiline" multiline rows={10} defaultValue="내용을 입력하세요." />
            </Box> */}
        </>
    );
}

export default BoardForm;