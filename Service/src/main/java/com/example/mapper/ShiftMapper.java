package com.example.mapper;

import com.example.entity.Order;
import com.example.entity.Shift;
import com.example.model.output.ShiftOutputDto;
import com.example.model.output.UserOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public abstract class ShiftMapper {

  @Autowired
  protected UserMapper userMapper;

  @Named(value = "toShiftOutputDtoList")
  abstract List<ShiftOutputDto> toShiftOutputDtoList(List<Shift> shifts);

  @Mapping(target = "users", source = "orders", qualifiedByName = "mapOrdersToUsers")
  @Mapping(target = "occupiedPlaces", expression = "java((int) shift.getOrders().stream()" +
      ".filter(order -> java.time.LocalDate.now().equals(order.getOrderDate()))" +
      ".count())")
  abstract ShiftOutputDto toShiftOutputDto(Shift shift);

  @Named("mapOrdersToUsers")
  protected List<UserOutputDto> mapOrdersToUsers(List<Order> orders) {
    if (orders == null) return null;
    return orders.stream()
        .map(Order::getUser)
        .distinct()
        .map(userMapper::toUserOutputDto)
        .toList();
  }
}
