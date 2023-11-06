const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

async function generateQues() {
	const fileContent = require("./data/General KnowledgeAny.json").results;
	try {
		const data = fileContent.map((ele, idx) => {
			let incorrect_answer_text = "";
            ele.incorrect_answers.forEach(
    (inc_ans) => incorrect_answer_text+=`incorrect_options${
        idx + 1
    }:= List.push("${inc_ans}", incorrect_options${idx + 1});
            `
			);
			return `
    var incorrect_options${idx + 1} = List.nil<Text>();
    ${incorrect_answer_text}
    addMcqQues("${ele.question}", "${ele.correct_answer}", incorrect_options${
				idx + 1
			}, "${ele.type}", "${ele.category}");
            `;
		});
		const folderPath = path.join(__dirname, "code");
		if (!fs.existsSync(folderPath)) {
			await fsPromises.mkdir(folderPath);
		}

		const filePath = path.join(
			__dirname,
			"code",
			"General KnowledgeAny.txt"
		);

		data.forEach(async (ele) => {
			await fsPromises.appendFile(path.join(filePath), ele);
		});
	} catch (err) {
		console.error(err);
	}
}

generateQues();

// * var incorrect_options = List.nil<Text>();
// * incorrect_options := List.push("Ethiopian Coyote", incorrect_options);
// * incorrect_options := List.push("Amharic Fox", incorrect_options);
// * incorrect_options := List.push("Canis Simiensis", incorrect_options);
// * addMcqQues("What was the name of the Ethiopian Wolf before they knew it was related to wolves?", "Simien Jackel", incorrect_options, "multiple", "Animals");
