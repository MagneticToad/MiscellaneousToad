var pokemonGoMode = true;

var SHOW_LIMIT = 25;

let typeSymbols = {"Normal": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg",
"Fire": "https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg",
"Water": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg",
"Grass": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg",
"Electric": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg",
"Ice": "https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg",
"Fighting": "https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg",
"Poison": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg",
"Ground": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg",
"Flying": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg",
"Psychic": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg",
"Bug": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg",
"Rock": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg",
"Ghost": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg",
"Dragon": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg",
"Dark": "https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg",
"Steel": "https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg",
"Fairy": "https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg"}


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
				img.width = 62;
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