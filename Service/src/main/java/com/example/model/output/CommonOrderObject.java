package com.example.model.output;

import com.example.model.input.EatInTakeAway;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class CommonOrderObject {
  private Long id;
  private String restaurantName;
  private String comment;
  private String shiftName;
  private String mealImage;
  private String mealName;
  private EatInTakeAway eatInTakeAway;
}
