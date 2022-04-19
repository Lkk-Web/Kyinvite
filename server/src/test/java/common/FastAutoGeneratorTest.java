package common;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.converts.MySqlTypeConvert;
import com.baomidou.mybatisplus.generator.config.querys.MySqlQuery;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.baomidou.mybatisplus.generator.keywords.MySqlKeyWordsHandler;

import java.util.Collections;

public class FastAutoGeneratorTest {

    /**
     * 数据源配置
     */
    private static final DataSourceConfig.Builder DATA_SOURCE_CONFIG = new DataSourceConfig
            .Builder("jdbc:mysql://localhost:3306/database?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "root")
            .dbQuery(new MySqlQuery()) //数据库查询
            .schema("mybatis-plus") //数据库schema(部分数据库适用)
            .typeConvert(new MySqlTypeConvert()) //数据库类型转换器
            .keyWordsHandler(new MySqlKeyWordsHandler()); //数据库关键字处理器

    /**
     * 执行 run
     */
    public static void main(String[] args) {
//        "C://Users//ZSAndroid//Desktop//mybatisDemo//src//main//java"
        FastAutoGenerator.create(DATA_SOURCE_CONFIG)
                // 全局配置
                .globalConfig((scanner, builder) -> builder
//						.fileOverride() //覆盖已生成文件，默认值:false
                                .outputDir(System.getProperty("user.dir") + "/src/main/java") //指定输出目录，默认值: windows:D://
                                .author("AcheDc")//作者名，baomidou 默认值:作者
                                .dateType(DateType.TIME_PACK)//时间策略，DateType.ONLY_DATE 默认值: DateType.TIME_PACK
                                .commentDate("yyyy-MM-dd")//注释日期，默认值: yyyy-MM-dd
                                .disableOpenDir()// 禁止打开输出目录，默认值:true
                                .enableSwagger() //开启 swagger 模式，默认值:false
                                .build()//加入构建队列
                )
                // 包配置
                .packageConfig((scanner, builder) -> builder
//						.parent(scanner.apply("请输入包名："))//父包名，默认值:com.baomidou
                                .parent("com.AcheDc.api")//父包名，默认值:com.baomidou
                                .entity("entity")//Entity 包名，默认值:entity
                                .service("service")//Service 包名，默认值:service
                                .serviceImpl("service.impl")//Service Impl 包名，默认值:service.impl
                                .mapper("mapper")//Mapper 包名，默认值:mapper
                                .xml("mapper.xml")//Mapper XML 包名，默认值:mapper.xml
                                .controller("controller")//Controller 包名，默认值:controller
                                .pathInfo(Collections.singletonMap(OutputFile.mapperXml, "src/main/resources/mapper")) //路径配置信息，Collections.singletonMap(OutputFile.mapperXml, "D://")
                                .build()//加入构建队列
                )

                // 策略配置
                /**
                 * schema：在数据库中表示的是数据库对象集合，它包含了各种对像，比如：表，视图，存储过程，索引等等。
                 * 一般情况下一个用户对应一个集合，所以为了区分不同的集合就需要给不同的集合起名字。
                 * 用户的schema名就相当于用户名，并作为该用户缺省schema。所以说schema集合看上去像用户名。
                 * 例如当我们访问一个数据表时，如果该表没有指明属于哪个schema，系统就会自动的加上缺省的schema。
                 */
                .strategyConfig((scanner, builder) -> builder
                                /** 基本参数配置 */
                                .enableCapitalMode()//开启大写命名，默认值:false
                                .enableSkipView()//开启跳过视图，默认值:false
                                .disableSqlFilter()//禁用 sql 过滤，默认值:true，语法不能支持使用 sql 过滤表的话，可以考虑关闭此开关
//						.likeTable(new LikeTable("t_user_login"))//模糊表匹配(sql 过滤)	likeTable 与 notLikeTable 只能配置一项
                                /** 设置需要生成的表名 */
                                .addInclude(scanner.apply("请输入表名："))// 增加表匹配(内存过滤)，include 与 exclude 只能配置一项

                                /** 实体策略配置 */
                                .entityBuilder()//实体策略配置
                                .disableSerialVersionUID()//禁用生成 serialVersionUID，默认值:true
                                .enableLombok()//开启 lombok 模型，默认值:false
                                .enableChainModel()//开启链式模型，默认值:false
                                .enableRemoveIsPrefix()//开启 Boolean 类型字段移除 is 前缀，默认值:false
                                .enableTableFieldAnnotation()//开启生成实体时生成字段注解，默认值:false
                                .enableActiveRecord()//开启 ActiveRecord 模型，默认值:false
                                .naming(NamingStrategy.underline_to_camel)//数据库表映射到实体的命名策略，默认下划线转驼峰命名:NamingStrategy.underline_to_camel
                                .columnNaming(NamingStrategy.underline_to_camel)//数据库表字段映射到实体属性的命名策略，默认为 null，未指定按照 naming 执行
                                .idType(IdType.AUTO)//全局主键类型
                                .formatFileName("%sEntity")//格式化文件名称，生成实体的后缀，建议这样使用，生成后：UserLoginBean

                                /** controller 策略配置 */
                                .controllerBuilder()//controller 策略配置
                                .enableHyphenStyle()//开启驼峰转连字符，默认值:false
                                .enableRestStyle()//开启生成@RestController 控制器，默认值:false
                                .formatFileName("%sController")//格式化文件名称——controller包下自动生成的类后缀，例如UserLoginController

                                /** Service 策略配置 */
                                .serviceBuilder()//service 策略配置
                                .formatServiceFileName("%sService")//转换 service 接口文件名称，例如：UserLoginService
                                .formatServiceImplFileName("%sServiceImpl")//转换 service 实现类文件名称，例如：UserLoginServiceImpl

                                /** mapper 策略配置 */
                                .mapperBuilder()//mapper 策略配置
                                .superClass(BaseMapper.class)//设置父类，BaseMapper是com.baomidou.mybatisplus.core.mapper中的
                                .enableMapperAnnotation()//开启 @Mapper 注解，默认值:false
                                .enableBaseResultMap()//启用 BaseResultMap 生成，默认值:false
                                .enableBaseColumnList()//启用 BaseColumnList，默认值:false
                                .formatMapperFileName("%sMapper")//转换 mapper 接口文件名称后缀，mapper目录下的，例如：UserLoginMapper（有@Mapper）
                                .formatXmlFileName("%sMapper")//转换 xml 文件名称后缀，例如：UserLoginMapper.xml，Mybatis的xml映射文件
                                .build()//加入构建队列
                )

                /**
                 * 模板引擎
                 */
                //Velocity
                //.templateEngine(new VelocityTemplateEngine())

                //Beetl
                //.templateEngine(new BeetlTemplateEngine())

                //Freemarker
                .templateEngine(new FreemarkerTemplateEngine())
                /**
                 * 开始自动生成代码,执行队列构建操作
                 */
                .execute();
    }
}