package com.client.controller;

import com.client.model.Admin;
import com.client.service.AdminService;
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
@RequestMapping("/client/admin")
@Api(tags = "管理员")
public class AdminController {
  @Autowired AdminService adminService;

  @ApiOperation("查找所有")
  @GetMapping("/List")
  public DataResult getList() {
    return DataResult.success(adminService.list());
  }

  @ApiOperation("添加")
  @PostMapping("/save")
  public DataResult add(@RequestBody Admin testEntity) {
    adminService.save(testEntity);
    return DataResult.success();
  }

  @ApiOperation("修改")
  @PostMapping("/update")
  public DataResult update(@RequestBody Admin testEntity) {
    adminService.updateById(testEntity);
    return DataResult.success();
  }

  @ApiOperation("删除")
  @DeleteMapping("/remove/{id}")
  public DataResult deleteOne(@PathVariable("id") String id) {
    adminService.removeById(id);
    return DataResult.success();
  }
}
