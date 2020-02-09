package com.ssandhu.gurwarawebsite.backend.authservice.data.repository;

import com.ssandhu.gurwarawebsite.backend.authservice.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
