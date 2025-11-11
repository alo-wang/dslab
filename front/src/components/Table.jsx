import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {Box, Table, TableBody, TableCell} from '@mui/material'; // 이걸로 맞추기
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
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

/* 소팅기능으로 보임(기능 주석)*/
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


/** 테이블 헤더 컴포넌트
 * @param {Object} columns - 테이블 헤더에 전달되는 속성
 * @param {Function} columns.onSelectAllClick - 전체 선택/해제
 * @param {string} columns.order - 정렬 방향 ('asc' | 'desc')
 * @param {string} columns.orderBy - 정렬 기준 컬럼 ID
 * @param {number} columns.numSelected - 선택된 행의 개수
 * @param {number} columns.rowCount - 전체 행의 개수
 * @param {Function} columns.onRequestSort - 정렬 요청
 * @param {boolean} enableSelection
 * @param {boolean} enableSorting
 * @returns {JSX.Element} 테이블 헤더 JSX 엘리먼트
*/
function EnhancedTableHead({
    columns,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    enableSelection = true,
    enableSorting = true
    }){
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return(
    <TableHead>
        <TableRow>
            {enableSelection && (
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
            )}
            {columns.map((column)=> (
            <TableCell
                key={column.id}
                align={column.align || (column.numeric ?  'right' : 'left')}
                padding={column.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === column.id ? order : false}
            >
                {enableSorting && column.sortable !== false ? (
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={createSortHandler(column.id)}
                    >
                        {column.label}
                        {orderBy == column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                        {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                        </Box>
                        ) : null}
                    </TableSortLabel>
                ) : (
                        column.label
                )}
            </TableCell>
            ))}
        </TableRow>
    </TableHead>
    );
}




/**
 * 테이블 툴바 - 선택 상태에 따라 제목 또는 선택 개수를 표시
 * @param {Object} props - 테이블 툴바에 전달되는 속성
 * @param

 * @param title
 * @param {number} numSelected - 선택된 행의 갯수
 * @param selectedActions - 선택한 항목이 있을 때 액션 버튼들
 * @param generalActions - 일반적으로 표시될 액션 버튼들
 */
function EnhancedTableToolbar({
    title,
    numSelected,
    selectedActions,
    generalActions
    }) {
//   const { numSelected } = props;
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
            {numSelected}개 선택됨
        </Typography> /* 선택된 갯수 표출 */
    ) : (
        <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            {title}
        </Typography> /* 테이블 전체 타이틀 */
    )}
    {/* 선택된 항목이 있을 때 표시할 액션 버튼들 */}
    {numSelected > 0 && selectedActions}

    {/* 일반적으로 표시할 액션 버튼들 */}
    {numSelected === 0 && generalActions}

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



/**
 * 최종 데이터 표출 영역
 *
 *
 */
export default function EnhancedTable({
    // 필수
    data = [],
    columns = [],

    // 선택적
    title = "데이터 테이블",
    enableSelection = true,
    enableSorting = true,
    enablePagination = true,
    enableDensePadding = true,

    // 페이지네이션
    defaultRowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50],

    // 정렬 설정
    defaultOrder = 'asc',
    defaultOrderBy = '',

    // 액션 버튼들
    selectedActions = null,
    generalActions = null,

    // 이벤트 핸들러
    onRowClick = null,
    onSelectionChange = null,

    // 스타일링
    tableStyle = {},
    containerStyle = {}
}) {

    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy || (columns[0]?.id || ''));
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

    /* 정렬 요청 */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    // 전체 선택/해제
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((item) => item.id);
            setSelected(newSelected);
            onSelectionChange?.(newSelected)
            return;
        }
        setSelected([]);
        onSelectionChange?.([]);
    };

    /* 개별 행 제목 클릭시 */
    const handleClick = (event, id, rowData) => {
        if (enableSelection && event.target.type === 'checkbox') {
            const selectedIndex = selected.indexOf(id);
            let newSelected = [];

            if(selectedIndex === -1){
                newSelected = newSelected.concat(selected, id);
            }
            else if (selectedIndex === 0) {
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
            onSelectionChange?.(newSelected);
        }else{
            // 일반 행 클릭시
            onRowClick?.(rowData, event);
        }
    };

    // 페이지 변경
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // 페이지당 행 수 변경
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // padding 설정
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // 빈 행 계산
    const emptyRows = enablePagination
        ? (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0)
        : 0;

    // 표시할 행들
    const visibleRows = useMemo(() => {
        let sortedData = [...data];

        if(enableSorting && order){
            sortedData = sortedData.sort(getComparator(order, orderBy));
        }
        if(enablePagination){
            return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        }
        return sortedData;
    }, [data, order, orderBy, page, rowsPerPage, enableSorting, enablePagination]);

    // 컬럼에서 값 가져오기
    const getCellValue = (row, column) => {
        if(column.render){
            return column.render(row[column.id], row);
        }
        return row[column.id];
    };

    return (
    <Box sx={{ width: '100%', ...containerStyle }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
                title={title}
                numSelected={selected.length}
                selectedActions={selectedActions}
                generalActions={generalActions}
            />
            <TableContainer>
            <Table
                sx={{ minWidth: 750, ...tableStyle }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'} // 테이블 사이즈
            >
                <EnhancedTableHead
                    columns = {columns}
                    numSelected = {selected.length}
                    order = {order}
                    orderBy = {orderBy}
                    onSelectAllClick={handleSelectAllClick} // 전체선택
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                    enableSelection={enableSelection}
                    enableSorting={enableSorting}
                />
                <TableBody>
                    {visibleRows.map((row, index) => {
                        const isItemSelected = enableSelection && selected.includes(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                        <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id, row)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                        >
                            {enableSelection && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                        'aria-labelledby': labelId,
                                        }}
                                    />
                                </TableCell>
                            )}
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align || (column.numeric ? 'right' : 'left')}
                                padding={column.disablePadding ? 'none' : 'normal'}
                                component={column.id === (columns[0]?.id) ? 'th' : 'td'}
                                scope={column.id === (columns[0]?.id) ? 'row' : undefined}
                                {...(column.id === (columns[0]?.id) && enableSelection ? { id : labelId } : {})}
                            >
                                {getCellValue(row, column)}
                            </TableCell>
                        ))}
                    </TableRow>
                );
            })}
                {emptyRows > 0 && (
                    <TableRow
                        style={{
                            height: (dense ? 33 : 53) * emptyRows,
                        }}
                    >
                        <TableCell colSpan={columns.length + (enableSelection ? 1 : 0)} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>

        {enablePagination && (
            <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
            />
        )}
        </Paper>
        {enableDensePadding && (
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />} // control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        )}
    </Box>
    );
}
