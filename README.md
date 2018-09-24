# Project Overview
For this project, I was required to incrementally convert a static webpage to a mobile-ready web application. I took a static design that lacks accessibility and converted the design to be responsive on different-sized displays and accessible for screen reader use. I also added a service worker to begin the process of creating a seamless offline experience for users.

### Specification
I was provided the code for a restaurant reviews website. The code had a lot of issues. It was barely usable on a desktop browser, much less a mobile device. It also didn't include any standard accessibility features, and it didn't work offline at all. My job was to update the code to resolve these issues while still maintaining the included functionality.

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. 


## Table of Contents

* [Instructions](#instructions)
* [Resources](#resources)
* [Contributing](#contributing)
* [Authors](#authors)
* [Miscellaneous Notes](#miscnotes)

## Instructions
To get a copy of this repo, please follow these instructions:
### Prerequisites
You'll want `git` installed on your machine. For help setting up `git`, follow instructions from [this free course from Udacity](https://www.udacity.com/course/version-control-with-git--ud123). Also, familiarity with HTML, CSS, and Javascript will set you up for success.
### Installation
Fork this repo into your own account. If you'd prefer not to fork / you're not comfortable with Github:

(1) Clone with SSH to your local machine (just copy this into your terminal after you've changed the terminal's directory to the spot where you want to download these files)
```
git@github.com:jgajera/mws-restaurant-stage-1.git
```
(1) OR clone with HTTPS to your local machine (just copy this into your terminal after you've changed the terminal's directory to the spot where you want to download these files)
```
https://github.com/jgajera/mws-restaurant-stage-1.git
```
(2) Navigate to the folder you indicated in the terminal. If you didn't change folders in the terminal (with the `cd` command, usually), then your files are probably in one of your top-level computer files, like User -> You -> Somewhere in here.


### Was it successful?
You should see all of the files from the [Github repo](https://github.com/jgajera/mws-restaurant-stage-1) in your folder system on your local disk! If not, please raise an [issue](https://github.com/jgajera/mws-restaurant-stage-1/issues) - you likely have a problem with your Git or Github configuration.

In the downloaded folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 
- In a terminal, check the version of Python you have: `python -V`.
- If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.)
- For Python 3.x, you can use `python3 -m http.server 8000`
- If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.

## Resources
I used the following resources:
#### General
- Mapbox API - [Mapbox](https://www.mapbox.com/)
- Favicons - [StackOverflow](https://stackoverflow.com/questions/10218178/necessary-to-add-link-tag-for-favicon-ico)

#### Responsiveness
- CSS Grid - [LearnCSSGrid.com](https://learncssgrid.com/)
- CSS Box alignment - [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout)

#### Accessibility
- Map ARIA - [StackOverflow](https://stackoverflow.com/questions/44712753/what-is-a-suitable-wai-aria-role-attribute-for-a-map-element)
- Listbox ARIA - [w3.org](https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html)
- Labelling all form element [Deque University](https://dequeuniversity.com/rules/axe/2.2/label?application=lighthouse)

#### Service Worker / Offline Cachine
- Google Developers Docs - [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)
- StackOverflow for registering SW - [link](https://stackoverflow.com/questions/30336685/404-error-when-trying-to-register-serviceworker)
- Service Workers in-depth explanation - [Flaviocopes](https://flaviocopes.com/service-workers/)
- Chrome in-browser service worker page - chrome://inspect/#service-workers


## Contributing
Not accepting contributions! Feel free to open an issue if you find one. Thanks!

## Authors
- Several instructors from Udacity provided the starter code in the [Udacity repo](https://github.com/udacity/mws-restaurant-stage-1)
- Me! If I do say so myself ;-)

## MiscNotes
This project is based on the starter code from Udacity FEND's repo for this project.

Here is the [rubric for this project](https://review.udacity.com/#!/rubrics/1090/view).



////////////////////////////////////////////////////////////////////////////



### What do I do from here?



3. Explore the provided code, and start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.

4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

