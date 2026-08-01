title: String.valueOf()能否传入null
date: 2013-09-11 11:23
category:

- 语言
- JDK

tags:

- java

---

最近发现一个有意思的问题，可以看看这两个的输出结果

```
String.valueOf(map.get("key")) //①
```

```
String.valueOf(null)          //②
```
<!-- more -->
会发现map中①返回正常 ”null“字符串，而②抛出NLP异常

跳转到String类的valueOf发现使用的是这个重载的方法：

```java
    public static String valueOf(char data[]) {
        return new String(data);
    }
```

再看看char[] string的构造方法：

```java
    public String(char value[]) {
        this.value = Arrays.copyOf(value, value.length);
    }
```

null无length属性，到这里就会异常。

传入（Object）null时候（或者无key得时候map对象返回空对象），实现的是如下重载的方法：

```java
    public static String valueOf(Object obj) {
        return (obj == null) ? "null" : obj.toString();
    }
```

即正常返回 null字符串。

实际上null是关键字，不属于Object对象，至于选择器为什么会优先选择重载函数就得分析null和Object obj=null 中 null和obj的区别了。

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
