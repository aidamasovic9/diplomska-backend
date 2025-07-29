package com.example.model.input;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderInputDto {
  private String restaurantId;
  private String mealId;
  private String shiftId;
  private String comment;
  private Boolean fastOrder;
  private EatInTakeAway eatInTakeAway;
}
