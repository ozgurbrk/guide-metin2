const fs = require('fs');
const path = require('path');

const advancedQuests = [];

for (let i = 41; i <= 120; i++) {
  let level = "ORTA SEVIYE";
  if (i > 60) level = "GELISMIS SEVIYE";
  if (i > 100) level = "MASTER (SOURCE) SEVIYE";

  advancedQuests.push({
    id: i,
    level: level,
    title: `Görev ${i}: C++ Ustalığı`,
    description: "Metin2 Source dosyalarını anlayabilmek için C++ diline tam olarak hakim olmalısın. Bu görevde ileri düzey yeteneklerini sınıyoruz.",
    instruction: `Bu görevde ekrana tam olarak 'Gorev ${i} Tamamlandi' yazdırmalısın. İleri seviye konuları test ediyoruz.`,
    targetOutputText: `Gorev ${i} Tamamlandi`,
    successMessage: "Harika! Zoru başardın.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // Kodu buraya yaz\n    \n    return 0;\n}`
  });
}

// Ozel advanced görev ezelim
advancedQuests[0] = { // 41
  id: 41,
  level: "ORTA SEVIYE",
  title: "Görev 41: Header (.h) Dosyaları ve Struct Bağlantısı",
  description: "C++'da fonksiyonların ve struct'ların tanımları genellikle '.h' (Header) dosyalarında, içerikleri ise '.cpp' dosyalarında olur.",
  instruction: "Ekrana 'Gorev 41 Tamamlandi' yazdır.",
  targetOutputText: "Gorev 41 Tamamlandi",
  successMessage: "Harika! Metin2 klasörlerindeki char.h ve char.cpp mantığını kavradın.",
  defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Gorev 41 Tamamlandi";\n    return 0;\n}`
};

advancedQuests[20] = { // 61
  id: 61,
  level: "GELISMIS SEVIYE",
  title: "Görev 61: Kalıtım (Inheritance) - Polymorphism",
  description: "Metin2'de CEntity adında bir temel sınıf vardır. CMonster ve CCharacter bu sınıftan türetilir.",
  instruction: "Ekrana 'Gorev 61 Tamamlandi' yazdır.",
  targetOutputText: "Gorev 61 Tamamlandi",
  successMessage: "Nesne yönelimli mimarinin en güçlü silahı kalıtımdır.",
  defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Gorev 61 Tamamlandi";\n    return 0;\n}`
};

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const questsJson = JSON.stringify(advancedQuests, null, 2);
fileContent = fileContent.replace('];\n', ',\n' + questsJson.substring(1, questsJson.length - 1) + '\n];\n');

fs.writeFileSync(filePath, fileContent, 'utf-8');
console.log('Advanced gorevler basariyla eklendi!');
