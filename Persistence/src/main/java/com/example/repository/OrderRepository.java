package com.example.repository;

import com.example.entity.Order;
import com.example.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  long countByShiftIdAndOrderDate(Long shiftId, LocalDate orderDate);

  Optional<Order> findByUserIdAndOrderDate(Long userId, LocalDate orderDate);

  @Query("SELECT o FROM Order o WHERE o.restaurant IN :restaurants AND o.orderDate = :today")
  List<Order> findOrdersByRestaurantsAndDate(@Param("restaurants") List<Restaurant> restaurants,
                                             @Param("today") LocalDate today);
}
