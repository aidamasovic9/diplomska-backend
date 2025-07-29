package com.example.service;

import com.example.entity.*;
import com.example.mapper.OrderMapper;
import com.example.model.input.OrderInputDto;
import com.example.model.output.OrderOutputDto;
import com.example.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

  private final OrderRepository orderRepository;
  private final UserRepository userRepository;
  private final OrderMapper orderMapper;
  private final MealRepository mealRepository;
  private final ShiftRepository shiftRepository;
  private final RestaurantRepository restaurantRepository;

  public OrderOutputDto createOrder(OrderInputDto orderInputDto, String userId) {
    Long userIdLong = Long.parseLong(userId);
    Long shiftId = Long.parseLong(orderInputDto.getShiftId());
    LocalDate orderDate = LocalDate.now();

    User user = userRepository.getReferenceById(userIdLong);
    Meal meal = mealRepository.getReferenceById(Long.parseLong(orderInputDto.getMealId()));
    Shift shift = shiftRepository.getReferenceById(shiftId);
    Restaurant restaurant = restaurantRepository.getReferenceById(Long.parseLong(orderInputDto.getRestaurantId()));


    long existingOrdersCount = orderRepository.countByShiftIdAndOrderDate(shiftId, orderDate);
    if (existingOrdersCount >= shift.getMaximumGuests()) {
      throw new IllegalStateException("The selected shift is already full for the day.");
    }

    Optional<Order> existingOrder = orderRepository.findByUserIdAndOrderDate(userIdLong, orderDate);
    existingOrder.ifPresent(orderRepository::delete);

    Order order = orderMapper.mapToEntity(orderInputDto);
    order.setUser(user);
    order.setMeal(meal);
    order.setShift(shift);
    order.setOrderDate(orderDate);
    order.setRestaurant(restaurant);

    orderRepository.save(order);

    return orderMapper.mapToDto(order);
  }
}
