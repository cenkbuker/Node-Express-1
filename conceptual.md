### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  There are three ways to manage a async code. These are callbacks, promises and async/await that is also kind of a promise

- What is a Promise?
  
  A promise is an object that may produce a single value some time in the future : either a resolved value, or a reason that it's not resolved.

- What are the differences between an async function and a regular function?
  1. An `async` function will always return a Promise, whereas a regular function will not.
  2. An `async` function supports the use of `await`, whereas a regular function does not.
  3. An `async` function will run asynchronously, whereas a regular function will run synchronously.
   
- What is the difference between Node.js and Express.js?
  Node.js is a technology that allows for JavaScript to be run in a server-side environment.
  Express.js is a framework for building web applications using Node.js 

- What is the error-first callback pattern?
  The error-first callback pattern is a pattern where Node callbacks have `error` as the first parameter. This is common with older modules that do not support Promises or `async`/`await`.

- What is middleware?
  Middleware are functions that run in the middle of a request response cycle. We can use middleware to intercept the request in order to modify it, allowing routes to use the updated response.

- What does the `next` function do?
  The `next` function will allow the next piece of middleware in succession to
  run.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  Naming is not excatly show what stores in the variable ```elieGit``` is more logical
  Performance is not great because each request call the github, instead it is better to use Promise.all() to talk to github.