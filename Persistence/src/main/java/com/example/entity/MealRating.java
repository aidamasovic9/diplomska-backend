package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MEAL_RATING")
@SequenceGenerator(
    name = MealRating.GENERATOR_NAME,
    sequenceName = MealRating.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class MealRating {
  /**
   * Sequence name.
   */
  public static final String SEQ = "MEAL_RATING_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "MEAL_RATING_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "MEAL_ID")
  private Meal meal;

  @Column(nullable = false)
  private Integer rating;
}
