package com.example.service;

import com.example.entity.Order;
import com.example.entity.Restaurant;
import com.example.entity.Shift;
import com.example.mapper.RestaurantMapper;
import com.example.model.output.RestaurantOutputDto;
import com.example.repository.OrderRepository;
import com.example.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {
  private final RestaurantRepository restaurantRepository;
  private final RestaurantMapper restaurantMapper;
  private final OrderRepository orderRepository;

  public List<RestaurantOutputDto> getAllRestaurants(String city) {
    List<Restaurant> restaurants = restaurantRepository.findRestaurantsByCity(city);

    List<Order> todayOrders = orderRepository.findOrdersByRestaurantsAndDate(restaurants, LocalDate.now());

    Map<Long, List<Order>> ordersByShiftId = todayOrders.stream()
        .collect(Collectors.groupingBy(order -> order.getShift().getId()));

    for (Restaurant restaurant : restaurants) {
      for (Shift shift : restaurant.getShifts()) {
        List<Order> filteredOrders = ordersByShiftId.getOrDefault(shift.getId(), Collections.emptyList());
        shift.setOrders(filteredOrders);
      }
    }

    return restaurantMapper.toRestaurantOutputDtoList(restaurants);
  }
}
