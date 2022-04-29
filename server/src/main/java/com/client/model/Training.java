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
@TableName("training")
@ApiModel(value = "Training对象", description = "")
public class Training implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("简历培训 -- 视频链接")
    @TableField("ResumeTraining")
    private String resumeTraining;

    @ApiModelProperty("职业培训 -- 视频链接")
    @TableField("VocationalTraining")
    private String vocationalTraining;


}
