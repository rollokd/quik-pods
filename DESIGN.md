# Design Overview

Firstly my apologies as I realised that I misread the brief and you refer to pods as the website and the widget is what you are creating on a pod. I thought the pods were the small boxes that contained the text.

## Framework

I chose Next.js as the framework for this project as it is a quick way to get a Full Stack TypeScript React app up and running.

I choose Vitest as it's a modern testing framework that handles typescript well and works well with the React Testing Framework.

## Approach

The goal was to build a small application that mimicked the Trumpet pod sites that allowed users to create a widget with content inside them. In this case the widgets were supposed to be basic text inputs that save to a in-memory store.

I experimented first with a text input that I could use to save text to the in-memory store. However I realised later that a textarea would be a better fit for the widget content.

As you will see from my commit history, my inital testing was just to figure out how to have a resizable and draggable textarea that could contain the text content. Next steps involved scaffolding the in-memory database and the API routes using Next.js route handlers. I used [tanstack query](https://tanstack.com/query) to handle all of the API queries and mutations as it massively simplidiers the process of making API requests and handling responses.

I added the [Zod](https://zod.dev/) library to handle schema validation and type checking for the API requests and responses.

I then wired up the front end to pull the list of pods from the API and display them on the page. The add pod button simply sent the pod data to the api where the endpoint generated an id and stored it in the database. The mutatino would then refetch the list of pods from the API and update the page.

Next I setup the text inputs to handle the mutation to update the pod text content. This was done using a debounced hook that I installed from [usehooks-ts](https://usehooks-ts.com/), I downloaded it to avoid recreating my own debounce utility and save time. This is just a utility hook that debounces the value of a text input, so that the API is not called on every keystroke. It only called the update API endpoint when the user stops typing after 500 milliseconds, as described in the requirements.

I setup testing using Vitest, and wrote an initial basic test to verify the framework was working as expected. As I had already spent a fair bit of time on the project, I wrote out a plan of the tests and edge cases I wanted to cover and asked AI to write the tests. I started with some UI tests to validate the basic functionality of the application with mocked API calls. Also generated some unit tests for the API client and in-memory database.
