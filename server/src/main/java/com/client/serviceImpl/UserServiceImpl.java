package com.client.serviceImpl;

import com.client.model.User;
import com.client.mapper.UserMapper;
import com.client.service.UserService;
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
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
