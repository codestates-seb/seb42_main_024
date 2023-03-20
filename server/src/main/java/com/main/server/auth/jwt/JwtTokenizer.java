package com.main.server.auth.jwt;

import com.main.server.member.entity.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenizer {

    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    public String encodeBase64SecretKey() {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey());

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());

        String accessToken = generateAccessToken(claims, subject, expiration);

        return accessToken;
    }

    public String delegateRefreshToken(String username) {
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());

        String refreshToken = generateRefreshToken(username, expiration);

        return refreshToken;
    }

//    public String generateAccessTokenByUser(Member member) {
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("username", member.getEmail());
//        claims.put("roles", member.getRoles());
//
//        String subject = member.getEmail();
//        Date expiration = getTokenExpiration(accessTokenExpirationMinutes);
//
//        return generateAccessToken(claims, subject, expiration);
//    }
//
//    public String generateRefreshTokenByUser(Member Member) {
//        String subject = Member.getEmail();
//        Date expiration = getTokenExpiration(refreshTokenExpirationMinutes);
//
//        return generateRefreshToken(subject, expiration);
//    }

    public Jws<Claims> getClaims(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey());

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public boolean verifySignature(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey());

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jws);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.info(e.getMessage());
            return false;
        }
    }

    public String getUsername(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodeBase64SecretKey());

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build().parseClaimsJws(jws).getBody().getSubject();
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}
