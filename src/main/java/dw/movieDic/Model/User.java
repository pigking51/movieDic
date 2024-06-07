package dw.movieDic.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
@Setter
@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @Column(name="user_id", nullable = false, length=50)
    private String userId;
    @Column(name="user_name", nullable = false, length=50)
    private String userName;
    @Column(name="user_email", length=100)
    private String userEmail;
    @Column(name="password", nullable = false, length=255)
    private String password;
    @Column(name="authority", nullable = false, length=100)
    private Authority authority;
    @Column(name="gender", nullable = false, length=50)
    private Gender genderType;
    @Column(name="age", nullable = false)
    private int age;
    @Column(name="birthday", nullable = false)
    private LocalDate birthday;
    @Column(name="date_joined")
    private LocalDateTime dateJoined;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(authority.getAuthorityName())
        );
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
