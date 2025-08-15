package com.example.service;

import com.example.entity.Meal;
import com.example.entity.MealCategory;
import com.example.entity.MealRating;
import com.example.entity.User;
import com.example.mapper.MealMapper;
import com.example.model.output.MealOutputDto;
import com.example.repository.MealCategoryRepository;
import com.example.repository.MealRatingRepository;
import com.example.repository.MealRepository;
import com.example.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealService {

  private final MealCategoryRepository mealCategoryRepository;
  private final MealMapper mealMapper;
  private final MealRepository mealRepository;
  private final MealRatingRepository mealRatingRepository;
  private final UserRepository userRepository;

  public List<MealOutputDto> getMealsByCategory(String categoryId) {
    MealCategory category = mealCategoryRepository.getReferenceById(Long.valueOf(categoryId));

    List<Meal> meals = category.getMeals();

    return mealMapper.toMealOutputDtoList(meals);
  }

  @Transactional
  public MealOutputDto updateMealRating(String id, Integer rating, String userId) {
    Optional<MealRating> existingRating =
        mealRatingRepository.findByMealIdAndUserId(Long.valueOf(id), Long.valueOf(userId));
    Meal meal = mealRepository.findById(Long.valueOf(id)).orElseThrow();
    User user = userRepository.findById(Long.valueOf(userId)).orElseThrow();
    if (existingRating.isPresent()) {
      mealRatingRepository.delete(existingRating.get());
      meal.setRatingCount(meal.getRatingCount().subtract(BigDecimal.ONE));
      meal.setRatingCount(meal.getRatingCount().subtract(BigDecimal.valueOf(existingRating.get().getRating())));
    }

    // Save new rating
    MealRating mealRating = new MealRating();
    mealRating.setMeal(meal);
    mealRating.setUser(user);
    mealRating.setRating(rating);
    mealRatingRepository.save(mealRating);

    // Update aggregate avgRating in Meal table
    meal.setRatingSum(meal.getRatingSum().add(BigDecimal.valueOf(rating)));
    meal.setRatingCount(meal.getRatingCount().add(BigDecimal.ONE));
    BigDecimal ratingCount = meal.getRatingCount().add(BigDecimal.ONE);
    meal.setAvgRating(meal.getRatingSum().divide(ratingCount, 2, RoundingMode.UNNECESSARY));
    mealRepository.save(meal);

    return mealMapper.toMealOutputDto(meal);
  }
}
