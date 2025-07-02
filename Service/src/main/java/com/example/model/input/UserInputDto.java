package com.example.model.input;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserInputDto {
  private String firstName;
  private String lastName;
  private String email;
  private String shortName;
  private String password;
  private byte[] image;
  private UserRole role;
}
