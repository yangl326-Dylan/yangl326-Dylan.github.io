title: final修饰符
date: 2013-08-21	23:39
category:

- 语言
- JDK

tags:

- java
- final

---

本文主要记载下java中final修饰符的应用场景，final 这个关键字定义修饰的实体不再改变，如何去理解这两个概念：“被修饰的实体”和”不再改变“。

final可以修饰实体：
<!-- more -->
> 类（class）：表示此类不允许被继承；例如 java.lang.String 对象

> 方法（method）：表示不能被重载

> 变量（variables）：包括基本变量和引用的对象变量（注：final修饰的引用对象只要不被赋值，其属性的修改等是被允许的）。

不再改变：

> 不再改变不是不变的意思。如果变量final修饰为引用对象，不能为其赋值，而其自身可以变化，因为这个引用没有改变。

定义在上面看怎么去理解了，还是用实例去验证下final的用法：

一、final class（修饰类）：

```
public final class FinalClass {...}// final 类

public class WrongClass extends FinalClass{...} //不被允许的继承

```

分析：不能编写一个final修饰类的子类，这个类所有的方法可以理解为隐含的final。

二、final method（修饰方法）：

```
	class A{
		public void foo1(){}
		public final void foo2(){}
	}
	class B extends A{ // 继承

		public void foo1() {} // okay

		@Override
		public void foo2() { // 重载不合法
		}

		public void foo2(int a){} //合法 重写foo2方法
	}
```

分析：方法 父类A中foo2 被关键字final修饰后，子类B去重载这个方法就是不被允许的，而其他的多态形式如重写是被允许的。通常父类的某方法不被让子类去重载掉，保持此方法的一致性。

如下（为了方便，直接使用两个内部类作为例子）：

```
public class FinalMethod {

	public static void main(String[] args) {
		FinalMethod aFinalMethod = new FinalMethod();
		B b = aFinalMethod.new B();
		b.foo2(); // 保持了foo2方法的一致性，A的子类使用的是相同的foo2，A不希望此方法被修改。
	}

	class A{
		public void foo1(){}
		public final void foo2(){}
	}

	class B extends A{ // 继承
		public void foo1() {} // okay
		//public void foo2(int a){} //合法 重写foo2方法
	}

}
```

三、final variable（变量）：

就像本文开头叙述的一样修饰基本型变量和修饰引用型变量，看下面两种变量：

```
final int a = 10；
a = 1;//error 不允许
final List<String> list = new ArrayList<String>();
list.add("str");//okay
```

```
list = new ArrayList<String>();// error 不被允许
```

分析： 基本型 a final 修饰赋值后不能被改变。 final修饰list 引用，只要不被赋值，此对象可以变化，而这个引用不允许被修改为另一个引用。

修饰变量需要提到如下两种：

3.1、blank final： is a final variable whose declaration lacks an initializer 一个声明缺少初始化的final变量。如下是合法的：

```
for(final String str: strList){
//do in loop;
}
```

分析：可以这样去理解，变量作用域问题，每次循环是一个新的执行块，那么这样的final声明是合法的。

3.2、匿名内部类使用外部变量final修饰

为什么需要final修饰？

当一个匿名内部类的定义是自身内的一种方法，所有的变量声明为final的范围，方法是从内部类访问。一旦它已经被分配，最后的变量的值不能改变的。这将允许Java编译器来“捕获”的变量值在运行时间和存储一份内部类中作为一个字段。一旦外部方法已经终止和它的堆栈帧已被删除，原来的变量收回了，但自己的内存在类的内部类的私有副本仍然存在。

```
	public static void main(String[] args) {
		// String aString  = "haha~";// 无法被调用 不合法
		final String aString  = "haha~"; // okay
		Thread a = new Thread(new Runnable() {
			@Override
			public void run() {
				System.out.println(aString);// 调用外部变量
			}
		});
		a.start();
	}
```

分析：结合上述原理，aString在内部类实际为outer的副本，那么就必须保证aString不能被改变，内部类调用外部变量的原理为自身存储外部变量的副本，那么保证数据一致性，在设计方面就限定了被调用的外部变量需要final修饰。

\-----------------------------------

code文件：[FinalInner.java](https://github.com/yangl326-Dylan/analysis_and_designer/blob/master/src/blog/FinalInner.java) [FinalVariables.java](https://github.com/yangl326-Dylan/analysis_and_designer/blob/master/src/blog/FinalVariables.java) [FinalMethod.java](https://github.com/yangl326-Dylan/analysis_and_designer/blob/master/src/blog/FinalMethod.java)

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
