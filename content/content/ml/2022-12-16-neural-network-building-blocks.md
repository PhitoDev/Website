---
layout: blog
title: Neural Network Building Blocks
description: A top-level look at the components that make up a neural network.
  This details the components of an artificial neuron, the layers of a neural
  network, the process of feeding it data, and how "leaning" happens.
content: ml
stage: "publish"
date: 2019-07-13T19:23:08.832Z
thumbnail: /images/uploads/vqope-1c4xc4y.jpg
---
# Neural Network Building Blocks

Neural networks allow us to “train” computers to do many things as well, if not better than humans. While it’s hard to say where the limits of neural networks are, some example applications include computer vision, speech recognition, and language translation. These three categories alone have several subsets of problems they can be applied to.

A common sentiment I ran into when I started learning about neural networks and artificial intelligence, is that you should start by building up core skills in mathematics and computer science first. This means mastering algorithms, differential calculus, linear algebra, and some combination of Python, C, and C++. After all that, you should be ready for a PhD program in machine learning.

Recently however, I have come to believe that this is a terrible approach. After some time studying independently, the top-down approach makes much more intuitive sense in this field. This blog post will layout and explain the core components that go into constructing a modern artificial neural network(NN). NN architecture is currently very new and standards and best practices are constantly evolving. On top of that, the underlying math required to fully grasp how everything works can be very cryptic and challenging to learn. If we take the often recommended bottom-up approach to learning what we need to build cutting-edge NNs, it could be a year or more before we are applying that knowledge to interesting projects. It makes more sense to learn what is needed to get started, and delve deeper as required. There is plenty of precedence for this approach; we don’t teach children computer architecture before they ever use a personal computer, for example.

For those reasons, I won’t be delving very deeply at all into the mathematical principles behind neural network architecture in this post, nor will I use code examples. Ideally anyone with a healthy curiosity about NNs should be able to follow along, and later on I will provide links to resources that will allow you to implement your own. With all of that said, let’s start with taking a look at what NNs are trying to model.

---

## The Human Brain

Our brains can be considered to be extremely complex machines. Writing software to perform even the simplest of tasks that humans do with ease can often be difficult work. This has led many software engineers down the path of trying to create software that mimics how our brain functions, and give computers the same logic and reasoning capabilities. This line of thinking is what led to the development of artificial neural networks. They are loosely modeled after the neural networks in our brains. Our brains are made out of billions of cells called neurons. These neurons can send and receive electro-chemical signals, which they use to communicate and perform the functions of the brain. The term “neural network” is used to describe this system, and just like the NNs in our brains, artificial NNs are made of their own kind of neurons.

---

## Artificial Neurons

Much like neurons in our brains, artificial-neurons are the core components of an artificial NN. There are several different models of artificial neurons, but they all share the following core parts:

* **Inputs:** This is the data we “feed” a neuron to interpret. What kind of data it is, and how many inputs we have can vary greatly depending on what kind of NN we’re training. Think of them as similar to the electro-chemical signals in our brain neurons.
* **Weights:** Every input has an associated weight that comes attached to it. These weights can be used to determine the importance of, or even simply the type of an input.
* **Bias**: This value represents an offset for the sum of our weighted inputs. It’s used to ensure said sum is above or below a certain threshold value.
* **Activation function:** This is what determines the final output that the neuron “fires.” It takes the sum of the previous parts, applies an algorithm, and sends off a value. Different activation functions are used depending on the kind of output we want.
* **Output:** The final output of the neuron. This output could feed another neuron or be the final output of the NN.

![Diagram of an artificial neuron described above.](/images/uploads/vqope-1c4xc4y.jpg)

---

## Neural Network Architecture

Artificial NNs have a layered design:

* **Input layer:** The input layer is where we input our data. How that data is fed to the network will depend on the data. For example, let’s say our data-set consists of 28x28 pixel images. We would then have 784 input neurons; one for every pixel.
* **Hidden layer(s):** These layers of neurons are for processing the data. These layers will have corresponding weights, a bias, and an activation function applied to the data that they are fed, unlike the input layer. There’s a bit of artistry and science involved in deciding how many hidden layers to use. For now what’s important to understand is that the data can go through one or more layers of understanding. Having more than one hidden layer, is what makes an NN “deep,” hence the term “deep learning.”
* **Output layer:** The output layer, as you may have guessed, is the layer of neurons responsible for representing the output of our NN. For example let’s say we wanted to classify our images into 3 different categories(I’ll use the term labels going forward, as is common in this field). A simple output layer setup would be to have 3 neurons, each representing one of the three labels.

