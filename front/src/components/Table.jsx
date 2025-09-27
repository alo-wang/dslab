import { useState, useEffect, useMemo } from 'react';
/* 컴포넌트를 최대한 재활용 해서 만들어야 함.. 파라미터로 넘긴다고 할떄 어떻게 넘겨야 할지 */
/* 한 화면에 테이블이 여러개 일경우 어떻게 할지 알아보기 */

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


/**
 * 테이블에 표출되는 데이터의 키-값 구조 정의
 * @param {string} id - 데이터 id
 * @param {string} name - 값
 * @param {number} calories - 값
 * @param {number} fat - 값
 * @param {number} carbs - 값
 * @param {number} protein - 값
 * @returns {{id: string, name: string, calories: number, fat: number, carbs: number, protein: number}} 데이터 객체
 */
function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}


/**
 * 테이블에 표출되는 데이터를 생성
 * @constant
 * @type {Array<{id: string, name: string, calories: number, fat: number, carbs: number, protein: number}>}
 * @example
 * const food = createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0);
 */
const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
];


/* 소팅기능으로 보임(기능 주석)
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: '제목',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: '내용',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: '조회수',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: '삭제여부',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: '생성일',
  },
];

/**
 * 테이블 헤더를 정의 & 생성(정렬 및 선택 기능이 포함)
 * @param {Object} props - 테이블 헤더에 전달되는 속성
 * @param {Function} props.onSelectAllClick - 전체 선택/해제
 * @param {string} props.order - 정렬 방향 ('asc' | 'desc')
 * @param {string} props.orderBy - 정렬 기준 컬럼 ID
 * @param {number} props.numSelected - 선택된 행의 개수
 * @param {number} props.rowCount - 전체 행의 개수
 * @param {Function} props.onRequestSort - 정렬 요청
 * @returns {JSX.Element} 테이블 헤더 JSX 엘리먼트
 */
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* 정렬 담당 컴포넌트 (아래 기능명들은 MUI에서 기본제공)
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
             */}

              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                    {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                </Box>
              ) : null}
            {/*
            </TableSortLabel>
            */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 리액트에서 프롭스 타입 검증
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


/**
 * 테이블 툴바 - 선택 상태에 따라 제목 또는 선택 개수를 표시
 * @param {Object} props - 테이블 툴바에 전달되는 속성
 * @param {number} props.numSelected - 선택된 행의 갯수
 */
function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography> /* 선택된 갯수 표출 */
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography> /* 테이블 전체 타이틀 */
      )}
      {/*
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
             <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


/**
 * 최종 데이터 표출 영역
 *
 *
 */
export default function EnhancedTable() {
  // const [order, setOrder] = useState('asc');
  // const [orderByimport { useState, useEffect, useMemo } from 'react';
                   /* 컴포넌트를 최대한 재활용 해서 만들어야 함.. 파라미터로 넘긴다고 할떄 어떻게 넘겨야 할지 */
                   /* 한 화면에 테이블이 여러개 일경우 어떻게 할지 알아보기 */

                   import PropTypes from 'prop-types';
                   import { alpha } from '@mui/material/styles';
                   import Box from '@mui/material/Box';
                   import Table from '@mui/material/Table';
                   import TableBody from '@mui/material/TableBody';
                   import TableCell from '@mui/material/TableCell';
                   import TableContainer from '@mui/material/TableContainer';
                   import TableHead from '@mui/material/TableHead';
                   import TablePagination from '@mui/material/TablePagination';
                   import TableRow from '@mui/material/TableRow';
                   import TableSortLabel from '@mui/material/TableSortLabel';
                   import Toolbar from '@mui/material/Toolbar';
                   import Typography from '@mui/material/Typography';
                   import Paper from '@mui/material/Paper';
                   import Checkbox from '@mui/material/Checkbox';
                   import IconButton from '@mui/material/IconButton';
                   import Tooltip from '@mui/material/Tooltip';
                   import FormControlLabel from '@mui/material/FormControlLabel';
                   import Switch from '@mui/material/Switch';
                   // import DeleteIcon from '@mui/icons-material/Delete';
                   // import FilterListIcon from '@mui/icons-material/FilterList';
                   import { visuallyHidden } from '@mui/utils';


                   /**
                    * 테이블에 표출되는 데이터의 키-값 구조 정의
                    * @param {string} id - 데이터 id
                    * @param {string} name - 값
                    * @param {number} calories - 값
                    * @param {number} fat - 값
                    * @param {number} carbs - 값
                    * @param {number} protein - 값
                    * @returns {{id: string, name: string, calories: number, fat: number, carbs: number, protein: number}} 데이터 객체
                    */
                   function createData(id, name, calories, fat, carbs, protein) {
                     return {
                       id,
                       name,
                       calories,
                       fat,
                       carbs,
                       protein,
                     };
                   }


                   /**
                    * 테이블에 표출되는 데이터를 생성
                    * @constant
                    * @type {Array<{id: string, name: string, calories: number, fat: number, carbs: number, protein: number}>}
                    * @example
                    * const food = createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0);
                    */
                   const rows = [
                     createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
                     createData(2, 'Donut', 452, 25.0, 51, 4.9),
                   //   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
                   //   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
                   //   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
                   //   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
                   //   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
                   //   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
                   //   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
                   //   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
                   //   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
                   //   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
                   //   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
                   ];


                   /* 소팅기능으로 보임(기능 주석)
                   function descendingComparator(a, b, orderBy) {
                     if (b[orderBy] < a[orderBy]) {
                       return -1;
                     }
                     if (b[orderBy] > a[orderBy]) {
                       return 1;
                     }
                     return 0;
                   }

                   function getComparator(order, orderBy) {
                     return order === 'desc'
                       ? (a, b) => descendingComparator(a, b, orderBy)
                       : (a, b) => -descendingComparator(a, b, orderBy);
                   }
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
                       id: 'name',
                       numeric: false,
                       disablePadding: true,
                       label: '제목',
                     },
                     {
                       id: 'calories',
                       numeric: true,
                       disablePadding: false,
                       label: '내용',
                     },
                     {
                       id: 'fat',
                       numeric: true,
                       disablePadding: false,
                       label: '조회수',
                     },
                     {
                       id: 'carbs',
                       numeric: true,
                       disablePadding: false,
                       label: '삭제여부',
                     },
                     {
                       id: 'protein',
                       numeric: true,
                       disablePadding: false,
                       label: '생성일',
                     },
                   ];

                   /**
                    * 테이블 헤더를 정의 & 생성(정렬 및 선택 기능이 포함)
                    * @param {Object} props - 테이블 헤더에 전달되는 속성
                    * @param {Function} props.onSelectAllClick - 전체 선택/해제
                    * @param {string} props.order - 정렬 방향 ('asc' | 'desc')
                    * @param {string} props.orderBy - 정렬 기준 컬럼 ID
                    * @param {number} props.numSelected - 선택된 행의 개수
                    * @param {number} props.rowCount - 전체 행의 개수
                    * @param {Function} props.onRequestSort - 정렬 요청
                    * @returns {JSX.Element} 테이블 헤더 JSX 엘리먼트
                    */
                   function EnhancedTableHead(props) {
                     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
                       props;
                     const createSortHandler = (property) => (event) => {
                       onRequestSort(event, property);
                     };

                     return (
                       <TableHead>
                         <TableRow>
                           <TableCell padding="checkbox">
                             <Checkbox
                               color="primary"
                               indeterminate={numSelected > 0 && numSelected < rowCount}
                               checked={rowCount > 0 && numSelected === rowCount}
                               onChange={onSelectAllClick}
                               inputProps={{
                                 'aria-label': 'select all desserts',
                               }}
                             />
                           </TableCell>
                           {headCells.map((headCell) => (
                             <TableCell
                               key={headCell.id}
                               align={headCell.numeric ? 'right' : 'left'}
                               padding={headCell.disablePadding ? 'none' : 'normal'}
                               // sortDirection={orderBy === headCell.id ? order : false}
                             >
                               {/* 정렬 담당 컴포넌트 (아래 기능명들은 MUI에서 기본제공)
                               <TableSortLabel
                                 active={orderBy === headCell.id}
                                 direction={orderBy === headCell.id ? order : 'asc'}
                                 onClick={createSortHandler(headCell.id)}
                               >
                                */}

                                 {headCell.label}
                                 {orderBy === headCell.id ? (
                                   <Box component="span" sx={visuallyHidden}>
                                       {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                                   </Box>
                                 ) : null}
                               {/*
                               </TableSortLabel>
                               */}
                             </TableCell>
                           ))}
                         </TableRow>
                       </TableHead>
                     );
                   }

                   // 리액트에서 프롭스 타입 검증
                   EnhancedTableHead.propTypes = {
                     numSelected: PropTypes.number.isRequired,
                     onRequestSort: PropTypes.func.isRequired,
                     onSelectAllClick: PropTypes.func.isRequired,
                     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
                     orderBy: PropTypes.string.isRequired,
                     rowCount: PropTypes.number.isRequired,
                   };


                   /**
                    * 테이블 툴바 - 선택 상태에 따라 제목 또는 선택 개수를 표시
                    * @param {Object} props - 테이블 툴바에 전달되는 속성
                    * @param {number} props.numSelected - 선택된 행의 갯수
                    */
                   function EnhancedTableToolbar(props) {
                     const { numSelected } = props;
                     return (
                       <Toolbar
                         sx={[
                           {
                             pl: { sm: 2 },
                             pr: { xs: 1, sm: 1 },
                           },
                           numSelected > 0 && {
                             bgcolor: (theme) =>
                               alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                           },
                         ]}
                       >
                         {numSelected > 0 ? (
                           <Typography
                             sx={{ flex: '1 1 100%' }}
                             color="inherit"
                             variant="subtitle1"
                             component="div"
                           >
                             {numSelected} selected
                           </Typography> /* 선택된 갯수 표출 */
                         ) : (
                           <Typography
                             sx={{ flex: '1 1 100%' }}
                             variant="h6"
                             id="tableTitle"
                             component="div"
                           >
                             Nutrition
                           </Typography> /* 테이블 전체 타이틀 */
                         )}
                         {/*
                         {numSelected > 0 ? (
                           <Tooltip title="Delete">
                             <IconButton>
                                <DeleteIcon />
                             </IconButton>
                           </Tooltip>
                         ) : (
                           <Tooltip title="Filter list">
                             <IconButton>
                               <FilterListIcon />
                             </IconButton>
                           </Tooltip>
                         )}
                         */}
                       </Toolbar>
                     );
                   }

                   EnhancedTableToolbar.propTypes = {
                     numSelected: PropTypes.number.isRequired,
                   };


                   /**
                    * 최종 데이터 표출 영역
                    *
                    *
                    */
                   export default function EnhancedTable() {
                     // const [order, setOrder] = useState('asc');
                     // const [orderBy, setOrderBy] = useState('calories');
                     const [selected, setSelected] = useState([]);
                     const [page, setPage] = useState(0);
                     const [dense, setDense] = useState(false);
                     const [rowsPerPage, setRowsPerPage] = useState(5);

                     /*
                     const handleRequestSort = (event, property) => {
                       const isAsc = orderBy === property && order === 'asc';
                       setOrder(isAsc ? 'desc' : 'asc');
                       setOrderBy(property);
                     };
                     */

                     const handleSelectAllClick = (event) => {
                       if (event.target.checked) {
                         const newSelected = rows.map((n) => n.id);
                         setSelected(newSelected);
                         return;
                       }
                       setSelected([]);
                     };

                     /* 제목 클릭시
                     const handleClick = (event, id) => {
                       const selectedIndex = selected.indexOf(id);
                       let newSelected = [];

                       if (selectedIndex === -1) {
                         newSelected = newSelected.concat(selected, id);
                       } else if (selectedIndex === 0) {
                         newSelected = newSelected.concat(selected.slice(1));
                       } else if (selectedIndex === selected.length - 1) {
                         newSelected = newSelected.concat(selected.slice(0, -1));
                       } else if (selectedIndex > 0) {
                         newSelected = newSelected.concat(
                           selected.slice(0, selectedIndex),
                           selected.slice(selectedIndex + 1),
                         );
                       }
                       setSelected(newSelected);
                     };
                      */

                     const handleChangePage = (event, newPage) => {
                       setPage(newPage);
                     };

                     const handleChangeRowsPerPage = (event) => {
                       setRowsPerPage(parseInt(event.target.value, 10));
                       setPage(0);
                     };


                   // padding 설정
                     const handleChangeDense = (event) => {
                       setDense(event.target.checked);
                     };

                     // Avoid a layout jump when reaching the last page with empty rows.
                     const emptyRows =
                       page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

                     const visibleRows = useMemo(
                       () =>
                         [...rows]
                           // .sort(getComparator(order, orderBy)) // 소팅기능으로 보임
                           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                       // [order, orderBy, page, rowsPerPage],
                       [page, rowsPerPage],
                     );

                     return (
                       <Box sx={{ width: '100%' }}>
                         <Paper sx={{ width: '100%', mb: 2 }}>
                           <EnhancedTableToolbar numSelected={selected.length} />
                           <TableContainer>
                             <Table
                               sx={{ minWidth: 750 }}
                               aria-labelledby="tableTitle"
                               // size={dense ? 'small' : 'medium'} // 테이블 서아주
                             >
                               <EnhancedTableHead
                                 numSelected={selected.length}
                                 // order={order}
                                 // orderBy={orderBy}
                                 // onSelectAllClick={handleSelectAllClick} // 전체선택
                                 // onRequestSort={handleRequestSort}
                                 rowCount={rows.length}
                               />
                               <TableBody>
                                 {visibleRows.map((row, index) => {
                                   const isItemSelected = selected.includes(row.id);
                                   const labelId = `enhanced-table-checkbox-${index}`;

                                   return (
                                     <TableRow
                                       hover
                                       // onClick={(event) => handleClick(event, row.id)}
                                       role="checkbox"
                                       aria-checked={isItemSelected}
                                       tabIndex={-1}
                                       key={row.id}
                                       selected={isItemSelected}
                                       sx={{ cursor: 'pointer' }}
                                     >
                                       <TableCell padding="checkbox">
                                         <Checkbox
                                           color="primary"
                                           checked={isItemSelected}
                                           inputProps={{
                                             'aria-labelledby': labelId,
                                           }}
                                         />
                                       </TableCell>

                                       <TableCell
                                         component="th"
                                         id={labelId}
                                         scope="row"
                                         padding="none"
                                       >
                                         {row.name}
                                       </TableCell>
                                       <TableCell align="right">{row.calories}</TableCell>
                                       <TableCell align="right">{row.fat}</TableCell>
                                       <TableCell align="right">{row.carbs}</TableCell>
                                       <TableCell align="right">{row.protein}</TableCell>
                                     </TableRow>
                                   );
                                 })}
                   {/*               {emptyRows > 0 && ( */}
                   {/*                 <TableRow */}
                   {/*                   style={{ */}
                   {/*                     height: (dense ? 33 : 53) * emptyRows, */}
                   {/*                   }} */}
                   {/*                 > */}
                   {/*                   <TableCell colSpan={6} /> */}
                   {/*                 </TableRow> */}
                   {/*               )} */}
                               </TableBody>
                             </Table>
                           </TableContainer>
                           <TablePagination
                             rowsPerPageOptions={[5, 10, 25]}
                             component="div"
                             count={rows.length}
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onPageChange={handleChangePage}
                             onRowsPerPageChange={handleChangeRowsPerPage}
                           />
                         </Paper>
                         <FormControlLabel
                           control={<Switch checked={dense} onChange={handleChangeDense} />} // control={<Switch checked={dense} onChange={handleChangeDense} />}
                           label="Dense padding"
                         />
                       </Box>
                     );
                   }
, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /*
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  */

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /* 제목 클릭시
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
   */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


// padding 설정
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        // .sort(getComparator(order, orderBy)) // 소팅기능으로 보임
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    // [order, orderBy, page, rowsPerPage],
    [page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'} // 테이블 서아주
          >
            <EnhancedTableHead
              numSelected={selected.length}
              // order={order}
              // orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick} // 전체선택
              // onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
{/*               {emptyRows > 0 && ( */}
{/*                 <TableRow */}
{/*                   style={{ */}
{/*                     height: (dense ? 33 : 53) * emptyRows, */}
{/*                   }} */}
{/*                 > */}
{/*                   <TableCell colSpan={6} /> */}
{/*                 </TableRow> */}
{/*               )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />} // control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
