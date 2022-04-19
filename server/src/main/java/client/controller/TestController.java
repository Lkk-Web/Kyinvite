package client.controller;


import common.util.DataResult;
import common.entity.TestEntity;
import client.controller.service.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author AcheDc
 * @since 2022-01-17
 */
@Api(value = "测试接口",tags = "测试1接口")
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    TestService testService;

    @ApiOperation("测试查找所有")
    @GetMapping("/List")
    public DataResult getList(){
        return DataResult.success(testService.list());
    }

    @ApiOperation("测试查找明细")
    @GetMapping("/Detail")
    public DataResult getDetail(){
        return testService.getDetail();
    }

    @ApiOperation("测试根据id查找明细")
    @GetMapping("/Detail/{id}")
    public DataResult getDetailById(@PathVariable("id") String id){
        return testService.getDetailById(id);
    }

    @ApiOperation("测试添加")
    @PostMapping("/save")
    public DataResult add(@RequestBody TestEntity testEntity){
        testService.save(testEntity);
        return DataResult.success();
    }

    @ApiOperation("测试修改")
    @PostMapping("/update")
    public DataResult update(@RequestBody TestEntity testEntity){
        testService.updateById(testEntity);
        return DataResult.success();
    }

    @ApiOperation("测试删除")
    @DeleteMapping("/remove/{id}")
    public DataResult deleteOne(@PathVariable("id") String id){
        testService.removeById(id);
        return DataResult.success();
    }




}
