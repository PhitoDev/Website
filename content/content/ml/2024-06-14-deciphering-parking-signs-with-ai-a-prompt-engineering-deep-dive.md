---
layout: blog
title: "Deciphering Parking Signs with AI: A Prompt Engineering Use Case"
description: In this blog post, we'll delve into the world of prompt engineering, a technique for communicating with AI models, and how it can be applied to the problem of interpreting parking signs. I'll share the prompt I crafted for my app, Can I Park, designed to extract relevant information from parking sign images and present it in a structured format.
content: ml
stage: publish
date: 2024-06-14T21:53:26.814Z
thumbnail: /images/uploads/logo.png
---

# Introduction

Have you ever felt frustrated trying to decipher confusing parking signs? Parking regulations can be complex, especially in unfamiliar areas, for people who may not be fluent in the regional language, or for individuals with visual impairments. But what if there was a way to use artificial intelligence (AI) to quickly and easily understand these signs?

In this blog post, we'll delve into the world of prompt engineering, a technique for communicating with AI models, and how it can be applied to the problem of interpreting parking signs. I'll share the prompt I crafted for my app, [Can I Park](https://play.google.com/store/apps/details?id=com.dugue.canipark&hl=en_US), designed to extract relevant information from parking sign images and present it in a structured format.

# Understanding Prompt Engineering

Prompt engineering is the art of crafting clear and effective instructions for AI models, like large language models (LLMs). It involves carefully choosing words and phrases, defining the desired output format, and providing examples to guide the model's behavior. In the age of LLMs, I fully see this becoming a skill akin to knowing how to work with a REST API for software developers. In other words, a tool that we all will be expected to know, be ready to use, and understand the best practices for. So let's breakdown the parking sign problem, and see how to write a prompt that can give us all the information we need.

# The Parking Sign Challenge

Interpreting parking signs can be tricky due to:

- Visual Complexity: Signs often have multiple symbols, colors, and text elements.
- Ambiguity: Regulations can vary widely depending on the time, day, or vehicle type.
- Accessibility: Individuals with visual impairments might face challenges accessing the information.

What if we could offload all that analysis to our favorite generative AI model(in the case of Can I Park, I am using [Google's Gemini API](https://ai.google.dev/)), and it could quickly tell us whether we can park in this location? This is the crux of how Can I Park works, once the user takes a picture of the sign or groups of signs.

With this objective in mind, I designed a prompt that:

- Requests Specific Information: It asks the AI model to extract key details like whether parking is allowed, time limits, costs, and any restrictions.
- Provides relevant information: It gives the AI the current time based on the user's location, so that it can reason about if the user can park at that very moment.
- Specifies Output Format: The prompt requires the model to respond in a clear, structured JSON format.
- Includes Examples: It provides examples of valid and invalid parking scenarios to guide the model's understanding.
- Handles Errors: The prompt instructs the model to give a specific response when it cannot interpret the image.

Here is the current version of the prompt:

```kotlin
private fun formatPrompt(): String {
	return """
		It is currently ${getCurrentSystemTime()}. Tell me if I can park here
		right now based on the current time and the image provided, if it is
		a valid image of parking signs. If I can park, how long can I park?
		If there is no time limit, this field should be null.If there is a
		cost, how much does it cost? If no cost, this field should be null.
		Are there any restrictions? If there are no restrictions, this field
		should be null. If I can't park, why not? If I can park, this field
		should be null.Please only respond in JSON format based on the
		following schema and examples:
		{
			"title": "Parking Response",
			"type": "object",
			"properties": {
				"canIPark": {
					"type": "boolean",
					"description": "Whether or not the user can park at
					the location"
				},
				"howLong": {
					"type": "string",
					"description": "How long the user can park at the location"
				},
				"cost": {
					"type": "string",
					"description": "The cost of parking at the location"
				},
				"reasonIfNo": {
					"type": "string",
					"description": "The reason the user cannot park at
					the location"
				},
				"restrictions": {
					"type": "string",
					"description": "The restrictions on parking at the location"
				}
			},
			"required": ["canIPark"]
		},
		{
			"canIPark": true,
			"howLong": "2 hours",
			"cost": "$2.00 per hour",
			"reasonIfNo": null,
			"restrictions": Only cars with permits
		},
		{
			"canIPark": false,
			"howLong": null,
			"cost": null,
			"reasonIfNo": "No parking on Sundays",
			"restrictions": null
		}.
		If the image provided is not a valid image of parking signs,
		respond in the format with the "reasonIfNo" being "This is not a
		valid image for analysis".
		Do not include the schema in your response.
	""".trimIndent()
}
```

# Key Takeaways

By providing a clear and structured prompt, we guide the AI model to focus on the relevant information and present it in a way that's easy for humans or other applications to understand and use. The JSON structure allows us to parse the response into the desired business logic object of our application. For example the `canIPark` field allowed for me to customize UI elements based on whether the user can park or not. Here I am providing both the schema and two examples to leave as little to interpretation to the ai as possible. While generative AI has given us the power to communicate with computers with natural language, it remains important as engineers to be meticulous and precise with the queries that we make.

This is the prompt engineering powering Can I Park. Now the user has a three step process for getting what they need:

- They take a picture of a parking sign
- Briefly wait as the app extracts and analyzes the relevant information
- The information is then presented to them in a clear and accessible format, that should be able to work with any accessibility features their device supports.

# Conclusion

Prompt engineering is a powerful tool for unlocking the potential of AI models. By carefully crafting prompts, we can create applications that solve real-world problems and improve our lives. In the coming years this could very well revolutionize how we as engineers interface with the different layers of the systems we build. One example of this would be the emerging development of AI agents to interface with database layers([LangChain](https://python.langchain.com/v0.2/docs/introduction/), [LlamaIndex](https://www.llamaindex.ai/open-source)), allowing us to query data with natural language. Tools like these will be immense productivity boosters, and an example of why prompt engineering is becoming an invaluable skill.

The parking sign interpretation prompt is relatively simple use case for how AI can be used to make information more accessible and easier to understand. I'm excited about the possibilities of prompt engineering and look forward to exploring other ways to leverage AI for the benefit of society.

The app is available in the [Google Play Store](https://play.google.com/store/apps/details?id=com.dugue.canipark&pcampaignid=web_share), and the full source code is available on [Github](https://github.com/KingPhito/Can-I-Park). I appreciate you checking the time to check it out! You can also try out the prompt and Google AI Studio with varying images to see what results you get. I would love to hear your thoughts on prompt engineering and how you think it can be applied to other problems. Feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/rdugue/). Thanks for reading!
