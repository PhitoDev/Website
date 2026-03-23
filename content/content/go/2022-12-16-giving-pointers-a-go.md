---
layout: blog
title: Giving Pointers a Go
description: This is an exploration into how pointers work in the Go programming
  language. It is a breakdown of what they are, the syntax of how they are used,
  and the appropriate use cases for them.
content: go
stage: "publish"
date: 2017-12-14T03:37:38.083Z
thumbnail: /images/uploads/gopher.png
---
# Giving Pointers a Go

Pointers were a tricky concept for me when I first started learning C++ and computer science in general. Over the years, I found myself avoiding languages and code-bases that make use of them. However I have been interested in learning Go, and it just so happens to have pointers. I decided that, in learning Go, I should do my due diligence to fully understand how pointers work and when to use them. Let’s first dive into exactly what a pointer is in Go.

---

## What Are They?

To understand pointers, we must understand a type of computer data storage called [random access memory (RAM)](https://en.wikipedia.org/wiki/Random-access_memory). RAM stores data in memory cells, and these cells have unique identifiers. We refer to these identifiers as addresses, and this where pointers and variables come into play.

Let’s say we write a computer program(not necessarily in Go, any language works for this explanation). In this program, we create a variable and assign it a value. When we run this program, the value is stored in memory cells and the variable refers to that value. So then if we were to change the value of this variable, we would just be writing over the current data at that address of memory cells. But what if we needed to assign another variable to that same address?

In Go, a pointer is a type of variable that points to an address of memory cells, as to the value at said address. We can still access and manipulate the value at that address like a non-pointer variable, but pointers give us the ability to point several variables, via an address, to a shared value. Like in C/C++, we use the * operator to declare a new pointer. We can declare a new pointer variable without initializing it, we can declare and assign one to the address of an existing variable, or we can declare and initialize one to a default value. Let’s take a look at some code examples.

---

## How Do They Work?

```go
package main
import "fmt"
func main() {
 a := 42
 var pointer1 *int
 pointer1 = &a
 pointer2 := new(int)
 fmt.Println("The value of a is: ", a)
 fmt.Println("The value at pointer1 is: ", *pointer1)
 fmt.Println("The value at pointer2 is: ",*pointer2)
}
```

The meat of the code begins at line six, where we declare the integer variable a and assign it the value 42. We do this using Go’s := syntax, which is a shorthand for declaring and initializing a variable.

The very next line is where we declare our first pointer, pointer1. The * symbol before the value type (int) is used denote that this is a pointer.

On line eight, we set pointer1 equal to the address of a; this is done by adding the & operator in front of a. The & in front of a variable means that we want the memory address, and not the world value of the variable. Keep in mind that if a was a pointer we would not need to use the & operator in front of it to get the memory address (although if we did, it would still give us the address).

Line nine creates our second pointer pointer2, using using the new operator. Notice that we once again use := here, which causes the type to be inferred from the operand. This method initializes the pointer to a default value (for an int the default value is 0).

The next three lines print the contents at a, pointer1 and pointer2 respectively, to the console. Notice that to specify we want the value stored at the address the pointer points to, we once again use the  *symbol; this is commonly referred to as dereferencing. Otherwise if we were to just print pointer1 and pointer2 without the*  symbol, the actual memory address would be printed. Here is what will be printed to the console when this code executes:

```
The value of a is: 42
The value at pointer1 is: 42
The value at pointer1 is: 0
```

Now that we have created some pointers, let’s take a look how modifying the data at address a works:

```go
package main
import "fmt"
func main() {
 a := 42
 var pointer1 *int
 pointer1 = &a
 pointer2 := new(int)
 fmt.Println("The value of a is: ", a)
 fmt.Println("The value at pointer1 is: ", *pointer1)
 fmt.Println("The value at pointer2 is: ",*pointer2)
 a = 24
 fmt.Println("The new value of a is: ", a)
 fmt.Println("The value at pointer1 is now: ", *pointer1)
 fmt.Println("The value at pointer2 is still: ",*pointer2)
}
```

On line thirteen we changed the value at a to 24. Let’s look at our new output to see how it’s changed:

```
The new value of a is: 24
The value at pointer1 is now: 24
The value at pointer2 is still: 0
```

Notice that pointer1 is also 24 now. This is because a and pointer1 point to the same address in memory.

We can also edit the value at this memory address via the pointers. Let’s add an example of this to our code:

```go
package main
import "fmt"
func main() {
 a := 42
 var pointer1 *int
 pointer1 = &a
 pointer2 := new(int)
 fmt.Println("The value of a is: ", a)
 fmt.Println("The value at pointer1 is: ",* pointer1)
 fmt.Println("The value at pointer2 is: ", *pointer2)
 a = 24
 fmt.Println("The new value of a is: ", a)
 fmt.Println("The value at pointer1 is now: ",* pointer1)
 fmt.Println("The value at pointer2 is still: ", *pointer2)*
 pointer2 = 12
 fmt.Println("The value of a is still: ", a)
 fmt.Println("The value at pointer1 is still: ", *pointer1)
 fmt.Println("The value at pointer2 is now: ",* pointer2)
}
```

On line seventeen we change the value of pointer2. Let’s see our new output:

```
The value of a is still: 24
The value at pointer1 is still: 24
The value at pointer2 is now: 12
```

This pretty much covers the different operations we can perform with pointers in Go. Now let’s discuss when we might want to make use of them.

---

## What Are The Use Cases?

There is a lot of discussion to be found on when it is appropriate or necessary to use pointers. The main things we want to consider are the variable type, and what operations need to be performed with the data being passed around.

Maps and slices are implemented with an underlying pointer to the data that they represent. This means that even if we pass these types of variables as values, we are actually creating a new pointer to the underlying data. This [blog on slices](https://go.dev/blog/slices) goes into detail on how they are implemented, and helps to understand why we don’t need to pass a pointer with these types.

Larger and more complex structs on the other hand, can become quite expensive when copying them in memory, so having different pointers to one address will often make sense where explicit copies aren’t necessary. With primitive data types however, it is usually simpler to pass the value as opposed to a pointer. We used a primitive data type(int) in the code examples above for the sake of simplicity, but generally speaking, it is actually simpler to to pass the value of the variable. This makes keeping track of when the value of said variable changes less complex.

Another case to consider is when we want a function or method to change the value of the variable that is passed to it (whether it be a receiver or a parameter). If we were to simply pass a non-pointer variable in this case, a copy of the value of that variable would be stored at a new memory address. This would not give us the ability to manipulate the parameter or receiver that was originally passed to the function. So in this case we should pass a pointer to the variable, giving us access to the value at that specific address. [The Golang Github wiki](https://github.com/golang/go/wiki/CodeReviewComments#receiver-type) gives some pretty detailed guidelines on using pointers with methods.

---

## Further Reading

This is far from an exhaustive article on everything pointers. It is however enough to get started with. Here are some references on the topic that were helpful to me while writing this and learning in general:

* [http://goinbigdata.com/golang-pass-by-pointer-vs-pass-by-value/](https://codewithyury.com/golang-pass-by-pointer-vs-pass-by-value/)
* [https://www.golang-book.com/books/intro/8](https://www.golang-book.com/books/intro/8)
* [https://dave.cheney.net/2017/04/26/understand-go-pointers-in-less-than-800-words-or-your-money-back](https://dave.cheney.net/2017/04/26/understand-go-pointers-in-less-than-800-words-or-your-money-back)
* [https://www.ardanlabs.com/blog/2014/12/using-pointers-in-go.html](https://www.ardanlabs.com/blog/2014/12/using-pointers-in-go.html)

Per usual feel free to comment on the topic, or how I can make my content more friendly to newer coders or developers.