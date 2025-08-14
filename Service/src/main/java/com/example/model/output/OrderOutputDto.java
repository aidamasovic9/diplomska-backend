package com.example.model.output;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class OrderOutputDto extends CommonOrderObject{
  private LocalDate orderDate;
  private String shiftId;
}
