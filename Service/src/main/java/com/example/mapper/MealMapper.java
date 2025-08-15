package com.example.mapper;

import com.example.entity.Meal;
import com.example.model.output.MealOutputDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MealMapper {

  List<MealOutputDto> toMealOutputDtoList(List<Meal> meal);

  MealOutputDto toMealOutputDto(Meal meal);
}
