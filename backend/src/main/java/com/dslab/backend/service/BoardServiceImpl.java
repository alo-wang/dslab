package com.dslab.backend.service;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.BoardEntity;
import com.dslab.backend.mapper.BoardMapper;
import com.dslab.backend.repository.BoardJpa;
import com.dslab.backend.service.common.GenericServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class BoardServiceImpl extends GenericServiceImpl<BoardEntity, BoardDto, Integer> {
    private final BoardJpa boardJpa;

    @Autowired
    public BoardServiceImpl(BoardJpa boardJpa) {
        this.boardJpa = boardJpa;
    }

    // 목록 getAllBoard
    public List<BoardDto> getAllBoard(){
        return boardJpa.findAll().stream()
                .map(BoardMapper::toDto)
                .collect(Collectors.toList());
    }

    // 생성 insertBoard
    public BoardDto insertBoard(BoardDto dto){
        BoardEntity board = BoardMapper.toEntity(dto);
        BoardEntity saveBoard = boardJpa.save(board);
        return BoardMapper.toDto(saveBoard);
    }

    // 수정 updateBoard
    public BoardDto updateBoard(BoardDto dto){
        BoardEntity board =  new BoardEntity();
        board.setTtl(dto.getTtl());
        board.setCn(dto.getCn());
        board.setMdfcnDt(dto.getMdfcnDt());
        BoardEntity updateBoard =  boardJpa.save(board);
        return BoardMapper.toDto(updateBoard);
    }

    // 삭제 deleteBoard
    public BoardDto deleteBoard(long id){
        BoardEntity board = boardJpa.findById(id).orElseThrow();
        board.setDelYn("N");
        board.setDelDt(LocalDateTime.now());
        BoardEntity boardSave = boardJpa.save(board);
        return BoardMapper.toDto(boardSave);
    }

    // 상세 getDetailBoard
    public BoardEntity getDetailBoard(long id){
        return boardJpa.getById(id);
    }

    // 조회수 incrementViewCount
    // 페이징 getListWithPaging
}
