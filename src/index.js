/**
 * Calculate transparent, first-pass estimates for promotion terms.
 * This library does not predict winnings or recommend gambling.
 */

const numberOr = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function calculateBonusAmount({ deposit, bonusPercent, bonusCap = Infinity }) {
  const depositAmount = Math.max(0, numberOr(deposit));
  const percentage = Math.max(0, numberOr(bonusPercent));
  const cap = bonusCap === Infinity ? Infinity : Math.max(0, numberOr(bonusCap));
  const uncapped = depositAmount * (percentage / 100);
  return Math.min(uncapped, cap);
}

export function calculateWagering({
  deposit,
  bonusPercent,
  bonusCap = Infinity,
  wageringMultiplier,
  wageringBase = 'depositPlusBonus',
  gameContribution = 100,
  maxBet = null,
  maxCashout = null,
}) {
  const depositAmount = Math.max(0, numberOr(deposit));
  const bonus = calculateBonusAmount({ deposit: depositAmount, bonusPercent, bonusCap });
  const multiplier = Math.max(0, numberOr(wageringMultiplier));
  const contribution = clamp(numberOr(gameContribution, 100), 0.01, 100);
  const base = wageringBase === 'bonusOnly' ? bonus : depositAmount + bonus;
  const wageringTarget = base * multiplier;
  const contributionAdjustedTarget = wageringTarget / (contribution / 100);

  return {
    deposit: depositAmount,
    bonus,
    base,
    multiplier,
    contribution,
    wageringTarget,
    contributionAdjustedTarget,
    maxBet: maxBet === null || maxBet === '' ? null : Math.max(0, numberOr(maxBet)),
    maxCashout: maxCashout === null || maxCashout === '' ? null : Math.max(0, numberOr(maxCashout)),
  };
}

export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(numberOr(value));
}
