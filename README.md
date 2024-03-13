# feedback-generator-lite

A quick &amp; dirty version of the full fledged feedback generator that was put together in a couple nights, temporarily serving in it's place until the proper and polished version is done.

If I've missed anything, feel free to add it in a PR!

# Usage

Clone the repo locally, cd into it, then run `npm run dev` in the terminal

NOTE : If you want more aspects for a task, go in the feedbacks.json and add them. The data structure is easy to follow, but just add them in the aspects array for any task, making sure to include an array with an object of feedbacks.

In order to update the site to introduce those new aspects, you will have to reset feedback data using the button on the homepage. (this clears local storage and sets the feedback data using the json file.)

# TODO

- ~~Persistent storage of user-generated feedback~~ Done!
- Ability to add aspects via the frontend
- Removal of unnecessary nesting in an array of feedback
- Replacemnet of json file in favour of a proper db & backend
- Host
