package com.example.service;

import com.example.entity.User;
import com.example.mapper.UserMapper;
import com.example.model.input.UserInputDto;
import com.example.model.output.UserOutputDto;
import com.example.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final UserMapper userServiceMapper;

  public List<UserOutputDto> findAll() {
    List<User> users = userRepository.findAll();

    return userServiceMapper.toUserOutputDto(users);
  }

  public void createOrUpdateUser(UserInputDto dto) {
    User user = new User();
    Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
    if (optionalUser.isPresent()) {
      user = optionalUser.get();
    }

    User newUser = userServiceMapper.mapToEntity(dto, user);
    userRepository.save(newUser);
  }

  public UserOutputDto getUserById(Long id) {
    return userServiceMapper.toUserOutputDto(userRepository.findById(id).orElse(null));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  @Transactional(readOnly = true)
  public List<UserOutputDto> getFavoriteUsers(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return user.getFavoriteUsers().stream()
        .map(userServiceMapper::toUserOutputDto) // map entity -> UserResponse
        .toList();
  }

  public List<UserOutputDto> searchUsersExcludingFavorites(String query, String loggedInUserId) {
    List<User> users = userRepository
        .searchUsersByNameOrShortNameExcludeFavorites(query.toLowerCase(), Long.valueOf(loggedInUserId));
    return users.stream()
        .map(user -> new UserOutputDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getShortName(),
            user.getImage()
        ))
        .toList();
  }

  public List<UserOutputDto> searchUsers(String query) {
    List<User> users = userRepository
        .searchUsersByNameOrShortName(query.toLowerCase());
    return users.stream()
        .map(user -> new UserOutputDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getShortName(),
            user.getImage()
        ))
        .toList();
  }

  @Transactional
  public void addFavoriteUser(Long userId, Long favoriteUserId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    User favorite = userRepository.findById(favoriteUserId)
        .orElseThrow(() -> new RuntimeException("Favorite user not found"));

    if (!user.getFavoriteUsers().contains(favorite)) {
      user.getFavoriteUsers().add(favorite);
      userRepository.save(user);
    }
  }

  @Transactional
  public void removeFavoriteUser(Long userId, Long favoriteUserId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    User favorite = userRepository.findById(favoriteUserId)
        .orElseThrow(() -> new RuntimeException("Favorite user not found"));

    if (user.getFavoriteUsers().contains(favorite)) {
      user.getFavoriteUsers().remove(favorite);
      userRepository.save(user);
    }
  }
}
