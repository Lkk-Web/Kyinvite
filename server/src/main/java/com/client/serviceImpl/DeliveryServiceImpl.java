package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.Delivery;
import com.client.service.DeliveryService;
import com.common.mapper.DeliveryMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class DeliveryServiceImpl extends ServiceImpl<DeliveryMapper, Delivery>
    implements DeliveryService {}
