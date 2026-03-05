export function daysFromNow(n) {
  const date = new Date();
  date.setDate(date.getDate() + n);
  return date;
}

export function fmtWhen(dt) {
  const diff = Math.round((Date.now() - dt.getTime()) / 36e5);
  if (diff < 1) return 'just now';
  if (diff < 24) return `${diff}h ago`;
  return `${Math.round(diff / 24)}d ago`;
}

export function dueLabel(due) {
  const now = new Date();
  const ms = due.getTime() - now.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  if (days === 0) return { text: 'Due today', kind: 'warning' };
  if (days > 0) return { text: `Due in ${days} day${days === 1 ? '' : 's'}`, kind: days <= 3 ? 'warning' : 'neutral' };
  return { text: `Overdue by ${Math.abs(days)}d`, kind: 'danger' };
}

export function riskLabel(risk) {
  if (risk === 'High') return { text: 'High risk', kind: 'danger' };
  if (risk === 'Medium') return { text: 'Medium risk', kind: 'warning' };
  return { text: 'Low risk', kind: 'neutral' };
}
