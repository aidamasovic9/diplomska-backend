package com.example.mapper;

import com.example.model.input.OrderInputDto;
import com.example.model.output.FastOrderObjectOutputDto;
import com.example.model.output.OrderOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.FastOrderObject;
import org.openapitools.model.OrderRequest;
import org.openapitools.model.OrderResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderDtoMapper {

  OrderInputDto mapToInputDto(OrderRequest dto);

  OrderResponse mapToOutputDto(OrderOutputDto dto);

  @Mapping(target = "id", source = "orderId")
  List<FastOrderObject> mapToFastOrderObject(List<FastOrderObjectOutputDto> outputDtos);
}
