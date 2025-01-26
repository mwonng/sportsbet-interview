## Summary

This project is designed to create a depth chart for sports teams. It is built using Create React App, with minimal dependencies to keep it lightweight and efficient. For styling, Tailwind CSS is utilized, and SVG icons are incorporated for visual elements.

## How to

Make sure you have node and npm installed, or yarn.

```sh
$ npm install && npm start
# or 
$ yarn && yarn start
```

after local dev server run, you can now go to http://localhost:3000/

## Features Implemented
- **Add Player from Position Box:** Allows adding a player by automatically filling in the sport and position.
- **Move Up and Down:** Players can be moved up and down using buttons.
- **Filter:** Provides a filter at the top to filter by sport or position.
- **Show Player's Backup:** Displays the backup for each player.
- **Fetch Config and Data:** Mocks a fetch action to load sport configuration and data from an API.

## Assumptions and Constraints
- **Testing Concerns:** As this project is primarily for UI demonstration purposes and focuses mainly on the UI, test coverage is not guaranteed.
- **Architecture:** The project follows a minimalist approach by using a minimal number of third-party libraries. Tailwind CSS is used for styling due to its convenience. While context or state management could be used to manage sport configuration and data, given the scope of this app, I believe it is unnecessary. Therefore, native React state is used for simplicity.
- **Player Profile:** A full player profile is not implemented. This can be enhanced to show detailed player information when a user clicks to view player details.
- **Layout:** There is no specific layout design implemented. Different methods, such as flex or grid, can be used depending on how the content should be displayed, with a focus on responsive design.