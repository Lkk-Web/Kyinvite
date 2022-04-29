package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.Role;
import com.client.service.RoleService;
import com.common.mapper.RoleMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-21
 */
@Service("RService")
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {}
