package com.client.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Getter
@Setter
@TableName("Company")
@ApiModel(value = "Company对象", description = "")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("头像")
    @TableField("headerImg")
    private String headerImg;

    @ApiModelProperty("账号")
    @TableField("account")
    private Integer account;

    @ApiModelProperty("密码")
    @TableField("password")
    private String password;

    @ApiModelProperty("账号状态 -- 正常、待审核、停用")
    @TableField("status")
    private String status;

    @ApiModelProperty("公司名称")
    @TableField("name")
    private String name;

    @ApiModelProperty("公司证明附件")
    @TableField("enclosure")
    private String enclosure;


}
