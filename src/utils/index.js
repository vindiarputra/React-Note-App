const showFormattedDate = (date, lang) => {
  const tanggal = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(lang, tanggal);
};

export { showFormattedDate };
