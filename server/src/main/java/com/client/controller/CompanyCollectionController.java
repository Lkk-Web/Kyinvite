package com.client.controller;

import com.client.model.CompanyCollection;
import com.client.service.CompanyCollectionService;
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
@RequestMapping("/client/company-collection")
@Api(tags = "公司-收藏")
public class CompanyCollectionController {
  @Autowired CompanyCollectionService collectionService;

  @ApiOperation("查找所有")
  @GetMapping("/List")
  public DataResult getList() {
    return DataResult.success(collectionService.list());
  }

  @ApiOperation("添加")
  @PostMapping("/save")
  public DataResult add(@RequestBody CompanyCollection testEntity) {
    collectionService.save(testEntity);
    return DataResult.success();
  }

  @ApiOperation("修改")
  @PostMapping("/update")
  public DataResult update(@RequestBody CompanyCollection testEntity) {
    collectionService.updateById(testEntity);
    return DataResult.success();
  }

  @ApiOperation("删除")
  @DeleteMapping("/remove/{id}")
  public DataResult deleteOne(@PathVariable("id") String id) {
    collectionService.removeById(id);
    return DataResult.success();
  }
}
