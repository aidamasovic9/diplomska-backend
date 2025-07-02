package com.example.repository;

import com.example.entity.DinnerProposalParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DinnerProposalParticipantRepository extends JpaRepository<DinnerProposalParticipant, Long> {
  List<DinnerProposalParticipant> findByProposalId(Long proposalId);
  List<DinnerProposalParticipant> findByUserId(Long userId);
}
