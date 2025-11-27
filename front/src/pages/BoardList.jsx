import { useState, useEffect, useMemo } from 'react';
import { getBbsList } from '../service/bbsService';

import EnhancedTable from '../components/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';



const BoardList = () => {

    const [list, setList] = useState([]); // 첫 렌더링시 데이터가 아직 없으므로 빈 리스트 상태([])로 시작한다.

    useEffect(() => { // 렌더링 이후에 실행할 코드를 등록하는 훅
        const fetchList = async () => { // fetchList 라는 비동기 함수 정의
            try{ // 예외처리 블럭
                const pageData = await getBbsList(); // 만들어둔 서비스 함수(getBbsList())를 비동기(await)로 해결된 호출한 값을 변수(pageData)에 넣어준다
                const rows = (pageData.content || []) // Page 객체 안에 둘어있는 실제 게시글 배열(pageData.content)이 undefined 이거나 null 이라도 에러가 안나게 빈배열로 대처하는 안전 장치
                .map((item) => ({
                        ...item, // item 안에 있는 모든 필드를 그대로 복사
                        id: item.pstSn, // 컴포넌트에 고유한 아이디가 필요 할 수 있어 한번더 넣어주는 값
                })); // 배열의 각 요소(item)을 원하는 모양으로 변환해서 새배열(rows)을 만든다
                setList(rows); // 만든 새배열(rows)를 상태(list)에 저장, 이때 리액트가 변경된 상태값을 컴포넌트에 다시 렝더링 하여 새 데이터를 내려보낸다.
                console.log('rows: ',rows);
            }catch(error){
                console.error('목록 로딩 중 에러:', err);
            }
        };
        fetchList(); // 정의한 함수를 호출!
    },[]); // 빈배열([])은 마운트될 때 딱 한번만 실행하라는 의미. 배열에 state값을 넣으면 해당 state의 값이 바뀔때마다 실행하라는 의미

/**  전체 목록 호출시
    useEffect(()=>{
        getBbsList().then((data) => {
            const dataWithId = data.map(item => ({
                ...item,
                id : item.pstSn
                }));

            // setList(data);
            setList(dataWithId);
            console.log("test!!");
        })
    },[]);
    const dataList = list.map((listItem, index) => {
        console.log(`[front] 목록! ${index}:`, listItem);
    });
*/

/**
 * 테이블 헤더를 정의하는 상수 배열
 * 각 객체는 컬럼의 ID, 정렬 가능 여부, padding 사용여부, 표시될 라벨을 가짐
 * @constant
 * @type {Array<{id: string, numeric: boolean, disablePadding: boolean, label: string}>}
 * @example
 * const data = [{ id: 'name', numeric: false, disablePadding: true, label: '제목'}];
 */
const headCells = [
    {
        id: 'ttl',
        label: '제목',
        disablePadding: true,
        sortable: true,
        minWidth: 200,
        render: (value, row) => (
            <div>
                <div>{value}</div>
                {row.isNew && <span style={{color: 'red', fontSize: '12px'}}>New</span>}
            </div>
        )
    },
    {
        id: 'cn',
        label: '내용',
        sortable: true,
        minWidth: 120
    },
    {
        id: 'inqCnt',
        label: '조회수',
        numeric: true,
        align:'right',
        sortable:true,
        minWidth:80
    },
    {
        id: 'delYn',
        numeric: true,
        disablePadding: false,
        label: '삭제여부',
    },
    {
        id: 'crtDt',
        label: '생성일',
        sortable: true,
        minWidth: 120,
        render: (value) => new Date(value).toLocaleDateString('ko-KR')
    },
];

    return(
        <>
            <EnhancedTable
                data={list}
                columns={headCells}
                title="게시판1"
                // onRowClick={handleRowClick} // 행클릭
                // onSelectionChange={handleSelectionChange} // 선택된 항목들
                // selectedActions={selectedActions} // 액션 버튼들
                // generalActions={generalActions} // 일반 액션 버튼
                defaultRowsPerPage={10}
                defaultOrderBy="createdAt"
                defaultOrder="desc"
            />
            {/* {dataList} */}

            <EnhancedTable
                data={list}
                columns={headCells}
                title="게시판2"
                // onRowClick={handleRowClick} // 행클릭
                // onSelectionChange={handleSelectionChange} // 선택된 항목들
                // selectedActions={selectedActions} // 액션 버튼들
                // generalActions={generalActions} // 일반 액션 버튼
                defaultRowsPerPage={10}
                defaultOrderBy="createdAt"
                defaultOrder="desc"
            />
        </>
    )
}

export default BoardList;