package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class FastOrderObjectOutputDto extends CommonOrderObject {
  private String restaurantId;
  private String mealId;
  private String shiftId;
}
