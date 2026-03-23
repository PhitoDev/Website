---
layout: blog
title: "Algorithms With Python: Part 3 — Recursive Algorithms, Powers and Palindromes"
description: "Previously we covered search and sort algorithms. In this
  installment we will take a look at recursive algorithms. Recursion is a very
  useful technique for breaking down complex problems. It is the process of
  solving a problem by solving smaller instances of that problem, and then using
  that to solve the original problem. Basically, you continuously look for
  smaller instances of a problem until you hit the base case: where the problem
  is trivial to compute."
content: python
stage: "publish"
date: 2017-11-08T03:33:45.927Z
thumbnail: /images/uploads/python.png
---






<!--StartFragment-->

Previously we covered [search](https://medium.com/@rdugue1/algorithms-with-python-part-1-intro-linear-search-and-binary-search-f47dccff4cff) and [sort](https://medium.com/@rdugue1/algorithms-with-python-part-2-selection-sort-and-insertion-sort-988d1fc948b7) algorithms. In this installment we will take a look at recursive algorithms. Recursion is a very useful technique for breaking down complex problems. It is the process of solving a problem by solving smaller instances of that problem, and then using that to solve the original problem. Basically, you continuously look for smaller instances of a problem until you hit the **base case**: where the problem is trivial to compute. We then use that base case to solve the preceding version of our problem, and so on, and so on, until we have solved our original problem.

We will implement two recursive functions in this blog post. One function will determine if a word, or a sequence of characters, is a palindrome. The other will calculate a number raised to a given power. These are two very different problems, and demonstrate the versatility of recursive algorithms.

<!--EndFragment-->

<!--StartFragment-->

# Palindromes

A [palindrome](https://en.wikipedia.org/wiki/Palindrome) is a word or, for our purposes, a string of characters, that is spelled the same forward and backwards. For example, the word racecar is a well known palindrome, as it is spelled the exact same way in reverse. For the purpose of this exercise we will also consider a single character to be a palindrome, and this case will serve as our base case for the recursive operations. As always, let’s look at some pseudocode before writing our solution:

## Pseudocode

1. Let *word* be any string consisting solely of letters.
2. If *word* is one character or less, then *word* is a palindrome.
3. Otherwise get the *first* and *last* characters in *word,* and check if they’re equal.
4. If they are not equal, then *word* is not a palindrome, we are done.
5. Otherwise remove the first and last characters from *word,* and return to step 2.

Let’s step through our pseudocode with a few examples, to verify how it works. We’ll use “bob” as our first example:

1. “bob” is alphabetical, so it meets our requirements for valid input.
2. “bob” has more than one character, so it does not pass this check.
3. The first and last characters in “bob” are both “b,” so they are equal.
4. Since the first and last characters are equal, this check doesn’t pass either and we move on to step 5.
5. If we remove the first and last characters from “bob,” we just have “o.” And once we return to step 2, it will pass that test. Therefore, “bob” is a palindrome.

Next let’s try the word “to” with our pseudocode:

1. Once again “to” is alphabetical, so we’re good on this check.
2. “To” is is two characters, and therefore does not pass this check.
3. The first and last characters are not the equal.
4. “To” is not a palindrome based on the result of step 3.

## Code



<!--EndFragment-->

```python
def is_palindrome(word):
    if len(word) <= 1:
        return True
    elif word[0] != word[-1]:
        return False
    new_word = word[1:-1]
    return is_palindrome(new_word)
```

<!--StartFragment-->

Here we use the [len](https://docs.python.org/3/library/functions.html#len) function to check if word is one character. We previously stated that this would be our base case for what a palindrome is, so we return true when it occurs. We then get the first and last characters in the following two lines. The following lines are the conditionals to handle steps 4 to 6. Lines 6 and 7 specifically, are the recursive steps. We remove the previously tested characters from the current word by [slicing](https://developers.google.com/edu/python/strings#string-slices). The slice syntax has a first and last index, separated by a colon. It grabs the characters starting from the first index, and ending at, but not including, the last index. Finally we call this function inside of itself with the new word as the parameter.

<!--EndFragment-->

<!--StartFragment-->

## Analysis

First let’s list all the parts to consider for the running time of this function(let’s call this *T(n)* going forward, where *n* is the length of a given word):

1. The time it takes to check if the word is one character or less.
2. The time it takes to check if the first and last characters are not equal.
3. The time it takes to return true or false.
4. The time it takes to remove the first and last character from the current word.
5. The time it takes the recursive function call to return a value.

Parts one and two are simple comparison operations, so we can assume they will all take some constant time, depending on the system running the code. The same is true for part three, as its just returning a value. The fourth part will also take a constant amount of time, since we already know which characters we are removing from the word. Part five is where we make the recursive call, and it is the only part that whose running time increases as the length of our word increases. Since our goal is to analyze the time complexity of the algorithm, and not the system it runs on, let’s define an imaginary test system. On this system, let’s say that all the operations we’ve outlined, with the exception of the recursive function call, take the same constant time to execute; we’ll say that it is one unit of time.

Based on our function, we can say *T(n) = 2 while n ≤ 1*. Meaning when our word is less than 2 characters, the running time will be 2 units. We get 1 unit would be from checking the length of the word, and another unit for returning a true value.

Let’s now define *a* and *b* as the first and last characters of a given word, respectively. We can now express the running time as *T(n) = T(n-2) + 4, while n > 1 and a = b*. Before each recursive call, we reduce the length of the word by two by removing the first and last character.

This is why we can say *T(n-2)* is the running time of the recursive operation; two represents the characters removed thus far. The 4 comes from adding up the units of time required for all the operations, excluding the recursive one, that execute when *n > 1*.

Now let’s define *c* as the characters removed thus far in the recursive operation. For example in *T(n) = T(n-2) + 4*, *c* would be *2.*

This allows us to write *T(n) = T(n-c) + 2c.* Now let’s say *n-c = 0*; this would mean that we could write *T(n) = T(0) + 3c* or *T(n) = 2 + 3c*. And since *n-c = 0* means *n = c*, we can write the running time as *T(n) = 2 + 3n*.

In this simplified form of our running time equation, we can see that *n* is the only non-constant. This means that it is our most significant factor, and we can say that our palindromes algorithm has *O(n)* time complexity.

<!--EndFragment-->

<!--StartFragment-->

# Calculating Powers

For our second example, we will write an algorithm to calculate a given number raised to a given power. This means that if our function is passed the values 4 and 2, it will evaluate 4². This function should also be able to handle negative exponents. Let’s go ahead and write out the pseudocode to plan our function implementation:

## Pseudocode

1. Let *power* be the power we are raising our given number to, and *number* be our given number.
2. If *power* is 0, return 1.
3. If *power* is negative, raise the reciprocal of *number* to the absolute value of *power*, and return the result.
4. Otherwise if *power* is odd, return *number* * *number*^(*power-1).*
5. Otherwise if *power* is even, raise *number* to *power/2* and return the result squared.

Let’s try our psuedocode with the values 3, 4, and -2 for *power*. We will use 2 as our *number* for all cases because it stays constant throughout all steps. This will allow us to check the odd, even and negative cases of our pseudocode. We’ll start with 3:

1. So for this case we are evaluating 2³.
2. 3 is not 0, so we don’t return 1.
3. 3 is not negative, so we don’t perform the operations of this step.
4. 3 is odd, so we will evaluate 2\*2². If we run 2² through our pseudocode steps, it will lead to step 5 and evaluate to 2¹\*2¹ = 2\*2 = 4. We then evaluate 2\*4 = 8.

Next we will follow the steps with 4:

1. For this case we are evaluating 2⁴.
2. 4 is not 0, so we don’t return 1.
3. 4 is not negative, so we don’t perform the operations of this step.
4. 4 is not odd, so we can also skip the step 4 operations.
5. 4 is even, so we will evaluate 2²\*2². For each 2², we will end up at another step 5, and we already know they evaluate to 4 from our previous example. So then all that’s left to do is 4\*4 = 16

Finally let’s try with -2:

1. 2^-2 is what we are evaluating.
2. \-2 is not 0, so we don’t return 1.
3. \-2 is negative, so we need to evaluate 1/2². As we have already seen, 2² will evaluate to 4, so our result is 1/4.

Now we can move on to the python implementation.

## Code

<!--EndFragment-->

```python
def powers(number, power):
    if power == 0:
        return 1
    if power < 0:
        return 1 / powers(number, -power)
    if power % 2 != 0:
        return number * powers(number, power-1)
    else:
        num = powers(number, power/2)
        return num * num
```

<!--StartFragment-->

The code here is very straightforward. There are three different recursive calls that can execute depending on the value of the *power* parameter.

## Analysis

Let’s again list all the parts to consider for the running time of our function:

1. The time it takes to check if power is zero.
2. The time it takes to return a value.
3. The time it takes to check if power is less than zero.
4. The time it takes to perform any arithmetic operation.
5. The time it takes to for a recursive call to return.

We’ll borrow the process of defining an imaginary system to test our function from the palindromes example. Once again we’ll assign a value of one unit of time to all operations that aren’t recursive. And we will also continue to refer to the running time as *T(n)*, with *n* this time being a reference to the *power* parameter in our function. **This is because while both our parameters, number and power, are passed to each recursive call, only power is changed or reduced.** Number on the other hand, stays constant throughout recursive calls.

We should first evaluate the running time when *n* is zero. Only two operations are executed in this scenario:

* The check to see if *power* is zero
* The return statement that executes if that check passes

This adds up to two units of time, so we say *T(0) = 2*. Our next case is for when n is negative. There are six operations in this case:

* The check to see if *power* is zero again
* The check to see if it is less than zero
* The multiplication to get the absolute value of *power*
* The recursive call
* The division operation
* The operation to return the resulting value.

With this we are able to say *T(n) = T(-n) + 5 while n < 0. T(-n)* represents the running time of the recursive call, and the 5 is the cumulative time of the non-recursive steps.

The next case is for when *n* is greater than zero and odd. Following the process from the previous cases, we can see that there are 7 operations to consider. Only one of these is a recursive call, and that call passes *power-1* as a parameter. Therefore we can say, *T(n) = T(n-1) + 6 while n is odd and n > 0*.

Our final case is for when n is greater than 0 and even. This time there are 8 operations, so we can say *T(n) = T(n/2) + 7 while n is even and n > 0*.

Our case for when *n* is both positive and even works like a secondary base case. Meaning that our two other non-base cases(negative and odd) eventually lead to it for large values of *n*(in this case any value greater than one). For this reason, we will look at *T(n) = T(n/2) + 7* when trying to analyze the time complexity of our function.

This equation can also be written as *T(n) = T(n/4) + 14*, *or T(n) = T(n/8) + 21*, depending on the size of *n*. If we were to write this in a generic way, it would be *T(n) = T(n/ 2^k) + 7k*.

We also know that *T(1) = 8* based on *T(0)* and *T(n)* for odd cases. So if we wanted to write *T(n) = T(n/ 2^k) + 7k* in terms *of T(1),* we first need *n/ 2^k = 1.*

For that to be true, would also mean *n = 2^k*, which then means *k = log(n)*. Which finally leads us to *T(n) = 8 +7log(n)*. Seeing as the most significant *log(n)*, we can say that our function has a time complexity of *O(log(n))*.

That is it for this post on recursion! Once you understand the concept, writing recursive code becomes very simple and intuitive. It may even be tempting to use recursion in place of other looping structures whenever possible. However, recursion tends to have higher time and space complexity in exchange for simplicity of implementation. Recursion is a popular topic, so it shouldn’t be difficult to find resources that examine this further.

<!--EndFragment-->