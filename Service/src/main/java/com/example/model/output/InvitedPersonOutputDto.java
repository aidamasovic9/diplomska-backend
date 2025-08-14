package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InvitedPersonOutputDto {
  private String id;
  private String firstName;
  private String lastName;
  private String image;
  private String shortName;
  private InvitedPersonStatus status;
}
