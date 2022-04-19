package common.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 *
 * </p>
 *
 * @author AcheDc
 * @since 2022-01-17
 */
@Getter
@Setter
@Accessors(chain = true)
@TableName("test2")
@ApiModel(value = "Test2Entity对象", description = "")
public class Test2Entity extends Model<Test2Entity> {

    @ApiModelProperty("id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty("test表id")
    @TableField("tid")
    private Integer tid;

    @ApiModelProperty("年龄")
    @TableField("age")
    private Integer age;

    @ApiModelProperty("性别")
    @TableField("sex")
    private Boolean sex;


    @Override
    public Serializable pkVal() {
        return this.id;
    }

}
