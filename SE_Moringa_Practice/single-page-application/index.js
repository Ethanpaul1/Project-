const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const form = document.getElementById('search-form')

function displayWordInfo(data) {
    const wordInfo = document.getElementById('word-info')

    wordInfo.innerHTML = ''

    const infoHead = document.createElement('h2')
    infoHead.textContent = 'Below is your word information: '
    wordInfo.appendChild(infoHead)

    const wordInfoList = document.createElement('ul')
    data.forEach(word => {
        const listItem = document.createElement('li')

        const phonetic = word.phonetics[0].text || 'N/A'
        const audio = word.phonetics.find(p => p.audio).audio
        const definition = word.meanings[0].definitions[0].definition
        const partOfSpeech = word.meanings[0].partOfSpeech
        let synonym = word.meanings[0].definitions[0].synonyms
        if(!synonym || synonym.length === 0) {
            synonym = 'N/A'
        }
        let antonym = word.meanings[0].definitions[0].antonyms
        if(!antonym || antonym.length === 0) {
            antonym = 'N/A'
        }

        listItem.innerHTML = `
            <p>
            Word: ${word.word}<br>
            Phonetic: ${phonetic}<br>
            Part of Speech: ${partOfSpeech}<br>
            Audio: ${audio}<br>
            Definition: ${definition}<br>
            Synonyms: ${synonym}<br>
            Antonyms: ${antonym}<br>
            </p>
        `

        wordInfoList.appendChild(listItem)
    })
    wordInfo.appendChild(wordInfoList)
}

async function fetchWordInfo(event) {
    event.preventDefault()

    const input = document.getElementById('word-input')
    const wordInfo = document.getElementById('word-info')

    const searchItem = input.value

    const endpoint = `${URL}${searchItem}`

    wordInfo.innerHTML = '<h2>Searching...</h2>'
    
    try {
        const response = await fetch(endpoint)

        if(!response.ok) {
            wordInfo.innerHTML = `
                <div class="error-message">
                    <h3>Oops!</h3>
                    <p>We couldn't find "<strong>${searchItem}</strong>".</p>
                </div>
            `
            return
        }

        const data = await response.json()
        console.log(data)

        displayWordInfo(data)

    } catch (error) {
        console.error("Error fetching data:", error)
    }
}

const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', fetchWordInfo) 



