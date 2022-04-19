package client.controller.service;

import common.util.DataResult;
import common.entity.TestEntity;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author AcheDc
 * @since 2022-01-17
 */
public interface TestService extends IService<TestEntity> {

    DataResult getDetail();

    DataResult getDetailById(String id);

}
