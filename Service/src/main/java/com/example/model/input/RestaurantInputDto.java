package com.example.model.input;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class RestaurantInputDto {
  private String name;
  private String city;
  private String photo;
  private List<ShiftInputDto> shifts;
}
