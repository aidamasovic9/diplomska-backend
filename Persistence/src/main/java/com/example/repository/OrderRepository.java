package com.example.repository;

import com.example.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  long countByShiftIdAndOrderDate(Long shiftId, LocalDate orderDate);

  Optional<Order> findByUserIdAndOrderDate(Long userId, LocalDate orderDate);
}
