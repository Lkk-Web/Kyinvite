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
@TableName("TwoCategory")
@ApiModel(value = "TwoCategory对象", description = "")
public class TwoCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("职位种类绑定category表")
    @TableField("categoryID")
    private Integer categoryID;

    @ApiModelProperty("种类名称")
    @TableField("name")
    private String name;

    @ApiModelProperty("种类描述")
    @TableField("description")
    private String description;


}
