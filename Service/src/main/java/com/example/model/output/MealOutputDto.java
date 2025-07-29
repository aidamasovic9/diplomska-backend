package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class MealOutputDto {
  private String id;
  private String name;
  private String image;
  private BigDecimal avgRating;
  private String description;
}
