package com.example.mapper;

import com.example.entity.DinnerProposal;
import com.example.entity.DinnerProposalParticipant;
import com.example.entity.User;
import com.example.model.output.GroupDinnerOutuputDto;
import com.example.model.output.InvitedPersonOutputDto;
import com.example.model.output.InvitedPersonStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupDinnerMapper {
  @Mapping(target = "initiator", source = "initiator", qualifiedByName = "mapInitiator")
  @Mapping(target = "restaurantName", source = "restaurant.name")
  @Mapping(target = "shiftName", source = "shift.name")
  @Mapping(target = "invitedPersons", source = "participants", qualifiedByName = "mapParticipants")
  @Mapping(target = "status", ignore = true)
  GroupDinnerOutuputDto toOutputDto(DinnerProposal dinnerProposal);

  List<InvitedPersonOutputDto> toOutputDto(List<DinnerProposalParticipant> invitedPersons);

  @Mapping(target = "firstName", source = "user.firstName")
  @Mapping(target = "lastName", source = "user.lastName")
  @Mapping(target = "shortName", source = "user.shortName")
  @Mapping(target = "image", source = "user.image")
  InvitedPersonOutputDto toOutputDto(DinnerProposalParticipant participant);

  @Named("mapInitiator")
  default InvitedPersonOutputDto mapInitiator(User user) {
    InvitedPersonOutputDto initiator = new InvitedPersonOutputDto();
    initiator.setFirstName(user.getFirstName());
    initiator.setLastName(user.getLastName());
    initiator.setShortName(user.getShortName());
    initiator.setImage(user.getImage());
    initiator.setStatus(InvitedPersonStatus.ACCEPTED);
    initiator.setId(String.valueOf(user.getId()));
    return initiator;
  }

  @Named("mapParticipants")
  default List<InvitedPersonOutputDto> mapParticipants(List<DinnerProposalParticipant> participants) {
    List<InvitedPersonOutputDto> personOutputDtoArrayList = new ArrayList<>();
    participants.forEach(participant -> {
      InvitedPersonOutputDto participantOutputDto = new InvitedPersonOutputDto();
      participantOutputDto.setFirstName(participant.getUser().getFirstName());
      participantOutputDto.setLastName(participant.getUser().getLastName());
      participantOutputDto.setShortName(participant.getUser().getShortName());
      participantOutputDto.setImage(participant.getUser().getImage());
      participantOutputDto.setStatus(InvitedPersonStatus.valueOf(participant.getStatus().name()));
      participantOutputDto.setId(String.valueOf(participant.getUser().getId()));

      personOutputDtoArrayList.add(participantOutputDto);
    });

    return personOutputDtoArrayList;
  }
}
