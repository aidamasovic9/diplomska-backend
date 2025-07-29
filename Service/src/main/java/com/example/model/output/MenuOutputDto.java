package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class MenuOutputDto {
  private String restaurantId;
  private String categoryId;
  private List<MealOutputDto> mealsByCategory;
}