# Frontend Mentor - Character Counter Solution

This is a solution to the [Character Counter Challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/character-counter-znSgeWs_i6). This project allows users to analyze their text dynamically and improve their writing efficiency.

## Table of Contents

- [Frontend Mentor - Character Counter Solution](#frontend-mentor---character-counter-solution)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [The Challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My Process](#my-process)
    - [Built With](#built-with)
    - [What I Learned](#what-i-learned)
    - [Continued Development](#continued-development)
    - [Useful Resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Users should be able to:

- Analyze character, word, and sentence counts in real-time.
- Exclude or include spaces in character count.
- Set a custom character limit.
- Receive a warning message if the text exceeds the limit.
- See an estimated reading time based on the number of words.
- Analyze letter frequency distribution.
- Toggle between light and dark mode.
- Experience a fully responsive design across different screen sizes.
- See hover and focus states for interactive elements.

### Screenshot

![Character Counter Preview](/public/images/screenshot.png)

### Links

- **Solution URL:** [https://github.com/fawaziwalewa/character-counter](https://github.com/fawaziwalewa/character-counter)
- **Live Site URL:** [Vercel](https://character-counter-c7hripbyx-fawaziwalewas-projects.vercel.app)

## My Process

### Built With

- **Next.js** – A React framework for fast development.
- **Tailwind CSS** – For styling and responsive design.
- **React Hooks** – Used for managing state.
- **Next-Themes** – For dark/light mode handling.
- **Progress Bars** – Used to visualize letter frequency.
- **ESLint & Prettier** – For clean and consistent code.

### What I Learned

This project helped me refine my skills in:

1. **Handling Dynamic Text Analysis:**  
   - Implementing real-time text analysis for character, word, and sentence counts.

2. **Working with State in React (useState Hook):**  
   - Managing dynamic UI changes such as the "Show More/Less" button for letter density.

3. **Optimizing Performance in Next.js:**  
   - Ensuring calculations are efficient while updating state without unnecessary re-renders.

Here’s an example of how I handled the **letter frequency analysis** dynamically:

```js
const getLetterFrequency = () => {
  const letterCount = {};
  for (const char of textArea.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }
  }
  return Object.entries(letterCount)
    .sort((a, b) => b[1] - a[1])
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: ((count / getCharacterCount()) * 100).toFixed(2),
    }));
};
```

### Continued Development

In the future, I want to:

- Implement **browser storage (localStorage)** so users’ settings persist.
- Add **CSV export functionality** to save text analysis reports.
- Integrate an **AI-based readability score** to enhance the analysis.

### Useful Resources

- [MDN Web Docs - Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)  
  Helped me understand and refine regex patterns for counting words and sentences.

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
  Was crucial for implementing responsive design quickly.

- [Next-Themes](https://www.npmjs.com/package/next-themes)  
  Helped in efficiently managing dark/light mode toggling.

## Author

- **Website:** [iwaola.me](https://iwaola.me)
- **Frontend Mentor:** [@fawaziwalewa](https://www.frontendmentor.io/profile/fawaziwalewa)
- **GitHub:** [fawaziwalewa](https://github.com/fawaziwalewa)
- **Twitter:** [@IwalewaFawaz](https://twitter.com/IwalewaFawaz)

## Acknowledgments

A huge thank you to **Frontend Mentor** for providing challenging and engaging projects to build real-world skills.  
I also appreciate the open-source community for their continuous support and helpful documentation.
