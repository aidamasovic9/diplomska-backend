package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "MEAL")
@SequenceGenerator(
    name = Meal.GENERATOR_NAME,
    sequenceName = Meal.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class Meal {
  /**
   * Sequence name.
   */
  public static final String SEQ = "MEAL_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "MEAL_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @Column(name = "NAME")
  private String name;

  @Lob
  @Column(name = "PHOTO")
  private byte[] photo;

  @Column(name = "AVG_RATING")
  private BigDecimal avgRating;
}
