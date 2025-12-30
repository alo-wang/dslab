package com.dslab.backend.service;

import com.dslab.backend.dto.AtchFileDto;
import com.dslab.backend.entity.AtchFileEntity;
import com.dslab.backend.mapper.AtchFileMapper;
import com.dslab.backend.repository.AtchFileJpa;
import com.dslab.backend.service.common.GenericServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class AtchFileServiceImpl
        extends GenericServiceImpl<AtchFileEntity, AtchFileDto, Long>
        implements AtchFileService{
    private final AtchFileJpa atchFileJpa;

    @Value("${file.upload-dir:./upload}")
    private String uploadRootDir;

    public AtchFileServiceImpl(AtchFileJpa atchFileJpa) {
        super(AtchFileMapper::toDto);
        this.atchFileJpa = atchFileJpa;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AtchFileDto> getBoardFiles(Long pstSn) {
        List<AtchFileEntity> entities = atchFileJpa.findByAtchTrgtCdAndAtchTrgtKeyAndDelYn("BRD", String.valueOf(pstSn), "N");

        return entities.stream()
                .map(toDtoMapper)   // 여기서 GenericServiceImpl 에서 받은 mapper 사용
                .toList();
    }

    @Override
    public List<AtchFileDto> saveBoardFiles(Long pstSn, List<MultipartFile> files) {
        if(files == null || files.isEmpty()) return List.of();

        // 경로를 절대경로로 고정
        Path dirPath = Paths.get(uploadRootDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(dirPath);
        } catch (Exception e) {
            throw new RuntimeException("업로드 디렉토리 생성 실패 : "+dirPath, e);
        }

        log.info("[UPLOAD] dirPath = {}",dirPath);

        List<AtchFileEntity> entities = new ArrayList<>();
        List<Path> savedPaths = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (MultipartFile file : files) {
            if(file == null || file.isEmpty()) continue;;

            // 파일명 관련 처리
            String originalName = file.getOriginalFilename();
            String ext = "";

            if(originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf(".") + 1);
            }

            // 실제 저장 파일명(UUID 등으로 충돌 방지)
            String storedName = UUID.randomUUID() + (ext.isEmpty() ? "":"." + ext);
            // 저장 경로
            Path filePath = dirPath.resolve(storedName).normalize();

            try (InputStream in = file.getInputStream()){
                Files.copy(in, filePath, StandardCopyOption.REPLACE_EXISTING);
                savedPaths.add(filePath); // 파일 저장 성공한 경우에만 기록
            } catch (Exception e) {
                // 파일 저장 자체가 실패한 경우
                for (Path p : savedPaths) {
                    try {
                        Files.deleteIfExists(p);
                    } catch (Exception ignore) {}
                }
                throw new RuntimeException("파일 저장 중 오류가 발생했습니다 : "+ originalName +" (savePath=" +filePath+")",e);
            }

            // DB에 저장할 엔티티 생성
            AtchFileEntity entity = new AtchFileEntity();
            entity.setAtchTrgtCd("BRD");
            entity.setAtchTrgtKey(String.valueOf(pstSn));

            entity.setFilePath(dirPath.toString());
            entity.setFileSz((int)file.getSize());
            entity.setFileNm(originalName);
            entity.setUldFileNm(storedName);
            entity.setFileExtnNm(ext);
            entity.setDelYn("N");
            entity.setCrtDt(now);

            entities.add(entity);
        }

        try{
            // DB저장 + DTO변환
            List<AtchFileEntity> saved = atchFileJpa.saveAll(entities);
            return saved.stream()
                    .map(toDtoMapper)
                    .toList();
        }catch (Exception e){
            for(Path p : savedPaths){
                try {
                    Files.deleteIfExists(p);
                }catch (Exception ignore){}
            }
            throw e;
        }


    }

    @Override
    public void deleteBoardFiles(Long pstSn) {
        List<AtchFileEntity> entites = atchFileJpa
                .findByAtchTrgtCdAndAtchTrgtKeyAndDelYn("BRD", String.valueOf(pstSn),"N");
        for(AtchFileEntity e: entites) {
            e.setDelYn("Y");
            e.setDelDt(java.time.LocalDateTime.now());
        }
    }
}
