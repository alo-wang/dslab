package com.dslab.backend.controller;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="게시판 API") // 스웨거
@Slf4j
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    @Autowired
    private BoardService boardService;

    @Operation(summary = "board list 조회")
    @GetMapping("")
    public List<BoardDto> getList(){
        log.info("list 조회");
        return boardService.getAllBoard();
    }

    @PostMapping("")
    public BoardDto insert(BoardDto dto){
        log.info("새 글 생성");
        return boardService.insertBoard(dto);
    }

    @GetMapping("/{pstSn}")
    public BoardDto detail(Long pstSn){
        log.info("선택 글 상세");
        return boardService.getDetailBoard(pstSn);
    }

    @PutMapping("{pstSn}")
    public BoardDto update(BoardDto dto){
        log.info("선택 글 수정");
        return boardService.updateBoard(dto);
    }

    @DeleteMapping("{pstSn}")
    public BoardDto delete(Long pstSn){
        log.info("선택 글 삭제");
        return boardService.deleteBoard(pstSn);
    }
}
