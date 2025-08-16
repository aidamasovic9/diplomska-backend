package com.example.model.output;

import com.example.model.input.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserOutputDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String shortName;
  private String image;
  private UserRole role;
}
