package com.client.controller;

import com.client.model.Training;
import com.client.service.TrainingService;
import com.common.util.DataResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 前端控制器
 *
 * @author MaybeBin
 * @since 2022-04-29
 */
@RestController
@RequestMapping("/client/training")
@Api(tags = "培训")
public class TrainingController {
  @Autowired TrainingService trainingService;

  @ApiOperation("查找所有")
  @GetMapping("/List")
  public DataResult getList() {
    return DataResult.success(trainingService.list());
  }

  @ApiOperation("添加")
  @PostMapping("/save")
  public DataResult add(@RequestBody Training testEntity) {
    trainingService.save(testEntity);
    return DataResult.success();
  }

  @ApiOperation("修改")
  @PostMapping("/update")
  public DataResult update(@RequestBody Training testEntity) {
    trainingService.updateById(testEntity);
    return DataResult.success();
  }

  @ApiOperation("删除")
  @DeleteMapping("/remove/{id}")
  public DataResult deleteOne(@PathVariable("id") String id) {
    trainingService.removeById(id);
    return DataResult.success();
  }
}
