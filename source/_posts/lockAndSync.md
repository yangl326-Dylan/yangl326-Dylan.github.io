title: JAVA 内部锁与同步[Intrinsic Locks and Synchronization]
date: 2014-03-12	21:19
category:

- 语言
- JDK

tags:

- java
- 译文

---

JAVA 内部锁与同步[Intrinsic Locks and Synchronization]

同步是建立在被称之为内部锁或监控锁的内部实体（按照API标准指的这个实体称之为监控）。内在锁在同步的两个方面发挥作用：一个对象状态的专属使用权和建立可见性所需要的happens-before关系。
<!-- more -->
​      每个对象有一个与之相关联的内部锁。一般来说，一个线程需要持久的专有的访问一个对象的字段那么它必须先获取该对象的内部锁，当使用结束的时候释放这个锁。此时这个线程在获取内部锁后和释放这个内部锁之前都称之为拥有这个对象的内部锁。一旦这个线程拥有这个内部锁，其他的线程就不能获取同样的锁，获取的时候被阻塞住。

​      当这个线程释放了这个内部锁，一个happens-before关系将建立在该动作和后续获取相同锁的操作之间。

同步方法中的锁

​    当一个线程调用一个同步方法事后，它会自动的获取这个方法对象的内部锁，直到方法返回才释放，即使未捕获的异常引起的返回也会触发这个锁的释放。

如果一个静态的同步方法方法被调用，由于静态方法是关联到这个类而不是实例对象。这样的话，线程获取的是内部锁是与这个类相关的类对象。这个类的静态对象被锁住了。这个锁有区别于和此类的其他实例对象的锁

同步块

另外一种创建同步代码的的是使用同步块，和同步方法不相同，同步块需要具体的对象来提供内部锁。

```java
public void addName(String name) {
    synchronized(this) {
        lastName = name;
        nameCount++;
    }
    nameList.add(name);
}
```

这个例子中，addName方法需要同步改变lastName和nameCount，但是同时也要避免去同步对其他对象方法的调用。如nameList.add方法在同步块外面，避免了同步这个方法。

细粒度的同步块对于提供并发性能有着很好的改善，假设这样一个例子 MsLunch类有两个对象字段 c1和c2 ，它们不会交错使用。所有的这两个字段更新需要同步，但是没有必要c1的更新影响或者阻止c2的更新。减少并发通过创建不必要的阻塞而不是用同步方法或者this对象的同步块。我们可以创建两个对象提供锁。

```java
public class MsLunch {
    private long c1 = 0;
    private long c2 = 0;
    private Object lock1 = new Object(); // 注：推荐是用占用内存小的对象，如byte对象
    private Object lock2 = new Object();

    public void inc1() {
        synchronized(lock1) {
            c1++;
        }
    }

    public void inc2() {
        synchronized(lock2) {
            c2++;
        }
    }
}
```

这种风格的话，你必然能够保证相互影响的字段间交错访问的绝对安全。

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
