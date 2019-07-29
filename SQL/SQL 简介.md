## SQL 简介
### [什么是 SQL？](https://www.w3school.com.cn/sql/sql_intro.asp)
+ SQL 指结构化查询语言
+ SQL 使我们有能力访问数据库
+ SQL 是一种 ANSI 的标准计算机语言

### SQL 能做什么？

+ SQL 面向数据库执行查询
+ SQL 可从数据库取回数据
+ SQL 可在数据库中插入新的记录
+ SQL 可更新数据库中的数据
+ SQL 可从数据库删除记录
+ SQL 可创建新数据库
+ SQL 可在数据库中创建新表
+ SQL 可在数据库中创建存储过程
+ SQL 可在数据库中创建视图
+ SQL 可以设置表、存储过程和视图的权限

### SQL 是一种标准 - 但是...
SQL 是一门 ANSI 的标准计算机语言，用来访问和操作数据库系统。SQL 语句用于取回和更新数据库中的数据。SQL 可与数据库程序协同工作，比如 MS Access、DB2、Informix、MS SQL Server、Oracle、Sybase 以及其他数据库系统。

不幸地是，存在着很多不同版本的 SQL 语言，但是为了与 ANSI 标准相兼容，它们必须以相似的方式共同地来支持一些主要的关键词（比如 SELECT、UPDATE、DELETE、INSERT、WHERE 等等）。

>注释：除了 SQL 标准之外，大部分 SQL 数据库程序都拥有它们自己的私有扩展！
### 在您的网站中使用 SQL
要创建发布数据库中数据的网站，您需要以下要素：

+ RDBMS 数据库程序（比如 MS Access, SQL Server, MySQL）
+ 服务器端脚本语言（比如 PHP 或 ASP）
+ SQL
+ HTML / CSS

### RDBMS
RDBMS 指的是关系型数据库管理系统。

RDBMS 是 SQL 的基础，同样也是所有现代数据库系统的基础，比如 MS SQL Server, IBM DB2, Oracle, MySQL 以及 Microsoft Access。

RDBMS 中的数据存储在被称为表（tables）的数据库对象中。

表是相关的数据项的集合，它由列和行组成。

### SQL DML 和 DDL
可以把 SQL 分为两个部分：数据操作语言 (DML) 和 数据定义语言 (DDL)。
SQL (结构化查询语言)是用于执行查询的语法。但是 SQL 语言也包含用于更新、插入和删除记录的语法。

查询和更新指令构成了 SQL 的 DML 部分：

+ SELECT - 从数据库表中获取数据
+ UPDATE - 更新数据库表中的数据
+ DELETE - 从数据库表中删除数据
+ INSERT INTO - 向数据库表中插入数据
SQL 的数据定义语言 (DDL) 部分使我们有能力创建或删除表格。我们也可以定义索引（键），规定表之间的链接，以及施加表间的约束。

SQL 中最重要的 DDL 语句:

+ CREATE DATABASE - 创建新数据库
+ ALTER DATABASE - 修改数据库
+ CREATE TABLE - 创建新表
+ ALTER TABLE - 变更（改变）数据库表
+ DROP TABLE - 删除表
+ CREATE INDEX - 创建索引（搜索键）
+ DROP INDEX - 删除索引