const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ');

function formatDate(date: Date): string {
  const today = new Date();

  // Si la date est aujourd'hui
  if (date.toDateString() === today.toDateString()) {
    return 'Aujourd\'hui';
  }

  // Si la date est hier
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Hier';
  }

  // Si la date est avant-hier
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  if (date.toDateString() === twoDaysAgo.toDateString()) {
    return 'Avant-hier';
  }

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

export {
  classNames,
  formatDate,
};
