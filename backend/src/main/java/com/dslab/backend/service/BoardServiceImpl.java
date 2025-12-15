package com.dslab.backend.service;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.BoardEntity;
import com.dslab.backend.global.exception.BoardNotFoundException;
import com.dslab.backend.mapper.BoardMapper;
import com.dslab.backend.repository.BoardJpa;
import com.dslab.backend.service.common.GenericServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BoardServiceImpl
        extends GenericServiceImpl<BoardEntity, BoardDto, Long>
        implements BoardService{
    private final BoardJpa boardJpa;

    public BoardServiceImpl(BoardJpa boardJpa) {
        super(BoardMapper::toDto);
        this.boardJpa = boardJpa;
    }

    // 목록 getAllBoard
    @Transactional(readOnly = true)
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
        BoardEntity board = boardJpa.findById(dto.getPstSn())
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다. id=" + dto.getPstSn()));
                //new BoardEntity(); 으로 하면 JPA 입장에서는 새글 인서트로 보일 수 있음
        board.setTtl(dto.getTtl());
        board.setCn(dto.getCn());
        board.setMdfcnDt(LocalDateTime.now());
        BoardEntity updated =  boardJpa.save(board);
        return BoardMapper.toDto(updated);
    }

    // 삭제 deleteBoard
    public BoardDto deleteBoard(Long id){
        BoardEntity board = boardJpa.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다. id=" + id));
        board.setDelYn("Y");
        board.setDelDt(LocalDateTime.now());
        BoardEntity deleted = boardJpa.save(board);
        return BoardMapper.toDto(deleted);
    }

    // 상세 getDetailBoard
    public BoardDto getDetailBoard(Long id){
        BoardEntity board = boardJpa.findById(id)
                // .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다. id=" + id));
                .orElseThrow(() -> new BoardNotFoundException("게시글이 없습니다. id=" + id));
        board.setInqCnt(board.getInqCnt()+1); // 조회수 증가, incrementViewCount
        board.setMdfcnDt(LocalDateTime.now());
        return BoardMapper.toDto(board);
    }

    // 페이징 getListWithPaging
    @Override
    @Transactional(readOnly = true)
    public Page<BoardDto> getListWithPaging(int page, int size){
        PageRequest pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "pstSn") // 최신글 순
        );
        return boardJpa.findAll(pageable)
                .map(BoardMapper::toDto);
    }
}
