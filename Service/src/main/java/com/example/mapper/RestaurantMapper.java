package com.example.mapper;

import com.example.entity.Restaurant;
import com.example.model.output.RestaurantOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ShiftMapper.class})
public interface RestaurantMapper {

  List<RestaurantOutputDto> toRestaurantOutputDtoList(List<Restaurant> restaurants);

  @Mapping(target = "shifts", source = "shifts", qualifiedByName = "toShiftOutputDtoList")
  RestaurantOutputDto toRestaurantOutputDto(Restaurant restaurant);
}
