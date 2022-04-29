package com.client.controller;

import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import cn.binarywang.wx.miniapp.bean.WxMaUserInfo;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.common.config.WxMaConfiguration;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import me.chanjar.weixin.common.error.WxErrorException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 微信小程序用户接口
 *
 * @author <a href="https://github.com/binarywang">Binary Wang</a>
 */
@RestController
@Api(value = "微信登录", tags = "微信登录")
@RequestMapping("/auth")
public class WxMaUserController {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Value("${wxconfig.appid}")
  public String appid;

  /** 登陆接口 */
  @GetMapping("/login")
  @ApiOperation("登录")
  public String login(String code) {
    if (StringUtils.isBlank(code)) {
      return "empty jscode";
    }

    final WxMaService wxService = WxMaConfiguration.getMaService(appid);

    try {
      WxMaJscode2SessionResult session = wxService.getUserService().getSessionInfo(code);

      String openid = session.getOpenid();

      // TODO 可以增加自己的逻辑，关联业务相关数据
      if (StrUtil.isEmpty(openid)) {}

      return JSONUtil.toJsonStr(session);
    } catch (WxErrorException e) {
      this.logger.error(e.getMessage(), e);
      return e.toString();
    }
  }

  /**
   *
   *
   * <pre>
   * 获取用户信息接口
   * </pre>
   */
  @GetMapping("/info")
  public String info(
      @PathVariable String appid,
      String sessionKey,
      String signature,
      String rawData,
      String encryptedData,
      String iv) {
    final WxMaService wxService = WxMaConfiguration.getMaService(appid);

    // 用户信息校验
    if (!wxService.getUserService().checkUserInfo(sessionKey, rawData, signature)) {
      return "user check failed";
    }

    // 解密用户信息
    WxMaUserInfo userInfo = wxService.getUserService().getUserInfo(sessionKey, encryptedData, iv);

    return JSONUtil.toJsonStr(userInfo);
  }

  /**
   *
   *
   * <pre>
   * 获取用户绑定手机号信息
   * </pre>
   */
  @GetMapping("/phone")
  public String phone(
      @PathVariable String appid,
      String sessionKey,
      String signature,
      String rawData,
      String encryptedData,
      String iv) {
    final WxMaService wxService = WxMaConfiguration.getMaService(appid);

    // 用户信息校验
    if (!wxService.getUserService().checkUserInfo(sessionKey, rawData, signature)) {
      return "user check failed";
    }

    // 解密
    WxMaPhoneNumberInfo phoneNoInfo =
        wxService.getUserService().getPhoneNoInfo(sessionKey, encryptedData, iv);

    return JSONUtil.toJsonStr(phoneNoInfo);
  }
}
