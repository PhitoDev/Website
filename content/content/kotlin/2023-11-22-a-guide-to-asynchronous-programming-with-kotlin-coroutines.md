---
layout: blog
title: A Guide to Asynchronous Programming with Kotlin Coroutines Part 1
description: As a software developer, asynchronous programming is key to building efficient applications. This blog post goes over the core concepts of asynchronous programming, and how the Kotlin Coroutines library provides us with tools to simplify asynchronous programming in our applications.
content: kotlin
stage: publish
date: 2023-11-22T01:31:29.425Z
thumbnail: /images/uploads/kotlin.png
---
# Introduction: Asynchronous Programming Basics

Asynchronous programming patterns are the cornerstones of modern software development. These patterns have been implemented across  virtually every modern programming language, and are fundamental to enabling developers to build efficient and maintainable software. This blog series will go over the core concepts behind asynchronous programming, and how Kotlin developers can utilize the coroutines library to write clean asynchronous code! Let's start by delving into exactly what we mean by asynchronous programming:

* **Non-blocking execution** - In software development, this refers to the practice of writing code that does not block the execution of subsequent code.  A very standard example of this is when dealing with an application that requires retrieving information from an API or backend service . Commonly when performing this task, the user needs to be notified somehow that the application is doing work to retrieve some information; this can be achieved with some form of loading screen or indicator. Point being, the task to make a request to the back end service should not block the operation that updates the user interface with a loading indicator(hence the term non-blocking). 
* **Concurrency** - This refers to the ability to manage multiple tasks over a period of time. To continue with our above example, we have a task to retrieve data from an API and a task to set a loading state for our UI. Let's now add a task to update the UI once we receive a response from the API request. Because of how they depend on each other, we can group them together and say these three are concurrent tasks. Non-blocking execution is used to enable concurrency,  which is needed to effectively manage **asynchronous tasks**. These are long running or system intensive tasks that can have unpredictable execution times. In the case of our example, this would apply to the API request task since it requires networking. 

  It's important to note that concurrency can take many forms. JavaScript being a single-threaded languages for example, models concurrency by keeping track of asynchronous tasks in a queue. In this model when an asynchronous task is completed, the program notifies the system that the dependent code for this task is ready to execute. More about [JavaScript concurrency](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop) can be found on MSDN.

  Some programming languages on the other hand, allow for multithreading (like Java for example) and you will see that used to achieve concurrency. In this approach, new threads can be created to run asynchronous tasks at the same time as synchronous tasks. Multiple tasks executing at the same time is called **parallelism**. 
* **Structured Concurrency** - This is a newer paradigm shift that aims to make concurrent code more readable and testable. Implementing concurrency in non-trivial projects can quickly become very cryptic and difficult to manage, because they involve structures like callbacks and function chains that make it difficult to do things like add conditional logic or error handling. Structured concurrency is about organizing concurrent tasks in logical sequential steps. This allows us to use well established programming constructs like loops, conditional statements, and try-catch blocks with asynchronous tasks.
* **Observability** - For asynchronous tasks we need to know if and when they complete, so that we can use that information to update our application accordingly. Observability is one of the ways we achieve this. There are several patterns that are used to achieve observability, including the observer pattern, the publish-subscribe pattern, and the callback pattern. These patterns all differently slightly and have specific use cases, But the main concept behind them all is to create a functional block of space to handle the results of asynchronous tasks.

These are the basic concepts to asynchronous programming . There are many libraries across several programming languages that have different approaches for implementing these patterns. Let's explore the tools in Kotlin coroutines library that enable us to write efficient and clean asynchronous logic.

# What are Coroutines?

At their core, coroutines are functional code blocks that allow for **suspendable computation**. This means that we can write blocking code inside a coroutine using what is called a **suspend function**; they work by suspending the coroutine, while allowing other coroutines to continue execution. Suspend functions are what we use for asynchronous tasks, and coroutines are how we achieve structured concurrency with related tasks. Under the hood, they make efficient use of thread pools to enable that concurrency. Let's go over some key components in the coroutine framework to help us understand how they work.

### CoroutineScope

CoroutineScope is an interface for representing the scope within which a coroutine will execute. Meaning that if a scope is terminated or canceled for whatever reason, all coroutines within it will also be canceled. They also give us access to their associated coroutine context property.

### Coroutine Builders

Coroutine builders are the functions that we use to create coroutine blocks. They are structured with a trailing suspend function parameter by convention, which we use to pass the logic we want the coroutine to execute. There are four main coroutine builders:

