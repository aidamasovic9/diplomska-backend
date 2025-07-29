package com.example.mapper;

import com.example.model.input.UserInputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.UserRequest;

@Mapper(componentModel = "spring")
public interface UserInputDtoMapper {

  @Mapping(target = "role", ignore = true)
  UserInputDto toInputDto(UserRequest request);
}
