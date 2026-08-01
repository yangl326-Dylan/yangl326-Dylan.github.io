title: 消息ID设计选型
date: 2019-08-06 16:45
category:

- THINK

tags:

- IM
- DX
- 微信

---

## 背景和目标
需要一个唯一数据标示
ID类型可以使字符串或者整型。 这两类选择对方案影响较大
ID生产性能， 决定服务瓶颈
ID生产容灾解决， 如果ID是你的系统十分重要的数据，那么容灾较为重要
<!-- more -->
## 可行的解决方案
- 大数， 参考一般电商系统订单ID
- uniq字符串 ， 可参考UUID、MongoObjectID等
- MySQL 主键
- redis incr


### 参考
snowflake
https://developer.twitter.com/en/docs/basics/twitter-ids.html
https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake.html

#### 优点
- 长整型处理性能相对较高
- 生产性能高
- 生成分布式容错

#### 弊端
- 时间有限，取决于设计的其实时间戳， 目前可使用年限有限， 取决于分配的位数和起始时间戳
- 机器时间回拨，会导致循环hang一段时间，直到比上次生产ID值大
- 每一毫秒2^12次， 单节点QPS过大，也会导致hang住一段时间
- workID，个数有限，可以做成rpc， 产生了rpc调用时耗

## 可参考其他实现
侧重不一样，导致实现有难易
- MQ messageid  例如kafka
- RPC requestID。 例如dubbo 只需要保证某次连接上唯一
- TCP/IP 序列id
---

**版权声明：本文为博主原创文章，未经允许不得转载。**
