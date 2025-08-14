package com.example.controller;

import com.example.mapper.MealOutputDtoMapper;
import com.example.model.output.MealOutputDto;
import com.example.service.MealService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.CategoriesApi;
import org.openapitools.model.MealResponse;
import org.openapitools.model.MenuByCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CategoryController implements CategoriesApi {

  private final MealService mealService;
  private final MealOutputDtoMapper mealMapper;

  @Override
  public ResponseEntity<MenuByCategory> getMealsByCategory(String categoryId) {
    List<MealOutputDto> mealsByCategory = mealService.getMealsByCategory(categoryId);
    List<MealResponse> outputDtoList = mealMapper.toOutputDtoList(mealsByCategory);

    MenuByCategory mealCategory = new MenuByCategory();
    mealCategory.setCategoryId(Integer.valueOf(categoryId));
    mealCategory.setMeals(outputDtoList);

    return ResponseEntity.ok(mealCategory);
  }
}
