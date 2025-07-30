package com.example.repository;

import com.example.entity.FastOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FastOrderRepository  extends JpaRepository<FastOrder, Long> {

  Optional<List<FastOrder>> getFastOrdersByUserId(Long userId);
}
