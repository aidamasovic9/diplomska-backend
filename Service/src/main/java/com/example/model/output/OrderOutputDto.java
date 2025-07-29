package com.example.model.output;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class OrderOutputDto {
  private Long orderId;
  private String restaurantName;
  private String comment;
  private LocalDate orderDate;
  private String shiftName;
  private String mealImage;
  private String mealName;
}
