package com.client.serviceImpl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.client.model.CompanyCollection;
import com.client.service.CompanyCollectionService;
import com.common.mapper.CompanyCollectionMapper;
import org.springframework.stereotype.Service;

/**
 * 服务实现类
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@Service
public class CompanyCollectionServiceImpl
    extends ServiceImpl<CompanyCollectionMapper, CompanyCollection>
    implements CompanyCollectionService {}
