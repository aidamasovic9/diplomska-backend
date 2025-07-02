package com.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "D_USER")
@SequenceGenerator(
    name = User.GENERATOR_NAME,
    sequenceName = User.SEQ,
    initialValue = 10000,
    allocationSize = 100)
@Access(AccessType.FIELD)
public class User implements UserDetails {

  /**
   * Sequence name.
   */
  public static final String SEQ = "D_USER_SEQ";

  /**
   * Generator name.
   */
  public static final String GENERATOR_NAME = "USER_GENERATOR";

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = GENERATOR_NAME)
  @Column(name = "ID", unique = true, nullable = false, precision = 19)
  private Long id;

  @Column(name = "FIRST_NAME", length = 64)
  private String firstName;

  @Column(name = "LAST_NAME", length = 64)
  private String lastName;

  @Column(name = "EMAIL", length = 128)
  private String email;

  @Enumerated(EnumType.STRING)
  @Column(name = "ROLE")
  private UserRole role;

  @Lob
  @Column(name = "IMAGE")
  private byte[] image;

  @Column(name = "SHORTNAME", length = 4)
  private String shortName;

  @Column(name = "PASSWORD")
  private String password;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }
}
