package com.example.service;

import com.example.entity.*;
import com.example.mapper.OrderMapper;
import com.example.model.input.OrderInputDto;
import com.example.model.output.FastOrderObjectOutputDto;
import com.example.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FastOrderService {

  private final MealRepository mealRepository;
  private final ShiftRepository shiftRepository;
  private final RestaurantRepository restaurantRepository;
  private final UserRepository userRepository;
  private final FastOrderRepository fastOrderRepository;
  private final OrderMapper orderMapper;

  public void createFastOrder(OrderInputDto orderInputDto, String userId) {
    Long userIdLong = Long.parseLong(userId);
    Long shiftId = Long.parseLong(orderInputDto.getShiftId());

    User user = userRepository.getReferenceById(userIdLong);
    Meal meal = mealRepository.getReferenceById(Long.parseLong(orderInputDto.getMealId()));
    Shift shift = shiftRepository.getReferenceById(shiftId);
    Restaurant restaurant = restaurantRepository.getReferenceById(Long.parseLong(orderInputDto.getRestaurantId()));

    FastOrder fastOrder = new FastOrder();
    fastOrder.setUser(user);
    fastOrder.setMeal(meal);
    fastOrder.setShift(shift);
    fastOrder.setRestaurant(restaurant);
    fastOrder.setComment(orderInputDto.getComment());
    fastOrder.setEatInTakeAway(EatInTakeAway.valueOf(orderInputDto.getEatInTakeAway().name()));

    fastOrderRepository.save(fastOrder);
  }

  public List<FastOrderObjectOutputDto> getFastOrders(String userId) {
    Optional<List<FastOrder>> fastOrdersByUser = fastOrderRepository.getFastOrdersByUserId(Long.parseLong(userId));

    if (fastOrdersByUser.isPresent()) {
      return orderMapper.toFastOrderOutputDtos(fastOrdersByUser.get());
    }

    return new ArrayList<>();
  }
}
