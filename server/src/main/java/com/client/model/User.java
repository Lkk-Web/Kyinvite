package com.client.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author MaybeBin
 * @since 2022-04-21
 */
@Getter
@Setter
@TableName("User")
@ApiModel(value = "User对象", description = "")
public class User implements Serializable {

  private static final long serialVersionUID = 1L;

  @TableId(value = "id", type = IdType.AUTO)
  private Integer id;

  @TableField("openid")
  private String openid;

  @TableField("station")
  private String station;

  @TableField("address")
  private String address;

  @TableField("enclosure")
  private String enclosure;

  @TableField("status")
  private String status;
}
