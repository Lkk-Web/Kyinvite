package com.client.controller;

import com.client.model.Role;
import com.client.service.RoleService;
import com.common.util.DataResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 前端控制器
 *
 * @author MaybeBin
 * @since 2022-04-21
 */
@Controller
@RequestMapping("/client/role")
@Api(value = "role表")
public class RoleController {

  @Autowired RoleService roleService;

  @ApiOperation("查找所有")
  @GetMapping("/List")
  public DataResult getList() {
    return DataResult.success(roleService.list());
  }

  @ApiOperation("添加")
  @PostMapping("/save")
  public DataResult add(@RequestBody Role testEntity) {
    roleService.save(testEntity);
    return DataResult.success();
  }

  @ApiOperation("修改")
  @PostMapping("/update")
  public DataResult update(@RequestBody Role testEntity) {
    roleService.updateById(testEntity);
    return DataResult.success();
  }

  @ApiOperation("删除")
  @DeleteMapping("/remove/{id}")
  public DataResult deleteOne(@PathVariable("id") String id) {
    roleService.removeById(id);
    return DataResult.success();
  }
}
