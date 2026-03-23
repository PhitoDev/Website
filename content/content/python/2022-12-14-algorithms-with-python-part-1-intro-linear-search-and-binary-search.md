---
layout: blog
title: "Algorithms With Python: Part 1 - Intro, Linear Search and Binary Search"
description: This is the beginning of a series on writing common computer
  science algorithms, with some brief analysis. I will be using Khan Academy’s
  course on algorithms as reference, and I will be implementing all the
  algorithms that are discussed in Python. In this post I will be tackling
  linear search and binary search.
content: python
stage: "publish"
date: 2017-04-29T02:08:33.750Z
thumbnail: /images/uploads/python.png
---
# Algorithms With Python: Part 1 - Intro, Linear Search and Binary Search

This is the beginning of a series on writing common computer science algorithms, with some brief analysis. I will be using [Khan Academy’s course](https://www.khanacademy.org/computing/computer-science/algorithms) on algorithms as reference, and I will be implementing all the algorithms that are discussed in Python. In this post I will be tackling linear search and binary search.

## What exactly is an algorithm?

An algorithm is simply a step of rules or procedures to be followed, in order to obtain a certain result or value. It’s actually a very simple concept, and it is also the basis of what software developers do everyday. We write algorithms in programming languages for computers to interpret and follow.

## Analysis of an Algorithm

When analyzing the efficiency of an algorithm, there are two main concepts we need to concern ourselves with. The first concept is the running time of an algorithm; the second is the rate of growth of that running time.

* There are many external factors that can affect the time it takes an algorithm to run. For example, we could look at the processing power of the computer running the algorithm, or even the efficiency of the programming language that the algorithm is being run in. But for algorithm analysis, we want to think of running time in terms of a given algorithm’s input size. We consider the input size to be the variable factor in an algorithm’s running time.
* The rate of growth measures how the running time of an algorithm increases as the input size increases. We take the most significant part of a given running time equation, and disregard the rest. We use [asymptotic notation](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation) to express this. There are a few different forms for asymptotic notation, but we will mainly focus on big-O notation, because it tends to be the most effective at describing worst-case running time.

---

## Linear Search

A linear search is the most basic algorithm for finding a specific value within a list or an array. Basically, you search sequentially through the list , checking every item, until you find the specified value. Before writing the code, let’s break down the steps in this algorithm for a list of 100 numbers, going from 1 to 100:

1. Let our target value be defined as v, our list of numbers be defined as l, and the current number in l be defined as x.. 
2. Set x equal to the first value in 
3. Check if x is equal to v.
4. If it isn’t equal to v, go to the next value in l, return to step 3.
5. If it is equal to v, we have found our item and we are done!
6. If we get to the last value in l(100), and it does not equal v, then v is out of the acceptable range we defined.

Now that we have our steps laid out, it becomes a simple matter of converting them into a Python function:

```python
def linearSearch(v):
	l = range(1, 101)
	for x in l:
		if x == v:
			return str(v) + ' is in the range 1-100'
	else:
		return str(v) + ' is not in the range 1-100'
```

This is pretty straightforward. No complex data structures needed here. We use Python’s handy [range function](https://docs.python.org/3/library/functions.html#func-range) to create a list of integers from 1 to 100, and then we use a for-loop to iterate through that list. The else statement handles step of the algorithm, which deals with values outside of our specified range.

For the case of linear search, we would say that the running time is f(n), where n is the size of our list(100), and the rate of growth is O(n). This simply means that the running time is some function of n that factors in all the constants that the algorithm needs to run, and the rate of growth is at most k* n, where k is some random constant that is greater than 0.

To put it really simply, in the worst case, linear search will have to check every single item in the list. If you are a developer, you will likely find yourself implementing some form of a linear search quite often. However, for an ordered list of values, it scales really terribly. There is a much more efficient algorithm for this case.

---

## Binary Search

In a binary search algorithm, we check for a specified value by checking the middle of the list . We then remove all the values that were too high or too low, and then check the middle of the list again. We repeat this process until we find our specified value, cutting the list in half at every check. As we did with linear search, let’s breakdown our steps before implementing the algorithm in Python:

1. Let our index for the start of our list(s) equal 0, and our index for the end(e) equal n-1, where n is the number of items in the list.
2. If s is greater than e, then v is outside the expected range.
3. Let our current guess(x) equal to (e + s)/2.
4. If our target value(v) equals x, we are done.
5. If x is greater than v, set s equal to x+1, return to step 2.
6. If x is less than v, set e equal to x-1, return to step 2.
   There is a little more to this than linear search, but this is still relatively easy to implement. We’ll stay with the example of a list of integers from 1 to 100:

```python
def binarySearch(v):
	l = range(1, 101)
	s = 0
	e = len(l) - 1
	while s <= e:
		x = (e + s)//2
		if v == l\[x]:
			return str(v) + ' is in the range of 1-100'
		elif v < l\[x]:
			e = x - 1
		elif v > l\[x]:
			s = x + 1
	else:
		return str(v) + ' is not in the range of 1-100'
```

We use the range function again to create our list, and then we initialize the start and end indexes. We use the [len function](https://docs.python.org/3/library/functions.html#len) to get the index of the last item in the list. Instead of the for-loop, we’re going with the while-loop since it makes more intuitive sense when we’re not iterating through every item in l. As with our linear search function, the else statement handles inputs that are outside the range of 1 to 100.

For binary search, we say the running time f(lg n), and the rate of growth is O(lg n). If you are not familiar with logarithms, lg is shorthand for base-2-logarithm. So in other words, for our example of numbers from 1 to 100, it would take at most 7 guesses to get our target value using this algorithm. We get this by calculating lg 100, and since this evaluates to some decimal value between 6 and 7, we know we can halve the list 6 times and make 7 guesses. The 7th guess will either be our target value, or the target value isn’t in the range.

That’s pretty much all there is to these algorithms. Feel free to ask questions, or critique!