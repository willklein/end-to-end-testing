import React from "react";

import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  Text,
} from "spectacle";

import createTheme from "spectacle-theme-nova";

const theme = createTheme();

function N() {
  return (<span><br/><br/></span>)
}

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
      >
        <Slide>
          <Heading>End-to-End<br />Testing</Heading>
          <Heading size="3">The Game Has Changed</Heading>
          <Text>Will Klein</Text>

          <Notes>
            This talk is about end to end testing, and why the game has changed
            <N/>
            When something significant comes out, we call them game changers. They change the way we do our work, or the way we think about something
            <N/>
            If you, or someone on your team, has done this type of testing in the past, you might know or have heard that it can be... challenging.
            <N/>
            I'd like to share some of the latest developments in this area, and why now is the best time ever to be building, and testing our web apps.
          </Notes>
        </Slide>

        <Slide>
          <Image
            height="600"
            src="images/amelia-island.jpg"
          />
          <Text>Will &amp; Diane @ JSConf US 2013<br/>Amelia Island, Florida, USA</Text>

          <Notes>
            Five years ago, I attended my first JSConf.
            <N/>
            This is my wife Diane and me at Amelia Island, and if I may say, I'm grateful this tradition of including our significant others and families is continued here today.
            <N/>
            It just so happens we made lifelong friends that week, and in many ways, it changed our lives forever.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">How do you test your frontend?</Heading>

          <Notes>
            At the time,
            I was pondering this question
            <N />
            We've developed some really good answers for unit testing, how we test our functions, classes, and UI components in isolation.
            <N />
            I think that we still have trouble at the other end of the spectrum, when we integrate these units together, a lot can go wrong.
            To really have confidence in our apps, we need to know that things work, end to end.
            <N />
            That when we load our app, it let's us do that one thing our users care about, and that everything from the UI, to the web APIs, to the database, to the deployments,
            That it all comes together and integrates successfully.
            <N/>
            Testing everything at once has been, historically, challenging.
          </Notes>
        </Slide>

        <Slide>
          <Image src="images/nicholas.jpg" />
          <Text>Meet Nicholas Boll</Text>

          <Notes>
            I asked everyone I met at JSConf this question, and there was one person I found myself talking to for hours.
            <N/>
            This is Nicholas Boll.
            He had a LOT to say.
            <N/>
            It turns out, his wife Katrina had met Diane in the significant others track. Our partners were thrilled to introduce us, but... they were too late.
            <N/>
            I was impressed with what his team had done, writing thousands of unit, integration, and end to end tests. I was so impressed, I applied to work at his company,
            <N/>
            and a few months later, I was hired and we moved out to Colorado. They helped us unload the moving truck, invited us for the holidays, and made us feel at home.
            <N/>
            It's amazing the kind of friendships that begin at JSConf.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Selenium</Heading>
          <Image src="images/selenium.png" />

          <Notes>
            Joining their team, I found they not only had a lot of tests, but a lot of the same problems I had experienced already. They had more of it in fact, because they had so many more tests!
            <N/>
            They relied on the same tool we had used with mixed success on my previous team: Selenium.
            <N/>
            Selenium is a set of tools built in Java that lets us write test and browser automation code in any language, send commands to a Selenium service, and have that service manage those commands as it tries to execute them in any web browser.
            <N/>
            It's amazing, and for years it's given us a way to test our apps from user's point of view, using real browsers.
            <N/>
            There are challenges though. Our test code might be written in a language other than JavaScript. It's preferrable to use a library that speaks the Webdriver API that Selenium uses. There are drivers written for each browser, that need to be maintained.
            <N/>
            On top of all these abstractions and interfaces, we also have the asynchronous nature of the communation to and from that Selenium service, between our test code and the service, and the service and the browsers.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">
            Your app is simple, fast, consistent.
            <N/>
            Right?
          </Heading>

          <Notes>
            Then there's the greatest complexity of all: our application.
            <N/>
            I think it's typical that our apps make calls to a backend, at page load, or whenever a user interacts with the UI.
            <N/>
            I've found that these calls don't always come back with the same timing, or in the same order. Sometimes, backends experience higher than usual load, some things take longer than usual, and we see strange behavior in our app. I've found this is very typical in virtualized build and test environments, where we usually run these sorts of tests. These abberations can even cause our tests to fail.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Confidence, Failures, and Flakiness</Heading>

          <Notes>
            The problem is with using both Selenium and all the things we do client-side in JavaScript. It's a recipe for frustration.
            <N/>
            We'll push a commit, tests will run, and we'll see a test failure.
            <N/>
            Run the test again, and it passes. Some other test fails. We saw so much of this, we had a build job called the flaky finder. It would just run whatever was on master, over and over again, so we could find the flakies. This challenge still pervaded our continuous integration builds and slowed us down, in a very frustrating way.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Valuable, Expensive Tests</Heading>

          <Notes>
            Despite this difficulty, we'd write these test anyway.
            <N/>
            At least covering the critical paths in our app, and exercising all the different UI components.
            <N/>
            The test authoring and debug experience was... very expensive though.
            <N/>
            You'd often find yourself with one debugger for your test code, and another for your application code.
            <N/>
            It was work to get the app to the right state, before you could figure out how to query the right things, and make sure you handled cases where the browser might not be ready for the next test command.
            <N/>
            We wrote our own code to implicitly wait before executing certain commands.
            The test might click a button, and the next command would try to interact with the next view, but maybe the app wasn't ready for it. Rather than drop in sleep commands in our test code, we wrote test utilities that would retry a selector until it found what it was waiting for.
            <N/>
            We also needed to sometimes mock web services to make it easier to test certain things. We invested a fair amount of time writing libraries that made service mocking easier.
            <N/>
            These are just some of the things we added to our testing stack, because as valuable as these tests were, they were time consuming and sometimes painful to write.
          </Notes>
        </Slide>

        <Slide>
          <Notes>
            I continued to use Selenium at another company, and then late last year, I found myself consulting on a project.
            <N/>
            They really needed some better tests, so I trialed a couple tools to see what would work best.
            <N/>
            I tried Selenium, and the first thing I had to do was download Java. I found not much had really changed.
            <N/>
            At the time, the engineering lead suggested we take a look at a new tool that had just been open sourced. It was something I had been curious about for years, but hesitant to try until it was open and available to everyone.
          </Notes>
        </Slide>

        <Slide>
          <Image src="images/cypress.png" />

          <Notes>
            That tool is Cypress. It's maybe a few years old now, and what started as an experiment by Brian Mann, is now supported by a team of full-time developers.
            <N/>
            I was impressed with how quickly it was to get up and running, and to start testing our application.
            <N/>
            I found some very powerful differences developing these tests.
            <N/>
            I was so excited by this, after just a couple hours playing with it, I wrote a proposal to this conference about how everything "bad" we know about end-to-end testing has changed.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Running from CLI</Heading>
          <Image src="captures/cypress-run 720.gif" />

          <Notes>
            We have improvements
            <N/>
            First is the test running experience. We can run Cypress headlessly, and use it in a build within the command line.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Running from CLI - Results</Heading>
          <Image src="captures/cypress-run end 720.gif" />

          <Notes>
            This is nice, and there's a screen recording of the whole test run unless we disable it.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Running the Test Runner</Heading>
          <Image src="captures/cypress-open 720.gif" />

          <Notes>
            If we want to write tests, or review a failure, we might launch the Cypress app and pull things up in the browser.
            <N/>
            Opening Cypress in this way gives us an Electron app where we can run any of our spec files.
            <N/>
            Running a spec file gives us the Test Runner. The UI has some useful information, including the tests being executed, a summary of tests passed, failed, and how long they take. There's also the window location and the viewport dimenions.
            <N/>
            Our app is right there in the same view. This seems like a small thing, but there's more to it.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">UI State Time Travel</Heading>
          <Image src="captures/cypress-open ui state 720.gif" />

          <Notes>
            The lists of tests on the left is interactive. This is the "Command Log."
            <N/>
            We can interact with it, and even...
            We can time travel through each UI state. Normally, if I was writing a test or debugging  a failure, I might need to drop a breakpoint in my test code or review a test recording, which Cypress gives us as well. But I can just use the Command Log to see what happened every step of the way.
            <N/>
            Some of these commands have a before and after context. Below our app we can select the before and after. This all works through a series of DOM snapshots, and Cypress let's us replay and debug them at will.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Command Log Debugging</Heading>
          <Image src="captures/cypress-open debug command log 720.gif" />

          <Notes>
            Speaking of debugging, that part of the experience has some serious upgrades.
            <N/>
            First, any time we interact with the command log, we see the relevant things logged for us in the console, for our convenience. We might otherwise need to drop in our own breakpoints and console logs to get this information so easily.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">DOM Debugging</Heading>
          <Image src="captures/cypress-open debug DOM 720.gif" />

          <Notes>
            We can inspect our DOM snapshots like we normally would, when developing our app. This is easier than before because it's all right within a single window, a small convenience, but those conveniences are starting to add up.
            <N/>
            When we need to debug our app, we can just put breakpoints in and we can debug whatever we need to from the appropriate scope and stack.
            <N/>
            From that same debugger, we can hit breakpoints in our test code, again debugging from that context however we need to.
            <N/>
            Having both debugging contexts available to use in the same debugger is really awesome.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Other nice things</Heading>
          <List>
            <ListItem>implicit waits</ListItem>
            <ListItem>direct access to the DOM</ListItem>
            <ListItem>service mocking</ListItem>
            <ListItem>rolled up tooling</ListItem>
          </List>

          <Notes>
            We get some other nice things
            <N/>
            Cypress commands implicitly wait for our app to render after a page load or UI interaction, so we don't need to handle that ourselves
            <N/>
            Selenium was always passing DOM information through APIs to our test code. We get direct access to the DOM here, because we're running in the same JavaScript runtime
            <N/>
            Cypress supplies some really useful service mocking utilities. We can specify a route, like `/users` (slash users), match on request method or parameters, like a 'GET' method, and provide fixture data that should return for that matching service call.
            <N/>
            Cypress does this using Sinon.js, and it's using other open source tools under the hood like Mocha and Chai. They've rolled up these tools for us in one cohesive package, and we can spend less time selecting, maintaining, and updating these dependencies.
            <N/>
            Oh, another one they include is jQuery. For anyone that thinks jQuery is obsolete, it may always be welcome in our browser tests.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Best Practices</Heading>
          <Image src="images/timeouts-and-performance.png" />

          <Notes>
            As I've been re-reading their blog posts and the documentation, I realized something else that shines through in a really awesome way.
            <N/>
            They have tried to share general best practices on how to write good end-to-end tests. It's not even specific to Cypress. They suggest good ideas that apply regardless of the tool.
            <N/>
            I would even say it can be opinionated. I think that's a good thing.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Tradeoffs</Heading>

          <List>
            <ListItem>it's a new tool</ListItem>
            <ListItem>it has a "style"</ListItem>
            <ListItem>see <Link href="https://docs.cypress.io/guides/references/trade-offs.html">Trade-offs</Link> in the docs</ListItem>
          </List>

          <Notes>
            There are certainly tradeoffs
            <N/>
            It's a new tool for your team to learn. I don't take that lightly, but coming from Selenium, I found the switch to be extremely quick, and it paid off in under an hour.
            <N/>
            It has its own style that felt strange to me at first. It makes sense though. Cypress really likes chaining, and there's a reason why so many of their commands are chainable.
            (TODO: elaborate on this)
            <N/>
            Asynchronicity is exposed to us, and it helps us understand what's going on. We may find ourselves executing a command, and putting a `.then` (dot then) to wait for the promise to finish before we execute the next thing. I've seen some other Selenium-based tools hide this from us, and honestly, that was weird. If you're used to that, this might require an adjustment.
            <N/>
            They are very upfront about their tradeoffs, like why they only support Chrome and Electron browser right now, though they're working on Firefox and support for Edge will likely come next.
            <N/>
            Running everything in the browser, and within a single tab instance, also creates some limitations. They are clear about the impact of this.
            <N/>
            Likely, the greatest way to address these trade-offs is to have a small set of Selenium tests that exercise the capabilities Cypress is missing.
            <N/>
            I have found that 99% of the value of my end-to-end tests is better handled using Cypress, and if cross-browser support becomes a issue, I might automate visual diff tests with UI screenshots runing on Selenium.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">It's Ambitious</Heading>

          <Notes>
            The greatest challenge I see?
            <N/>
            It's ambitious. They've essentially reinvited the Selenium wheel, but they've made some key design decisions that gives us a much better wheel, a hover wheel, really.
            <N/>
            The test authoring experience is has so much to it, as if the challenge of reimplementing Selenium wasn't crazy enough.
            <N/>
            There will be things they haven't developed yet, like cross-browser support.
            <N/>
            There will be bugs, though I don't remember any in my experience, I just know there's a large surface area of code for them to write and maintain, and they'll need to keep up with any issues that come up.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">The Game Has Changed</Heading>

          <Notes>
            The world of end to end testing is completely different for me now.
            <N/>
            If you are using Selenium and getting frustrated, try this, I think it'll go well.
            <N/>
            If you've never written an end to end test before, now is better than ever to get started.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Write a Smoke Test</Heading>

          <Notes>
            If you're new to this, start with one thing: a smoke test.
            <N/>
            Make sure that your app loads. This covers build and deployment issues.
            <N/>
            Next, what is it that your app promises to do for your users? Make sure it does that.
            <N/>
            Just cover the happy path, and from then on, you know with every commit that you can deliver something useful without breaking your user experience.
            <N/>
            That is incredibly valuable to everyone.
          </Notes>
        </Slide>

        <Slide>
          <BlockQuote>
            <Quote>Don't let your users test your app.</Quote>
            <Cite>me</Cite>
          </BlockQuote>

          <Notes>
            As I like to say: don't let your users test your app
            <N/>
            If you're not automating these types of tests, that's what you're doing. We need to up our game and not just care about code coverage in our unit tests, but user experience coverage in our end to end tests.
            <N/>
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Atwood's Law and the (JavaScript) Tooling Renaissance</Heading>

          <Notes>
            If you've been doing this long enough, you might have used something like Sublime for your text editor.
            <N/>
            Most of us use Atom or Visual Studio Code now, and while it seemed crazy at first, the fact that they were built in JavaScript has incredible consequences.
            <N/>
            We see ecosystems of plugins and extensions flourish around them, making them infinitely more capable, customizable, and joyful to use.
            <N/>
            I've had a lot of fun using Cypress, and I think we're still in the early days before the community catches on, and its tooling ecosystem grows into something beyond what their core team envisioned.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">You Did Good</Heading>
          <Image src="images/cypress.png" />

          <Text>
            I promise, they are nice.
            <N/>
            <Link href="https://gitter.im/cypress-io/cypress">gitter.im/cypress-io/cypress</Link>
          </Text>

          <Notes>
            I'm really grateful for what Brian and the team at Cypress have done. They scratched their own itch and set out to create a better testing experience, and I think they've succeeded.
            <N/>
            I would also look to them as inspiration, that we can continue to improve our tools, and that reinventing the wheel in JavaScript is sometimes really, really worth it.
            <N/>
            If you need help beyond their docs, talk to them on Gitter, they're great.
          </Notes>
        </Slide>

        <Slide>
          <Image src="images/family.jpg" />

          <Notes>
            I also want to thank Nicholas. I'm happy to share he still goes on and on for hours, and I'm still learning a lot from him.
            <N/>
            Our daughters? They were born two years ago, a month apart. This summer, they will both become big sisters.
          </Notes>
        </Slide>

        <Slide>
          <Heading size="2">Thank You!</Heading>

          <Text>@willslab</Text>
          <Text>will@willklein.co</Text>

          <Notes>
            Thanks for joining me today, for wanting to hear how our tests and our tools continue to improve. I love talking about this stuff so please come find me if you have any questions.
            <N/>
            As you've heard, being here today and sharing this journey that started with a question five years ago, it really means a lot.
            <N/>
            Thank you.
          </Notes>
        </Slide>
      </Deck>
    );
  }
}
