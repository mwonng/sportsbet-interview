## Summary

This project is designed to create a depth chart for sports teams. It is built using Create React App, with minimal dependencies to keep it lightweight and efficient. For styling, Tailwind CSS is utilized, and SVG icons are incorporated for visual elements.

## How to

Make sure you have node and npm installed, or yarn.

```sh
$ npm install & npm start
# or 
$ yarn & yarn start
```

after local dev server run, you can now go to http://localhost:3000/

## Features implemented
- **Add player from position box:** Add player by auto fill sport and position.
- **Move up and down:** Able to move up and down by button.
- **Filter:** Filter on top to filter sport/sport.
- **Show player's backup:** Show player's backup.
- **Fetch config and data:** Mock a fetch action to load sport config and data from API.


## Assumption and constrain
- **Test concern:** As this is project are purely UI demostrate purose and mainly UI focus, test coverage is not guaranteed.
- **Architecture:** Less is more, I try to use minimised 3rd party library, for style, I use tailwind as convenience. This can be used Context or state manager to manage the sport config and data, considering this app scope, I personally think this is necessary. so i just native react state for simplify.
- **Player profile:** Not fully implement a player profile, which can be improved to show detail of player info if user click to view the player information.
  