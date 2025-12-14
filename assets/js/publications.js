async function loadPublications() {
  // Load BibTeX
  const bibText = await fetch('assets/bib/publications.bib')
    .then(res => res.text());

  const entries = bibtexParse.toJSON(bibText);

  // Convert BibTeX to CSL-JSON
  const items = {};
  entries.forEach(e => {
    items[e.citationKey] = {
      id: e.citationKey,
      type: "article-journal",
      title: e.entryTags.title,
      author: e.entryTags.author.split(" and ").map(a => {
        const parts = a.split(",");
        return { family: parts[0], given: parts[1]?.trim() };
      }),
      issued: { "date-parts": [[parseInt(e.entryTags.year)]] },
      container-title: e.entryTags.journal,
      volume: e.entryTags.volume,
      page: e.entryTags.pages,
      DOI: e.entryTags.doi
    };
  });

  // Load CSL style
  const csl = await fetch('assets/csl/chicago-author-date.csl')
    .then(res => res.text());

  const citeproc = new CSL.Engine({
    retrieveLocale: () => {},
    retrieveItem: id => items[id]
  }, csl);

  citeproc.updateItems(Object.keys(items));

  const bibliography = citeproc.makeBibliography()[1];

  document.getElementById('pub-list').innerHTML =
    '<ol>' + bibliography.map(e => `<li>${e}</li>`).join('') + '</ol>';
}

loadPublications();

