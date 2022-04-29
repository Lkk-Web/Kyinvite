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
@TableName("Station")
@ApiModel(value = "Station对象", description = "")
public class Station implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("公司ID -- 关联company 表")
    @TableField("companyID")
    private Integer companyID;

    @ApiModelProperty("职位种类 绑定TwoCategory表")
    @TableField("twocategoryID")
    private Integer twocategoryID;

    @ApiModelProperty("岗位名称")
    @TableField("name")
    private String name;

    @ApiModelProperty("岗位描述")
    @TableField("description")
    private String description;

    @ApiModelProperty("福利描述")
    @TableField("welfareDescription")
    private String welfareDescription;

    @ApiModelProperty("工作地点? --省--市")
    @TableField("city")
    private String city;

    @ApiModelProperty("最高工资")
    @TableField("salaryUp")
    private Integer salaryUp;

    @ApiModelProperty("最低工资")
    @TableField("salaryDown")
    private Integer salaryDown;


}
