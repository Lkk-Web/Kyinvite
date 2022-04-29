package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.Admin;
import com.client.service.AdminService;
import com.common.mapper.AdminMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class AdminServiceImpl extends ServiceImpl<AdminMapper, Admin> implements AdminService {}
