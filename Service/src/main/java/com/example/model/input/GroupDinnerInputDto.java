package com.example.model.input;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class GroupDinnerInputDto {
  private String initiatorId;
  private String restaurantId;
  private LocalDate dinnerDate;
  private String shiftId;
  private List<String> invitedPersonIds;
}
