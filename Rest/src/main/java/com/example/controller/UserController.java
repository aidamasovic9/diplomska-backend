package com.example.controller;

import com.example.entity.User;
import com.example.mapper.UserInputDtoMapper;
import com.example.mapper.UserOutputDtoMapper;
import com.example.model.input.UserInputDto;
import com.example.model.output.UserOutputDto;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.UsersApi;
import org.openapitools.model.AddFavoriteUserRequest;
import org.openapitools.model.UserRequest;
import org.openapitools.model.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController implements UsersApi {

  private final UserService userService;
  private final UserInputDtoMapper userInputDtoMapper;
  private final UserOutputDtoMapper userOutputDtoMapper;

  @Override
  public ResponseEntity<Void> addFavoriteUser(String userId, AddFavoriteUserRequest addFavoriteUserRequest) {
    userService.addFavoriteUser(
        Long.valueOf(userId),
        Long.valueOf(addFavoriteUserRequest.getFavoriteUserId())
    );
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> createUser(UserRequest userRequest) {
    UserInputDto inputDto = userInputDtoMapper.toInputDto(userRequest);

    userService.createOrUpdateUser(inputDto);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<UserResponse>> getFavoriteUsers(String userId) {
    List<UserOutputDto> favorites = userService.getFavoriteUsers(Long.valueOf(userId));
    List<UserResponse> responses = favorites.stream()
        .map(userOutputDtoMapper::toResponse)
        .toList();

    return ResponseEntity.ok(responses);
  }

  @Override
  public ResponseEntity<List<UserResponse>> getUsers() {
    List<UserOutputDto> users = userService.findAll();

    List<UserResponse> responses = users.stream()
        .map(userOutputDtoMapper::toResponse)
        .toList();

    return ResponseEntity.ok(responses);
  }

  @Override
  public ResponseEntity<Void> removeFavoriteUser(String userId, String favoriteUserId) {
    userService.removeFavoriteUser(Long.valueOf(userId), Long.valueOf(favoriteUserId));
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<UserResponse>> searchFavoriteUsers(String query, String loggedInUserId) {
    List<UserOutputDto> outputDtos = userService.searchUsersExcludingFavorites(query, loggedInUserId);
    List<UserResponse> responses = outputDtos.stream()
        .map(userOutputDtoMapper::toResponse)
        .toList();
    return ResponseEntity.ok(responses);
  }

  @Override
  public ResponseEntity<List<UserResponse>> searchUsers(String query) {
    List<UserOutputDto> outputDtos = userService.searchUsers(query);
    List<UserResponse> responses = outputDtos.stream()
        .map(userOutputDtoMapper::toResponse)
        .toList();
    return ResponseEntity.ok(responses);
  }

  @Override
  public ResponseEntity<UserResponse> usersMeGet() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || auth.getPrincipal() == null || auth.getPrincipal().equals("anonymousUser")) {
      return ResponseEntity.status(401).build();
    }

    String email = auth.getName(); // principal is usually the username/email
    UserOutputDto userByEmail = userService.getUserByEmail(email);

    UserResponse dto = userOutputDtoMapper.toResponse(userByEmail);
    return ResponseEntity.ok(dto);
  }
}
