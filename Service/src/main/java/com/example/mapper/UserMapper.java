package com.example.mapper;

import com.example.entity.User;
import com.example.model.input.UserInputDto;
import com.example.model.output.UserOutputDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = { PasswordMappingHelper.class})
public interface UserMapper {

  UserOutputDto toUserOutputDto(User user);

  @Mapping(target = "password", source = "password", qualifiedByName = "encodeUserPassword")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "authorities", ignore = true)
  User mapToEntity(UserInputDto dto, @MappingTarget User user);
}
