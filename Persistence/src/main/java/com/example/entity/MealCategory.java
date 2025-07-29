package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "MEAL_CATEGORY")
@SequenceGenerator(
    name = Meal.GENERATOR_NAME,
    sequenceName = MealCategory.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class MealCategory {
  /**
   * Sequence name.
   */
  public static final String SEQ = "MEAL_CATEGORY_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "MEAL_CATEGORY_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @Column(name = "NAME")
  private String name;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "CATEGORY_ID")
  private List<Meal> meals;
}