The process of feeding data forward through these layers is called **forward-propagation**.

![Diagram of the neural network explained above.](/images/uploads/neural-network.png)

So now we have a model that takes in data, analyzes it, and outputs some result. But right now this model doesn’t learn. Let’s get into what the “learning process” actually is. We’ll start by talking a little bit about the data.

---

## Datasets

There are two main components of datasets in for NNs:

* **Features:** The features are descriptions of the data we are looking at. This can take many forms. Let’s continue with the above example of images as a dataset. The features of each image would be the individual pixels.
* **Labels:** The labels are simply what we want our NN to output about our data. They are what our NN needs to see or predict.
  So ideally we want our NN to take the features for a given image, process them, and output the label assigned to that image. Now what do we do when it guesses the wrong label?

---

## Learning

This is where the magic of learning happens. When we have an incorrect label, our NN needs to go through a process of correcting the weights and biases at every layer. There are essentially 3-steps to this process:

1. **Cost function:** This is a function that is used to calculate just how far from the correct label the output was. Think of it as assigning an “error cost” to the output. There are many different loss functions, and it will depend on what your NN is trying to do. For example, when making a classification model, we might choose a [cross-entropy](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html#cross-entropy) function. This is often also referred to as a loss function.
2. **Backward-propagation:** This is the process of going backwards through our NN to assign individual error costs to each weight and bias. This is done use partial derivatives and something called the [chain rule](https://www.khanacademy.org/math/ap-calculus-ab/ab-differentiation-2-new/ab-3-1a/v/chain-rule-introduction#:~:text=The%20chain%20rule%20states%20that,and%20g(x)%3Dx%C2%B2.).
3. **Optimization:** In this step we use a function(typically called an optimizer) to update each weight and bias based on the error costs from the back-propagation. Two popular functions for this are [SGD](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) and[ Adam](https://ml-cheatsheet.readthedocs.io/en/latest/optimizers.html#adam).

So we calculate our error cost, backward-propagate it to every individual weight and bias, and then adjust said weights and biases to perform the next forward-propagation. This process is repeated until the error cost has been minimized as much as possible. And if we’ve done everything correctly, our NN should be able to perform it’s given task with high accuracy. A good practice is to have two separate datasets: one for **validation** and one for performing the **training**. This ensures that our model is capable of handling data it hasn’t already seen, and is thus ready for potential real world applications.

---

## Resources

That covers all the components of an NN. There is still quite a lot to explore within each individual topic in this post, and I encourage you to dive deeper. But with this information, some Python knowledge, you should be able to build and train your own NNs. Here are some popular libraries to facilitate that:

* [TensorFlow](https://www.tensorflow.org/)
* [MXNet](https://mxnet.apache.org/versions/1.9.1/)
* [PyTorch](https://pytorch.org/)
* [Keras](https://keras.io/)

All these frameworks have benefits and limitations. If you’re looking to get started super fast, there is a new library called fast.ai. It is used to teach a [course on deep learning](https://course.fast.ai/), and they use the top-down approach to teaching that I mentioned at the start of the post. The [fast.ai](https://www.fast.ai/) library takes care of a lot of the boilerplate and best practices that likely won’t come out of the box with the above mentioned libraries. I am currently doing the course myself, and so far it is very insightful.

I’m also currently reading [this excellent free ebook on deep learning](http://neuralnetworksanddeeplearning.com/index.html).

Here are some great resources for diving deeper into the subject. They focus on the mathematical aspects of NNs. A lot of the information in this post are things I learned from these sources:

* [Calculus for deep learning](https://explained.ai/matrix-calculus/)
* [Linear algebra for deep learning](https://www.quantstart.com/articles/scalars-vectors-matrices-and-tensors-linear-algebra-for-deep-learning-part-1/)
* <https://www.youtube.com/playlist?list=PLiaHhY2iBX9hdHaRr6b7XevZtgZRa1PoU>

In future posts, I hope to tackle all the things I have mentioned in-depth. Next post I will likely deep dive into data.