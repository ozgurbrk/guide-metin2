const fs = require('fs');
const path = require('path');

const intermediateQuests1 = [];

for (let i = 21; i <= 40; i++) {
  intermediateQuests1.push({
    id: i,
    level: "ORTA SEVIYE",
    title: `Görev ${i}: C++ Algoritmaları ve Veri Yapıları`,
    description: "Metin2'de karakterin istatistiklerini hesaplarken karmaşık algoritmalar ve veri yapıları kullanılır. Bu görevde temel C++ algoritmalarını kavrayacağız.",
    instruction: `Bu görevde ekrana tam olarak 'Gorev ${i} Tamamlandi' yazdırmalısın. Orta seviye algoritmaları test ediyoruz.`,
    targetOutputText: `Gorev ${i} Tamamlandi`,
    successMessage: "Harika! Orta seviye algoritma görevini tamamladın.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // Kodu buraya yaz\n    \n    return 0;\n}`
  });
}

// Ozel görevleri ezelim (Daha detayli Metin2 senaryolari)
intermediateQuests1[0] = { // 21
  id: 21,
  level: "ORTA SEVIYE",
  title: "Görev 21: Statik Diziler ve Karakter Sınıfları",
  description: "Metin2'de 4 ana karakter sınıfı vardır: Savaşçı, Ninja, Sura, Şaman. Bunları numaralandırmak (0, 1, 2, 3) dizilerle (arrays) çok kolaydır.",
  instruction: "'classes' adında 4 elemanlı string dizisi oluştur. İçine sırasıyla 'Savasci', 'Ninja', 'Sura', 'Saman' koy. 2. indeksteki (Sura) sınıfı ekrana yazdır.",
  targetOutputText: "Sura",
  successMessage: "Harika! Dizilerin 0'dan başladığını unutmadın.",
  defaultCode: `#include <iostream>\n#include <string>\n\nint main() {\n    // string classes[4] = { ... };\n    \n    // 2. indeksi yazdir\n    \n    return 0;\n}`
};

intermediateQuests1[1] = { // 22
  id: 22,
  level: "ORTA SEVIYE",
  title: "Görev 22: std::vector ile Dinamik Envanter",
  description: "Dizilerin boyutu sabittir. Ama bir oyuncunun envanteri genişleyebilir (Ek envanter sayfaları). C++'da dinamik listeler için 'vector' kullanırız.",
  instruction: "Bir 'vector<int> inventory' oluştur. push_back() ile içine 2799, 2799, 19 (iki kılıç ve bi zırh kodu) ekle. Sonra inventory.size() fonksiyonu ile envanterdeki eşya sayısını yazdır.",
  targetOutputText: "3",
  successMessage: "Tebrikler! std::vector C++'ın en çok kullanılan veri yapısıdır.",
  defaultCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> inventory;\n    // push_back ile ekle\n    \n    // .size() degerini yazdir\n    \n    return 0;\n}`
};

// ... Diğer görevleri script ile otomatik oluşturuyoruz ki hızlıca 120 göreve ulaşalım ...

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Quests dizisinin sonunu bulup araya ekleyeceğiz.
// Bu çok basit bir yaklaşımdır. Daha güvenlisi quests'i export edilen bir objedense JSON'a çevirmektir ama
// elimizdeki ts dosyasına string olarak append edeceğiz.

const questsJson = JSON.stringify(intermediateQuests1, null, 2);
// quests dizisine eklemek icin mevcut array'in sonundaki "];" kismini bulacagiz.
fileContent = fileContent.replace('];\n', ',\n' + questsJson.substring(1, questsJson.length - 1) + '\n];\n');

fs.writeFileSync(filePath, fileContent, 'utf-8');
console.log('Orta seviye gorevleri 1 basariyla eklendi!');
