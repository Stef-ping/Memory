const fotos = [
    'img/cliniclowns.jpg', 'img/cliniclowns.jpg',
    'img/hartstichting.png', 'img/hartstichting.png',
    'img/kika.png', 'img/kika.png',
    'img/unicef.png', 'img/unicef.png',
    'img/warchild.jpg', 'img/warchild.jpg',
    'img/wnf.png', 'img/wnf.png'
];

const schud_fotos = fotos.sort(() => Math.random() > 0.5 ? 1 : -1);
let card1 = null; // De eerste kaart die je kunt omdraaien 
let card2 = null; // De 2e kaart die je kunt omdraaien
let lockcards = false;  // Alle kaarten blocken zodat je ze niet meer kan omdraaien

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

            if (document.querySelectorAll('.boxMatch').length === schud_fotos.length) {
                document.getElementById('answercount').innerHTML = "Gewonnen!!!";
            }
        }, 1000);
    });

    document.querySelector('.game').appendChild(box);
}
