package com.main.server.chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer { // , WebSocketConfigurer {

//    private final WebSocketHandler webSocketHandler;
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(webSocketHandler, "/chat")
//                .setAllowedOriginPatterns("*");
//    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // 웹소켓을 생성한다
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); // /sub/* 로 오는 요청에 대해 해당 해당 url을 구독한 클라이언트 들에게 메세지를 전송
        config.setApplicationDestinationPrefixes("/pub"); // /app/* 로 오는 요청에 대해 controller의 MessageMapping 되어있는 메서드를 실행
    }

}
