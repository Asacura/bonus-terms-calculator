const field = (id) => document.getElementById(id);

const number = (id, fallback = 0) => {
  const value = Number(field(id).value);
  return Number.isFinite(value) ? value : fallback;
};

const currency = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
}).format(value);

function calculate() {
  const deposit = Math.max(0, number('deposit'));
  const bonusPercent = Math.max(0, number('bonusPercent'));
  const capValue = field('bonusCap').value;
  const cap = capValue === '' ? Infinity : Math.max(0, number('bonusCap'));
  const bonus = Math.min(deposit * bonusPercent / 100, cap);
  const multiplier = Math.max(0, number('wageringMultiplier'));
  const base = field('wageringBase').value === 'bonusOnly' ? bonus : deposit + bonus;
  const contribution = Math.min(100, Math.max(0.01, number('gameContribution', 100)));
  const target = base * multiplier;
  const adjusted = target / (contribution / 100);

  field('bonusAmount').textContent = currency(bonus);
  field('wageringTarget').textContent = currency(target);
  field('adjustedTarget').textContent = currency(adjusted);
}

document.querySelectorAll('input, select').forEach((control) => control.addEventListener('input', calculate));
calculate();
