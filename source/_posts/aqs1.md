title: AbstractQueuedSynchronizer实现分析
date: 2017-05-15 20:01
category:

- 语言
- JDK

tags:

- java
- JVM

------

### 背景介绍

JDK1.5开始的java.util.concurrent包（简称J.U.C包）提供了大部分同步器的构建源框架类：AbstractQueuedSynchronizer，简称AQS类。我们使用到的大部分同步器都会有一个实现了AQS的子类。

<!-- more -->

### 原理分析

简单的理解，AQS类实现了两者

1. 自动管理了一个int类型的state同步状态，CAS保证其原子性
2. 一个阻塞、唤醒线程的队列管理，双向链表

先从同步器基本讲起，一个同步器一般提供两种方法：一种是acquire；一种是release。acquire会阻塞线程调用或者非阻塞方式直接返回同步状态，release操作就是改变此同步状态，唤醒其他被阻塞的线程执行。

例如：ReentrantLock的lock() /unlock()、CountDownLatch的await()/countDown()、Semaphore的acquire()/release()等都是上述两种的实现。只是每个实现子类中的state表达的同步状态有着自己的含义。注：FutureTask同步类中没直接使用AQS类，但基本的同步器设计思路同AQS。

需要下面三个基本功能组件相互协作：

- 一个具有原子性的同步状态
- 线程的阻塞与唤醒
- 队列的管理，支持排队或者闯入，即处理公平非公平

##### 原子性状态

AQS类提供了一个int类型的state状态（备注当然也提供long类型的state状态，实际情况下int满足绝大部分场景），通过state的读取和修改来表示不同的状态，修改基于atomic原子类中CAS（compareAndSet）源语等操作来维护这个状态。它在不同的同步器中表达的含义不一样，例如重入锁中，当某个线程从条件等待中返回，然后重新获取锁时，为了重新建立循环计数的场景就可以使用到这个状态。当然有些同步器中也可以不使用此状态。

##### 阻塞

说到阻塞当然会想到线程的wait和notify， 对比JUC中的的LockSupport类， 两者的区别是:LockSupport提供主动的唤醒机制，而notify则是抢占形式的唤醒模式。LockSupport的unpark方法支持主动唤醒某个线程，提供了相对于notify更优良的机制。

##### 队列

实际上AQS的本质就是一个阻塞线程队列的管理器，严格的FIFO（先入先出）备注：不支持优先级队列。它以类似自旋锁的自旋模式来判定现成的获取和释放。

### 参考

- AbstractQueuedSynchronizer类注释doc， 基本这个文档明白了，再加上一个实现类，基本每个同步类都会实现一个AQS的实现类作为内部类
- Doug Lea大师（八字胡老爷爷）论文：[The java.util.concurrent Synchronizer Framework](http://gee.cs.oswego.edu/dl/papers/aqs.pdf "The java.util.concurrent Synchronizer Framework")

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
