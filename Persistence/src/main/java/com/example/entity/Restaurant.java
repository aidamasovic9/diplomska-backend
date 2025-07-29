package com.example.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "RESTAURANT")
@SequenceGenerator(
    name = Restaurant.GENERATOR_NAME,
    sequenceName = Restaurant.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class Restaurant {

  /**
   * Sequence name.
   */
  public static final String SEQ = "RESTAURANT_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "RESTAURANT_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @Column(name = "NAME")
  private String name;

  @Column(name = "CITY")
  private String city;

  @Column(name = "IMAGE")
  private String image;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "RESTAURANT_ID")
  private List<Shift> shifts;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "RESTAURANT_ID")
  private List<MealCategory> categories;
}
