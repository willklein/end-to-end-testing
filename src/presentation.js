// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  MarkdownSlides,
  Quote,
  Slide,
  Text,
} from 'spectacle';

import markdown from "./markdown.md";

// Import theme
import createTheme from "spectacle-theme-nova";
const theme = createTheme();

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        {MarkdownSlides(markdown)}
      </Deck>
    );
  }
}
