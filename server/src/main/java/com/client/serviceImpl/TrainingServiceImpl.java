package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.Training;
import com.client.service.TrainingService;
import com.common.mapper.TrainingMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class TrainingServiceImpl extends ServiceImpl<TrainingMapper, Training>
    implements TrainingService {}
