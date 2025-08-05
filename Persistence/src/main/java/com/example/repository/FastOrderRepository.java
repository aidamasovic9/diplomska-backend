package com.example.repository;

import com.example.entity.FastOrder;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FastOrderRepository extends JpaRepository<FastOrder, Long> {

  Optional<List<FastOrder>> getFastOrdersByUserId(Long userId);

  @Transactional
  @Modifying
  @Query("delete from FastOrder fo where fo.id = :id and fo.user.id = :userId")
  void deleteFastOrderByIdAndUserId(Long id, Long userId);
}
