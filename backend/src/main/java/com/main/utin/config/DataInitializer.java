package com.main.utin.config;

import com.main.utin.entity.User;
import com.main.utin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByUsername("doctor")) {
            User user = User.builder()
                    .username("doctor")
                    .password(passwordEncoder.encode("password123"))
                    .fullName("Dr. John Doe")
                    .email("doctor@cmedhealth.com")
                    .role("ROLE_USER")
                    .active(true)
                    .build();
            userRepository.save(user);
            System.out.println("Default user created - Username: doctor, Password: password123");
        }

        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .fullName("Admin User")
                    .email("admin@cmedhealth.com")
                    .role("ROLE_ADMIN")
                    .active(true)
                    .build();
            userRepository.save(admin);
        }
    }
}

