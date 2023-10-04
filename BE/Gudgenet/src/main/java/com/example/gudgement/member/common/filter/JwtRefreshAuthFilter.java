package com.example.gudgement.member.common.filter;

import com.example.gudgement.member.common.jwt.JwtProvider;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.member.exception.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtRefreshAuthFilter extends OncePerRequestFilter {

    private final String[] whiteUriList = new String[] {""};
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("Filter : JWTRefreshFilter");
        String uri = request.getRequestURI();

        if (uri.startsWith("/api/member/token/refresh")) {
            if(whiteListCheck(request.getRequestURI())){
                filterChain.doFilter(request, response);
                return;
            }

//        MemberVerifyResponseDto attribute = (MemberVerifyResponseDto) request.getAttribute(MemberVerifyFilter.AUTHENTICATE_USER);
            String refreshToken = jwtProvider.getHeaderToken(request, "Authorization");

            if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
                refreshToken = refreshToken.substring(7);
            } else {
                throw new BaseErrorException(ErrorCode.NOT_AUTHORIZATION_TOKEN);
            }

            // refreshToken 값이 있음
            if (refreshToken != null) {
                // 유효성 검사
                if (jwtProvider.validationToken(refreshToken, "Refresh")) {
                    log.info("RefreshToken 유효함. : {}", refreshToken);

//                Claims claims = jwtProvider.getClaims(refreshToken);
//                if (attribute.getId().equals(claims.get("id"))) {
//                    throw new BaseErrorException(ErrorCode.NOT_SAME_TOKEN_AND_MEMBER);
//                }
//                log.info("요청 ID 일치함. : {}", claims.get("id"));

                    // refreshToken 만료
                } else {
                    log.info("RefreshToken 만료. : {}", refreshToken);
                    throw new BaseErrorException(ErrorCode.REFRESH_TOKEN_EXPIRATION);
                }
                filterChain.doFilter(request, response);

            } else {
                log.info("Token값이 존재하지 않습니다.");
                throw new BaseErrorException(ErrorCode.NOT_EXIST_TOKEN);
            }
        }
        filterChain.doFilter(request, response);
    }

    public ResponseEntity<ErrorResponse> jwtExceptionHandler(String Token){
        if (Token.equals("Access")) {
            return ErrorResponse.error(new BaseErrorException(ErrorCode.ACCESS_TOKEN_EXPIRATION));
        } else if (Token.equals("Refresh")) {
            return ErrorResponse.error(new BaseErrorException(ErrorCode.REFRESH_TOKEN_EXPIRATION));
        } else {
            return ErrorResponse.error(new BaseErrorException(ErrorCode.NOT_EXIST_TOKEN));
        }
    }

    private boolean whiteListCheck(String uri){
        return PatternMatchUtils.simpleMatch(whiteUriList, uri);
    }
}
