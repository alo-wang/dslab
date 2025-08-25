package com.dslab.backend.service;


import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.BoardEntity;
import com.dslab.backend.service.common.GenericService;

import java.util.List;

public interface BoardService extends GenericService<BoardEntity, BoardDto> {
    // CRUD
    List<BoardDto> getAllBoard();
    BoardDto insertBoard(BoardDto dto);
    BoardDto updateBoard(BoardDto dto);
    BoardDto deleteBoard(long id);
    BoardDto getDetailBoard(long id);
}
