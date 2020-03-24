function makeLink(data) {
  return `https://twitter.com/${data.userId.split('|')[1]}/status/${
    data.statusIds[0]
  }`;
}

export default makeLink;
