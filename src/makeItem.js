function getId() {
  return Math.round(Math.random() * 36 ** 12).toString(36);
}

function makeItem(hashtags, id, length, position, source = '') {
  return {
    id: id || getId(),
    position,
    source,
    tweet: source
      ? `${position}/${length} ${source} ${hashtags}`
      : `${position}/${length} ${hashtags}`
  };
}

export default makeItem;
