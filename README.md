# Ice Milk — Lucky Draw

A premium single-page lucky draw app for the Ice Milk brand: a slow-spin
number reveal, a milk-glass progress indicator, spring-animated winner
cards, and a full winners table with CSV export.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy to Vercel

Push this folder to a GitHub repo and import it in Vercel, or run:

```bash
npx vercel
```

`vercel.json` already points at `npm run build` / `dist`, so no extra
configuration is needed.

## Swap in your own participants

Edit `src/data/participants.js`. Each entry needs:

```js
{ id, name, number, flavor }
```

- `id` must be unique — it's used to track who has already won.
- `number` is what shows on the spinning wheel. If two participants share a
  number, only the first one loaded stays eligible (surfaced in the
  pre-draw validation step).

## Adjusting the number of winners

Change `TOTAL_WINNERS` at the top of `src/App.jsx` (defaults to 10). Make
sure the participant list has at least that many unique numbers.

## Presentation mode

The button in the top-right corner requests browser fullscreen and hides
the footer note — meant for screen recording or presenting on a projector.

## Structure

```
src/
  App.jsx                 state machine: idle → validating → drawing → revealing → finished
  data/participants.js     sample participant list
  utils/draw.js             dedupe + true-random winner selection
  utils/csv.js               CSV export
  components/
    Header.jsx               logo + title
    BackgroundPattern.jsx     5%-opacity dessert doodle pattern
    MainCard.jsx              the card that swaps between phases
    MilkProgress.jsx          signature "glass filling with milk" progress
    ValidationPopup.jsx       1-second pre-draw transparency check
    DrawAnimation.jsx         3-second easing wheel cycle
    WinnerReveal.jsx          spring reveal + confetti
    WinnersTable.jsx          animated results table
    FinalScreen.jsx           completion screen + CSV download
    PresentationToggle.jsx    fullscreen / presentation mode
```
