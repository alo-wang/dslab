import { useNavigate, useLocation } from 'react-router-dom';

export function useBacks (defaultPath = '/') {
    const navigate = useNavigate(); // 리액트 라우터 훅, '페이지 이동을 제어하는 함수' 하나 리턴
    const location = useLocation(); // '주소 정보 전체'를 가져오는 훅
    const from = location.state?.from;

    const handBack = () => {
        // 페이징 정보 유지
        if(from?.type === 'boardList'){ // location.state?.from; 에서 꺼낸 값이 있으면, 즉 '목록 페이지에서 넘어온 경우' 라면 'state'에 'from'정보를 다시 실어서 보내줌
           // navigate(`/boards?page=${from.page}&size=${from.rowsPerPage}`); // 이 방식으로 하면 url에 페이징 정보까지 다 보여짐
            navigate('/boards',{
                state: {from},
            });
            return;
        }

        // 상세 화면에서 'from'이 없으면 목록으로 이동
        if(location.pathname.startsWith('/boards/')) {
            navigate('/boards');
            return;
        }

        // 브라우저 히스토리 기준
        if(window.history.length > 1) navigate(-1);
        else navigate(defaultPath);
    };

    return { handBack };
}