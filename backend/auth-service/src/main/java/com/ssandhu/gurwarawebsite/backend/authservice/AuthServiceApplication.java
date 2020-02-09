package com.ssandhu.gurwarawebsite.backend.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4001")
                    .allowCredentials(true);
            }
        };
    }

//    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User not found")
//    public class UserNotFoundException extends Exception {
//        public UserNotFoundException() {
//            super("User does not exist");
//        }
//        public UserNotFoundException(String info) {
//            super("User with " + info + " does not exist");
//        }
//    }

}
