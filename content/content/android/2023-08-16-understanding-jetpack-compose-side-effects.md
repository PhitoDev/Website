---
layout: blog
title: "Understanding Jetpack Compose Side Effects "
description: Side Effects are a new tool in Jetpack Compose that allow us to
  handle application state In a composable-aware way. This article goes in depth
  about the different Side Effects and their use cases.
content: android
stage: publish
date: 2023-11-05T23:12:40.371Z
thumbnail: /images/uploads/android_robot.png
---
# Introduction
Jetpack Compose has revolutionized the way UI development is done in Android. Using the framework of Kotlin DSL, it provides a way for developers to build state-driven UI in away that is intuitive and much simpler to work with than XML. The concept of recomposition however, comes with interesting challenges for handling application state. Recomposition can be unpredictable, and triggering changes to application state within composable functions can lead to unforeseen bugs if we do not have a strategy to account for that unpredictability. These changes to application state are called **side-effects**, and this is where the Effects APIs comes in. 
# Effects APIs
The Effects APIs are the current recommended approach for ensuring side-effects execute in a predictable way. Essentially, **effects** are composable functions that do not emit a user interface, and instead handle a lot of the boilerplate needed to ensure our **side-effects** are executed in a predictable manner. There are three main functions provided to developers by the API to handle the different side-effects our composable functions can create:
## LaunchedEffect
`LaunchedEffect` Is an effect for when you need to call a suspended function from inside a composable. The most common use case for this will be when you need to handle displaying a `Snackbar` inside a Scaffold:
```kotlin
AppTheme {
	Surface(
		modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
	) {
		val scope = rememberCoroutineScope()
        val snackbarHostState = remember { SnackbarHostState() }

        val state by viewModel.state.collectAsStateWithLifecycle()

		if (state.hasError) {
			LaunchedEffect(snackbarHostState) {
				snackbarHostState.showSnackbar(
					message = "Error message",
					actionLabel = "Dismiss"
				)
			}
		}
		
		Scaffold(
			topBar = { Text("Hello!") },
			snackbarHost = { SnackbarHost(hostState = snackbarHostState) },
		) { contentPadding ->
			Column(Modifier.padding(contentPadding)) {
	            Button(
	                onClick = {
	                    // Create a coroutine in the event handler to show a snackbar
	                    scope.launch {
	                        snackbarHostState.showSnackbar("Something happened!")
	                    }
	                }
	            ) {
	                Text("Press me")
	            }
	        }
		}
	}
}
```
`LaunchedEffect` launches a new coroutine job with the scope of the calling composable, and a variable amount of keys (in this instance the `snackbarHostState`) to keep track of the effect. If `LaunchedEffect` is called again with a non-matching set of keys, the existing job will be canceled and a new core routine job will be created for the new effect. Conversely, an effect can be restarted by calling the function with the same key.

The above code also shows how to launch a coroutine from the same scope as `LaunchedEffect`, If we need to do so outside of a composable context. For this we would need to get a reference of `rememberCoroutineScope()`. This function will return the `CoroutineScope` bound to the composable function it was called from.
## DisposableEffect 
`DisposableEffect` is an effect for when you need to do some cleanup when one of the variable keys change, or when the calling composable exits Composition. For example, let's say we need to observe a `State` object that holds integer values, and run some update with every new value:
```kotlin
@Composable  
fun Screen(updates: State<Int>, onUpdate: () -> Unit) {  
    val scope = rememberCoroutineScope()  
    val currentOnUpdate by rememberUpdatedState(onUpdate)

	val last by updates
	Text("The last update was: $last")
  
    DisposableEffect(updates) {  
        val job = scope.launch {  
            snapshotFlow { updates }.collect { currentOnUpdate() }
        }  
        onDispose {  
            job.cancel()  
        }  
    }
}
```
With every new value emitted to `updates`, a recomposition will be triggered and the update callback will also be invoked through the `job` in the `DisposableEffect`. Every time the `updates` parameter is changed by the calling function however, the previous coroutine job is canceled and a new one is started with the recomposition(This is also technically a `LaunchedEffect` use case, but we can pretend that doesn't exist for this example).

Note here that we are using `snapshotFlow` to convert a state object into a cold flow, and then running the update block as each value is collected.

Another thing to note is the `currentOnUpdate` function. When defining it, we are using `rememberUpdatedState` to make sure `DisposableEffect` is using the latest on update function with every recomposition, otherwise we would only get the latest update function whenever this composable is called with a new `updates` variable.
## SideEffect 
`SideEffect` is an effect for when you need to share updates to Compose state with parts of our app that are not managed by Compose. A `SideEffect` is triggered after every recomposition. We can use it to implement a much more simplified version of the example from `DisposableEffect`:
```kotlin
@Composable
fun Screen(updates: State<Int>, onUpdate: () -> Unit) {
	val last by updates
	Text("The last update was: $last")
	
	SideEffect {
		onUpdate()
	}
}
```
This demonstrates how different effects can be used for similar goals, and how we might even be able to combine them to create custom effects. Instead of collecting the state as flow, we rely on the `SideEffect` to run `onUpdate` every recomposition. This one is very straightforward compared to the other effects., and we could easily pass values from our state to our update block to be used anywhere that our app needs.
# Review 
To conclude, here are some key terms to remember to understand how the effects api can help you manage application state when working with Jetpack compose:
- **Effect**: A composable function that doesn't emit UI, but instead triggers side effects that run after a composition.
- **Side-effect**: A change to application state that happens outside the scope of the calling composable function.
- **LaunchedEffect**: An effect to be used when the side effect requires the use of suspend functions.
- **DisposableEffect**: An effect to be used when the side effect requires some cleanup work for the given keys.
- **SideEffect**: An effect to be used to share composition updates With parts of our application that are outside the scope of Compose.

Effects conceptually can be difficult to grasp at first. It requires a good understanding of recomposition and Kotlin coroutines to see the use cases. It is also important to remember that ideally, our composable functions should be side effect free. That is not always possible however, and the Effects APIs gives us another tool in the Compose toolbox we can pull out whenever is appropriate. [Check out the documentation](https://developer.android.com/jetpack/compose/side-effects) for further reading. 