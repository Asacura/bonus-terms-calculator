# Bonus Terms Calculator

An open-source, dependency-free JavaScript library, CLI, and browser demo for modelling casino promotion terms.

The tool is designed for writers, analysts, and developers who want to compare the maths behind a promotion instead of relying on the headline percentage. It covers:

- bonus amount and bonus caps;
- wagering base and multiplier;
- game contribution;
- optional maximum bet and maximum cashout fields;
- a small browser demo and a Node.js CLI.

## Run the demo

No dependencies are required.

```bash
npm run demo
```

To open the browser demo locally, serve this directory with any static file server. For example:

```bash
npx serve .
```

## Use the library

```js
import { calculateWagering, formatCurrency } from 'bonus-terms-calculator';

const result = calculateWagering({
  deposit: 100,
  bonusPercent: 100,
  wageringMultiplier: 35,
  wageringBase: 'depositPlusBonus',
  gameContribution: 50,
});

console.log(formatCurrency(result.wageringTarget));
console.log(formatCurrency(result.contributionAdjustedTarget));
```

## Important limits

The contribution-adjusted figure is a transparent first-pass estimate. Real promotions can define contribution by game, stake type, excluded wagers, currency, jurisdiction, or other terms. This project does not predict winnings, recommend gambling, or replace the current promotion terms.

## About

The project is maintained as an independent educational utility by [WelcomeBonus.co](https://welcomebonus.co/). Corrections and improvements are welcome through GitHub issues and pull requests.

## License

MIT — see [LICENSE](LICENSE).
