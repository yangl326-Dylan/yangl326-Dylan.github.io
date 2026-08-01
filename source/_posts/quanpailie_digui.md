title: 全排列问题-递归
date: 2017-06-23	22:28
category:

- 算法

tags:

- 脑子秀逗
- 递归

---

## 分析

全排列是一个常见的算法逻辑题，对于例子{1,2,3}来说它的全排列：A33=6个，枚举结果如下：

> 1,2,3
>
> 1,3,2
>
> 2,1,3
>
> 2,3,1
>
> 3,1,2
>
> 3,2,1

> > 每个元素作为首位，剩下元素的全排列：

这句话如何理解挺关键，是整个递归思路的总结，我们按照两个步骤来分析

<!-- more -->

#### 步骤1

“剩下元素的全排列” 实际上就是一个递归的语句，它的结束条件是剩下元素只有一个元素了，那么前面的元素全部固定，和剩下的这个最后元素组成的结果就是全排列的一个序列。

#### 步骤2

>每个元素放置到首位

元素作为首位，实际也存在一个递归的理解。 如例子中的1开头，剩余元素的子问题中，2也做过首位等。

## 编码思路

代码及注解

```java
public static void printFullArray(int[] a, int start, int end) {
        if (start == end) {
            System.out.println(Arrays.toString(a)); // 打印数组
        } else {
            for (int i = start; i <= end; i++) {// start到end的全排列 数组索引位置
                swap(a, start, i);// 从index=0开始交换。作为首位的元素
                printFullArray(a, start + 1, end);//剩余元素的全排列
                swap(a, start, i);// 数据需要复原；可以看某次递归深度的执行，即之后的每个元素交换到前面， 所以每次都是初始的复原位置开始
            }
        }

    }
```

全排列递归：[C1FullArray.java](https://github.com/yangl326-Dylan/apus/blob/master/src/main/java/com/dylan326/justcode/C1FullArray.java)

引申问题：元素存在相同如何处理 如{1,2,2,3}。加上判定，交换或者作为开头的元素是之前未处理过的。

---

**版权声明：本文为博主原创文章，未经允许不得转载。**
