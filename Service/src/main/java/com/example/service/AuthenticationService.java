package com.example.service;
import com.example.entity.User;
import com.example.entity.UserRole;
import com.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.openapitools.model.AuthResponse;
import org.openapitools.model.LoginRequest;
import org.openapitools.model.RegisterRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request) {
    if (!request.getEmail().endsWith("@myCompany.com")) {
      throw new IllegalArgumentException("Invalid email domain");
    }
    if (!request.getPassword().matches("^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")) {
      throw new IllegalArgumentException("Password too weak");
    }

    User user = new User();
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setRole(UserRole.USER);

    repository.save(user);

    var jwtToken = jwtUtil.generateToken(user);
    AuthResponse authResponse = new AuthResponse();
    authResponse.setToken(jwtToken);
    return authResponse;
  }

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtUtil.generateToken(user);

    AuthResponse authResponse = new AuthResponse();
    authResponse.setToken(jwtToken);

    return authResponse;
  }
}
