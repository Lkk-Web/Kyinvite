package com.common.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.client.model.Role;
import org.apache.ibatis.annotations.Mapper;

/**
 * Mapper 接口
 *
 * @author MaybeBin
 * @since 2022-04-21
 */
@Mapper
public interface RoleMapper extends BaseMapper<Role> {}
