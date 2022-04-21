package com.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

/** 小程序配置 */
@Data
@Component
@ConfigurationProperties(prefix = "wx.miniapp")
public class WxMaProperties {

  public List<Config> configs;

  @Data
  public static class Config {
    /** 设置微信小程序的appid */
    public String appid;

    /** 设置微信小程序的Secret */
    private String secret;

    /** 设置微信小程序消息服务器配置的token */
    private String token;

    /** 设置微信小程序消息服务器配置的EncodingAESKey */
    private String aesKey;

    /** 消息格式，XML或者JSON */
    private String msgDataFormat;
  }
}
