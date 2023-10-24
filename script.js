const API = `https://6519440e818c4e98ac60353a.mockapi.io`;
let response;
let item;
let el;

const heroes = (path) => {
    return fetch( API + `/${ path }` )
        .then( (response) => {
                if ( response.ok ) {
                    return response.json();
                } else {
                    return Promise.reject( response.status );
                }
            }
        )
        .catch( err => console.log( `In catch:${ err }` ) )
}
console.log( heroes( `heroes` ) )


const putHeroes = (path, id, item) => {
    return fetch( API + `/${ path }/${ id }`,
        {
            method: `PUT`,
            body: JSON.stringify( item ),
            headers: {
                "Content-type": "application/json"
            }
        } )
        .then( (response) => {
            console.log( response )
            if ( response.ok ) {
                return response.json()
            } else {
                return Promise.reject( response.status );
            }

        } )
        .catch( err => console.log( `In catch:${ err }` ) )
}

const heroesDelete = (path, id) => {
    return fetch( API + `/${ path }/${ id }`,
        {
            method: `DELETE`,
        } )
        .then( (response) => {
                if ( response.ok ) {
                    return response.json()
                } else {
                    return Promise.reject( response.status );
                }
            }
        )
}

const addHeroes = (path, item) => {
    return fetch( API + `/${ path }`,
        {
            method: `POST`,
            body: JSON.stringify( item ),
            headers: {
                "Content-type": "application/json"
            }
        } )
        .then( (response) => {
            console.log( response )
            if ( response.ok ) {
                return response.json()
            } else {
                return Promise.reject( response.status );
            }

        } )
        .catch( err => console.log( `In catch:${ err }` ) )
}


let tBody;

let thTag;

let th;
const ths = () => {
    let THDS = [ `Name`, `Comics`, `Favourite`, `Actions` ];
    th = THDS.map( el => {
        let thTag = document.createElement( `th` )
        thTag.innerHTML = `${ el }`
        return thTag
    } )
    return th
}

console.log( ths() )
const renderHeroes = () => {
    return heroes( `heroes` )
        .then( response => response.map( item => {
                console.log( item )
                let btnDelete = document.createElement( `button` );
                btnDelete.innerHTML = `Delete`;
                let tdBtn = document.createElement( `td` );
                tdBtn.append( btnDelete );

                let checkboxItem = document.createElement( `input` );
                checkboxItem.type = `checkbox`;
                checkboxItem.checked = item.favourite;
                checkboxItem.addEventListener( `change`, () => {
                    putHeroes( `heroes`, item.id, {favourite: !item.favourite} )
                        .then( response => console.log( response ) )
                } )
                let checkBoxtd = document.createElement( `td` );
                checkBoxtd.append( checkboxItem );
                let tr = document.createElement( `tr` );
                tr.innerHTML = `<td>${ item.name }</td> <td>${ item.comics }</td>`
                tr.append( checkBoxtd, tdBtn );
                console.log( tr )
                btnDelete.addEventListener( `click`, () => {
                    heroesDelete( `heroes`, item.id )
                        .then( () => tr.remove() )
                        .catch( err => console.log( `catch: ${ err }` ) )
                } )
                return tr;
            } )
        )
}


const createTable = () => {
    renderHeroes()
        .then( (tr) => {

                let tBody = document.createElement( `tBody` )
                let table = document.createElement( `table` )
                let tableContainer = document.querySelector( `.container` )
                let THD = document.createElement( `thead` );
                let TRhead = document.createElement( `tr` );
                let TH = ths();
                TRhead.append( ...TH );
                THD.append( TRhead );
                tBody.append( ...tr )
                table.append( THD );
                table.append( tBody )
                table.classList = `table`;
                tableContainer.append( table )
                console.log( table )
                let btnDelete = document.createElement( `button` );
                return table;
            }
        )

}

createTable()

const renderOptions = () => {
    return heroes( `comics` )
        .then( (comicses) => {
                comicses.forEach( comics => {
                    console.log( comics.name )
                    const option = document.createElement( `option` );
                    option.innerHTML = `${ comics.name }`;
                    option.value = comics.name;

                    selectHero.append( option );
                } )
            }
        )
}
renderOptions()


let selectHero;
const heroes_form = document.querySelector( `#heroes_form` );
if ( heroes_form ) {
    const inputHero = heroes_form.querySelector( `input[data-name="name"]` );
    const checkHero = heroes_form.querySelector( `input[data-name="completed"]` )
    selectHero = heroes_form.querySelector( `select[data-name="comics"]` )

    heroes_form.addEventListener( `submit`, (e) => {
        e.preventDefault();


        let hero = {
            name: inputHero.value,
            comics: selectHero.value,
            favourite: checkHero.checked,
        }

        addHeroes( `heroes`, hero )
            .then( (data) => {
                console.log( data )
                let newTR = document.createElement( `tr` );

                hero.map( el => {
                    let newTD = document.createElement( `td` );
                    newTD.append( hero.name, hero.comics, hero.favourite )
                } )

            } )
            .catch( err => console.log( `In catch:${ err }` ) )

    } )
}





