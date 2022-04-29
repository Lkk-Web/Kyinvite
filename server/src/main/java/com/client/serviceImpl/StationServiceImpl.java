package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.Station;
import com.client.service.StationService;
import com.common.mapper.StationMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class StationServiceImpl extends ServiceImpl<StationMapper, Station>
    implements StationService {}
