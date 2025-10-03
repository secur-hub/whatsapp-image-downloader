(() => {
  const nodes = document.querySelectorAll("img[src^='blob:'], img[src^='https://mmg.whatsapp.net'], span[style*='background-image']");
  const urls = [];

  nodes.forEach(n => {
    if (n.tagName === "IMG" && n.src) {
      urls.push(n.src);
    } else {
      const match = n.style.backgroundImage.match(/url\("(.*)"\)/);
      if (match && match[1]) urls.push(match[1]);
    }
  });

  const unique = [...new Set(urls)];
  if (!unique.length) {
    alert("Nessuna immagine trovata. Scorri la chat o apri la galleria e riprova.");
    return;
  }

  unique.forEach((src, idx) => {
    fetch(src, { credentials: 'include' })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wa_image_${idx+1}.${blob.type.split("/")[1] || "jpg"}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      })
      .catch(e => console.error("Errore download", e));
  });

  alert(`Trovate ${unique.length} immagini → inizio download.`);
})();