// TRACCIA

// In questo esercizio, utilizzerai async / await per creare la funzione getChefBirthday(id).
// Questa funzione accetta un id di una ricetta e deve:

// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef

// Note del docente

// Scrivi la funzione getChefBirthday(id), che deve:

// Essere asincrona(async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch

// Esempio di utilizzo

// getChefBirthday(1)
//     .then(birthday => console.log("Data di nascita dello chef:", birthday))
//     .catch(error => console.error("Errore:", error.message));

// Esempio di output atteso:
// Data di nascita dello chef: 1990-06 - 15

//ESECUZIONE

async function getChefBirthday(id){
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)
    const recipes = await response.json();
    console.log(recipes)//vedo a ceh punto sono
    const user = await fetch(`https://dummyjsonfalso.com/users/${recipes.userId}`)
    const chef = await user.json()
    console.log(chef)
    // return {...recipes, chef} //ritorna promise che risolve quel valore
    return chef.birthDate
}

//INVOCAZIONI

// getChefBirthday(1)
// .then(birthday => console.log("Data di nascita dello chef:", birthday))
// .catch(error => console.error("Errore:", error.message));

(async() => {
try {
    const birthday = await getChefBirthday(1)
console.log("Data di nascita dello chef:", birthday)
}catch(error){
    console.error("Errore:", error.message)
}
console.log("Fine!")//lo vediamo perche abbiamo gestito bene
})()