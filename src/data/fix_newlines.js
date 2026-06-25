const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// We need to parse the JSON array from quests.ts
let jsonStart = fileContent.indexOf('export const quests: Quest[] = [') + 'export const quests: Quest[] = '.length;
let jsonStr = fileContent.substring(jsonStart, fileContent.lastIndexOf(']') + 1);

let questsArray = JSON.parse(jsonStr);

// Fix the defaultCode for all quests
for(let i=0; i<questsArray.length; i++) {
  if (questsArray[i].defaultCode) {
    // If it contains a literal backslash followed by 'n', replace with actual newline
    questsArray[i].defaultCode = questsArray[i].defaultCode.replace(/\\n/g, '\n');
  }
}

const finalOutput = "export interface Quest {\n" +
  "  id: number;\n" +
  "  level: string;\n" +
  "  title: string;\n" +
  "  description: string;\n" +
  "  instruction: string;\n" +
  "  targetOutputText: string;\n" +
  "  defaultCode: string;\n" +
  "  successMessage: string;\n" +
  "}\n\n" +
  "export const quests: Quest[] = " + JSON.stringify(questsArray, null, 2) + ";\n";

fs.writeFileSync(filePath, finalOutput, 'utf-8');
console.log("Newline sorunu cozuldu!");
