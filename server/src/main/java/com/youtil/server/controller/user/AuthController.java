package com.youtil.server.controller.user;

import com.youtil.server.domain.user.User;
import com.youtil.server.common.exception.BadRequestException;
import com.youtil.server.payload.ApiResponse;
import com.youtil.server.payload.AuthResponse;
import com.youtil.server.payload.LoginRequest;
import com.youtil.server.payload.SignUpRequest;
import com.youtil.server.repository.user.UserRepository;
import com.youtil.server.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenProvider tokenProvider;

    @ApiIgnore
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @ApiIgnore
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }
        // Creating user's account
        User user = new User();
        user.setUserName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
//        user.setProvider(AuthProvider.local);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getUserId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }




}
