---
layout: blog
title: "Algorithms With Python: Part 2 - Selection Sort and Insertion Sort"
description: In our first installment of this series, we covered two common
  search algorithms. We saw that binary search has a much slower rate of growth
  than linear search, when it comes to an ordered list. Therefore, if we know we
  will be using binary search in our code, it would make sense for us to make
  sure whatever list we are searching is arranged in ascending or descending
  order. That is precisely what a sorting algorithm is for. In this post we will
  be looking at selection sort and insertion sort, and analyzing their
  performance.
content: python
stage: "publish"
date: 2017-05-20T02:02:55.984Z
thumbnail: /images/uploads/python.png
---




In our [first installment of this series](https://ralphdugue.com/tech/2022-12-14-algorithms-with-python-part-1-intro-linear-search-and-binary-search), we covered two common search algorithms. We saw that binary search has a much slower rate of growth than linear search, when it comes to an ordered list. Therefore, if we know we will be using binary search in our code, it would make sense for us to make sure whatever list we are searching is arranged in ascending or descending order. That is precisely what a sorting algorithm is for. In this post we will be looking at **selection sort** and i**nsertion sort**, and analyzing their performance.



<!--StartFragment-->

# Selection Sort

Selection sort is an algorithm where we continuously find the next smallest(or inversely the largest depending on how we’re sorting) item in a list, and swap it into it’s correct position. To break it down further, selection sort breaks a list into two parts: a sorted list, and an unsorted list. So basically, every time the smallest item in the unsorted list is found, it is removed from the unsorted list and added to the end of the sorted list. As usual, let’s break the steps down with some pseudocode before implementing in Python:

<!--EndFragment-->

<!--StartFragment-->

## Pseudocode

1. Let *s* be our sorted list, *u* be our unsorted list, and *x* be the current smallest item in our unsorted list.
2. Find the index of *x* in *u*.
3. Remove *x* from *u*, and add *x* to the end of *s*.
4. If *u* is not empty, return to step 2.
5. If *u* is empty, we are done

<!--EndFragment-->

<!--StartFragment-->

## Code

Now that we have our steps laid out, let’s take a look at the implementation for a given list of integers:

<!--EndFragment-->

```python
def selectionSort(u):
	s = []
	def findSmallest(l):
		x = l[0]
		for i in l:
			if i < x:
				x = i
		return l.index(x)
	while len(u) > 0:
		x = findSmallest(u)
		s.append(u.pop(x))
	return s
```

<!--StartFragment-->

There are two main parts to our selection sort function here. The first is an inner function, that finds the smallest value in a given list, and returns it’s index. This inner function is what satisfies step two in our pseudo-code. The second part is the while loop, that continually checks the length of our unsorted list, as we remove items from it to place in our sorted list. We use the [list functions](https://docs.python.org/2/tutorial/datastructures.html) append and pop, respectively, to add and remove items from our list.

<!--EndFragment-->

<!--StartFragment-->

## Analysis

When calculating the running time for this algorithm, there are three main parts to consider:

1. The time it takes the the inner function (*findSmallest*) to execute.
2. The time it takes to move one item from the unsorted list, to the sorted list.
3. And finally the time it the while loop to check the current size of the unsorted list.

If we think about this in terms of the size of our given unsorted list, let’s call this *n*, we know each of these parts will execute *n* times. Parts 2 and 3 have a constant execution time, regardless of the value of *n,* so we can say that both their running times will be *f(n)*(or some function with constants alongside *n*)*.* Since *n* is then the most significant part in that equation, parts 2 and 3 can be said to have *O(n)* running time.

We also know that the loop inside our inner function will execute *n* times on the first run of our main while loop, then *n-1* times, then *n-2* times, and so on until it can only execute *1* time. We have to sum up this sequence of values, known as an [arithmetic series](https://www.khanacademy.org/math/calculus-home/series-calc/series-calculus/v/formula-for-arithmetic-series), to get the running time of this part in the algorithm. Our arithmetic series goes from n to 1, so if we plug these values into the arithmetic series formula, our running time is *(n+1)(n/2)* or *n²​/2+n/2* when simplified. The most significant part of this equation(or the part that grows the fastest) is *n²,* so *O(n²)* is our running time for part 1. Since *O(n²)* is a more significant rate of growth than *O(n)*, we can say that the running time for selection sort is *O(n²)* for all cases*.* More accurately, we could say that the running time is *Θ(n​²​​)*(using [big-Theta notation](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-big-theta-notation))for all cases, since the running time is never better than *O(n²).* This means even when our list is already sorted, this algorithm will make the same number of comparisons while executing.

The running time of selection sort is a polynomial function. Polynomial functions are second only to exponential functions, in terms of how fast they grow as the input size increases. So as our input size increases, selection sort quickly becomes inefficient.

<!--EndFragment-->

<!--StartFragment-->

# Insertion Sort

Insertion sort is very similar to selection sort. Like selection sort, it can be thought of as splitting a list of items into a sorted and unsorted list. The difference is that with insertion sort, we start at the beginning of the unsorted list, and place each item into their correct position in the sorted list. We can’t just place the item at the end of our sorted list, as with selection sort, because we have no guarantees it is the next smallest item from the unsorted list. It’s time for some pseudocode again:

## Pseudocode

1. Let *s* be our sorted list, *u* be our unsorted list, and *x* be the index of the next value in *u,* starting at 0.
2. Remove the value at *x*, and insert it in it’s correct position *s*.
3. Increment *x* by 1.
4. If *x* is less than *n*, where *n* is the initial size of *u*, return to step 2.
5. If *x* is not less than *n*, we are done.

## Code

Same number of steps from our selection sort. Let’s see how are the code compares:

<!--EndFragment-->

```python
def insertionSort(u=[]):
    s = []
    def insert(x, s=[]):
        if len(s) < 1:
            s.append(x)
        else:
            for i in s:
                if x <= i:
                    s.insert(s.index(i), x)
                    break
                elif s.index(i) == len(s) - 1:
                    s.append(x)
                    break
        return s
    while len(u) > 0:
        s = insert(u.pop(0), s)
    return s
```

<!--StartFragment-->

Structurally, it is very similar to our selection sort code. We have an inner function again(*insert*), which inserts a given item into it’s correct position in a given list. We then have a while loop that uses that inner function to move items to our sorted list, and continuously checks if there are items left in our unsorted list.

## Analysis

Once again we have three parts to consider for the running time:

1. The time it takes the the inner function (*insert*) to execute.
2. The time it takes to move one item from the unsorted list, to the sorted list.
3. And finally the time it the while loop to check the current size of the unsorted list.

As with selection sort, we know that parts 2 and 3 take constant time, as it pertains to the input size of a given list. This gives them *O(n)* running time, where *n* is again the initial size . Part 1, like our inner function from selection sort, has a running time of *O(n²),* that can be calculated with the arithmetic series equation*.* And as part 1 is our most significant part, we can say that selection sort runs in *O(n²)* for all cases. However, unlike selection sort, we can’t say that insertion sort runs in *Θ(n​²​​)* time for all cases.

Insertion sort actually performs better, the closer to sorted our list is. For example, if our list is already completely sorted, which would be our best case scenario, we can say that this algorithm runs in *Θ(n)* time. This is because our inner function will only have to do *1* comparison each time it is called, and it will be called *n* times. This is a pretty significant improvement from selection sort for this case. It otherwise suffers from the same growth rate issue as selection sort.

<!--EndFragment-->

<!--StartFragment-->

That is is it for selection and insertion sort!

<!--EndFragment-->