* **runBlocking** - This is the builder that we use to bridge the blocking world with the suspendable world of coroutines. This will typically be found in main functions or testing functions, and is the only builder that is not an extension function of the CoroutineScope interface.
* **launch** - This is the standard builder for launching a core routine in the current thread. The launch function returns a **Job**. A reference to this job can be used to cancel the coroutine or wait for it to complete.
* **async** - This builder is similar to launch except that it returns a **Deferred**, which is a job that also holds a value. So if we need to return a value when the coroutine finishes execution, this is what we would use.
* **coroutineScope** - This builder can be used inside any suspend function. It creates a new coroutine scope that will complete once all the jobs launched inside it complete or cancel.

### CoroutineContext

A CoroutineContext is an indexed set of elements used to represent the persistent state of a coroutine. It holds a reference to the dispatcher, the job, and a variable amount of elements that we can specify when building the coroutine.

### Dispatchers

Dispatchers manage the thread or thread pools that coroutines execute on. The dispatcher can be specified as part of the coroutine context, and there are few different dispatchers to choose from based on what the coroutine is trying to accomplish:

* **Default** - This is the dispatcher that is used by all standard builders if none is specified. It uses a thread pool reserved for cpu intensive tasks.
* **IO** - This dispatcher uses a thread pool reserved for file io, and networking tasks.
* **Unconfined** - This dispatcher does not confine the coroutine to any specific thread pool. So while it is launched in the current thread, said co-routine can resume its work on any available thread.
* **Main** - This is a special dispatcher that is typically available in frameworks like Android or Swing, where there is a main thread reserved for user interface related tasks.

Now that we have a solid understanding of how coroutines work,  let's finally look at some code:

```kotlin
fun main() = runBlocking {
	launch {
		val data = getAPIData()
		updateUI(data)
	}
	setLoadingState()
}

data class Data(payload: String)

suspend fun getAPIData(): Data {
	delay(1500L)
	return Data("payload")
}

fun setLoadingState() {
	println("Loading...")
}

fun updateUI(data: Data) {
	println(data.payload)
}
```

Here we have an implementation from our asynchronous programming example from earlier. We are using coroutine builders `runBlocking` and `launch` to nest one coroutine inside another. The coroutine created with the `launch` builder has the API suspend function call, which will cause it to suspend. For the purpose of these examples we're using `delay`, which is a suspend function That suspends a coroutine for a set amount of time, to simulate waiting for a network response. This does not however suspend the outer coroutine, created with the `runBlocking` builder. This way the loading state function executes first.

Coroutines work in a very similar way to threads, but are much more lightweight. So lightweight in fact that several coroutines can be spawned and managed within a single thread. When a coroutine suspends, the thread it is working on remains free for other coroutines to continue execution. When the suspended function finishes whatever work it was doing, the coroutine is scheduled back onto a thread to continue execution. This gives us the possibility of parallelism without multi-threading. Let's say for example we needed to make two separate api calls:

```kotlin
fun main() = runBlocking {
	launch(Dispatchers.IO) {
		val data = getAPIData()
		updateUI(data.first, data.second)
	}
	setLoadingState()
}

data class Data(payload: String)

suspend fun getAPIData(): Pair<Data> = coroutineScope {
	val a = async { apiCallA() }
	val b = async { apiCallB() }
	Pair(a.await(), b.await())
}

suspend fun apiCallA(): Data {
	delay(1500L)
	return Data("payloadA")
}

suspend fun apiCallB(): Data {
	delay(2000L)
	return Data("payloadB")
}

fun setLoadingState() {
	println("Loading...")
}

fun updateUI(dataA: Data, dataB: Data) {
	println("${dataA.payload - dataB.payload}")
}
```

There's a little more happening here. We've updated the suspend function to now make two separate api calls in parallel with the `async` builder. This is a common pattern for handling multiple unrelated system intensive tasks. We return a pair of values from the api calls by calling the `await` function on each deferred result respectively. We're also using the `coroutineScope` builder, which is available inside all suspend functions for launching coroutines. Finally, we're making use of the **IO dispatcher** to do this work in a thread pool reserved for IO operations.

That's all there is to it! Understanding these principles, we should be ready to use coroutines responsibly for our asynchronous needs. If you need additional guidance, the [official Kotlin documentation](https://kotlinlang.org/docs/coroutines-guide.html) on coroutines is very well written and provides many great examples.

# What's Next?

We didn't get a chance to explore observability in this blog post. In part two of this series we are going to look at channels and asynchronous flows, and how they can be used to subscribe to streams of data.