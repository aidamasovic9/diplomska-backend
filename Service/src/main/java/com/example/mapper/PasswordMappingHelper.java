package com.example.mapper;

import lombok.AllArgsConstructor;
import org.mapstruct.Named;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public final class PasswordMappingHelper {

  private final PasswordEncoder passwordEncoder;

  @Named(value = "encodeUserPassword")
  public String encodePassword(String rawPassword) {
    return passwordEncoder.encode(rawPassword);
  }
}
