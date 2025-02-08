'use client'
import Image from "next/image";
import DarkMode from "./components/DarkMode";
import Logo from "./components/Logo";
import { useState } from "react";

export default function Home() {
  const [textArea, setTextArea] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [setCharLimit, setSetCharLimit] = useState(false);
  const [charLimit, setCharLimitValue] = useState(300);
  const [showMore, setShowMore] = useState(false);
  const maxLettersToShow = showMore ? 20 : 5;

  // Calculate counts dynamically
  const getCharacterCount = () => {
    return excludeSpaces ? textArea.replace(/\s/g, "").length : textArea.length;
  };

  const getWordCount = () => {
    return textArea.trim() === "" ? 0 : textArea.trim().split(/\s+/).length;
  };

  const getSentenceCount = () => {
    return textArea.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;
  };

  // Calculate estimated reading time
  const getReadingTime = () => {
    const words = getWordCount();
    if (words === 0) return "0 minutes";
    const time = Math.ceil(words / 50); // 50 words per minute average
    return time < 50 ? "<1 minute" : `${time} minute${time > 50 ? "s" : ""}`;
  };

  // Calculate letter frequency
  const getFullLetterFrequency = () => {
    const letterCount: { [key: string]: number } = {};
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

  const fullLetterFrequency = getFullLetterFrequency();
  const displayedLetterFrequency = fullLetterFrequency.slice(0, maxLettersToShow);

  return (
    <main className="w-full max-w-screen-lg p-4 mx-auto">
      <div className="flex items-center justify-between">
        <Logo />
        <DarkMode />
      </div>

      <h1 className="mt-10 text-4xl font-bold text-center">Analyze your text in real-time.</h1>

      {/* Textarea Input */}
      <textarea
        value={textArea}
        onChange={(e) => {
          if (setCharLimit && e.target.value.length > charLimit) return;
          setTextArea(e.target.value);
        }}
        className={`w-full p-4 mt-10 border rounded-lg shadow-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 focus:outline-none focus:bg-neutral-200 dark:focus:bg-neutral-700 focus:ring-1
          ${setCharLimit && textArea.length >= charLimit
            ? "border-orange-800 shadow-orange-500/50 focus:border-orange-800 focus:outline-orange-800 focus:shadow-orange-500/50"
            : "border-neutral-200 dark:border-neutral-700 focus:border-purple-500 focus:outline-purple-500 focus:shadow-purple-500/50"
          }`}
        placeholder="Start typing here… (or paste your text)"
        rows={6}
      ></textarea>

      {/* Character Limit Warning */}
      {setCharLimit && textArea.length >= charLimit && (
        <div className="flex items-center gap-1 mt-1 text-sm text-orange-800">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1.34375C3.71875 1.34375 1.09375 3.99609 1.09375 7.25C1.09375 10.5312 3.71875 13.1562 7 13.1562C10.2539 13.1562 12.9062 10.5312 12.9062 7.25C12.9062 3.99609 10.2266 1.34375 7 1.34375ZM7 0.46875C10.7188 0.46875 13.7812 3.53125 13.7812 7.25C13.7812 10.9961 10.7188 14.0312 7 14.0312C3.25391 14.0312 0.21875 10.9961 0.21875 7.25C0.21875 3.53125 3.25391 0.46875 7 0.46875ZM6.01562 9.875H6.34375V6.59375H6.01562C5.82422 6.59375 5.6875 6.45703 5.6875 6.26562V6.04688C5.6875 5.88281 5.82422 5.71875 6.01562 5.71875H7.32812C7.49219 5.71875 7.65625 5.88281 7.65625 6.04688V9.875H7.98438C8.14844 9.875 8.3125 10.0391 8.3125 10.2031V10.4219C8.3125 10.6133 8.14844 10.75 7.98438 10.75H6.01562C5.82422 10.75 5.6875 10.6133 5.6875 10.4219V10.2031C5.6875 10.0391 5.82422 9.875 6.01562 9.875ZM7 3.3125C7.46484 3.3125 7.875 3.72266 7.875 4.1875C7.875 4.67969 7.46484 5.0625 7 5.0625C6.50781 5.0625 6.125 4.67969 6.125 4.1875C6.125 3.72266 6.50781 3.3125 7 3.3125Z" fill="#DA3701" />
          </svg>
          <p>Limit reached! Your text exceeds {charLimit} characters.</p>
        </div>
      )}

      {/* Options */}
      <div className="grid gap-2 mt-3 md:flex md:items-center md:gap-4">
        <div>
          <input type="checkbox" name="excludeSpaces" id="excludeSpaces" className="hidden peer" onChange={() => setExcludeSpaces(!excludeSpaces)} />
          <label htmlFor="excludeSpaces" className="flex items-center gap-2 cursor-pointer">
            {excludeSpaces ?
              (<Image src="/images/icon-checked.svg" alt="Checked" width={16} height={17} />) :
              (
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-neutral-200" d="M0.5 4.5C0.5 2.567 2.067 1 4 1H12C13.933 1 15.5 2.567 15.5 4.5V12.5C15.5 14.433 13.933 16 12 16H4C2.067 16 0.5 14.433 0.5 12.5V4.5Z" stroke="#12131A" />
                </svg>
              )
            } Exclude spaces</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="setCharLimit" id="setCharLimit" className="hidden peer" onChange={() => setSetCharLimit(!setCharLimit)} />

          <label htmlFor="setCharLimit" className="flex items-center gap-2 cursor-pointer">
            {setCharLimit ?
              (<Image src="/images/icon-checked.svg" alt="Checked" width={16} height={17} />) :
              (
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-neutral-200" d="M0.5 4.5C0.5 2.567 2.067 1 4 1H12C13.933 1 15.5 2.567 15.5 4.5V12.5C15.5 14.433 13.933 16 12 16H4C2.067 16 0.5 14.433 0.5 12.5V4.5Z" stroke="#12131A" />
                </svg>
              )
            } Set character limit</label>

          {setCharLimit && (
            <>
              <label htmlFor="charLimit" className="sr-only">Character limit value</label>
              <input type="number" name="charLimit" id="charLimit" onChange={(e) => setCharLimitValue(Number(e.target.value))} className="w-16 px-2 py-1 bg-transparent border rounded-lg border-neutral-600 focus:outline-none focus:ring-1 focus:bg-neutral-200 dark:focus:bg-neutral-700 focus:border-purple-500 focus:shadow-purple-500/50" />
            </>
          )}
        </div>
        <p>Approx. reading time(Avg. 50WPM): {getReadingTime()}</p>
      </div>

      {/* Character & Word Counts */}
      <div className="grid gap-4 mt-10 text-neutral-900 md:grid-cols-3">
        <div className="rounded-lg bg-purple-400 w-full bg-[url('/images/pattern-character-count.svg')] bg-no-repeat bg-right py-7 px-5">
          <h2 className="text-4xl font-bold">{getCharacterCount()}</h2>
          <p className="mt-2 text-lg font-medium">Total Characters</p>
        </div>
        <div className="rounded-lg bg-yellow-500 w-full bg-[url('/images/pattern-word-count.svg')] bg-no-repeat bg-right py-7 px-5">
          <h2 className="text-4xl font-bold">{getWordCount()}</h2>
          <p className="mt-2 text-lg font-medium">Word count</p>
        </div>
        <div className="rounded-lg bg-orange-500 w-full bg-[url('/images/pattern-sentence-count.svg')] bg-no-repeat bg-right py-7 px-5">
          <h2 className="text-4xl font-bold">{getSentenceCount()}</h2>
          <p className="mt-2 text-lg font-medium">Sentence count</p>
        </div>
      </div>

      {/* Letter Frequency */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold">Letter Density</h3>
        {fullLetterFrequency.length === 0 && <p className="mt-2">No characters found. Start typing to see letter density.</p>}
        
        <ul className="mt-5 space-y-2">
          {displayedLetterFrequency.map(({ letter, count, percentage }) => (
            <li key={letter} className="flex items-center gap-4">
              <span className="w-4">{letter.toUpperCase()}</span>
              <progress value={percentage} max={100} className="flex-1 rounded-lg"></progress>
              <span className="w-24 whitespace-nowrap">{count} ({percentage}%)</span>
            </li>
          ))}
        </ul>

        {/* Show More Button */}
        {fullLetterFrequency.length > 5 && (
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="flex items-end gap-1 mt-5"
          >
            {showMore ? "Show less" : "See more"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d={showMore ? "M19.5 15.75L12 8.25 4.5 15.75" : "M19.5 8.25L12 15.75 4.5 8.25"} />
            </svg>
          </button>
        )}
      </div>
    </main>
  );
}
