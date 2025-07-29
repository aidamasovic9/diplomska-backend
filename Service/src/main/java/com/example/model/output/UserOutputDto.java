package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserOutputDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String email;
  private String shortName;
  private String image;
}
