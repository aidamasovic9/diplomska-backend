package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "DINNER_PROPOSAL_PARTICIPANT")
@SequenceGenerator(
    name = DinnerProposalParticipant.GENERATOR_NAME,
    sequenceName = DinnerProposalParticipant.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class DinnerProposalParticipant {
  /**
   * Sequence name.
   */
  public static final String SEQ = "DINNER_PROPOSAL_PARTICIPANT_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "DINNER_PROPOSAL_PARTICIPANT_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "STATUS")
  private ParticipantStatus status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "PROPOSAL_ID")
  private DinnerProposal dinnerProposal;
}
