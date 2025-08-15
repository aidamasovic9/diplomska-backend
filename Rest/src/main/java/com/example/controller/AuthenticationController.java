package com.example.controller;

import com.example.service.AuthenticationService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.AuthApi;
import org.openapitools.model.AuthResponse;
import org.openapitools.model.LoginRequest;
import org.openapitools.model.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthenticationController implements AuthApi {
  private final AuthenticationService authService;

  @Override
  public ResponseEntity<AuthResponse> authLoginPost(@RequestBody LoginRequest loginRequest) {
    return ResponseEntity.ok(authService.login(loginRequest));
  }

  @Override
  public ResponseEntity<AuthResponse> authRegisterPost(@RequestBody RegisterRequest registerRequest) {
    return ResponseEntity.ok(authService.register(registerRequest));
  }
}
