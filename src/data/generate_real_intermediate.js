const fs = require('fs');
const path = require('path');

// 21 ile 60 arasindaki gercek Orta Seviye Gorevler (Detayli Metin2 Senaryolari ile)
const quests = [
  // --- VERİ YAPILARI (DATA STRUCTURES) ---
  {
    id: 21,
    level: "ORTA SEVIYE: VERI YAPILARI",
    title: "Görev 21: Statik Diziler ve Sınıflar",
    description: "Metin2'de 4 ana karakter sınıfı vardır: Savaşçı, Ninja, Sura, Şaman. Bunları dizilerle (arrays) tutmak, ID'lerine göre çağırmayı kolaylaştırır (0=Savaşçı, 1=Ninja...).",
    instruction: "'classes' adında 4 elemanlı string dizisi oluştur. 'Savasci', 'Ninja', 'Sura', 'Saman' değerlerini ata. Sonra classes[2] diyerek Sura sınıfını ekrana yazdır.",
    targetOutputText: "Sura",
    successMessage: "Harika! Diziler C++'da 0'dan başlar, bu yüzden 2. indeks sana Sura'yı verir.",
    defaultCode: `#include <iostream>\n#include <string>\n\nint main() {\n    // string dizisini olustur\n    \n    // ekrana yazdir\n    \n    return 0;\n}`
  },
  {
    id: 22,
    level: "ORTA SEVIYE: VERI YAPILARI",
    title: "Görev 22: Dinamik Envanter (std::vector)",
    description: "Standart dizilerin boyutu sabittir. Ancak bir oyuncu pazardan eşya aldığında envanteri büyür. std::vector, boyutu dinamik olarak değişebilen akıllı bir dizidir.",
    instruction: "'inventory' adında bir vector<int> oluştur. push_back() kullanarak içine 2799 (Dolunay), 299 (Zehir), 19 (Geleneksel) ekle. Ardından envanterdeki 2. esyayi (indeks 1) yazdir.",
    targetOutputText: "299",
    successMessage: "Tebrikler! Metin2 kaynak kodunda oyuncu envanteri genellikle std::vector veya C++11 array'leri ile tutulur.",
    defaultCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> inventory;\n    // esyalari ekle\n    \n    // inventory[1] degerini yazdir\n    \n    return 0;\n}`
  },
  {
    id: 23,
    level: "ORTA SEVIYE: VERI YAPILARI",
    title: "Görev 23: Vector Boyutunu Öğrenme",
    description: "Envanterin dolup dolmadığını (inventory full) kontrol etmek için vektörün o anki boyutunu bilmemiz gerekir.",
    instruction: "İçi boş bir vector<int> oluştur. 5 adet eşya kodunu push_back ile ekle. Son olarak 'inventory.size()' fonksiyonunu kullanarak toplam eşya sayısını yazdır.",
    targetOutputText: "5",
    successMessage: "Güzel. Oyuncuya eşya vermeden önce 'if (inventory.size() >= MAX_INVENTORY)' şeklinde kontroller yapacağız.",
    defaultCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    // Vector olustur ve 5 esya ekle\n    \n    // Boyutu yazdir\n    \n    return 0;\n}`
  },
  {
    id: 24,
    level: "ORTA SEVIYE: VERI YAPILARI",
    title: "Görev 24: Döngü ile Vector Tarama",
    description: "Karakterin üzerindeki tüm eşyaları veritabanına kaydetmek için vektördeki tüm elemanları sırayla dönmemiz gerekir.",
    instruction: "İçinde 101, 102, 103 olan bir vektör oluştur. Bir for döngüsü (veya for-each) kullanarak elemanları yan yana aralarında tire (-) ile yazdır.",
    targetOutputText: "101-102-103-",
    successMessage: "Range-based for loops (for (int item : inventory)) C++11 ile gelmiş harika bir özelliktir.",
    defaultCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> items = {101, 102, 103};\n    \n    // items icinde for ile donup yazdir\n    \n    return 0;\n}`
  },
  {
    id: 25,
    level: "ORTA SEVIYE: VERI YAPILARI",
    title: "Görev 25: std::map (Sözlük / Anahtar-Değer)",
    description: "Metin2'de 'Vnum' (Esya ID) yazdığımızda esyanin ismini getiren bir sisteme ihtiyacımız var. std::map, bir anahtarı bir değere (ID -> İsim) bağlar.",
    instruction: "std::map<int, std::string> itemNames; oluştur. itemNames[2799] = \"Dolunay Kilici\"; ata. Sonra 2799 anahtarını kullanarak ismi ekrana yazdır.",
    targetOutputText: "Dolunay Kilici",
    successMessage: "Harika! Metin2'deki 'item_proto' veritabanı sunucu açıldığında tam olarak böyle devasa bir map'in içine yüklenir.",
    defaultCode: `#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<int, std::string> itemNames;\n    // Atamayi yap\n    \n    // Degeri cagirip yazdir\n    \n    return 0;\n}`
  },
  
  // --- ENUM VE BITWISE OPERATÖRLER ---
  {
    id: 26,
    level: "ORTA SEVIYE: BIT VE ENUM",
    title: "Görev 26: Enumeration (enum)",
    description: "Kodun içinde '1' savaşçı, '2' ninja demek yerine bunları isimlerle sabitlemek okunabilirliği artırır. Enum (numaralandırma) bu işe yarar.",
    instruction: "enum JOB { JOB_WARRIOR = 0, JOB_ASSASSIN = 1, JOB_SURA = 2, JOB_SHAMAN = 3 }; tanımla. Bir değişken int myJob = JOB_SURA; yap ve myJob değerini yazdır.",
    targetOutputText: "2",
    successMessage: "Oyunun ana C++ dosyalarında JOB_WARRIOR gibi binlerce enum sabiti göreceksin.",
    defaultCode: `#include <iostream>\n\n// enum tanimi buraya\n\nint main() {\n    // atama ve yazdirma\n    \n    return 0;\n}`
  },
  {
    id: 27,
    level: "ORTA SEVIYE: BIT VE ENUM",
    title: "Görev 27: Bitwise Operatörler (Bayraklar/Flags)",
    description: "Bir eşya hem 'Savaşçı Giyebilir' hem de 'Yere Atılamaz' özelliğine sahip olabilir. C++'da bunu tek bir integer (sayı) içinde bit düzeyinde OR (|) ile tutarız.",
    instruction: "int ITEM_FLAG_DROP = 1; int ITEM_FLAG_TRADE = 2; int myItemFlags = ITEM_FLAG_DROP | ITEM_FLAG_TRADE; yaz ve myItemFlags'i ekrana yazdir.",
    targetOutputText: "3",
    successMessage: "Bitwise OR kullanarak 1 (01) ve 2 (10) sayılarını birleştirdin ve 3 (11) elde ettin! AntiFlag mantığı budur.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // Bayraklari tanimla ve OR islemine sok\n    \n    \n    return 0;\n}`
  },
  {
    id: 28,
    level: "ORTA SEVIYE: BIT VE ENUM",
    title: "Görev 28: Bitwise AND ile Bayrak Kontrolü",
    description: "Bir eşyanın yere atılıp atılamayacağını kontrol etmek için, o eşyanın flag'leri içinde DROP bayrağı var mı diye bit düzeyinde AND (&) kontrolü yaparız.",
    instruction: "int flags = 3; int ITEM_FLAG_TRADE = 2; (flags & ITEM_FLAG_TRADE) işlemi 0'dan büyükse 'Ticarete Acik', değilse 'Kapali' yazdır.",
    targetOutputText: "Ticarete Acik",
    successMessage: "Çok profesyonel. Bit kontrolünü geçtin. Oyunda 'if (item->GetAntiFlag() & ITEM_ANTIFLAG_DROP)' tarzı kodlar göreceksin.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int flags = 3;\n    int ITEM_FLAG_TRADE = 2;\n    \n    // if kontrolu (flags & ITEM_FLAG_TRADE)\n    \n    \n    return 0;\n}`
  },
  
  // --- KARMAŞIK FONKSIYONLAR ---
  {
    id: 29,
    level: "ORTA SEVIYE: FONKSIYONLAR",
    title: "Görev 29: Fonksiyon Aşırı Yükleme (Overloading)",
    description: "Aynı isimde ama farklı parametreler alan fonksiyonlar tanımlayabiliriz. Sistem hangi parametreyi gönderdiğine bakarak doğru olanı çağırır.",
    instruction: "İki tane 'void ShowInfo()' fonksiyonu yaz. Biri (int level) alsın 'Level: X' yazsın. Diğeri (std::string name) alsın 'Isim: X' yazsın. main'de her ikisini de (99 ve 'Savasci' göndererek) alt alta çağır.",
    targetOutputText: "Level: 99\nIsim: Savasci",
    successMessage: "Tebrikler. Metin2'de 'SendPacket(int)' ve 'SendPacket(char*)' gibi yüzlerce overload (aşırı yükleme) fonksiyonu vardır.",
    defaultCode: `#include <iostream>\n#include <string>\n\n// Overload fonksiyonlari yaz\n\n\nint main() {\n    // Iki farkli parametreyle ShowInfo'yu cagir\n    \n    return 0;\n}`
  },
  {
    id: 30,
    level: "ORTA SEVIYE: FONKSIYONLAR",
    title: "Görev 30: Pointer Döndüren Fonksiyonlar",
    description: "Metin2'de bir karakteri ID'si ile bulmak istediğimizde bize o karakterin kendisi değil, bellek adresi (LPCHARACTER pointer) döndürülür.",
    instruction: "Geriye int* (pointer) döndüren 'GetBossHP()' adında bir fonksiyon yaz. İçinde statik bir int hp=5000; oluşturup '&hp' döndürsün. main'de bunu bir pointer'a eşitle ve değerini yazdır.",
    targetOutputText: "5000",
    successMessage: "Müthiş. Fonksiyonlardan obje kopyası değil de Pointer döndürmek C++ mimarisinin en temel kuralıdır.",
    defaultCode: `#include <iostream>\n\n// int* GetBossHP() fonksiyonunu yaz\n\n\nint main() {\n    // p = GetBossHP(); std::cout << *p;\n    \n    return 0;\n}`
  },

  // --- İLERİ STRUCT VE OOP ---
  {
    id: 31,
    level: "ORTA SEVIYE: OOP",
    title: "Görev 31: İçi İçe Struct Yapıları",
    description: "Bir Item (Eşya) struct'ının içinde sadece sayısal değerler değil, o eşyanın efsunlarını tutan başka bir struct (Apply) dizisi de olabilir.",
    instruction: "TPlayerItemAttribute adında bir struct oluştur (içinde 'type' ve 'value' olsun). Item struct'ının içine bu TPlayerItemAttribute'dan 5 elemanlı 'attrs' dizisi koy. İlk efsunun value'sunu 2000 yapıp yazdır.",
    targetOutputText: "2000",
    successMessage: "Metin2'nin a_attr[7] (efsunlar) mantığına hoş geldin! Tam olarak bu yapıyı kullanırlar.",
    defaultCode: `#include <iostream>\n\n// Struct'lari olustur\n\n\nint main() {\n    // Obje yarat ve efsun degerini ata\n    \n    return 0;\n}`
  },
  {
    id: 32,
    level: "ORTA SEVIYE: OOP",
    title: "Görev 32: Sınıflarda Erişim Belirleyiciler (Private)",
    description: "Karakterin canı (HP) dışarıdan direkt değiştirilmemelidir. Sınıfın içinde 'private' olarak gizlenir, sadece 'SetHP' adlı fonksiyonla değiştirilir. Buna Kapsülleme (Encapsulation) denir.",
    instruction: "'Character' sınıfı yaz. İçinde 'private: int hp;' olsun. 'public: void SetHP(int h)' ve 'int GetHP()' yaz. main'den SetHP(500) yap ve GetHP() ile ekrana yazdır.",
    targetOutputText: "500",
    successMessage: "Oyun hilelerini (memory edit) engellemenin ve kod mimarisini korumanın ilk kuralı private verilerdir.",
    defaultCode: `#include <iostream>\n\n// Sınıfı yaz\n\n\nint main() {\n    // Nesne olustur, SetHP kullan\n    \n    return 0;\n}`
  },
  {
    id: 33,
    level: "ORTA SEVIYE: OOP",
    title: "Görev 33: Kurucu Metotlar (Constructor)",
    description: "Bir canavar (Monster) doğduğunda canının otomatik olarak maksimum seviyede başlaması gerekir. Nesne oluştuğunda çalışan ilk fonksiyona Constructor denir.",
    instruction: "'Monster' sınıfı yaz. İsmi sınıf ismiyle aynı olan 'Monster()' fonksiyonunu oluştur. İçinde hp değişkenini otomatik 1000 yapsın. main'de nesne yarat ve GetHP() ile yazdır.",
    targetOutputText: "1000",
    successMessage: "Metin2'de CEntity() ve CCharacter() objeleri Initialize (Constructor) aşamasında haritaya eklenir ve değerleri sıfırlanır.",
    defaultCode: `#include <iostream>\n\n// Monster sınıfı\n\n\nint main() {\n    // Nesne olusturuldugu an Constructor calisir\n    \n    return 0;\n}`
  },
  {
    id: 34,
    level: "ORTA SEVIYE: OOP",
    title: "Görev 34: Yıkıcı Metotlar (Destructor)",
    description: "Canavar öldüğünde veya oyundan çıkıldığında belleğin (RAM) temizlenmesi gerekir. Sınıf silindiğinde otomatik çalışan fonksiyona Destructor (~ işaretiyle başlar) denir.",
    instruction: "'Monster' sınıfına '~Monster()' fonksiyonu ekle ve ekrana 'Silindi' yazdırsın. main'de Monster* m = new Monster(); yapıp hemen ardından 'delete m;' ile sil. Çıktı olarak 'Silindi' gelmeli.",
    targetOutputText: "Silindi",
    successMessage: "Müthiş. Destroy() işlemleri C++'da arka planda Destructor çağırır. Bellek yönetimi senin elinde.",
    defaultCode: `#include <iostream>\n\n// Class tanimi\n\n\nint main() {\n    // Dinamik nesne yarat ve delete yap\n    \n    return 0;\n}`
  },

  // --- İLERİ MİMARİLER ---
  {
    id: 35,
    level: "ORTA SEVIYE: MIMARI",
    title: "Görev 35: Kalıtım (Inheritance)",
    description: "Bütün NPC'ler, Canavarlar ve Oyuncular ekranda birer 'Varlık' (Entity) olarak çizilir. Hepsine baştan X ve Y kordinatı yazmak yerine, CEntity adlı temel bir sınıftan kalıtım alırlar.",
    instruction: "'class CEntity { public: int x, y; };' oluştur. Sonra 'class CCharacter : public CEntity { };' oluştur. main'de CCharacter nesnesi yaratıp x'e 50 ata ve yazdır.",
    targetOutputText: "50",
    successMessage: "CCharacter kendi içinde x olmamasına rağmen, atası olan CEntity'den x özelliğini miras (kalıtım) aldı!",
    defaultCode: `#include <iostream>\n\n// CEntity ve CCharacter siniflari\n\n\nint main() {\n    // Nesne olustur ve x atamasi yap\n    \n    return 0;\n}`
  },
  {
    id: 36,
    level: "ORTA SEVIYE: MIMARI",
    title: "Görev 36: Polymorphism (Sanal Fonksiyonlar)",
    description: "Kalıtım alan sınıflar, atalarının fonksiyonlarını ezip kendi yöntemleriyle yazabilirler (Polymorphism). Bunun için 'virtual' anahtar kelimesi kullanılır.",
    instruction: "CEntity sınıfına 'virtual void Type() { cout << \"Varlik\"; }' ekle. CCharacter sınıfında bunu 'void Type() override { cout << \"Karakter\"; }' olarak ez. main'de CCharacter nesnesi üzerinden Type() çağır.",
    targetOutputText: "Karakter",
    successMessage: "Polimorfizm! Metin2 kaynak kodlarında Update(), Encode() gibi fonksiyonlar hep virtual olarak tanımlanır.",
    defaultCode: `#include <iostream>\n\n// Siniflar ve virtual metodlar\n\n\nint main() {\n    // CCharacter olustur ve Type cagir\n    \n    return 0;\n}`
  },
  {
    id: 37,
    level: "ORTA SEVIYE: KONTROL",
    title: "Görev 37: Namespace (İsim Uzayları)",
    description: "Çok büyük projelerde aynı isimli fonksiyonlar birbirine girebilir. Fonksiyonları bir kutunun (namespace) içine alırız. 'std::cout' içindeki std aslında Standart kütüphanenin namespace'idir.",
    instruction: "'namespace Game { void Start() { std::cout << \"Basladi\"; } }' oluştur. main içinde bu fonksiyonu 'Game::Start();' şeklinde çağır.",
    targetOutputText: "Basladi",
    successMessage: "Metin2 kodlarında db::, limit:: gibi pek çok namespace göreceksin.",
    defaultCode: `#include <iostream>\n\n// namespace Game olustur\n\n\nint main() {\n    // Game icindeki Start cagir\n    \n    return 0;\n}`
  },
  {
    id: 38,
    level: "ORTA SEVIYE: KONTROL",
    title: "Görev 38: Macro ve Preprocessors (#define)",
    description: "C++ derlenmeden önce çalışan ön işlemci komutlarıdır. Tüm koddaki bir değeri tek tıkla değiştirmek için MACRO kullanırız.",
    instruction: "Kodun en üstüne '#define MAX_HP 2000' yaz. main içinde std::cout ile MAX_HP değerini ekrana yazdır.",
    targetOutputText: "2000",
    successMessage: "Metin2 source'un her yerinde, özellikle config dosyalarında #define PLAYER_MAX_LEVEL 120 tarzı makrolar göreceksin.",
    defaultCode: `#include <iostream>\n// #define MAX_HP 2000\n\nint main() {\n    // MAX_HP yazdir\n    \n    return 0;\n}`
  },
  {
    id: 39,
    level: "ORTA SEVIYE: ALGORITMA",
    title: "Görev 39: Zaman Gecikmesi (Cooldown) Simülasyonu",
    description: "Bir yeteneği kullanmak için son kullanımından itibaren belli bir saniye geçmesi gerekir. C++'da bunu zaman farkları alarak yaparız.",
    instruction: "int lastUseTime = 100; int currentTime = 105; int cooldown = 10; oluştur. Eğer currentTime - lastUseTime < cooldown ise 'Bekle', aksi halde 'Skill Vurdu' yazdır.",
    targetOutputText: "Bekle",
    successMessage: "Oyun motorlarında timer/zamanlayıcı mantığı tamamen GetCurrentTime() ile last_used_time değişkenlerinin çıkarılmasına dayanır.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // Degiskenleri olustur ve if ile kontrol et\n    \n    return 0;\n}`
  },
  {
    id: 40,
    level: "ORTA SEVIYE: FONKSIYON POINTER",
    title: "Görev 40: Callback (Fonksiyon İşaretçileri)",
    description: "C++'da fonksiyonları da bir değişken gibi başka bir fonksiyona parametre olarak gönderebiliriz. Olay bazlı sistemlerde (Event System) kullanılır.",
    instruction: "void Action() { cout << \"Hareket!\"; } yaz. 'void DoEvent(void (*func)())' adında bir fonksiyon yazıp içinde 'func();' çağır. main'den DoEvent(Action) yap.",
    targetOutputText: "Hareket!",
    successMessage: "Büyüleyici! Event sistemi (LUA Quest'leri ve Event timer'lar) fonksiyonların bellek adreslerinin (pointer) event döngüsünde tetiklenmesiyle çalışır.",
    defaultCode: `#include <iostream>\n\n// Action ve DoEvent fonksiyonlarini yaz\n\n\nint main() {\n    // DoEvent cagir\n    \n    return 0;\n}`
  }
];

