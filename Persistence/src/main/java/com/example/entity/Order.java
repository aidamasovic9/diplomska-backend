package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "D_ORDER")
@SequenceGenerator(
    name = Order.GENERATOR_NAME,
    sequenceName = Order.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class Order {
  /**
   * Sequence name.
   */
  public static final String SEQ = "ORDER_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "ORDER_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "MEAL_ID", nullable = false)
  private Meal meal;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "RESTAURANT_ID", nullable = false)
  private Restaurant restaurant;

  @ManyToOne
  @JoinColumn(name = "SHIFT_ID", nullable = false)
  private Shift shift;

  @Column(name = "ORDER_DATE")
  private LocalDate orderDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "EAT_IN_OR_TAKE_AWAY")
  private EatInTakeAway eatInTakeAway;

  @Column(name = "COMMENT")
  private String comment;
}
