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
@TableName("Setting")
@ApiModel(value = "Setting对象", description = "")
public class Setting implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("法律咨询")
    @TableField("legalAdvice")
    private String legalAdvice;

    @ApiModelProperty("隐私协议")
    @TableField("privacyAgreement")
    private String privacyAgreement;

    @ApiModelProperty("banner区")
    @TableField("banner")
    private String banner;

    @ApiModelProperty("广告")
    @TableField("advertising")
    private String advertising;


}
