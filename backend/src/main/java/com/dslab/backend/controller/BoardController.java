package com.dslab.backend.controller;

import com.dslab.backend.common.api.ApiResponse;
import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.service.AtchFileService;
import com.dslab.backend.service.BoardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
// @CrossOrigin(origins = "http://localhost:5173")
@Slf4j
@Tag(name="게시판 API") // 스웨거
public class BoardController {
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

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Operation(summary = "새 글 생성(첨부파일 포함)")
    @PostMapping(value="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<BoardDto> insert(
            // @RequestPart("board") BoardDto dto,
            // @RequestPart(value = "board", required = false) String boardJson,
            @RequestPart("board") String boardJson,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
            // @RequestBody BoardDto dto // 게시'글'만 작성할때 사용
    ) throws Exception {
        BoardDto dto = objectMapper.readValue(boardJson, BoardDto.class);
        BoardDto saveDt = boardService.insertBoard(dto);

        if (files != null && !files.isEmpty()){
            atchFileService.saveBoardFiles(saveDt.getPstSn(), files);
        }

        log.info("raw boardJson = {}", boardJson);
        log.info("file count = {}", files != null? files.size() : 0);
        return ApiResponse.ok(saveDt);
    }

    // 조회수 증가 X
    @Operation(summary = "선택 글 상세(수정용, 조회수 증가 없음)")
    @GetMapping("/{pstSn}/edit")
    public ApiResponse<BoardDto> detailForEdit(@PathVariable Long pstSn){
        log.info("선택 글 상세: {}", pstSn);
        BoardDto dt = boardService.getDetailOnlyBoard(pstSn);
        return ApiResponse.ok(dt); // 프론트로 전달~
    }

    // 조회수 증가 O
    @Operation(summary = "선택 글 상세(조회수 증가)")
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
