package com.dslab.backend.controller;

import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "http://localhost:5173/")
@Slf4j
@Tag(name="게시판 API") // 스웨거
public class BoardController {
    // @Autowired
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @Operation(summary = "board list 조회")
    @GetMapping("")
    public List<BoardDto> getList(){
        log.info("list 조회");
        return boardService.getAllBoard();
    }

    @Operation(summary = "새 글 생성")
    @PostMapping("")
    public BoardDto insert(@RequestBody BoardDto dto){
        log.info("새 글 생성: {}", dto);
        return boardService.insertBoard(dto);
    }

    @Operation(summary = "선택 글 상세")
    @GetMapping("/{pstSn}")
    public BoardDto detail(@PathVariable Long pstSn){
        log.info("선택 글 상세: {}", pstSn);
        return boardService.getDetailBoard(pstSn);
    }

    @Operation(summary = "선택 글 수정")
    @PutMapping("/{pstSn}")
    public BoardDto update(
            @PathVariable Long pstSn,
            @RequestBody BoardDto dto){
        log.info("선택 글 수정: {}", pstSn);
        dto.setPstSn(pstSn);
        return boardService.updateBoard(dto);
    }

    @Operation(summary = "선택 글 삭제")
    @DeleteMapping("{pstSn}")
    public BoardDto delete(@PathVariable Long pstSn){
        log.info("선택 글 삭제");
        return boardService.deleteBoard(pstSn);
    }

    @Operation(summary = "board list 조회(page, size)")
    @GetMapping("/page")
    public Page<BoardDto> getListWithPaging(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        log.info("페이징 목록 조회 page={}, size={}", page, size);
        return boardService.getListWithPaging(page, size);
    }
}
