package com.dslab.backend.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/api/**")               // API 경로
                .allowedOrigins("http://localhost:5173")        // 프론트 주소
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")  // 허용 메서드
                .allowedHeaders("*")                            // 모든 쿠키 헤더
                .allowCredentials(false)                        // 쿠키 안쓰면 false
                .maxAge(3600);                                  // preflight 캐시 시간(초)
    }
}
