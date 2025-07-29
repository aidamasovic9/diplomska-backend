package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ShiftOutputDto {
  private String id;
  private String name;
  private Integer occupiedPlaces = 0;
  private Integer maximumGuests;
  private List<UserOutputDto> users;
}
