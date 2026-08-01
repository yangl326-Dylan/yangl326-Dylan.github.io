title: JVM工作原理理解和分析--类加载
date: 2013-08-20 14:20
category:

- 语言
- JDK

tags:

- java

---

JVM (Java Virtual Machine) 即java虚拟机。一个java文件对应一个类，JVM会把需要的类装载到内存，那么class loader的作用就出来了。

先抛出个常见的问题 ClassNotFoundException 常见于缺少的加载类文件或相关库文件或者重复加载等。
<!-- more -->
JVM的类加载机制为委托加载（双亲委派模型）我们看一下classloader的流程图（引自参考）

![img](http://img.blog.csdn.net/20130820132524921?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveWFuZ2wzMjY=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

一、classloader之间的父子关系(非继承关系)和范围。
(1)BootStrap 是最顶层的类加载器，由C++编写,也称之为启动类加载器,主要用来读取Java的核心类库%java_home%/jre/lib/rt.jar 或指定能被JVM识别的文件
(2)Extension ClassLoader,  java 编写，用来读取Java的扩展类库，读取%java_home%/jre/lib/ext/*.jar 或者指定路径的文件
(3)App ClassLoader， java编写，是用来读取CLASSPATH指定的所有jar包或目录的类文件：引入的文件
(4)Custom ClassLoader是用户自定义编写classloader子类的用来加载指定类文件。

二、双亲委派模型的过程：

需要加载A类，先自底向上查看此类是否被加载，如果未被加载，那么依次从启动加载器开始尝试加载此类，未找到抛出异常。（详细可参见classloader源代码），java中常规的加载流程如上。

我们来看一个简单的例子：

```java
public class JVMClassLoader {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JVMClassLoader hello = new JVMClassLoader();
		Class helloClass = hello.getClass();
		System.out.println("ClassLoader str: " + "".getClass().getClassLoader());
		System.out.println("ClassLoader a  : " + helloClass.getClassLoader());
		System.out.println("ClassLoader-ap : " + helloClass.getClassLoader().getParent());
		System.out.println("ClassLoader-app: " + helloClass.getClassLoader().getParent().getParent());
	}
	/*
	 * result:
	 * ClassLoader str: null
	 * ClassLoader a  : sun.misc.Launcher$AppClassLoader@62f72617
	 * ClassLoader-ap : sun.misc.Launcher$ExtClassLoader@4fe5e2c3
	 * ClassLoader-app: null
	 */

}
```



首先string对象类的加载器为null（即启动加载bootstrap加载器,无法去使用）str类应该属于rt.jar库中对象

自定义类JVMClassLoader 类它是由AppClassLoader加载，而AppClassLoader是由ExtClassLoader加载，ExtclassLoader由bootstrap加载器加载。

可以做个这样的测试把编译好的文件打包成jar放置到lib/ext/目录下 那么输出其加载器应该是ExtClassLoader

推荐：

`java -verbose:class 完整类名`    类加载器跟踪,尽可能多的输出加载信息

### 引申问题

tomcat的web app项目的类加载顺序，常用的库放置路径，关键路径：tomcat/lib  和WEB-INF/lib 。想一想 一个tomcat实例下面可以多个app，不同app使用不同版本的jar库，那么怎样的加载优先级可以保证。

### 参考

http://www.cnblogs.com/ChrisWang/archive/2009/11/17/Inside-JVM-4-ClassLoader-Knowledge-Sharing.html

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
