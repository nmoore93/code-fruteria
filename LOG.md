This is just a rough list of what I did within the project (feel free to view the git history as well):

- Installed vitest and testing library for some simple unit tests around the panel and login component.
- Added an nvmrc file and used the latest TS version of node.
- Added git ignore to prevent node modules being committed.
- Added eslint and prettier t help format code using their defaults for the most part.
- Fix theme switching and use theme setting for some simple changes such as main background color and header color.
- Update the grid overlay so it does not flicker or hide if you drag over components 'behind' the overlay such as the header or no panel placed text on the main screen.
- Updated the panel resizing so that it resets the ref per update, it appeared that resizing was continuing to add more and more as you dragged your mouse.
