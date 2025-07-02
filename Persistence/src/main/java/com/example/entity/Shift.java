package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "SHIFT")
@SequenceGenerator(
    name = Shift.GENERATOR_NAME,
    sequenceName = Shift.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class Shift {
  /**
   * Sequence name.
   */
  public static final String SEQ = "SHIFT_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "SHIFT_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @Column(name = "NAME", nullable = false, length = 100)
  private String name;

  @Column(name = "MAXIMUM_GUESTS", nullable = false)
  private Integer maximumGuests;

  @OneToMany(mappedBy = "shift")
  private List<Order> orders;
}
