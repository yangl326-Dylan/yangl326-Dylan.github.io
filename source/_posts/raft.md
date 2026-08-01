title: Raft协议算法简介
date: 2016-04-12 17:36
category:

- 分布式系统

Tags:

- 一致性
- 分布式

---

# Raft 协议算法简介

## 简介

Raft协议算法产生的结果和Paxos的效果相同，Raft算法设计较Paxos设计易懂，并且有着更好的生产环境的实现方式。

<!-- more -->

## 背景

事务操作的四要素ACID：原子性、一致性、隔离性、持久性、 对于一个分布式环境的服务来说，较难满足一个事务的要求。比如对于一致性来说就是一个较难处理的问题，Raft正是为了解决分布式环境中一致性而产生的一种一致性协议算法。
## Raft概念

  1、Follower(追随者)角色  
  2、Candidate(候选者)角色  
  3、Leader(追随者)角色  
  4、Term(时间阶段)  
  5、server(或者node 泛指服务节点,算法中指log节点)
## 基本背景

  1、集群包含若干server（或者node），数目5是一个典型的分布式集群数目，对于这样一个系统来说，最多容忍的失败server个数为2（N>=2F+1)，总的服务数N， 容忍失败的个数F。  
  2、所有的node在同一个时期（term）只会有以上三种角色状态的其中一种。  
  3、Term是一个不定的时间长度，每个term最多只会有一个leader，可能没有。成功选举后由这个leader领导cluster直到term结束。  
## Leader选举

#### 选举流程

  1、初始节点状态都是follower  
  2、收不到leader 通知或者candidate请求（超时），开始触发选举流程  
  3、F.增加自己的term num并转换为candidate状态（过程时间随机）  
  4、F.投票自己并且发送给其他人“投我”的请求  
  5、F.最终结果有三类：获得大多票数成为leader、其他f成为leader、无结果继续第二轮投票  
#### 状态转换

Follower->Candidate 开始选举  
Candidate->Candidate 选举超时  
Candidate->Leader 选举成功  
Candidate->Follower 发现其他leader 或者新的term时期  
Leader->Follower 发现其他leader 或者更好的term时期  
## Log Replication

### 协议针对log 副本。数据同步流程

  1、client发送数据请求  
  2、leader接收数据请求，其他角色接收到请求转给leader  
  3、L.发出append请求（记录数据）  
  4、L.收到大多数数据回复，返回client请求状态  
  5、L.下个心跳把commit给到follower  
  6、如果传输失败，leader可以不断重试  
### 流程约定

  1、log entry数据特性：log index、term num、commond  
  2、log 持久化存储  
  3、entry被大多数存储成功则为commited  
  4、index和term相同那么之前的数据（entry）都是相同的  
  5、某个commit之前的数据都是commited的  
  6、append操作带上上一个的entry信息（index和term）并做检查  
  7、检查不匹配，leader重试前一条。采用迭代重试方式直到完成   
## 参考资料

Raft协议特性简介
参考资料：
动画演示 http://thesecretlivesofdata.com/raft/  
Raft官网 https://raft.github.io/  

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
