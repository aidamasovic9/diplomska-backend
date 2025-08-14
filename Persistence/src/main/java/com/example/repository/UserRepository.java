package com.example.repository;

import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  @Query("SELECT u FROM User u WHERE " +
      "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
      "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
      "LOWER(u.shortName) LIKE LOWER(CONCAT('%', :query, '%')))")
  List<User> searchUsersByNameOrShortName(@Param("query") String query);

  @Query("SELECT u FROM User u WHERE " +
      "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
      "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
      "LOWER(u.shortName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
      "AND u.id <> :excludeUserId " +
      "AND u.id NOT IN (" +
      "   SELECT f.id FROM User fav JOIN fav.favoriteUsers f WHERE fav.id = :excludeUserId" +
      ")")
  List<User> searchUsersByNameOrShortNameExcludeFavorites(
      @Param("query") String query,
      @Param("excludeUserId") Long excludeUserId);
}
