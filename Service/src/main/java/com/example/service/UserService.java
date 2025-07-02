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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final UserMapper userServiceMapper;

  public UserOutputDto createOrUpdateUser(UserInputDto dto) {
    User user = new User();
    Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
    if (optionalUser.isPresent()) {
      user = optionalUser.get();
    }

    User newUser = userServiceMapper.mapToEntity(dto, user);
    userRepository.save(newUser);

    return userServiceMapper.toUserOutputDto(newUser);
  }

  public UserOutputDto getUserById(Long id) {
    return userServiceMapper.toUserOutputDto(userRepository.findById(id).orElse(null));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }
}
