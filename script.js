const fotos = [
    'img/cliniclowns.jpg', 'img/cliniclowns.jpg',
    'img/hartstichting.png', 'img/hartstichting.png',
    'img/kika.png', 'img/kika.png',
    'img/unicef.png', 'img/unicef.png',
    'img/warchild.jpg', 'img/warchild.jpg',
    'img/wnf.png', 'img/wnf.png'
];

// Map each relative image path to its corresponding website URL
const urlMapping = {
    'img/cliniclowns.jpg': 'https://www.cliniclowns.nl/steun-ons/doneren/doneer',
    'img/hartstichting.png': 'https://www.hartstichting.nl/doneren',
    'img/kika.png': 'https://secure.kika.nl/doneer?donation_type=one_off',
    'img/unicef.png': 'https://www.unicef.nl/doneren?stap=1',
    'img/warchild.jpg': 'https://steun.warchild.nl/dba-spelenderwijs?_gl=1*1cinvv3*_ga*ODE5MDU1OTc1LjE3MjY2NjQ1Nzc.*_ga_31DMGJJ3N0*MTcyNjY2NDU3Ni4xLjEuMTcyNjY2NDU3OC4wLjAuNzY3NzI5ODI.*_fplc*RU10azIyZlBWMlM4a2xmdWtFcmp1enhiYm5kRm5QNXlMczlkcXpVVXJjJTJCWUM1RmpQeTNkUEwyOExiTEh6bjZkTEpGTiUyRkZpcFhLZldsNVRqaW1OZFpPSFdxbElvek5qZ2JWTDZTMGJuRXZudGhjJTJGUmRFcEhhUkpGTzg5amVnJTNEJTNE*FPAU*Mzc5NDkxNTYzLjE3MjY2NjQ1NzY.',
    'img/wnf.png': 'https://www.wwf.nl/kom-in-actie/met-een-donatie/geef-een-gift'
};

function openWebsite(url) {
    window.location.href = url;
}

const schud_fotos = fotos.sort(() => Math.random() > 0.5 ? 1 : -1);
let card1 = null; // The first card you can flip
let card2 = null; // The second card you can flip
let lockcards = false;  // Block all cards so you can't flip more

for (let i = 0; i < schud_fotos.length; i++) {
    let box = document.createElement("div");
    box.className = "item";

    let front = document.createElement("div");
    front.className = "front";

    let back = document.createElement("div");
    back.className = "back";
    let img = document.createElement("img");
    img.src = schud_fotos[i];
    img.id = `img-${i}`;
    back.appendChild(img);

    box.appendChild(front);
    box.appendChild(back);

    box.addEventListener('click', function() {
        if (lockcards) return;
        if (this === card1) return;

        this.classList.add('boxOpen');

        if (!card1) {
            card1 = this;
            return;
        }

        card2 = this;
        lockcards = true;

        setTimeout(() => {
            if (card1.querySelector('img').src === card2.querySelector('img').src) {
                card1.classList.add('boxMatch');
                card2.classList.add('boxMatch');
            } else {
                card1.classList.remove('boxOpen');
                card2.classList.remove('boxOpen');
            }

            card1 = null;
            card2 = null;
            lockcards = false;

            // Check if all cards are matched
            if (document.querySelectorAll('.boxMatch').length === schud_fotos.length) {
                // Assign the correct website to each matched card based on the image
                document.querySelectorAll('.boxMatch').forEach(card => {
                    let imgSrc = card.querySelector('img').src; // Get the full image source URL
                    console.log('Image src:', imgSrc); // Log the image source for debugging
            
                    // Convert image src to relative path for matching
                    let imgSrcRelative = imgSrc.split('/').pop(); // Extract filename
                    let url = urlMapping['img/' + imgSrcRelative]; // Map relative path
            
                    console.log('Mapped URL:', url); // Log the URL for debugging
            
                    if (url) {
                        card.onclick = function() {
                            window.open(url, '_blank'); // Open the correct URL in a new window
                        };
                    } else {
                        console.error('URL not found for:', imgSrc); // Log if URL is not found
                    }
            
                    // Add the 'clickable' class to each matched card
                    card.classList.add('clickable');
                });
            }
            
        }, 1000);
    });

    document.querySelector('.game').appendChild(box);
}
