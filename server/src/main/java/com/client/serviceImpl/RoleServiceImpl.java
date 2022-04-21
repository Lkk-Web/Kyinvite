package com.client.serviceImpl;

import com.client.model.Role;
import com.client.mapper.RoleMapper;
import com.client.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author MaybeBin
 * @since 2022-04-21
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

}
