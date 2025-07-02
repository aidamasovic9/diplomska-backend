package com.example.mapper;

import com.example.entity.User;
import com.example.model.input.UserInputDto;
import com.example.model.output.UserOutputDto;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

  @Autowired
  protected PasswordEncoder passwordEncoder;

  public abstract UserOutputDto toUserOutputDto(User user);

  @Mapping(target = "password", expression = "java(passwordEncoder.encode(dto.getPassword()))")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "authorities", ignore = true)
  public abstract User mapToEntity(UserInputDto dto, @MappingTarget User user);
}
