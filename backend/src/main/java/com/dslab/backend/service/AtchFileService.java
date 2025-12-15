package com.dslab.backend.service;

import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.entity.AtchFileEntity;
import com.dslab.backend.service.common.GenericService;

import java.util.List;

public interface AtchFileService extends GenericService<AtchFileEntity, AtchFileDto> {
    // 게시판 첨부파일 조회
    List<AtchFileDto> getBoardFiles(Long pstSn);

    // 첨부파일 업로드
}
