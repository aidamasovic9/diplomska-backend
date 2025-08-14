package com.example.model.output;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class GroupDinnerOutuputDto {
  private Long id;
  private InvitedPersonOutputDto initiator;
  private GroupDinnerStatus status;
  private List<InvitedPersonOutputDto> invitedPersons;
  private String restaurantName;
  private String shiftName;
}
