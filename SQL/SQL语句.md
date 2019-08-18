## SQL语句

### SQL SELECT 语句

 **SELECT 列名称 FROM 表名称**
  **SELECT * FROM 表名称**
>注释：SQL 语句对大小写不敏感。SELECT 等效于 select。
>星号（*）是选取所有列的快捷方式。

例如：
```sql
# 如需获取名为 "LastName" 和 "FirstName" 的列的内容（从名为 "Persons" 的数据库表）
SELECT LastName,FirstName FROM Persons

# 现在我们希望从 "Persons" 表中选取所有的列。
 SELECT * FROM Persons
```
#### DISTINCT 语句
在表中，可能会包含重复值。这并不成问题，不过，有时您也许希望仅仅列出不同（distinct）的值。
>关键词 DISTINCT 用于返回唯一不同的值。

语法：
```sql
SELECT DISTINCT 列名称 FROM 表名称
```
例如：
```sql
#如果要从 "Company" 列中选取Orders表中所有的值，我们需要使用 SELECT 语句
SELECT Company FROM Orders
#如需从 Company 列中仅选取唯一不同的值，我们需要使用 SELECT DISTINCT 语句
SELECT DISTINCT Company FROM Orders  
```
####WHERE 子句
如需有条件地从表中选取数据，可将 WHERE 子句添加到 SELECT 语句
```sql
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
```
下面的运算符可在 WHERE 子句中使用：
|操作符|描述|
|:-|:-|
|=|	等于|
|<>|	不等于|
|>|	大于|
|<|	小于|
|>=|	大于等于|
|<=|	小于等于|
|BETWEEN|	在某个范围内|
|LIKE	|搜索某种模式|
>注释：在某些版本的 SQL 中，操作符 <> 可以写为 !=

```sql
#如果只希望选取居住在城市 "Beijing" 中的人，我们需要向 SELECT 语句添加 WHERE 子句
SELECT * FROM Persons WHERE City='Beijing'
```
>请注意，我们在例子中的条件值周围使用的是单引号。
SQL 使用单引号来环绕文本值（大部分数据库系统也接受双引号）。如果是数值，请不要使用引号。
####AND 和 OR 运算符
```sql
#使用 AND 来显示所有姓为 "Carter" 并且名为 "Thomas" 的人
SELECT * FROM Persons WHERE FirstName='Thomas' AND LastName='Carter'

#使用 OR 来显示所有姓为 "Carter" 或者名为 "Thomas" 的人
SELECT * FROM Persons WHERE firstname='Thomas' OR lastname='Carter'

#我们也可以把 AND 和 OR 结合起来（使用圆括号来组成复杂的表达式）
SELECT * FROM Persons WHERE (FirstName='Thomas' OR FirstName='William')
AND LastName='Carter'
```
####ORDER BY 语句
ORDER BY 语句用于根据指定的列对结果集进行排序。 
ORDER BY 语句默认按照升序对记录进行排序。 
如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。
```sql
#以字母顺序显示公司名称：
SELECT Company, OrderNumber FROM Orders ORDER BY Company

#以字母顺序显示公司名称（Company），并以数字顺序显示顺序号（OrderNumber）
SELECT Company, OrderNumber FROM Orders ORDER BY Company, OrderNumber

#以逆字母顺序显示公司名称
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC

#以逆字母顺序显示公司名称，并以数字顺序显示顺序号
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC
```

###INSERT INTO 语句
INSERT INTO 语句用于向表格中插入新的行。
语法：
```sql
INSERT INTO 表名称 VALUES (值1, 值2,....)
#我们也可以指定所要插入数据的列
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
```
例如：
```sql
INSERT INTO Persons VALUES ('Gates', 'Bill', 'Xuanwumen 10', 'Beijing')

#在指定的列中插入数据
INSERT INTO Persons (LastName, Address) VALUES ('Wilson', 'Champs-Elysees')
```

### Update 语句
Update 语句用于修改表中的数据
语法：
```sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```
例如：
```sql
#我们为 lastname 是 "Wilson" 的人添加 firstname
UPDATE Person SET FirstName = 'Fred' WHERE LastName = 'Wilson' 

#我们会修改地址（address），并添加城市名称（city
UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing'
WHERE LastName = 'Wilson'
```

###DELETE 语句
DELETE 语句用于删除表中的行。
语法
```sql 
DELETE FROM 表名称 WHERE 列名称 = 值
```

例如：
```sql
#"Fred Wilson" 会被删除
DELETE FROM Person WHERE LastName = 'Wilson' 

#可以在不删除表的情况下删除所有的行。这意味着表的结构、属性和索引都是完整的
DELETE FROM table_name
#或者：
DELETE * FROM table_name
```
