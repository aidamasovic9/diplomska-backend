package com.example.service;

import com.example.entity.Restaurant;
import com.example.mapper.RestaurantMapper;
import com.example.model.output.RestaurantOutputDto;
import com.example.repository.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RestaurantService {
  private final RestaurantRepository restaurantRepository;
  private final RestaurantMapper restaurantMapper;

  public List<RestaurantOutputDto> getAllRestaurants(String city) {
    List<Restaurant> restaurants = restaurantRepository.findRestaurantsByCity(city);

    return restaurantMapper.toRestaurantOutputDtoList(restaurants);
  }
}
