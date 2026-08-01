title: gperftools做堆外内存分析（案例JVM Inflater 内存泄漏分析）
date: 2017-09-28 13:31
category:

- JDK

tags:

- java
- memory

---

## google-perftools
perftools wiki地址 ：https://github.com/gperftools/gperftools/wiki
安装perftools
...
工具主要作用分析程序：heap、cpu等，常用于c/c++程序分析
使用文档如下：
https://gperftools.github.io/gperftools/heapprofile.html
https://gperftools.github.io/gperftools/heap_checker.html
https://gperftools.github.io/gperftools/cpuprofile.html
<!-- more -->
## JVM堆外内存分析
本文针对于 Oracle Hotspot jvm 虚拟机
JVM 进程占用大小一般约等于： heap + perm + thread stack + nio directbuffer
当然还有其他占用，一般情况来看native memory跟踪可以使用NMT参数 -XX:NativeMemoryTracking
详情wiki ： https://docs.oracle.com/javase/8/docs/technotes/guides/vm/nmt-8.html
JVM常见内存泄漏检查方式可以按照 oracle提供的文档： http://www.oracle.com/technetwork/java/javase/memleaks-137499.html
其中dbx是和perftools类似工具。

除此之外
进程内存在用在linux 面下top,pmap 等工具是较好确定进程内存的手段， 在/proc/${pid}/ 目录下smaps文件等查看RSS，虚拟内存，swap占用等。
pmap 找到内存申请的地址块， 可以使用gdb attach 后 dump 某一段的内存地址 ，后查看内存的数据。 注意gdb attach 进程会暂停， 线上谨慎操作。

如果发现进程内存过高，可能需要注意下程序是否存在堆外内存泄漏问题，java进程出现的堆外内存泄漏常见有如下几个方面：
- JNI
- NIO directbuffer 泄漏
- gzip  （本文案例就是此类）

网络编程中程序中，nio directbuffer 有监控工具可以查看， directbuffer使用量、并且可以设置最大直接内存buffer。


## JVM 进程使用perftools 做分析
案例中发现的问题jetty 服务在某版本的JDK（jdk7u80~jdk8u045等 应该7u80后的版本在本文章编写时候都有）出现的内存泄漏问题分析和查找

1、安装perftools 注意配置安装目录， 找到对应的文件路径
2、启动java程序时候携带环境变量（可以参照 perftools wiki帮助 写的较为明确， 文档主要针对正对c/c++程序， Hotspot主要是c++写的）
export LD_PRELOAD=/opt/perftools/lib/libtcmalloc.so  # 安装后的库文件路径
export HEAPPROFILE=/opt/mybin.hprof  #heap分析文件路径和文件
特别注意目录和文件权限是否是进程用户可使用的
3、运行后启动程序后
4、pprof执行程序（注意路径），分析这些heap文件 pprof --help查看使用方式
./perftools/bin/pprof --text \*.heap   以文本结果展示heap的分析文件， 结果说明见perftools wiki文档

```shell
Total: 55838.9 MB
 41320.8  74.0%  74.0%  41320.8  74.0% updatewindow
  9018.8  16.2%  90.2%   9018.8  16.2% inflateInit2_
  1559.4   2.8%  92.9%   1559.4   2.8% os::malloc@907260
  1556.4   2.8%  95.7%   1556.4   2.8% init
   587.5   1.1%  96.8%    587.5   1.1% 00007fb480508a66
   551.4   1.0%  97.8%    551.4   1.0% 00007f2b1d6f4a66
   451.5   0.8%  98.6%    451.5   0.8% 00007fb48177e8e9
   183.1   0.3%  98.9%    183.1   0.3% 00007fb46c1b6c91
   128.2   0.2%  99.1%    128.2   0.2% 00007fb480508245
   120.4   0.2%  99.4%    120.4   0.2% 00007f2b1d6f4245
   111.0   0.2%  99.6%   9129.7  16.4% Java_java_util_zip_Inflater_init
   102.8   0.2%  99.7%    102.8   0.2% 00007f2b1e96a8e9
    74.2   0.1%  99.9%     74.2   0.1% readCEN
    45.8   0.1% 100.0%     45.8   0.1% 00007f2b09392c91
     7.5   0.0% 100.0%      7.5   0.0% 00007fb4805025b6
     4.5   0.0% 100.0%      4.5   0.0% 00007fb48192162d
		 ......
```

对于上述问题表现的jdk1.7.0_76不会出现
jdk1.7.0_80,jdk1.8.0_45以上明显出现。
用过pmap分析过 主要都是64m内存块较多， 查看过数据都是jar load相关的数据当时没引起注意
分析主要在updatewindow，Java_java_util_zip_Inflater_init ， 这个是gzip相关， 于是搜索相关资料
结论如下：
'''Note that the URLClassLoader was properly disposed of, with a call to close() first, and that the ServiceLoader's reload() method was also called to flush it's internal cache.
This is NOT specific to the ServletContainerInitializer, it happens with any class that is loaded via the ServiceLoader.
File handles remain to the \*.jar until the app's process is stopped.'''


网上查找相关资料
jdk 问题  http://bugs.java.com/bugdatabase/view_bug.do?bug_id=8156014
jetty issue https://github.com/eclipse/jetty.project/issues/231



处理方法,以下其一
- JDK降级到jdk7u76， 使用不会出现问题的JDK版本
- 等新版本jdk bug修复
- jetty contributer 给出的方案 disable url caching  wiki https://github.com/eclipse/jetty.project/issues/575


---

**版权声明：本文为博主原创文章，未经允许不得转载。**
