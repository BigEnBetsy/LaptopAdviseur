document.getElementById('laptop-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const processor = document.getElementById('processor').value;
    const ram = document.getElementById('ram').value;
    const storage = document.getElementById('storage').value;
    const price = document.getElementById('price').value;

    const searchCriteria = {
        processor,
        ram,
        storage,
        price
    };

    searchLaptops(searchCriteria);
});

function searchLaptops(criteria) {
    const apiUrl = 'https://fakestoreapi.com/products';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('laptop-form').classList.add('hidden');
            document.getElementById('laptop-results').classList.remove('hidden');

            const laptopList = document.getElementById('laptop-list');
            laptopList.innerHTML = '';

            const filtered = data.filter(product => {
                return (
                    product.price <= criteria.price &&
                    (product.title.toLowerCase().includes(criteria.processor.toLowerCase()) ||
                     product.title.toLowerCase().includes('laptop'))
                );
            });

            filtered.slice(0, 5).forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${product.title}</strong><br>
                    Prijs: €${product.price}<br>
                    <a href="${product.url || '#'}" target="_blank">Bekijk laptop</a>
                `;
                laptopList.appendChild(li);
            });

            const specsList = document.getElementById('laptop-specs');
            specsList.innerHTML = `
                <li>Processor: ${criteria.processor}</li>
                <li>RAM: ${criteria.ram} GB</li>
                <li>Opslag: ${criteria.storage} GB</li>
                <li>Maximale prijs: €${criteria.price}</li>
            `;

            // BOL.COM zoeklink genereren
            const zoekterm = `${criteria.processor} ${criteria.ram}GB RAM ${criteria.storage}GB laptop`;
            const zoeklink = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(zoekterm)}`;

            const bolLink = document.createElement('li');
            bolLink.innerHTML = `<a href="${zoeklink}" target="_blank">📦 Bekijk laptops op bol.com met deze specificaties</a>`;
            specsList.appendChild(bolLink);
        })
        .catch(error => {
            console.error('Er is een fout opgetreden:', error);
        });
}


// onderste is de juiste versie voeg ze samen!

// Deze functionaliteit is al in de HTML geïntegreerd
// Maar hier is dezelfde code als apart bestand:

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const specsFromTest = document.getElementById('specs-from-test');
    
    if (urlParams.toString()) {
      specsFromTest.innerHTML = `
        <h3>Jouw voorkeuren:</h3>
        <ul>
          <li><strong>Processor:</strong> ${urlParams.get('processor') || 'Niet gespecificeerd'}</li>
          <li><strong>RAM:</strong> ${urlParams.get('ram') || 'Niet gespecificeerd'} GB</li>
          <li><strong>Opslag:</strong> ${urlParams.get('storage') || 'Niet gespecificeerd'} GB</li>
          <li><strong>Maximale prijs:</strong> €${urlParams.get('maxprice') || 'Niet gespecificeerd'}</li>
        </ul>
      `;
      
      if (urlParams.has('processor')) document.getElementById('processor').value = urlParams.get('processor');
      if (urlParams.has('ram')) document.getElementById('ram').value = urlParams.get('ram');
      if (urlParams.has('storage')) document.getElementById('storage').value = urlParams.get('storage');
      if (urlParams.has('maxprice')) document.getElementById('price').value = urlParams.get('maxprice');
    }
  
    document.getElementById('laptop-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const processor = document.getElementById('processor').value;
      const ram = document.getElementById('ram').value;
      const storage = document.getElementById('storage').value;
      const price = document.getElementById('price').value;
  
      // Bouw Bol.com zoeklink
      const searchTerm = `${processor} ${ram}GB RAM ${storage}GB SSD laptop`;
      const searchUrl = `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(searchTerm)}&price=${price}`;
      
      // Redirect naar Bol.com met zoekparameters
      window.location.href = searchUrl;
    });
  
    document.getElementById('current-year').textContent = new Date().getFullYear();
  });