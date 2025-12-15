package com.dslab.backend.service;

import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.entity.AtchFileEntity;
import com.dslab.backend.mapper.AtchFileMapper;
import com.dslab.backend.mapper.BoardMapper;
import com.dslab.backend.repository.AtchFileJpa;
import com.dslab.backend.repository.BoardJpa;
import com.dslab.backend.service.common.GenericServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AtchFileServiceImpl
        extends GenericServiceImpl<AtchFileEntity, AtchFileDto, Long>
        implements AtchFileService{
    private final AtchFileJpa atchFileJpa;

    public AtchFileServiceImpl(AtchFileJpa atchFileJpa) {
        super(AtchFileMapper::toDto);
        this.atchFileJpa = atchFileJpa;
    }

    @Override
    public List<AtchFileDto> getBoardFiles(Long pstSn) {
        List<AtchFileEntity> entities = atchFileJpa.findByAtchTrgtCdAndAtchTrgtKeyAndDelYn("BRD", String.valueOf(pstSn), "N");

        return entities.stream()
                .map(toDtoMapper)   // 여기서 GenericServiceImpl 에서 받은 mapper 사용
                .toList();
    }
}
