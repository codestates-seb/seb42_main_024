package com.main.server.auth.config;

import com.main.server.auth.filter.JwtVerificationFilter;
import com.main.server.auth.handler.MemberAccessDeniedHandler;
import com.main.server.auth.handler.MemberAuthenticationEntryPoint;
import com.main.server.auth.handler.OAuth2MemberSuccessHandler;
import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.util.CustomAuthorityUtils;
import com.main.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    @Value("${config.domain}")
    private String domain;

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

//    @Value("${spring.security.oauth2.client.registration.google.clientId}")
//    private String clientId;
//
//    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
//    private String clientSecret;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws  Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/api/rooms").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/boards/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/playlists/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/api/follows/**").permitAll()
                        .antMatchers("/api/rooms/**").hasRole("USER")
                        .antMatchers("/api/boards/**").hasRole("USER")
                        .antMatchers("/api/comments/**").hasRole("USER")
                        .antMatchers("/api/playlists/**").hasRole("USER")
                        .antMatchers("/api/like/**").hasRole("USER")
                        .antMatchers("/api/follows/**").hasRole("USER")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 ->
                        oauth2.successHandler(
                                new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService)));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001", "http://localhost:8080"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        config.addExposedHeader("Authorization");
        config.addExposedHeader("Refresh");
        config.addExposedHeader("Set-Cookie");

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter =
                    new JwtVerificationFilter(jwtTokenizer, authorityUtils, memberService);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        var clientRegistration = clientRegistration();
//
//        return new InMemoryClientRegistrationRepository(clientRegistration);
//    }
//
//    private ClientRegistration clientRegistration() {
//        return CommonOAuth2Provider
//                .GOOGLE
//                .getBuilder("google")
//                .clientId(clientId)
//                .clientSecret(clientSecret)
//                .build();
//    }
}
