package com.example.mapper;

import com.example.model.input.OrderInputDto;
import com.example.model.output.OrderOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.OrderRequest;
import org.openapitools.model.OrderResponse;

@Mapper(componentModel = "spring")
public interface OrderDtoMapper {

  @Mapping(target = "eatInTakeAway", source = "eatInOrTakeAway")
  OrderInputDto mapToInputDto(OrderRequest dto);

  OrderResponse mapToOutputDto(OrderOutputDto dto);
}
