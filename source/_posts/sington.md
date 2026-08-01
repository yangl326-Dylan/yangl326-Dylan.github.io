title: 单例模式简析
date: 2013-09-07	16:27
category:

- JDK

tags:

- 设计模式

---

### 含义

什么叫单例模式或单件模式，由名字可知存在一个对象，我们可以重复使用这个对象。那么如何实现整个系统中存在一个对象，如何保证一个对象只被实例化一次。实际上约定一个全局变量可以，通过静态方法或者静态类的变量和一定限定修饰可以实现。实际中我们会遇到很多需要的场景，如果一个对象的初始化比较耗资源时间较长，并且可重复利用，那么就需要单例模式去实现。如：线程池、缓存、日志对象等，只需要一个对象就行了。

创建对象 new一个实例，那么如何去保证这个对象实例只会存在一个。java对象缺省有无参构造器（构造方法），私有化这个构造方法，来看看几种实现方法。

### 常见三种单例的实现方法

首先想到的私有化构造方法，提供一个静态方法返回同一个对象：
<!-- more -->


```java
public class SingleTon {

    private static SingleTon singleTon=null;

    private SingleTon(){
    }

    public static SingleTon getInstance(){
        if(singleTon == null){
            singleTon = new SingleTon();    
        }
        return singleTon;
    }

}
```

分析：私有化其无参构造器后无法在这个类外去实例化这个对象，内部可以实例化这个对象，那么需要提供一个方法返回这个对象，使用静态方法，确保在类被加载的时候初始化到内存中，一个判断条件去保证这个对象是同一个对象。

上面这段代码是延迟加载的，在调用getInstance方法的时候对象才被实例化，如果类被加载的时候初始化那么只需要将静态变量赋值：

```java
public class SingleTon {

    private static SingleTon singleTon=new SingleTon();

    private SingleTon(){
    }

    public static SingleTon getInstance(){
        return singleTon;
    }

}
```

如果在多线程情况下getInstance方法存在，并不能保证为同一个对象，简单的方法就是修改为同步方法，即：

```
public static synchronized SingleTon getInstance(){}
```

简单方便，多线程问题解决，如果没有频繁使用的场景并且接受这种调用带来的资源消耗，那么同步的静态方法应该是一个比较好的方法，但是有一个问题，频繁的调用getInstance方法的时候，就不适合了。

看看下面这种方法，双重检查加锁，保证只有一次同步方法，在创建的时候：

```java
public class SingleTon {

    private volatile static SingleTon singleTon;

    private SingleTon(){
    }

    public static SingleTon getInstance(){
        if(singleTon==null){
            synchronized (SingleTon.class){
                if(singleTon==null){
                       singleTon = new SingleTon();
                }
            }
        }
        return singleTon;
    }

}
```

分析：

volatile 关键字修饰singleTon，表示各个线程自己的变量副本集不缓存，确保多线程初始化的时候，多线程正确处理这个变量。如果singleTon对象为空的时候，进入第一个if中的同步块，多线程受同步方法约束，再做一次null对象判断，为空才创建对象。之后的方法调用，进入不了同步块判断，那么就满足了只有一个同步判断的，减少了使用sychronized修饰方法每次调用的资源消耗，提高了执行效率，如果系统代码的性能要求较高，这种方式更为合适。

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
