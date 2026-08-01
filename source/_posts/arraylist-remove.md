title: ArrayList删除元素问题及问题扩展
date: 2013-06-11 13:29
category:

- JDK

tags:

- java
- collection

---

初学者容易犯错的细小问题，collection集合类（ArrayList list Hashmap）中移除元素问题。

其它集合会出现类似问题，java遍历中移除元素某些情况不会提示任何错误信息，因为是合法，但会引起数据问题，不易被发现。其他语言也类似如python按照dict的items去遍历出现del(key)会引发个错误。

所以遍历的时候一定得考虑是否对被遍历对象做过了修改，你去遍历的是什么对象，遍历的循环中操作的又是什么对象。

下面正对ArrayList移除某一对象问题做个分析：

问题：ArrayList<>String对象包含如下字符串  "a", "b", "c", "c", "d"。 现在我们需要移除所有的c字符串，都知道list的remove方法只能移除首次出现的这个对象。

于是很容易就想到遍历这个collection遇到c的移除掉，看如下代码：

缺省listA，B，C，D 四个相同的arraylist对象，移除所有c字符串。

```java
String[] tmp = {"a","b","c","c","d"};
		List<String> listA = new ArrayList<String>();
		List<String> listB = new ArrayList<String>();
		List<String> listC = new ArrayList<String>();
		List<String> listD = new ArrayList<String>();
		for(String str:tmp){
			listA.add(str);
			listB.add(str);
			listC.add(str);
			listD.add(str);
		}//listA B C D 装有相同tmp数组中的对象
```

容易犯错的代码：

```java
//listA.remove("c");//仅仅移除第一次出现的c，那么很容易想到去遍历遇到c都remove（索引）
		for (int i = 0; i < listA.size(); i++) {
			if (listA.get(i).equals("c")) {
				listA.remove(i);
			}
		}
		System.out.println(listA);// 结果：[a, b, c, d] 为什么第二个c没有被全部移除掉? 不会出现错误或者异常，见分析
```

分析：顺序遍历，循环的第3次 即索引2的位置的时候碰到第一个c的，移除掉，此时listA的大小改变了，而下次循环的时候2索引后面的元素实际索引都变化了。而循环的遍历索引变为3了从d开始，相邻的第二个c元素被跳过了，就是错误结果了。

解决方法有如下几种，还是希望明白本文开头的黑体字。

方法一：根据上述的分析那么最简单的方法便是倒序遍历

```java
//倒序移除
		for (int i = listB.size() -1; i>=0; i--) {
			if (listB.get(i).equals("c")) {
				listB.remove(i);
			}
		}
		System.out.println(listB); //结果：[a, b, d] 符合期望
```

分析：倒序遍历后 遍历过的元素因当前元素被移除而引起的索引变化已经无关紧要了，因为已经遍历过了。保证未遍历的索引不变化，那么所有的元素都会被处理到的。

方法二：使用removeAll，只不过它的参数是个集合，方法的定义是移除所有包含的所有元素。（注意‘所有包含’和‘所有’）

```java
//使用 removeAll包装起来需要移除的元素
		List<String> tmpDel = new ArrayList<String>();
		tmpDel.add("c");
		listC.removeAll(tmpDel);//移除tmpDel所包含的其 所有元素
		System.out.println(listC); //结果：[a, b, d] 符合期望
```

分析： 看removeAll的文档：它指的是移除所有包含的所有元素，两个所有。

方法三：

使用迭代器Iterator，使用的时候注意迭代器的原理。有些用法是错误的，比如说在迭代中修改被迭代的对象

```java
//使用迭代器 注意正确用法见注释部分
		Iterator<String> iterator = listD.iterator();
		while (iterator.hasNext()) {
			if(iterator.next().equals("c")){
				iterator.remove();
				//listD.remove("c"); // error Iterator是工作在一个独立的线程，不允许迭代的对象被改变，否则会并发异常
			};
			
		}
		System.out.println(listD); //结果：[a, b, d] 符合期望
```

分析：listD是被迭代的对象，Iterator被创建的时候，建立了一个内存索引表（单链表），这 个索引表指向原来的对象，当被迭代的对象改变的时候，这个索引表的内容没有同步改变，所以当索引指针往下移动的时候，便找不到要迭代的对象，使用注释的代码会产生错误。

---

**版权声明：本文为博主原创文章，未经允许不得转载。**