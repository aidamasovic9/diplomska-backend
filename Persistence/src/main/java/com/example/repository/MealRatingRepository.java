package com.example.repository;

import com.example.entity.MealRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MealRatingRepository extends JpaRepository<MealRating, Long> {
  Optional<MealRating> findByMealIdAndUserId(Long mealId, Long userId);
}
