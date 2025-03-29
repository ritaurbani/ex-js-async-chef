
// Bonus 1 
// GESTISCI ERRORI TRA UNA RICERCA E UN ALTRA
//ci aiuta a capire dov e l errore e di che tipo e
// ex: id (558493422) ex: link false per stabilire a quale fetch si riferisce
// Attualmente, se la prima richiesta non trova una ricetta,
// la seconda richiesta potrebbe comunque essere eseguita causando errori a cascata.
// Modifica getChefBirthday(id) per intercettare eventuali errori prima di fare la seconda richiesta.

// Bonus 2
// Utilizza la libreria dayjs per formattare la data di nascita nel formato giorno / mese / anno.
// Esempio di output atteso con formattazione
// Data di nascita dello chef: 15 /06 / 1990

async function getChefBirthday(id) {
    
    let recipes
    try{
        const response = await fetch(`https://dummyjson.com/recipes/${6798888}`)//dato resolve al fetch
        recipes = await response.json();
        console.log(recipes)//recipes ha cmq al suo interno qualcosa: oggetto con messaggio che contiene l errore
    }catch(error){//se c e errore > lo stampo in console e throw errore generico catturato da try catch sotto
        throw new Error(`Non trova la ricetta con id ${id}`)
    }
    if(recipes.message){//controlliamo se abbiamo ottento recipes - se tutto ok andiamo a fetch successivo
        throw new Error(recipes.message)//stampo messaggio direttamente
    }

    let chef
    try{
    const user = await fetch(`https://dummyjson.com/users/${recipes.userId}`)//se metto url falso fetch cannot obtain data
    chef = await user.json()
    }catch(error){
        console.error(error)
        throw new Error(`chef con id ${id} non trovato`)
    }

    if(!chef){//chef non e stato trovato non ha senso il return
        throw new Error(`chef con id ${id}non trovato`)
    }// return {...recipes, chef} //ritorna promise che risolve quel valore
    const newdate = dayjs(chef.birthDate).format('DD/MM/YYYY')
    return newdate
}

(async () => {//funzione anonima asincrona eseguita subito 1.creiamo contenuto 2.wrappiamo in try-catch
    try {
        const birthday = await getChefBirthday(1)
        console.log("Data di nascita dello chef:", birthday)
    } catch (error) {
        console.error("Errore:", error.message)
    }
    console.log("Fine!")//lo vediamo perche abbiamo gestito bene
})()

// console.log(dayjs) //ritorna in console una funzione per lavorare ocn le date