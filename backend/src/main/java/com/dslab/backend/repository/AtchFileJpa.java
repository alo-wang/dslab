package com.dslab.backend.repository;

import com.dslab.backend.entity.AtchFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AtchFileJpa extends JpaRepository<AtchFileEntity, Long> {
    List<AtchFileEntity> findByAtchTrgtCdAndAtchTrgtKeyAndDelYn(
        String atchTrgtCd,
        String atchTrgtKey,
        String delYn
    );
}
