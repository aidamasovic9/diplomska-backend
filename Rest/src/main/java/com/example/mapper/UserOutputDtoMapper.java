package com.example.mapper;

import com.example.model.output.UserOutputDto;
import org.mapstruct.Mapper;
import org.openapitools.model.UserResponse;

@Mapper(componentModel = "spring")
public interface UserOutputDtoMapper {
  UserResponse toResponse(UserOutputDto dto);
}
