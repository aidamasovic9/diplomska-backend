package com.example.mapper;

import com.example.model.input.GroupDinnerInputDto;
import com.example.model.output.GroupDinnerOutuputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.GroupDinnerProposalRequest;
import org.openapitools.model.GroupDinnerProposalResponse;

@Mapper(componentModel = "spring")
public interface GroupDinnerRestMapper {

  @Mapping(target = "initiatorId", source = "userId")
  GroupDinnerInputDto toInputDto(String userId, GroupDinnerProposalRequest groupDinnerProposalRequest);

  GroupDinnerProposalResponse toOutputDto(GroupDinnerOutuputDto outputDto);
}
