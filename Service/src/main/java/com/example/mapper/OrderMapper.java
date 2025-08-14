package com.example.mapper;

import com.example.entity.FastOrder;
import com.example.entity.Order;
import com.example.model.input.OrderInputDto;
import com.example.model.output.FastOrderObjectOutputDto;
import com.example.model.output.OrderOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

  List<FastOrderObjectOutputDto> toFastOrderOutputDtos(List<FastOrder> fastOrder);

  @Mapping(target = "restaurantName", source = "restaurant.name")
  @Mapping(target = "shiftName", source = "shift.name")
  @Mapping(target = "mealImage", source = "meal.image")
  @Mapping(target = "mealName", source = "meal.name")
  @Mapping(target = "mealId", source = "meal.id")
  @Mapping(target = "restaurantId", source = "restaurant.id")
  @Mapping(target = "shiftId", source = "shift.id")
  FastOrderObjectOutputDto toFastOrderOutputDto(FastOrder fastOrder);

  @Mapping(target = "restaurantName", source = "restaurant.name")
  @Mapping(target = "shiftName", source = "shift.name")
  @Mapping(target = "shiftId", source = "shift.id")
  @Mapping(target = "mealImage", source = "meal.image")
  @Mapping(target = "mealName", source = "meal.name")
  OrderOutputDto toOrderOutputDto(Order order);

  @Mapping(target = "user", ignore = true)
  @Mapping(target = "meal", ignore = true)
  @Mapping(target = "shift", ignore = true)
  @Mapping(target = "restaurant", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "orderDate", expression = "java(java.time.LocalDate.now())")
  Order mapToEntity(OrderInputDto orderInputDto);
}
