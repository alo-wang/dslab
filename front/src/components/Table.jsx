import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
    Box, Checkbox, IconButton, Tooltip, FormControlLabel, Switch,
    Table, TableContainer, TableBody, TableCell, TableHead,
    TablePagination, TableRow, TableSortLabel,
    Toolbar, Typography, Paper
    } from '@mui/material';
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
    enableSorting = true,
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
    const renderActions = (actions) => {
        if(!actions) return null;

        // 배열인 경우
        if(Array.isArray(actions)){
                return actions.map((action, index) => (
                    <Box key={action.key || index} component = "span">
                        {action}
                    </Box>
                ));
            }

            // 단일 요소인 경우
            return actions;
        }
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
    {numSelected > 0 && renderActions(selectedActions)}

    {/* 일반적으로 표시할 액션 버튼들 */}
    {numSelected === 0 && renderActions(generalActions)}

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
    // enableDensePadding = true,

    // 페이지네이션
    defaultRowsPerPage = 5,
    rowsPerPageOptions = [5, 10],

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
    containerStyle = {},

    // 서버사이드 페이징
    serverSide = false,
    page: externalPage,
    rowsPerPage: externalRowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
}) {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy || (columns[0]?.id || ''));
    const [selected, setSelected] = useState([]);

    const [page, setPage] = useState(externalPage ?? 0);
    const [rowsPerPage, setRowsPerPage] = useState(externalRowsPerPage ?? defaultRowsPerPage);

    const [dense, setDense] = useState(false);

    // 서버사이드 모드일 때는 외부에서 page/rowsPerPage가 바뀌면 그걸 그대로 반영
    useEffect(() => {
        if(serverSide && typeof externalPage === 'number') setPage(externalPage);
    }, [serverSide, externalPage]);

    useEffect(() => {
        if(serverSide && typeof externalRowsPerPage === 'number') setRowsPerPage(externalRowsPerPage);
    }, [serverSide, externalRowsPerPage]);

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
        if (serverSide && onPageChange) {
            onPageChange(newPage);
        } else {
            setPage(newPage);
        }
    };

    // 페이지당 행 수 변경
    const handleChangeRowsPerPage = (event) => {
        const value = parseInt(event.target.value, 10);

        if(serverSide && onRowsPerPageChange){
            onRowsPerPageChange(value);
        }else{
            setRowsPerPage(value);
            setPage(0);
        }
    };

    // padding 설정
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // 전체 행 개수: 서버사이드면 totalCount, 아니면 data.length
    const totalRows = serverSide
        ? (typeof totalCount === 'number' ? totalCount : data.length)
        : data.length;

    // 표시할 행들
    const visibleRows = useMemo(() => {
        let sortedData = [...data];

        if(enableSorting && order){
            sortedData = sortedData.sort(getComparator(order, orderBy));
        }
        if(enablePagination && !serverSide){
            return sortedData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            );
        }
        return sortedData;
    }, [data, order, orderBy, page, rowsPerPage, enableSorting, enablePagination, serverSide]);

    // 빈 행 계산
    const emptyRows = enablePagination
        ? Math.max(0, rowsPerPage - visibleRows.length)
        : 0;

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
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
            />
        )}
        </Paper>
{/*         {enableDensePadding && (
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />} // control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        )} */}
    </Box>
    );
}
