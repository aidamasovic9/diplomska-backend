package com.example.controller;

import com.example.model.output.MealOutputDto;
import com.example.service.MealService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.MealsApi;
import org.openapitools.model.SubmitMealRating200Response;
import org.openapitools.model.SubmitMealRatingRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MealController implements MealsApi {
  private final MealService mealService;

  @Override
  public ResponseEntity<SubmitMealRating200Response> submitMealRating(
      String mealId, SubmitMealRatingRequest submitMealRatingRequest) {

    MealOutputDto mealOutputDto = mealService.updateMealRating(mealId, submitMealRatingRequest.getRating(), submitMealRatingRequest.getUserId());
    SubmitMealRating200Response submitMealRating200Response = new SubmitMealRating200Response();
    submitMealRating200Response.setMealId(mealId);
    submitMealRating200Response.setAverageRating(mealOutputDto.getAvgRating().floatValue());
    submitMealRating200Response.setRating(submitMealRatingRequest.getRating());

    return ResponseEntity.ok(submitMealRating200Response);
  }
}
