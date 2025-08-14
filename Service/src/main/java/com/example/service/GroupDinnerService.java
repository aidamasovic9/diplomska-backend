package com.example.service;

import com.example.entity.*;
import com.example.mapper.GroupDinnerMapper;
import com.example.model.input.GroupDinnerInputDto;
import com.example.model.output.GroupDinnerOutuputDto;
import com.example.model.output.GroupDinnerStatus;
import com.example.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupDinnerService {

  private final UserRepository userRepository;
  private final RestaurantRepository restaurantRepository;
  private final ShiftRepository shiftRepository;
  private final DinnerProposalRepository dinnerProposalRepository;
  private final DinnerProposalParticipantRepository dinnerProposalParticipantRepository;
  private final GroupDinnerMapper groupDinnerMapper;
  private final OrderRepository orderRepository;

  @Transactional
  public void answerToProposal(String userId, String proposalId, Boolean accepted) {
    DinnerProposal dinnerProposal = dinnerProposalRepository.findById(Long.parseLong(proposalId))
        .orElseThrow(() -> new IllegalArgumentException("Dinner proposal not found"));

    // Participants are eagerly loaded, so this is safe
    DinnerProposalParticipant participant = dinnerProposal.getParticipants().stream()
        .filter(p -> p.getUser().getId().equals(Long.parseLong(userId)))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("Participant not found"));

    participant.setStatus(Boolean.TRUE.equals(accepted) ? ParticipantStatus.ACCEPTED : ParticipantStatus.DECLINED);
    dinnerProposalParticipantRepository.save(participant);
  }

  @Transactional
  public void deleteProposal(String userId, String proposalId) {
    DinnerProposal dinnerProposal = dinnerProposalRepository.findById(Long.parseLong(proposalId))
        .orElseThrow(() -> new IllegalArgumentException("Dinner proposal not found"));

    if (!dinnerProposal.getInitiator().getId().toString().equals(userId)) {
      throw new IllegalArgumentException("User not authorized to delete this proposal");
    }

    dinnerProposalRepository.delete(dinnerProposal);
  }

  @Transactional(readOnly = true)
  public List<GroupDinnerOutuputDto> getDinnerProposals(String userId) {
    List<DinnerProposal> dinnerProposals = dinnerProposalRepository.findByParticipantUserId(Long.parseLong(userId));
    List<GroupDinnerOutuputDto> outputList = new ArrayList<>();

    for (DinnerProposal proposal : dinnerProposals) {
      GroupDinnerOutuputDto dto = groupDinnerMapper.toOutputDto(proposal);
      dto.setStatus(getStatus(proposal));
      outputList.add(dto);
    }

    return outputList;
  }

  @Transactional(readOnly = true)
  public GroupDinnerOutuputDto getMyDinnerProposal(String userId) {
    List<DinnerProposal> dinnerProposals = dinnerProposalRepository.findByInitiatorUserId(Long.parseLong(userId));

    DinnerProposal todayProposal = dinnerProposals.stream()
        .filter(d -> d.getCreatedAt().equals(LocalDate.now()))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("No dinner proposal for today"));

    GroupDinnerOutuputDto dto = groupDinnerMapper.toOutputDto(todayProposal);
    dto.setStatus(getStatus(todayProposal));
    return dto;
  }

  @Transactional
  public GroupDinnerOutuputDto proposeGroupDinner(GroupDinnerInputDto input) {
    Restaurant restaurant = restaurantRepository.findById(Long.parseLong(input.getRestaurantId()))
        .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
    Shift shift = shiftRepository.findById(Long.parseLong(input.getShiftId()))
        .orElseThrow(() -> new IllegalArgumentException("Shift not found"));
    User initiator = userRepository.findById(Long.parseLong(input.getInitiatorId()))
        .orElseThrow(() -> new IllegalArgumentException("User not found"));

    List<DinnerProposalParticipant> participants = new ArrayList<>();
    for (String personId : input.getInvitedPersonIds()) {
      User invited = userRepository.findById(Long.parseLong(personId))
          .orElseThrow(() -> new IllegalArgumentException("Invited user not found"));
      DinnerProposalParticipant participant = new DinnerProposalParticipant();
      participant.setUser(invited);
      participant.setStatus(ParticipantStatus.PENDING);
      participants.add(participant);
    }

    DinnerProposal proposal = new DinnerProposal();
    proposal.setRestaurant(restaurant);
    proposal.setShift(shift);
    proposal.setInitiator(initiator);
    proposal.setCreatedAt(LocalDate.now());
    participants.forEach(p -> p.setDinnerProposal(proposal));
    proposal.setParticipants(participants);

    DinnerProposal saved = dinnerProposalRepository.save(proposal);

    GroupDinnerOutuputDto dto = groupDinnerMapper.toOutputDto(saved);
    dto.setStatus(getStatus(saved));
    return dto;
  }

  @Transactional(readOnly = true)
  public GroupDinnerStatus getStatus(DinnerProposal proposal) {
    int maximumGuests = proposal.getShift().getMaximumGuests();
    long numberOfOrders = orderRepository.countByShiftIdAndOrderDate(proposal.getShift().getId(), proposal.getCreatedAt());

    long declined = proposal.getParticipants().stream()
        .filter(p -> p.getStatus() == ParticipantStatus.DECLINED)
        .count();
    int total = proposal.getParticipants().size();
    boolean moreThanHalfDeclined = declined > total / 2;
    if (numberOfOrders + 1 > maximumGuests || moreThanHalfDeclined) {
      return GroupDinnerStatus.TO_BE_CANCELLED;
    }

    long accepted = proposal.getParticipants().stream()
        .filter(p -> p.getStatus() == ParticipantStatus.ACCEPTED)
        .count();

    if (accepted == total) return GroupDinnerStatus.CONFIRMED;
    if (declined == total) return GroupDinnerStatus.CANCELLED;
    return GroupDinnerStatus.PENDING;
  }
}