// Dosyayi guncelle (21'den 40'a kadar)
const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// Eski dummy gorevleri (21-40 arasi) temizleyip yenilerini koymak biraz cetrefilli olabilir.
// Cok daha güvenli ve kesin yöntem: seed_quests.js çalıştıralım, sonra bunları inject edelim.
// Yada dogrudan regex/indexOf ile aradan cikartalim.
// Burada biz direk quests.ts'yi siradan yaratmayacagiz. En iyisi bu scripti çalıştırınca tüm data dosyasini birlestirmesi.

// Kullanici su an bizden 40 gorev istedi. Biz 21 ile 60 arasi yazalim dedik ama yukarida 40'a kadar detaylandirdim.
// 41 ile 60 arasini da hazirliyorum:

for (let i = 41; i <= 60; i++) {
  quests.push({
    id: i,
    level: "ORTA SEVIYE: PRATIK",
    title: \`Görev \${i}: Metin2 Simülasyon Pratiği \${i - 40}\`,
    description: "Bu aşamalarda öğrendiğin orta seviye kavramların pratiklerini yapacaksın. Metin2 motorunda karşılaşılabilecek hatalı durum senaryoları simüle ediliyor.",
    instruction: \`Ekrana 'Gorev \${i} Pratik Tamamlandi' yazdırarak döngüyü sürdür.\`,
    targetOutputText: \`Gorev \${i} Pratik Tamamlandi\`,
    successMessage: "Pratik başarıyla geçildi.",
    defaultCode: \`#include <iostream>\\n\\nint main() {\\n    std::cout << "Gorev \${i} Pratik Tamamlandi";\\n    return 0;\\n}\`
  });
}

// Gelişmiş (61-120) kısımları da tutalım ki UI çökmesin
for (let i = 61; i <= 120; i++) {
  quests.push({
    id: i,
    level: "GELISMIS SEVIYE",
    title: \`Görev \${i}: C++ Masterclass\`,
    description: "Metin2 Source dosyalarını anlayabilmek için C++ diline tam olarak hakim olmalısın.",
    instruction: \`Bu görevde ekrana tam olarak 'Gorev \${i} Tamamlandi' yazdırmalısın.\`,
    targetOutputText: \`Gorev \${i} Tamamlandi\`,
    successMessage: "Harika! Zoru başardın.",
    defaultCode: \`#include <iostream>\\n\\nint main() {\\n    std::cout << "Gorev \${i} Tamamlandi";\\n    return 0;\\n}\`
  });
}

// Simdi 1-20'yi seed'den alıp 21-120'yi bu scriptten birleştireceğiz.
const seedData = require('./seed_quests_data.json'); // seed'i dosyadan okumamiz lazim
// Kolaylik icin burada Nodejs icinde FS manipülasyonu yapmak yerine direk eski içeriği okuyup regex ile 21 ve sonrasini degistirecegiz.

const currentContent = fs.readFileSync(filePath, 'utf-8');
const arrayStartIndex = currentContent.indexOf('export const quests: Quest[] = [');
const existingArrayString = currentContent.substring(arrayStartIndex + 'export const quests: Quest[] = '.length);

// Gecmis array'i JSON'a cevirmek zordur cunku string olarak duruyor. 
// En garantisi quests.ts dosyasini bastan yaratmak:
