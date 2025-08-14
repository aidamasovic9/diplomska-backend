package com.example.controller;

import com.example.mapper.GroupDinnerRestMapper;
import com.example.model.input.GroupDinnerInputDto;
import com.example.model.output.GroupDinnerOutuputDto;
import com.example.service.GroupDinnerService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.DinnerProposalApi;
import org.openapitools.model.GroupDinnerProposalRequest;
import org.openapitools.model.GroupDinnerProposalResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GroupDinnerController implements DinnerProposalApi {

  private final GroupDinnerService groupDinnerService;
  private final GroupDinnerRestMapper groupDinnerRestMapper;

  @Override
  public ResponseEntity<Void> answerDinnerProposal(String userId, String proposalId, Boolean accept) {
    groupDinnerService.answerToProposal(userId, proposalId, accept);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> deleteGroupDinnerProposal(String userId, String proposalId) {
    groupDinnerService.deleteProposal(userId, proposalId);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<GroupDinnerProposalResponse>> getDinnerProposal(String userId) {
    List<GroupDinnerOutuputDto> dinnerProposals = groupDinnerService.getDinnerProposals(userId);

    List<GroupDinnerProposalResponse> dinnerProposalResponses = dinnerProposals.stream().map(
        groupDinnerRestMapper::toOutputDto).toList();

    return ResponseEntity.ok(dinnerProposalResponses);
  }

  @Override
  public ResponseEntity<GroupDinnerProposalResponse> getMyDinnerProposal(String userId) {
    try {
      GroupDinnerOutuputDto myDinnerProposal = groupDinnerService.getMyDinnerProposal(userId);
      return ResponseEntity.ok(groupDinnerRestMapper.toOutputDto(myDinnerProposal));
    } catch (Exception e) {
      return ResponseEntity.ok().build();
    }
  }

  @Override
  public ResponseEntity<GroupDinnerProposalResponse> proposeGroupDinner(
      String userId, GroupDinnerProposalRequest groupDinnerProposalRequest) {
    GroupDinnerInputDto inputDto = groupDinnerRestMapper.toInputDto(userId, groupDinnerProposalRequest);

    GroupDinnerOutuputDto groupDinnerOutuputDto = groupDinnerService.proposeGroupDinner(inputDto);

    return ResponseEntity.ok(groupDinnerRestMapper.toOutputDto(groupDinnerOutuputDto));
  }
}
