package com.dslab.backend.service;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.BoardEntity;
import com.dslab.backend.global.exception.BoardNotFoundException;
import com.dslab.backend.mapper.BoardMapper;
import com.dslab.backend.repository.BoardJpa;
import com.dslab.backend.service.common.GenericServiceImpl;
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
        // return boardJpa.findAll().stream()
        return boardJpa.findByDelYn("N").stream()
                .map(BoardMapper::toDto)
                .collect(Collectors.toList());
    }

    // 생성 insertBoard
    public BoardDto insertBoard(BoardDto dto){
        BoardEntity board = BoardMapper.toEntity(dto);
        board.setInqCnt(0L);
        board.setDelYn("N");
        board.setCrtDt(LocalDateTime.now());
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

    // 조회수 증가 없이 상세조회(수정 페이지)
    public BoardDto getDetailOnlyBoard(Long id){
        BoardEntity board = boardJpa.findById(id)
                .orElseThrow(() -> new BoardNotFoundException("게시글이 없습니다. id=" +id));
        return BoardMapper.toDto(board);
    }

    // 조회수 +1 하면서 상세 조회(상세 페이지)
    public BoardDto getDetailBoard(Long id){
        BoardEntity board = boardJpa.findById(id)
                // .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다. id=" + id));
                .orElseThrow(() -> new BoardNotFoundException("게시글이 없습니다. id=" + id));
        Long current = board.getInqCnt() == null ? 0L : board.getInqCnt();
        board.setInqCnt(current+1); // 조회수 증가, incrementViewCount // 2번씩 조회되네..
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
        // return boardJpa.findAll(pageable)
        return boardJpa.findByDelYn("N", pageable)
                .map(BoardMapper::toDto);
    }
}
