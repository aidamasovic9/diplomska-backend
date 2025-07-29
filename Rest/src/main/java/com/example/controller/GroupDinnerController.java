package com.example.controller;

import lombok.RequiredArgsConstructor;
import org.openapitools.api.DinnerProposalApi;
import org.openapitools.model.GroupDinnerProposalRequest;
import org.openapitools.model.GroupDinnerProposalResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class GroupDinnerController implements DinnerProposalApi {

  @Override
  public ResponseEntity<GroupDinnerProposalResponse> getDinnerProposal(String userId) {
    return null;
  }

  @Override
  public ResponseEntity<GroupDinnerProposalResponse> proposeGroupDinner(String userId, GroupDinnerProposalRequest groupDinnerProposalRequest) {
    return null;
  }
}
