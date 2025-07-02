package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RestaurantOutputDto {
  private String id;
  private String name;
  private String city;
  private List<ShiftOutputDto> shifts;
}
