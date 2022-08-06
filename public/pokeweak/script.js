var pokemonGoMode = true;

var SHOW_LIMIT = 25;

let typeSymbols = {"Normal": "https://static.wikia.nocookie.net/pokemongo/images/4/43/Icon_Normal.png/revision/latest?cb=20171219195828",
"Fire": "https://static.wikia.nocookie.net/pokemongo/images/0/0a/Icon_Fire.png/revision/latest?cb=20171219195825",
"Water": "https://static.wikia.nocookie.net/pokemongo/images/6/65/Icon_Water.png/revision/latest?cb=20171219195830",
"Grass": "https://static.wikia.nocookie.net/pokemongo/images/0/0a/Icon_Grass.png/revision/latest?cb=20171219195826",
"Electric": "https://static.wikia.nocookie.net/pokemongo/images/1/1c/Icon_Electric.png/revision/latest?cb=20171219195824",
"Ice": "https://static.wikia.nocookie.net/pokemongo/images/5/52/Icon_Ice.png/revision/latest?cb=20171219195828",
"Fighting": "https://static.wikia.nocookie.net/pokemongo/images/f/f0/Icon_Fighting.png/revision/latest?cb=20171219195825",
"Poison": "https://static.wikia.nocookie.net/pokemongo/images/2/26/Icon_Poison.png/revision/latest?cb=20171219195828",
"Ground": "https://static.wikia.nocookie.net/pokemongo/images/7/71/Icon_Ground.png/revision/latest?cb=20171219195827",
"Flying": "https://static.wikia.nocookie.net/pokemongo/images/b/b0/Icon_Flying.png/revision/latest?cb=20171219195826",
"Psychic": "https://static.wikia.nocookie.net/pokemongo/images/c/ce/Icon_Psychic.png/revision/latest?cb=20171219195829",
"Bug": "https://static.wikia.nocookie.net/pokemongo/images/8/88/Icon_Bug.png/revision/latest?cb=20171219195822",
"Rock": "https://static.wikia.nocookie.net/pokemongo/images/5/57/Icon_Rock.png/revision/latest?cb=20171219195830",
"Ghost": "https://static.wikia.nocookie.net/pokemongo/images/7/7d/Icon_Ghost.png/revision/latest?cb=20171219195826",
"Dragon": "https://static.wikia.nocookie.net/pokemongo/images/d/d4/Icon_Dragon.png/revision/latest?cb=20171219195823",
"Dark": "https://static.wikia.nocookie.net/pokemongo/images/e/e9/Icon_Dark.png/revision/latest?cb=20171219195823",
"Steel": "https://static.wikia.nocookie.net/pokemongo/images/3/38/Icon_Steel.png/revision/latest?cb=20171219195830",
"Fairy": "https://static.wikia.nocookie.net/pokemongo/images/7/7f/Icon_Fairy.png/revision/latest?cb=20171219195824"}


function search() {
	let table = document.querySelector("#results");
	if (pokemonGoMode) {
		table.innerHTML = '<tr><th class="sprite">Image</th><th class="name">Name</th><th class="doubleWeak">2.56x</th><th class="weak">1.6x</th><th class="neutral">1x</th><th class="resist">0.625x</th><th class="doubleResist">0.391x</th><th class="tripleResist">0.244x</th></tr>';
	} else {
		table.innerHTML = '<tr><th class="sprite">Image</th><th class="name">Name</th><th class="doubleWeak">4x</th><th class="weak">2x</th><th class="neutral">1x</th><th class="resist">0.5x</th><th class="doubleResist">0.25x</th><th class="immune">0x</th></tr>';
	}
	
	let regex = new RegExp(`\\b${document.querySelector("#search").value}`, "i");
	let count = 0;
	for (var pokemon of pokemonData) {
		if (regex.test(pokemon.name)) {
			count++;
			if (count > SHOW_LIMIT) {
				break;
			}
			let imageCell = document.createElement("td");
			let image = document.createElement("img");
			image.src = pokemon.img;
			imageCell.appendChild(image);
			
			let row = document.createElement("tr");
			
			let nameCell = document.createElement("td");
			
			let doubleWeaknessCell = document.createElement("td");
			let weaknessCell = document.createElement("td");
			let neutralCell = document.createElement("td");
			let resistanceCell = document.createElement("td");
			let doubleResistanceCell = document.createElement("td");
			let tripleResistanceCell = document.createElement("td");
			
			let typeMatrix = {"doubleWeakness": [], "weakness": [], "neutral": [], "resistance": [], "doubleResistance": [], "tripleResistance": []};
			
			for (let type in typeData) {
				let netPosition = 0;
				if (typeData[pokemon.type1].immunities.includes(type)) {
					netPosition -= pokemonGoMode ? 2 : 99;
				} else if (typeData[pokemon.type1].resistances.includes(type)) {
					netPosition -= 1;
				} else if (typeData[pokemon.type1].weaknesses.includes(type)) {
					netPosition += 1;
				}
				
				if (pokemon.type2) {
					if (typeData[pokemon.type2].immunities.includes(type)) {
						netPosition -= pokemonGoMode ? 2 : 99;
					} else if (typeData[pokemon.type2].resistances.includes(type)) {
						netPosition -= 1;
					} else if (typeData[pokemon.type2].weaknesses.includes(type)) {
						netPosition += 1;
					}
				}
				
				let img = document.createElement("img");
				img.src = typeSymbols[type];
				switch (netPosition) {
					case -2:
						doubleResistanceCell.appendChild(img);
						break;
					case -1:
						resistanceCell.appendChild(img);
						break;
					case 0:
						neutralCell.appendChild(img);
						break;
					case 1:
						weaknessCell.appendChild(img);
						break;
					case 2:
						doubleWeaknessCell.appendChild(img);
						break;
					default: //will go here if it is -3 in pokemonGoMode or -100 to -98 outside pokemonGoMode
						tripleResistanceCell.appendChild(img);
						break;
				}
			}
			
			let div = document.createElement("div");
			let name = document.createElement("p");
			

			name.innerHTML = pokemon.name;
			div.appendChild(name);

			let innerDiv =  document.createElement("div");
			innerDiv.classList.add("pokemonTypes");
			let type1 = document.createElement("img");
			type1.src = typeSymbols[pokemon.type1];
			innerDiv.appendChild(type1);
			if (pokemon.type2) {
				let type2 = document.createElement("img");
				type2.src = typeSymbols[pokemon.type2];
				innerDiv.appendChild(type2);
			}
			
			div.appendChild(innerDiv);
			nameCell.appendChild(div);

			nameCell.classList.add("name");
			imageCell.classList.add("sprite");
			doubleWeaknessCell.classList.add("doubleWeak");
			weaknessCell.classList.add("weak");
			neutralCell.classList.add("neutral");
			resistanceCell.classList.add("resist");
			doubleResistanceCell.classList.add("doubleResist");
			tripleResistanceCell.classList.add(pokemonGoMode ? "tripleResist" : "immune");

			row.appendChild(imageCell);
			row.appendChild(nameCell);
			row.appendChild(doubleWeaknessCell);
			row.appendChild(weaknessCell);
			row.appendChild(neutralCell);
			row.appendChild(resistanceCell);
			row.appendChild(doubleResistanceCell);
			row.appendChild(tripleResistanceCell);
			
			table.appendChild(row);
		}
	}
}

function toggleMode() {
	pokemonGoMode = !pokemonGoMode;
	search();
}