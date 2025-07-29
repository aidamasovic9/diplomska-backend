package com.example.controller;

import com.example.mapper.UserInputDtoMapper;
import com.example.model.input.UserInputDto;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.UsersApi;
import org.openapitools.model.UserRequest;
import org.openapitools.model.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController implements UsersApi {

  private final UserService userService;
  private final UserInputDtoMapper userInputDtoMapper;


  @Override
  public ResponseEntity<Void> createUser(UserRequest userRequest) {
    UserInputDto inputDto = userInputDtoMapper.toInputDto(userRequest);

    userService.createOrUpdateUser(inputDto);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<UserResponse>> getUsers() {
    return null;
  }

}
