package com.example.mapper;

import com.example.model.output.CategoryOutputDto;
import com.example.model.output.RestaurantOutputDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.openapitools.model.CategoryResponse;
import org.openapitools.model.RestaurantResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RestaurantOutputDtoMapper {

  List<RestaurantResponse> toRestaurantOutputDtoList(List<RestaurantOutputDto> restaurants);

  @Mapping(target = "categories", source = "restaurantOutputDto.categories")
  RestaurantResponse toResponseModel(RestaurantOutputDto restaurantOutputDto);

  CategoryResponse toCategoryResponse(CategoryOutputDto category);
}
