package com.example.mapper;

import com.example.entity.EatInTakeAway;
import com.example.entity.Order;
import com.example.model.input.OrderInputDto;
import com.example.model.output.OrderOutputDto;
import org.springframework.stereotype.Component;


@Component
public final class OrderMapper {

  public Order mapToEntity(OrderInputDto orderInputDto) {
    Order order = new Order();
    order.setEatInTakeAway(EatInTakeAway.valueOf(orderInputDto.getEatInTakeAway().name()));
    order.setComment(orderInputDto.getComment());

    return order;
  }

  public OrderOutputDto mapToDto(Order order) {
    OrderOutputDto orderOutputDto = new OrderOutputDto();

    orderOutputDto.setOrderId(order.getId());
    orderOutputDto.setRestaurantName(order.getRestaurant().getName());
    orderOutputDto.setOrderDate(order.getOrderDate());
    orderOutputDto.setComment(order.getComment());
    orderOutputDto.setMealName(order.getMeal().getName());
    orderOutputDto.setMealImage(order.getMeal().getImage());

    return orderOutputDto;
  }

}
