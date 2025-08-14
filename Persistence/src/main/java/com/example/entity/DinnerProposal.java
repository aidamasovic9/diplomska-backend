package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "DINNER_PROPOSAL")
@SequenceGenerator(
    name = DinnerProposal.GENERATOR_NAME,
    sequenceName = DinnerProposal.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class DinnerProposal {
  /**
   * Sequence name.
   */
  public static final String SEQ = "DINNER_PROPOSAL_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "DINNER_PROPOSAL_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "INITIATOR_USER_ID", nullable = false)
  private User initiator;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "RESTAURANT_ID", nullable = false)
  private Restaurant restaurant;

  @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinColumn(name = "SHIFT_ID", nullable = false)
  private Shift shift;

  @Column(name = "CREATED_AT")
  private LocalDate createdAt;

  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  @JoinColumn(name = "PROPOSAL_ID")
  private List<DinnerProposalParticipant> participants;
}
