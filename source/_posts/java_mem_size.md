title: Swallow size和Retained size区别（+ deep size）
date: 2016-08-10 16:01
category:

- 语言
- JVM

tags:

- java
- heap memory
- JVM

---

JVM heap中对象大小有着如下大小表示
-----------  

如果对象存在其他引用，那么我们来描述对象大小有如下几种类型：

a)Swallow Size: 存储对象自身所包含的内存占用量

1.仅表示对象自身  

<!-- more -->

2.集合等，对象自己和对象中元素或者域（fields)的“引用”的大小。只包含引用数据的大小   

3.可以使用instrumentation.getObjectSize(obj)获取到大小

b)Retained Size: 对象自身的swallow size加上此对象可达的所有对象的swallow size

1.直接可达，间接可达  

2.在GC树上，仅仅来自此对象，不包含其他引用（包括gc root reference）

3.汇总理解就是此对象被垃圾收集器回收时候GC释放掉的内存大小

c)Deep Size: 相比如上两种这类较为少使用，递归遍历class: fields+superclass 的swallow size总和

### 参考

Java Performance: The Definitive Guide

大小计算方式：[Instrumentation Memory Counter](http://www.javaspecialists.eu/archive/Issue142.html "Instrumentation Memory Counter")

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
