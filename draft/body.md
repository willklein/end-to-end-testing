the first major difference of Cypress is it's entirely JavaScript based in how it exposes the testing APIs, and well, what the testing APIs themselves are written in.

we actually get this option with Selenium, sort of, if we're OK with some Java bits between our code and the actual browser

my best practice before using Selenium was using Webdriver.io or another JS-based library to talk to Selenium.

it's the next point where things start to shift more significantly: it runs in the browser

with Selenium, our tests might run in a Node process, which would send asynchronous, HTTP requests to a Java service, which would queue and manage these requests, and pass them on to the browser, through some browser driver, and that request to the browser was also asynchronous

to debug test development or a test failure, we'd also find ourselves running a debugger for our test code, in addition to debugging our application code, as they are distinct processes

this was a really great solution when it was conceived, but it's not without its challenges

commands .... (were slow, would fail, etc)

Cypress learned from these challenges and took a different approach. by running directly in the browser, there .....

the next major distinction is the tooling

1) test runner


if you've ever used Redux, this will look familiar. we can time travel through our UI state to see what's going on, from the perspective of the user. is its NOT the underlying application state you might manage in Redux, but the UI state.

remember, that's what we're testing here, and 99% of the time, that's what we need to understand what is working, or not working, in our app

that said, i've experimented with redux state snapshots, and i've been able to replay not just UI state, but full application state. Cypress gives lots of little hooks that are handy for hacking things like this. while replaying full app state isn't necessary, it's nice to know that we can extend this tool if we want to.

