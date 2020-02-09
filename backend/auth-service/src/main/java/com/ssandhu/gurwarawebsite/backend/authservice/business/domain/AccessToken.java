package com.ssandhu.gurwarawebsite.backend.authservice.business.domain;

public class AccessToken {
    private String value;

    public AccessToken(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
