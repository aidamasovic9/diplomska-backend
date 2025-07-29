package com.example.repository;

import com.example.entity.DinnerProposalParticipant;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DinnerProposalParticipantRepository extends JpaRepository<DinnerProposalParticipant, Long> {
  Optional<DinnerProposalParticipant> findById(@NonNull Long id);
  List<DinnerProposalParticipant> findByUserId(Long userId);
}
