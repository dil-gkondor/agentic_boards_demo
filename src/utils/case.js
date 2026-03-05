export function statusToKind(status) {
  if (status === 'Uploaded') return 'success';
  if (status === 'Missing') return 'danger';
  if (status === 'Needs Review') return 'warning';
  if (status === 'Rejected') return 'danger';
  return 'neutral';
}

export function computeCaseSummary(caseObj) {
  const completion = Math.round((caseObj.progress.done / caseObj.progress.total) * 100);
  const allEv = [...caseObj.evidence.required, ...caseObj.evidence.optional, ...caseObj.evidence.sensitive];
  const missing = allEv.filter((e) => e.status === 'Missing');
  const needsReview = allEv.filter((e) => e.status === 'Needs Review');
  const rejected = allEv.filter((e) => e.status === 'Rejected');
  const sensitiveFlagged = allEv.filter((e) => !!e.flagged);
  return { completion, missing, needsReview, rejected, sensitiveFlagged };
}
