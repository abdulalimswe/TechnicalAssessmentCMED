package com.main.utin.service;

import com.main.utin.dto.AuthResponse;
import com.main.utin.dto.LoginRequest;
import com.main.utin.dto.RegisterRequest;
import com.main.utin.entity.User;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    User getCurrentUser();
}
