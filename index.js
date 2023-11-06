const fetch = require('node-fetch');
const path = require('path');
const fsPromises = require('fs').promises;

let api = "https://opentdb.com/api.php?";
const trivia_categories =  [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
]

const difficulties = ["easy", "medium", "hard"];


const noOfQues = 20;

api += `amount=${noOfQues}`;

async function fetchQuestions(api, name){
    const response = await fetch(api);
    const data = await response.json();
    const filepath = path.join(__dirname, 'data', `${name}.json`);
    await fsPromises.writeFile(filepath, JSON.stringify(data));
    console.log('Written ', name);
}

trivia_categories.forEach(category => {
    const curruntUrl = `${api}&category=${category.id}`
    fetchQuestions(curruntUrl, `${category.name}Any`);
    difficulties.forEach(diff => {
        fetchQuestions(`${curruntUrl}&difficulty=${diff}`,  `${category.name}${diff}`)
    })
})