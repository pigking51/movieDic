package dw.movieDic.Model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "user_email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name="date_joined", nullable = false, updatable = false)
    private LocalDateTime dateJoined;

    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @ManyToOne
    @JoinColumn(name = "authority", nullable = false)
    private Authority authority;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private GenderEnum gender;

    public enum GenderEnum {
        MALE,
        FEMALE;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(authority.getAuthorityName()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

