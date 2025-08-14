package com.example.mapper;

import com.example.entity.User;
import com.example.model.input.UserInputDto;
import com.example.model.output.UserOutputDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = { PasswordMappingHelper.class})
public interface UserMapper {

  List<UserOutputDto> toUserOutputDto(List<User> users);

  UserOutputDto toUserOutputDto(User user);

  @Mapping(target = "password", source = "password", qualifiedByName = "encodeUserPassword")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "authorities", ignore = true)
  @Mapping(target = "favoriteUsers", ignore = true)
  User mapToEntity(UserInputDto dto, @MappingTarget User user);
}
