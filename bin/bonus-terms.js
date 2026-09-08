#!/usr/bin/env node
import { calculateWagering, formatCurrency } from '../src/index.js';

const result = calculateWagering({
  deposit: 100,
  bonusPercent: 100,
  wageringMultiplier: 35,
  wageringBase: 'depositPlusBonus',
  gameContribution: 100,
});

console.log('Bonus Terms Calculator demo');
console.log('Deposit:', formatCurrency(result.deposit));
console.log('Bonus:', formatCurrency(result.bonus));
console.log('Wagering target:', formatCurrency(result.wageringTarget));
console.log('Contribution-adjusted target:', formatCurrency(result.contributionAdjustedTarget));
