package com.dslab.backend.mapper;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.BoardEntity;

public class BoardMapper {
    // Date -> LocalDateTime
    // LocalDateTime -> Date

    // Dto -> Entity
    public static BoardEntity toEntity(BoardDto dto){
        if(dto == null) return null;
        BoardEntity board = new BoardEntity();
        board.setPstSn(dto.getPstSn());
        board.setTtl(dto.getTtl());
        board.setCn(dto.getCn());
        board.setInqCnt(dto.getInqCnt());
        board.setDelYn(dto.getDelYn());
        board.setCrtDt(dto.getCrtDt());
        board.setMdfcnDt(dto.getMdfcnDt());
        board.setDelDt(dto.getDelDt());

        return board;
    }


    // Entity -> Dto
    public static BoardDto toDto(BoardEntity board){
        if(board == null) return null;

        return BoardDto.builder()
                .pstSn(board.getPstSn())
                .ttl(board.getTtl())
                .cn(board.getCn())
                .inqCnt(board.getInqCnt())
                .delYn(board.getDelYn())
                .crtDt(board.getCrtDt())
                .mdfcnDt(board.getMdfcnDt())
                .delDt(board.getDelDt())
                .build();
    }
}
