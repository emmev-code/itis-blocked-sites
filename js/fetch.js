fetch('https://gist.githubusercontent.com/usefulstuffs/930ca4c5442fcccbb3554276f453b35b/raw/blocklist.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nel caricamento del file JSON');
        }
        return response.json();
      })
      .then(siti => {
        const tbody = document.querySelector('#tabella-siti tbody');
        siti.forEach(sito => {
          const statoTesto = sito.stato || "Sconosciuto";
          const note = sito.note || "";

          let classeStato = "";
          const statoLower = statoTesto.toLowerCase();

          if (statoLower.includes("sbloccato")) {
            classeStato = "sbloccato";
          } else if (statoLower.includes("bloccato")) {
            classeStato = statoLower.includes("parzial") ? "parziale" : "bloccato";
          }

          const riga = document.createElement('tr');
          riga.innerHTML = `
            <td>${sito.nome}</td>
            <td><a href="${sito.url}" target="_blank">${sito.url}</a></td>
            <td><span class="stato ${classeStato}">${statoTesto}</span></td>
            <td class="note">${note}</td>
          `;
          tbody.appendChild(riga);
        });
      })
      .catch(error => {
        alert('Errore durante il caricamento dei dati, per favore riprova o riporta il problema su GitHub: https://github.com/emmev-code/itis-blocked-sites');
        console.log('Errore:', error);
      });
