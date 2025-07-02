package com.example.repository;

import com.example.entity.MealRating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRatingRepository extends JpaRepository<MealRating, Long> {
}
