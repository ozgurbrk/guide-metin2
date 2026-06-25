const fs = require('fs');
const path = require('path');

const quests = [
  // MODÜL 1: TEMEL C++
  {
    id: 1,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 1: Ekrana Yazdırma",
    description: "Metin2 altyapısına geçmeden önce, temel C++ derleme mantığını anlamamız gerekiyor. Sitemizin arkaplanında gerçek bir C++ compiler (derleyici) çalışıyor.",
    instruction: "std::cout kullanarak konsola tam olarak 'Merhaba C++' yazdırın.",
    targetOutputText: "Merhaba C++",
    successMessage: "Tebrikler! İlk C++ kodunu başarıyla derleyip çalıştırdın.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // Kodu buraya yaz\n    \n    return 0;\n}`
  },
  {
    id: 2,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 2: Değişkenler (Variables)",
    description: "Oyunlarda karakter seviyesi, HP gibi değerler 'Değişkenler' içerisinde saklanır. C++'da tam sayılar için 'int' kullanırız.",
    instruction: "'level' adında bir int değişkeni oluştur ve 99 değerini ata. Ardından std::cout ile ekrana yazdır.",
    targetOutputText: "99",
    successMessage: "Harika! Bir tamsayı değişkeni oluşturdun.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // level degiskeni olustur\n    \n    \n    return 0;\n}`
  },
  {
    id: 3,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 3: Matematiksel Operatörler",
    description: "Karakterimiz hasar aldığında HP'sinden düşmeliyiz. Değişkenler üzerinde toplama (+), çıkarma (-) yapılabilir.",
    instruction: "2000 değerine sahip 'hp' değişkeninden 500 çıkarıp yeni değeri ekrana yazdır.",
    targetOutputText: "1500",
    successMessage: "Tebrikler! Matematiksel operatörleri kavradın.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int hp = 2000;\n    // hp'den 500 cikar\n    \n    \n    return 0;\n}`
  },
  {
    id: 4,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 4: If-Else Koşulları",
    description: "Karakterin canı 0 veya altına düştüğünde karakterin ölmesi gerekir. Koşullu ifadeler oyun mantığının temelidir.",
    instruction: "Eğer 'hp <= 0' ise ekrana 'Karakter Oldu' yazdır. Aksi halde 'Hayatta' yazdır. (hp değişkenini 0 yapın)",
    targetOutputText: "Karakter Oldu",
    successMessage: "Zekice! Karar yapılarını kurdun.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int hp = 0;\n    // if-else yapisini kur\n    \n    return 0;\n}`
  },
  {
    id: 5,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 5: Mantıksal Operatörler",
    description: "Oyun içinde bir eşyayı giyebilmek için hem yeterli seviyede olman (level >= 50) HEM DE uygun karakter sınıfında olman gerekir. VE işlemi için '&&' kullanırız.",
    instruction: "Bir if koşuluyla 'level >= 50 && isWarrior == true' kontrolü yap. Doğruysa ekrana 'Esya giyildi' yazdır.",
    targetOutputText: "Esya giyildi",
    successMessage: "Çok iyi! Mantıksal VE (&&) ve VEYA (||) operatörleri Metin2'de yetenek veya eşya kontrollerinde sürekli kullanılır.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int level = 55;\n    bool isWarrior = true;\n    \n    // if kullanarak kontrol et\n    \n    \n    return 0;\n}`
  },
  {
    id: 6,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 6: Switch-Case Yapısı",
    description: "Metin2'de bir NPC ile konuştuğunda seçtiğin şıklara göre farklı işlemler yapılır. Switch-case yapısı if-else zincirlerinden daha temizdir.",
    instruction: "Bir 'dialogOption' değişkeni oluştur (değeri 2 olsun). switch ile kontrol et. 1 ise 'Gorevi al', 2 ise 'Markete bak', 3 ise 'Kapat' ekrana yazdır.",
    targetOutputText: "Markete bak",
    successMessage: "Harika! Metin2 quest dosyaları ve C++ içindeki InputHandler genelde switch-case ile çalışır.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int dialogOption = 2;\n    \n    switch(dialogOption) {\n        // case 1, case 2, case 3 yaz\n        \n    }\n    \n    return 0;\n}`
  },
  {
    id: 7,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 7: For Döngüsü",
    description: "Döngüler, aynı işlemi tekrar tekrar yapmamızı sağlar. Bir alandaki tüm düşmanlara saldırmak istediğimizde çok kullanışlıdır.",
    instruction: "Bir 'for' döngüsü kullanarak alt alta 3 kere 'Saldiri' yazdır. (Her kelimeden sonra \\n koymayı unutma)",
    targetOutputText: "Saldiri\nSaldiri\nSaldiri",
    successMessage: "Mükemmel! Döngülerle tekrarlanan işlemleri optimize ettin.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // for dongusu yaz\n    \n    \n    return 0;\n}`
  },
  {
    id: 8,
    level: "MODUL 1: TEMEL C++",
    title: "Görev 8: While Döngüsü",
    description: "While döngüsü bir koşul doğru olduğu sürece dönmeye devam eder. 'Oyun açık olduğu sürece (while isRunning)' oyun motorunun kalbidir.",
    instruction: "Bir 'countdown' değişkenini 3'ten başlat. While döngüsü ile 0'dan büyük olduğu sürece değişkeni yazdır (araya bosluk koy) ve her turda 1 azalt.",
    targetOutputText: "3 2 1",
    successMessage: "Tebrikler! While döngüsünün tehlikesi sonsuz döngüye girmesidir. Sayaç azaltmayı unutmamak gerekir.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int countdown = 3;\n    \n    // while(countdown > 0) ile dongu olustur\n    \n    \n    return 0;\n}`
  },
  
  // MODÜL 2: FONKSİYONLAR
  {
    id: 9,
    level: "MODUL 2: FONKSIYONLAR",
    title: "Görev 9: Void Fonksiyonlar",
    description: "Kodları okunabilir yapmak ve tekrar kullanmak için fonksiyonlara ayırırız. Sadece bir işlem yapan ve geriye değer döndürmeyen fonksiyonlar 'void' ile tanımlanır.",
    instruction: "'LevelUpAnimasyon' adında geriye değer döndürmeyen (void) bir fonksiyon yaz. İçinde 'Isiklar sacti' yazdırsın. main içinde bu fonksiyonu çağır.",
    targetOutputText: "Isiklar sacti",
    successMessage: "Fonksiyon çağırma mantığını kavradın. Metin2'de animasyon ve efektler hep void fonksiyonlarca tetiklenir.",
    defaultCode: `#include <iostream>\n\n// LevelUpAnimasyon fonksiyonunu buraya yaz\n\n\nint main() {\n    // Fonksiyonu cagir\n    \n    return 0;\n}`
  },
  {
    id: 10,
    level: "MODUL 2: FONKSIYONLAR",
    title: "Görev 10: Parametre Alan Fonksiyonlar",
    description: "Fonksiyonlara dışarıdan veri gönderebiliriz. Örneğin hedefe vurulacak hasar miktarını.",
    instruction: "'TakeDamage' adında int parametre (damage) alan bir void fonksiyon yaz. Ekrana 'Hasar alindi: X' (X yerine damage degeri) yazdırsın. main icinde 500 göndererek çağır.",
    targetOutputText: "Hasar alindi: 500",
    successMessage: "Çok iyi. Karakterin receivesDamage() fonksiyonunun temelini attın.",
    defaultCode: `#include <iostream>\n\n// TakeDamage(int damage) fonksiyonunu yaz\n\n\nint main() {\n    // TakeDamage'i 500 parametresiyle cagir\n    \n    return 0;\n}`
  },
  {
    id: 11,
    level: "MODUL 2: FONKSIYONLAR",
    title: "Görev 11: Return Değeri Döndüren Fonksiyonlar",
    description: "Bir fonksiyon hesaplama yapıp sonucu bize geri döndürebilir. Örneğin karakterin kritik vuruş şansını hesaplayan bir fonksiyon.",
    instruction: "'CalculateCrit' adında int döndüren bir fonksiyon yaz. Şimdilik sadece 15 döndürsün. main içinde bu değeri cout ile yazdır.",
    targetOutputText: "15",
    successMessage: "Harika! return kavramı ile fonksiyonlar arası veri akışını sağladın.",
    defaultCode: `#include <iostream>\n\n// CalculateCrit() fonksiyonu\n\n\nint main() {\n    // Fonksiyon sonucunu yazdir\n    \n    return 0;\n}`
  },
  {
    id: 12,
    level: "MODUL 2: FONKSIYONLAR",
    title: "Görev 12: Default (Varsayılan) Parametreler",
    description: "Bir fonksiyona parametre gönderilmediğinde varsayılan bir değer kullanmasını sağlayabiliriz.",
    instruction: "'SummonMob' adında iki parametreli fonksiyon yaz: int vnum, bool isAggressive = false. Ekrana agresifse 'Agresif 101', degilse 'Normal 101' yazdirsin. main'den sadece 101 göndererek çağır.",
    targetOutputText: "Normal 101",
    successMessage: "Metin2 source'unda default parametreler hayat kurtarır (Örn: SpawnMob(vnum, x, y, bAggressive=false)).",
    defaultCode: `#include <iostream>\n\n// SummonMob fonksiyonu yaz\n\n\nint main() {\n    // Sadece 101 gondererek cagir\n    \n    return 0;\n}`
  },

  // MODÜL 3: BELLEK VE POINTERLAR
  {
    id: 13,
    level: "MODUL 3: BELLEK YONETIMI",
    title: "Görev 13: Bellek Adresleri (&)",
    description: "C++'ı bu kadar hızlı yapan şey RAM (Bellek) ile doğrudan iletişime geçmesidir. Bir değişkenin bellekte nerede tutulduğunu & işareti ile öğreniriz.",
    instruction: "'hp' adında bir değişken oluştur (değeri 100). Ekrana önce hp değerini, sonra araya boşluk koyarak '&hp' ile bellek adresini yazdır. (Test için sadece hp'yi yazdırıyoruz)",
    targetOutputText: "100", // Bellek adresi her PC'de farklı olacağı için sadece 100 yazmasını bekleyebiliriz ama targetOutputText regex kullanmazsa zor. Sadece "100" içermesi yetecek.
    successMessage: "Evet! &hp yazarak bellekteki '0x7ffe...' gibi gizemli hex adresine ulaştın.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int hp = 100;\n    // std::cout << hp << " " << &hp;\n    \n    return 0;\n}`
  },
  {
    id: 14,
    level: "MODUL 3: BELLEK YONETIMI",
    title: "Görev 14: Referanslar (References)",
    description: "Bir fonksiyona değişkeni gönderirken kopyası gider (Pass by value). Biz değişkenin aslını gönderip değiştirmek istiyorsak Referans (&) kullanmalıyız.",
    instruction: "'Heal' adında bir fonksiyon yaz. Parametre olarak 'int& targetHp' alsın ve 50 eklesin. main içinde hp=100 oluştur, Heal(hp) çağır ve yeni hp'yi yazdır.",
    targetOutputText: "150",
    successMessage: "Harika! Eğer '&' işareti koymasaydın, fonksiyon sadece kopyayı iyileştirecek, main içindeki orijinal HP 100 kalacaktı.",
    defaultCode: `#include <iostream>\n\n// void Heal(int& targetHp) fonksiyonunu yaz\n\n\nint main() {\n    int hp = 100;\n    // Heal fonksiyonunu cagir ve hp'yi yazdir\n    \n    return 0;\n}`
  },
  {
    id: 15,
    level: "MODUL 3: BELLEK YONETIMI",
    title: "Görev 15: İşaretçiler (Pointers) Nedir?",
    description: "Pointer, başka bir değişkenin BELLEK ADRESİNİ tutan özel değişkendir. Metin2'deki LPCHARACTER, CHARACTER nesnelerinin pointer'ıdır.",
    instruction: "'int hp = 500;' oluştur. 'int* p = &hp;' ile bir pointer oluştur. '*p' yazarak pointer'ın gösterdiği adresteki değeri ekrana yazdır.",
    targetOutputText: "500",
    successMessage: "Metin2'nin sırrına ilk adımı attın. p adresi tutar, *p ise adresteki veriyi (500) okur.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int hp = 500;\n    // pointer olustur\n    \n    // dereference (*p) yaparak yazdir\n    \n    return 0;\n}`
  },
  {
    id: 16,
    level: "MODUL 3: BELLEK YONETIMI",
    title: "Görev 16: Dinamik Bellek (new ve delete)",
    description: "Oyun oynarken birden yeni bir canavar yaratılması gerekirse, çalışma zamanında (runtime) bellekte yer ayırtırız. Buna heap memory denir.",
    instruction: "'int* mobLevel = new int(45);' ile dinamik bir tamsayı oluştur. Ekrana değerini (*mobLevel) yazdır. Sonra 'delete mobLevel;' ile belleği temizle.",
    targetOutputText: "45",
    successMessage: "Çok önemli! Metin2'de 'delete' yapılmayan dinamik veriler Memory Leak'e (RAM'in dolmasına ve sunucunun çökmesine) sebep olur.",
    defaultCode: `#include <iostream>\n\nint main() {\n    // new ile olustur\n    \n    \n    // yazdir ve delete et\n    \n    \n    return 0;\n}`
  },

  // MODÜL 4: DATA STRUCTURES
  {
    id: 17,
    level: "MODUL 4: VERI YAPILARI",
    title: "Görev 17: Diziler (Arrays)",
    description: "Karakterin becerileri (skills) gibi sabit boyutlu, aynı türden verileri listelemek için dizi kullanırız.",
    instruction: "3 boyutlu bir int dizisi oluştur (skills[3] = {1, 5, M1...}). 0. ve 1. indekslerdeki değerleri toplayarak ekrana yazdır. (Örn: 10 ve 20 ata, toplamı yazdır).",
    targetOutputText: "30",
    successMessage: "Diziler hafızada yan yana dizilir. C++'da indeksler 0'dan başlar.",
    defaultCode: `#include <iostream>\n\nint main() {\n    int skills[3] = {10, 20, 30};\n    // 0. ve 1. degeri toplayip yazdir\n    \n    return 0;\n}`
  },
  {
    id: 18,
    level: "MODUL 4: VERI YAPILARI",
    title: "Görev 18: Yapılar (Struct)",
    description: "Bir kılıcın sadece vuruş gücü yoktur; kodu (vnum), soketleri ve efsunları vardır. Birbiriyle ilgili karmaşık verileri bir 'Struct' (Yapı) içinde gruplarız.",
    instruction: "'Item' adında bir struct oluştur. İçinde 'int vnum' ve 'int count' olsun. main'de bir kılıç nesnesi oluşturup vnum=2799, count=1 ata ve vnum'u yazdır.",
    targetOutputText: "2799",
    successMessage: "Tebrikler! Metin2 C++'daki 'TPlayerItem' struct yapısının tam olarak mantığı budur.",
    defaultCode: `#include <iostream>\n\n// struct Item { ... };\n\n\nint main() {\n    // nesne olustur, deger ata, yazdir\n    \n    return 0;\n}`
  },

  // MODÜL 5: OBJECT ORIENTED PROGRAMMING
  {
    id: 19,
    level: "MODUL 5: NESNE YONELIMLI",
    title: "Görev 19: Sınıflar (Classes)",
    description: "Metin2, nesne yönelimli bir mimariyle yazılmıştır. Karakterler, canavarlar ve NPC'ler 'CHARACTER' adlı devasa bir sınıftan (class) türetilir.",
    instruction: "'Character' adında bir class oluştur. 'public:' bölümüne void Attack() fonksiyonu koy (ekrana 'Vurdu' yazsın). main içinde nesne oluştur ve Attack() çağır.",
    targetOutputText: "Vurdu",
    successMessage: "Sınıflar (Class), özellikleri ve fonksiyonları tek bir pakette birleştirir. İlk class'ını yazdın!",
    defaultCode: `#include <iostream>\n\n// class Character olustur\n\n\nint main() {\n    // Nesne olustur ve fonksiyonu cagir\n    \n    return 0;\n}`
  },
  {
    id: 20,
    level: "MODUL 5: NESNE YONELIMLI",
    title: "Görev 20: Sınıf Pointerları (LPCHARACTER)",
    description: "Metin2'de hiçbir obje normal değişken olarak dolaşmaz. Her zaman Pointer (*) olarak kullanılır. (Long Pointer Character = LPCHARACTER)",
    instruction: "Character class'ı aynı kalsın. main içinde dinamik bir obje oluştur: 'Character* ch = new Character();'. Fonksiyonu ok işaretiyle (ch->Attack()) çağır ve nesneyi sil.",
    targetOutputText: "Vurdu",
    successMessage: "Mükemmel ötesi! Metin2 kaynak kodlarında göreceğin 'ch->GetLevel()' kullanımının arka planı budur.",
    defaultCode: `#include <iostream>\n\nclass Character {\npublic:\n    void Attack() { std::cout << "Vurdu"; }\n};\n\nint main() {\n    // Character* ch = new Character();\n    \n    // ch->Attack() ile cagir\n    \n    // delete ch; yap\n    \n    return 0;\n}`
  }
];

const fileContent = \`export interface Quest {
  id: number;
  level: string;
  title: string;
  description: string;
  instruction: string;
  targetOutputText: string;
  defaultCode: string;
  successMessage: string;
}

export const quests: Quest[] = \${JSON.stringify(quests, null, 2)};
\`;

fs.writeFileSync(path.join(__dirname, 'quests.ts'), fileContent, 'utf-8');
console.log('quests.ts basariyla olusturuldu!');
