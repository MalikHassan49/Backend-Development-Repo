function cleanText(text) {
  if (!text) return '';

  return text
  .replace(/<sup[^>]*>.*?<\/sup>/g, '')
  .trim();

}

export default cleanText;