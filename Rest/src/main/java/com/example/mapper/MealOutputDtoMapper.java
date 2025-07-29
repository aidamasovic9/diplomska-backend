package com.example.mapper;

import com.example.model.output.MealOutputDto;
import org.mapstruct.Mapper;
import org.openapitools.model.MealResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MealOutputDtoMapper {

  List<MealResponse> toOutputDtoList(List<MealOutputDto> dto);
}
