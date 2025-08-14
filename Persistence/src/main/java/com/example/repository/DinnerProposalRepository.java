package com.example.repository;

import com.example.entity.DinnerProposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DinnerProposalRepository extends JpaRepository<DinnerProposal, Long> {

  @Query("SELECT DISTINCT dp FROM DinnerProposal dp JOIN FETCH dp.participants p WHERE p.user.id = :userId AND dp.initiator.id != :userId")
  List<DinnerProposal> findByParticipantUserId(@Param("userId") Long userId);

  @Query("SELECT dp FROM DinnerProposal dp WHERE dp.initiator.id = :userId")
  List<DinnerProposal> findByInitiatorUserId(@Param("userId") Long userId);

}
