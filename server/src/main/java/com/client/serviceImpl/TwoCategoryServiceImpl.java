package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.TwoCategory;
import com.client.service.TwoCategoryService;
import com.common.mapper.TwoCategoryMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class TwoCategoryServiceImpl extends ServiceImpl<TwoCategoryMapper, TwoCategory>
    implements TwoCategoryService {}
