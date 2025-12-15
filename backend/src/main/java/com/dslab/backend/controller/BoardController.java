package com.dslab.backend.controller;

import com.dslab.backend.common.api.ApiResponse;
import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.service.AtchFileService;
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
    private final AtchFileService atchFileService;

    public BoardController(BoardService boardService, AtchFileService atchFileService) {
        this.boardService = boardService;
        this.atchFileService = atchFileService;
    }

    @Operation(summary = "board list 조회")
    @GetMapping("")
    public ApiResponse<List<BoardDto>> getList(){
        log.info("list 조회");
        List<BoardDto> dt = boardService.getAllBoard();
        return ApiResponse.ok(dt);
    }

    @Operation(summary = "새 글 생성")
    @PostMapping("")
    public ApiResponse<BoardDto> insert(@RequestBody BoardDto dto){
        log.info("새 글 생성: {}", dto);
        BoardDto dt = boardService.insertBoard(dto);
        return ApiResponse.ok(dt);
    }

    @Operation(summary = "선택 글 상세")
    @GetMapping("/{pstSn}")
    public ApiResponse<BoardDto> detail(@PathVariable Long pstSn){
        log.info("선택 글 상세: {}", pstSn);
        BoardDto dt = boardService.getDetailBoard(pstSn);
        return ApiResponse.ok(dt); // 프론트로 전달~
    }
    /* 평면 구조일때
    @GetMapping("/{pstSn}")
    public BoardDto detail(@PathVariable Long pstSn){
        log.info("선택 글 상세: {}", pstSn);
        return boardService.getDetailBoard(pstSn);
    }
    */

    @Operation(summary = "선택 글 수정")
    @PutMapping("/{pstSn}")
    public ApiResponse<BoardDto> update(
            @PathVariable Long pstSn,
            @RequestBody BoardDto dto){
        log.info("선택 글 수정: {}", pstSn);
        dto.setPstSn(pstSn);
        BoardDto dt = boardService.updateBoard(dto);
        return ApiResponse.ok(dt);
    }

    @Operation(summary = "선택 글 삭제")
    @DeleteMapping("/{pstSn}")
    public ApiResponse<BoardDto> delete(@PathVariable Long pstSn){
        log.info("선택 글 삭제");
        BoardDto dt = boardService.deleteBoard(pstSn);
        return ApiResponse.ok(dt);
    }

    @Operation(summary = "board list 조회(page, size)")
    @GetMapping("/page")
    public ApiResponse<Page<BoardDto>> getListWithPaging(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        log.info("페이징 목록 조회 page={}, size={}", page, size);
        Page<BoardDto> dt = boardService.getListWithPaging(page, size);
        return ApiResponse.ok(dt);
    }

    @Operation(summary = "첨부파일 조회")
    @GetMapping("/{pstSn}/attachments")
    public ApiResponse<List<AtchFileDto>> getAttachments(@PathVariable Long pstSn){
        log.info("첨부파일 조회");
        List<AtchFileDto> dt = atchFileService.getBoardFiles(pstSn);
        return ApiResponse.ok(dt);
    }
}
