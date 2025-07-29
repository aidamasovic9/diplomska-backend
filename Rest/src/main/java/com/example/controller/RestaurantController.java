package com.example.controller;

import com.example.mapper.RestaurantOutputDtoMapper;
import com.example.model.output.RestaurantOutputDto;
import com.example.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.RestaurantsApi;
import org.openapitools.model.RestaurantRequest;
import org.openapitools.model.RestaurantResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RestaurantController implements RestaurantsApi {

  private final RestaurantService restaurantService;
  private final RestaurantOutputDtoMapper restaurantMapper;

  @Override
  public ResponseEntity<Void> createRestaurant(RestaurantRequest restaurantRequest) {
    return null;
  }

  @Override
  public ResponseEntity<Void> deleteRestaurant(String restaurantId) {
    return null;
  }

  @Override
  public ResponseEntity<List<RestaurantResponse>> getRestaurants(String city) {
    List<RestaurantOutputDto> restaurantOutputDtoList = restaurantService.getAllRestaurants(city);
    List<RestaurantResponse> restaurants = restaurantMapper.toRestaurantOutputDtoList(restaurantOutputDtoList);

    return ResponseEntity.ok(restaurants);
  }
}
