package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.User;
import com.client.service.UserService;
import com.common.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-21
 */
@Service("UService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {}
