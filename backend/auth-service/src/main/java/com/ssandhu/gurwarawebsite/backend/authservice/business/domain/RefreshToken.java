package com.ssandhu.gurwarawebsite.backend.authservice.business.domain;

public class RefreshToken {
    private String value;

    public RefreshToken(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
