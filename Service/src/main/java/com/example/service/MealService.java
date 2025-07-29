package com.example.service;

import com.example.entity.Meal;
import com.example.entity.MealCategory;
import com.example.mapper.MealMapper;
import com.example.model.output.MealOutputDto;
import com.example.repository.MealCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MealService {

  private final MealCategoryRepository mealCategoryRepository;
  private final MealMapper mealMapper;

  public List<MealOutputDto> getMealsByCategory(String categoryId) {
    MealCategory category = mealCategoryRepository.getReferenceById(Long.valueOf(categoryId));

    List<Meal> meals = category.getMeals();

    return mealMapper.toMealOutputDtoList(meals);
  }
}
