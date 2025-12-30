package com.dslab.backend.service;

import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.entity.AtchFileEntity;
import com.dslab.backend.service.common.GenericService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AtchFileService extends GenericService<AtchFileEntity, AtchFileDto> {
    // 게시판 첨부파일 조회
    List<AtchFileDto> getBoardFiles(Long pstSn);

    // 첨부파일 업로드
    List<AtchFileDto> saveBoardFiles(Long pstSn, List<MultipartFile> files);

    // 게시글 기준으로 첨부파일 삭제/소프트 삭제
    void deleteBoardFiles(Long pstSn);
}
