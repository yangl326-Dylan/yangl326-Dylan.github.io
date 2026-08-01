title: 适配器模式概念简析
date: 2013-10-06	12:58
category:

- 设计模式

tags:

- 设计模式

---

适配器模式的定义：将一个接口转化为另一个需要的接口。注接口为广义接口。

例如： 我们有一个书籍的接口，其包含两个方法：获取作者，获取目录。
<!-- more -->

```java
public interface Book {
    /**
     * 书籍目录
     */
    public void getContents();


    public void getAuthor();
}
```

还有一个字典接口，也包含两个方法，获取作者，获取单词索引列表。

```java
public interface Dictionary {
    /**
     * 字典没有目录 只有列表
     */
    public void getItems();


    public void getAuthor();
}
```

如何将字典接口转化为书籍接口，字典接口的实现类和书籍接口的实现类为同一种类型的类，那么就需要使用适配器模式。

```java
public class DictAdapter implements Book {
    Dictionary dictionary;

    @Override
    public void getContents() {
        //字典 单词列表 转化为书籍目录
        dictionary.getItems();
    }

    @Override
    public void getAuthor() {
        dictionary.getAuthor();
    }

}
```

分析：实现book接口的类，和字典对象作为组合方式联系起来。使用字典类的方法覆盖book接口的方法，从而达到目的。

代码见：[DictAdapter.java](https://github.com/yangl326-Dylan/analysis_and_designer/blob/master/src/blog/DictAdapter.java)

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
