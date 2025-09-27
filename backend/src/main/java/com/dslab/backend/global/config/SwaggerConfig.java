package com.dslab.backend.global.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI custumOpenAPI(){
        return new OpenAPI()
                .info(new Info()
                        .title("Board API 명세서")
                        .description("예제"))
                .addServersItem(new Server()
                        .url("http://localhost:9099")
                        .description("로컬 서버")) // 운영 개발등 서버를 나눌 수 있다
                .externalDocs(new ExternalDocumentation()
                        .description("Repository")
                );
    }

    /**
     * 커뮤니티 관련 API
     * @return GroupOpenAPI
     * */
    @Bean
    public GroupedOpenApi groupedOpenApi(){
        return GroupedOpenApi.builder()
                .group("1. Board") // 그룹이름
                .pathsToMatch("/api/boards/**")
                .build();
    }
}
