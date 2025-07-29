package com.example.repository;

import com.example.entity.MealCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealCategoryRepository extends JpaRepository<MealCategory, Long> {
}
