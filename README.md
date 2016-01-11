#Overview
The purpose of this project is to create a user dashboard that can retrieve Github events via the Github API. This project is written using web components and Polymer to illustrate the candidate's desire to build modern applications when possible.

##Setup and prerequisites
Assuming Node is installed, you can run this one liner from your project root directory to perform the necessary setup:

```sh
npm install -g gulp bower && npm install && bower install
```

##How to run
Once gulp is installed, the development workflow to run this project is also just a one line command:

```sh
gulp serve
```

Once that process finishes, you'll have two ways to access the site. The first is a local IP address and port number, and the second is an IP address that other devices can access as long as they are on the same network.

##Additional information
Inline comments have been placed to help illustrate what's happening in the code, but here's a general overview:

A demo version of this application is also hosted on Firebase and can be located [here](https://resplendent-inferno-8422.firebaseapp.com). 

A standard webflow is included to allow OAuth authentication through your Github account. Clicking the login button 

#####Index.html
The index.html file in the app folder is the main entry point into the code. This code has the standard HTML header info and then is followed by the main UI layout, which is a paper-drawer-panel with the main content changing based on page.js routing to different sections in this file. Example below:

```sh
<iron-pages attr-for-selected="data-route" selected="{{route}}">
  <section data-route="user-events">
    <git-events id="events" username="{{params.username}}"></git-events>
  </section>
</iron-pages>
```

#####Routing
The app/elements/routing.html contains the routing information. Different anchors in the code cause different sections in the main index.html file to be displayed. The following portion of the routing.html file would render the section in the example above:

```sh
page('/user/:username', function(data) {
  app.route = 'user-events';
  app.params = data.params;
});
```

#####Testing Components
The web-component-tester utility is really useful for writing unit tests against the custom elements that are created. To set it up, run the following command: 

```sh
npm install -g web-component-tester
```

Basic test components have been written for each custom element in this project, and the long-term goal is definitely to include more testing here. To run the test, run the following from the root of your project:

```sh
wct
```

###Future plans
As I discover bugs or have feature ideas, I'll be posting them as issues in my Github repo. Feel free to do the same!

##
##

#Technical Interview Homework: GitHub Dashboard

##Purpose
The purpose of this exercise is to assess the candidate’s ability to build cross platform software clients that satisfy stated requirements. The completed assignment should not only satisfy the requirements outlined below, but also give the candidate an opportunity to show-off their skills.

##Prerequisites
- Candidates must have a GitHub account

##Instructions
1. Fork this repository - [https://github.com/cbjugstad/tech-interview-github-dashboard](https://github.com/cbjugstad/tech-interview-github-dashboard)
2. Create a client that satisfies the requirements below
3. Include, at the top of this README, instructions required for the reviewer to run the submission
4. Include, at the top of this README, any other information that will be useful to the reviewer
5. Create a pull request prior to the due date to have your submission reviewed

Once the submission is reviewed the candidate will be notified and possibly invited to participate in a follow-up interview where interviewers will collaboratively work with the candidate to review the submission, discuss possible enhancements, and possibly implement a new feature. 

#####Additional Notes...

- Feel free to ask your point of contact any clarifying questions you might have. 
- Submissions must be relatively trivial to run as outlined in the candidate's instructions. We suggest that you test the run instructions on a clean clone of your repository. **Submissions we can't run per the instructions will be rejected.**
- Client technology for the submission is at the discretion of the candidate, Preferred platforms include the following...
	- **Xamarin** - Xamarin Studio or Visual Studio
	- **HTML/CSS/JS (touch friendly, tablet/phone targeted)**
	- **Native iOS** - Xcode 
	- **Native Android** - Android Studio
	- **Windows/Phone** - Visual Studio
- Third party libraries or packages are acceptable but must be managed via a package manager i.e. Nuget, CocoaPods, npm, bower, etc. Third party components will NOT be manually installed by the reviewer.


##Assessment

Cross platform client development requires a familiarity and aptitude to work with...

- Client platforms: iOS, Android, Windows, Web Browsers, etc.
- Presentation layer frameworks: Native iOS & Android, Cordova, HTML/CSS/JS, etc.
- HTTP based APIs

#####Assessment will focus on the candidate's ability to...

- Review and understand API documentation.
- Consume an API, and present API content in a client. 
- Write clear, understandable, and maintainable code. Please use the predominant coding style for whatever language the submission is written in.
- Create a simple and understandable user interface and user experience. Note that clear and understandable does NOT mean graphically interesting.
- The user experience should be targeted at a mobile screen size, preferably tablet optimized yet functional on a phone sized screen.

#####Exceptional Candidates will...

- Submit a solution that will run on both iOS and Android
- Have a simple architecture that is easy to enhance and extend

##Requirements - GitHub Dashboard 
GitHub has a public API that will be used for this assignment. We will be displaying content from the GitHub API in a user "dashboard."

#####Resources
- [GitHub API](https://developer.github.com/v3/ "GitHub API")

#####Minimum Requirements
- The client will have a title clearly indicating the purpose and content of the client.
- The client will be touch friendly.
- The client will display a feed of GitHub public events available at the following endpoint
	- Public Events url: [https://api.github.com/events](https://api.github.com/events)
	- Events Documentation: [https://developer.github.com/v3/activity/events/](https://developer.github.com/v3/activity/events/)
- Each public event displayed in the feed will display user friendly values for...
	- Username
	- Event Type
	- Repository to which the event applies
- The client will have a button to refresh the feed of public events.
- The client will allow a user to tap the public event and display event details.

#####Optional (stretch) Enhancements
- Implement a "pull down" to refresh the feed of public events.
- On the public event details screen...
	- Display a user's avatar next to their name.
	- Provide a link/button to display in the app or a separate browser window the GitHub repository's main web page.
- Authenticate a GitHub user
- Display the authenticated user's username and avatar in client-platform typical location
- Display a feed of the Events performed by the authenticated user
	- [https://developer.github.com/v3/activity/events/#list-events-performed-by-a-user](https://developer.github.com/v3/activity/events/#list-events-performed-by-a-user)
- Support screen rotation