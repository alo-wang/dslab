package com.dslab.backend.mapper;

import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.dto.BoardDto;
import com.dslab.backend.entity.AtchFileEntity;
import com.dslab.backend.entity.BoardEntity;

public class AtchFileMapper {
    // Date -> LocalDateTime
    // LocalDateTime -> Date

    // Dto -> Entity
    public static AtchFileEntity toEntity(AtchFileDto dto){
        if(dto == null) return null;
        AtchFileEntity atchFile = new AtchFileEntity();
        atchFile.setFileSn(dto.getFileSn());
        atchFile.setAtchTrgtCd(dto.getAtchTrgtCd());
        atchFile.setAtchTrgtKey(dto.getAtchTrgtKey());
        atchFile.setFilePath(dto.getFilePath());
        atchFile.setFileSz(dto.getFileSz());
        atchFile.setFileNm(dto.getFileNm());
        atchFile.setUldFileNm(dto.getUldFileNm());
        atchFile.setFileExtnNm(dto.getFileExtnNm());
        atchFile.setDelYn(dto.getDelYn());
        atchFile.setCrtDt(dto.getCrtDt());
        atchFile.setDelDt(dto.getDelDt());

        return atchFile;
    }


    // Entity -> Dto
    public static AtchFileDto toDto(AtchFileEntity atchFile){
        if(atchFile == null) return null;

        return AtchFileDto.builder()
                .fileSn(atchFile.getFileSn())
                .atchTrgtCd(atchFile.getAtchTrgtCd())
                .atchTrgtKey(atchFile.getAtchTrgtKey())
                .filePath(atchFile.getFilePath())
                .fileSz(atchFile.getFileSz())
                .fileNm(atchFile.getFileNm())
                .uldFileNm(atchFile.getUldFileNm())
                .fileExtnNm(atchFile.getFileExtnNm())
                .delYn(atchFile.getDelYn())
                .crtDt(atchFile.getCrtDt())
                .delDt(atchFile.getDelDt())
                .build();
    }
}