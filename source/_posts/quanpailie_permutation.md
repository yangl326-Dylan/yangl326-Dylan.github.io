title: 全排列问题-字典序
date: 2017-07-06	20:18
category:

- 算法

tags:

- 脑子秀逗
- 全排列

------

## 分析

上一篇是全排列的递归解法，现在按照字典序的解法处理：

> 1,2,3
>
> 1,3,2

> > 给出一个数字排列的最小字典序，找到他的下一个字典序， 直到到达最大字典序值

1,2,3->3,2,1 中间的过程即为全排列的过程

<!-- more -->

#### 字典序含义

从左到右按照位置比较，按照依次增大的顺序排列，例如123，12，21，1，2。的字典序排序后是1，12，123，2，21。

#### 下一个序列

> 1、从右到左，找到第一个邻位递减的数a
>
> 2、找a右边比自己大的，最接近自己的数b
>
> 3、交换a,b位置
>
> 4、 对b右边的数字从小到大排列，即找到字典序的下一个序列

以数字举例:746532,步骤：

1、找到第一个邻位递减46中的4

2、找到比4大的最小数5

3、交换4，5。即：756432

4、5右边数据排序，即：752346

746532下一个序列就是752346

## 编码思路

代码及注解

```java
    //{1,2,6,5,4,3,0}
    public static int[] nextOrder(int[] a) {
        int flag = -1;
        int index = 0;
        for (int i = a.length - 1; i > 0; i--) { //找到第一个邻位递减的， 记录位置index
            if (a[i] > a[i - 1]) {
                flag = a[i - 1];
                index = i - 1;
                break;
            }
        }

        if (flag == -1) { // 没找到下一个， 直接返回自己
           /* for (int i = 0, j = a.length - 1; i < j; i++, j--) {  // 注释部分表示没有下一个 从头开始
                swap(a,i,j);
            }*/
            return a;
        }

        int delta = Integer.MAX_VALUE;
        int indexSwap = 0;
        for (int i = index + 1; i < a.length; i++) { // 找到index之后第一个比index位置值大的索引位置indexswap
            if (a[i] > flag && (a[i] - flag) < delta) {
                delta = (a[i] - flag);
                indexSwap = i;
            }
        }

        swap(a, index, indexSwap); // 交换 index  indexswap 两索引位置的值
        sortIncr(a, index + 1, a.length); // 对index 之后的位置升序排列
        return a;
    }
```

全排列：[C2DicOrder.java](https://github.com/yangl326-Dylan/apus/blob/master/src/main/java/com/dylan326/justcode/C2DicOrder.java) [C3Permutation.java](https://github.com/yangl326-Dylan/apus/blob/master/src/main/java/com/dylan326/justcode/C3Permutation.java)

------

**版权声明：本文为博主原创文章，未经允许不得转载。**
