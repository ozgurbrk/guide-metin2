export interface Quest {
  id: number;
  level: string;
  title: string;
  description: string;
  instruction: string;
  targetOutputText: string;
  defaultCode: string;
  successMessage: string;
}

export const quests: Quest[] = [
  {
    "id": 1,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 1: Ekrana Yazdırma",
    "description": "Metin2 altyapısına geçmeden önce, temel C++ derleme mantığını anlamamız gerekiyor.",
    "instruction": "std::cout kullanarak konsola tam olarak 'Merhaba C++' yazdırın.",
    "targetOutputText": "Merhaba C++",
    "successMessage": "Tebrikler! İlk C++ kodunu başarıyla derleyip çalıştırdın.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // Kodu buraya yaz\n    \n    return 0;\n}"
  },
  {
    "id": 2,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 2: Değişkenler (Variables)",
    "description": "Oyunlarda karakter seviyesi, HP gibi değerler 'Değişkenler' içerisinde saklanır.",
    "instruction": "'level' adında bir int değişkeni oluştur ve 99 değerini ata. Ardından std::cout ile ekrana yazdır.",
    "targetOutputText": "99",
    "successMessage": "Harika! Bir tamsayı değişkeni oluşturdun.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // level degiskeni olustur\n    \n    \n    return 0;\n}"
  },
  {
    "id": 3,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 3: Matematiksel Operatörler",
    "description": "Karakterimiz hasar aldığında HP'sinden düşmeliyiz.",
    "instruction": "2000 değerine sahip 'hp' değişkeninden 500 çıkarıp yeni değeri ekrana yazdır.",
    "targetOutputText": "1500",
    "successMessage": "Tebrikler! Matematiksel operatörleri kavradın.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int hp = 2000;\n    // hp'den 500 cikar\n    \n    \n    return 0;\n}"
  },
  {
    "id": 4,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 4: If-Else Koşulları",
    "description": "Karakterin canı 0 veya altına düştüğünde karakterin ölmesi gerekir.",
    "instruction": "Eğer 'hp <= 0' ise ekrana 'Karakter Oldu' yazdır. Aksi halde 'Hayatta' yazdır. (hp değişkenini 0 yapın)",
    "targetOutputText": "Karakter Oldu",
    "successMessage": "Zekice! Karar yapılarını kurdun.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int hp = 0;\n    // if-else yapisini kur\n    \n    return 0;\n}"
  },
  {
    "id": 5,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 5: Mantıksal Operatörler",
    "description": "Oyun içinde bir eşyayı giyebilmek için hem yeterli seviyede olman HEM DE uygun sınıfta olman gerekir.",
    "instruction": "level adında int (55) ve isWarrior adında bool (true) değişkeni oluştur. if koşulunda her iki şartı && (ve) operatörü ile kontrol et. İkisi de doğruysa 'Esya giyildi' yazdır.",
    "targetOutputText": "Esya giyildi",
    "successMessage": "Çok iyi!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int level = 55;\n    bool isWarrior = true;\n    \n    // if kullanarak kontrol et\n    \n    \n    return 0;\n}"
  },
  {
    "id": 6,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 6: Switch-Case Yapısı",
    "description": "Metin2'de bir NPC ile konuştuğunda seçtiğin şıklara göre farklı işlemler yapılır.",
    "instruction": "dialogOption adında bir int değişkeni oluştur ve 2 yap. switch bloğu içinde case 1, 2, 3 tanımla. case 2 içinde 'Markete bak' yazdır ve break koy.",
    "targetOutputText": "Markete bak",
    "successMessage": "Harika!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int dialogOption = 2;\n    \n    switch(dialogOption) {\n        // case 1, case 2, case 3 yaz\n        \n    }\n    \n    return 0;\n}"
  },
  {
    "id": 7,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 7: For Döngüsü",
    "description": "Döngüler, aynı işlemi tekrar tekrar yapmamızı sağlar.",
    "instruction": "for döngüsünü 0'dan 3'e kadar çalıştır. Her turda std::cout << \"Saldiri\" << std::endl; ile alt alta yazdır.",
    "targetOutputText": "Saldiri\nSaldiri\nSaldiri",
    "successMessage": "Mükemmel!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // for dongusu yaz\n    \n    \n    return 0;\n}"
  },
  {
    "id": 8,
    "level": "MODUL 1: TEMEL C++",
    "title": "Görev 8: While Döngüsü",
    "description": "While döngüsü bir koşul doğru olduğu sürece dönmeye devam eder.",
    "instruction": "countdown değişkenini 3 yap. while(countdown > 0) döngüsü içinde değeri yazdırıp bir boşluk ekle, sonra countdown-- ile azalt. Çıktı: 3 2 1",
    "targetOutputText": "3 2 1",
    "successMessage": "Tebrikler!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int countdown = 3;\n    \n    // while(countdown > 0) ile dongu olustur\n    \n    \n    return 0;\n}"
  },
  {
    "id": 9,
    "level": "MODUL 2: FONKSIYONLAR",
    "title": "Görev 9: Void Fonksiyonlar",
    "description": "Metin2 sunucusunda LevelUp animasyonu, hasar efekti gibi birçok işlem sadece bir şey yapar ve geriye değer döndürmez. Bu tür fonksiyonlar 'void' ile tanımlanır ve oyundaki görsel efektlerin tetiklenmesinde kullanılır.",
    "instruction": "main() fonksiyonunun üzerine void LevelUpAnimasyon() adında bir fonksiyon tanımla. İçine std::cout << \"Isiklar sacti\"; yaz. main() içinden bu fonksiyonu çağır.",
    "targetOutputText": "Isiklar sacti",
    "successMessage": "Void fonksiyon çağırma mantığını kavradın. Metin2'de void fonksiyonlar ekran efektleri, ses çalma gibi işlemlerde kullanılır.",
    "defaultCode": "#include <iostream>\n\n// LevelUpAnimasyon fonksiyonunu buraya yaz\n\n\nint main() {\n    // Fonksiyonu cagir\n    \n    return 0;\n}"
  },
  {
    "id": 10,
    "level": "MODUL 2: FONKSIYONLAR",
    "title": "Görev 10: Parametre Alan Fonksiyonlar",
    "description": "Metin2'de hasar hesaplaması yapılırken, fonksiyonlara dışarıdan veri gönderilmesi gerekir. Örneğin TakeDamage fonksiyonuna hasar miktarı parametre olarak verilir ve bu değer üzerinden işlem yapılır.",
    "instruction": "void TakeDamage(int damage) adında bir fonksiyon yaz. İçinde 'Hasar alindi: ' ve ardından damage değerini yazdırsın. main'den TakeDamage(500) ile çağır.",
    "targetOutputText": "Hasar alindi: 500",
    "successMessage": "Parametreli fonksiyon mantığını kavradın. Metin2 sunucusundaki hasar, iyileşme, buff gibi sistemlerin tümü parametreli fonksiyonlarla çalışır.",
    "defaultCode": "#include <iostream>\n\n// TakeDamage(int damage) fonksiyonunu yaz\n\n\nint main() {\n    // TakeDamage'i 500 parametresiyle cagir\n    \n    return 0;\n}"
  },
  {
    "id": 11,
    "level": "MODUL 2: FONKSIYONLAR",
    "title": "Görev 11: Return Değeri Döndüren Fonksiyonlar",
    "description": "Metin2'de kritik vuruş şansı hesaplanırken, bir fonksiyon hesaplama yapıp sonucu çağıran yere geri döndürür. Bu sayede hesaplama mantığı tek bir yerde tutulur ve her yerden çağrılabilir.",
    "instruction": "int CalculateCrit() fonksiyonu yaz, return 15; döndürsün. main içinde int sonuc = CalculateCrit(); ile değeri alıp std::cout ile yazdır.",
    "targetOutputText": "15",
    "successMessage": "Return ile değer döndüren fonksiyon yazdın. Metin2'deki hasar formülleri, kritik hesaplama gibi sistemlerin tümü bu yapıyla çalışır.",
    "defaultCode": "#include <iostream>\n\n// CalculateCrit() fonksiyonu\n\n\nint main() {\n    // Fonksiyon sonucunu yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 12,
    "level": "MODUL 2: FONKSIYONLAR",
    "title": "Görev 12: Default Parametreler",
    "description": "Metin2'de bir mob çağırırken (spawn) bazen sadece VNUM yeterlidir, tür belirtilmezse varsayılan olarak 'Normal' atanır. Default parametreler sayesinde fonksiyona her seferinde tüm değerleri göndermek zorunda kalmazsın.",
    "instruction": "void SummonMob(int vnum, std::string tur = \"Normal\") fonksiyonu yaz. İçinde tür ve vnum'u yan yana yazdırsın. main'den sadece SummonMob(101) ile çağır, tür otomatik 'Normal' gelecek.",
    "targetOutputText": "Normal 101",
    "successMessage": "Default parametre kullanımını öğrendin. Metin2 sunucusunda birçok fonksiyon bu yapıyla opsiyonel parametreler alır.",
    "defaultCode": "#include <iostream>\n\n// SummonMob fonksiyonu yaz\n\n\nint main() {\n    // Sadece 101 gondererek cagir\n    \n    return 0;\n}"
  },
  {
    "id": 13,
    "level": "MODUL 3: BELLEK YONETIMI",
    "title": "Görev 13: Bellek Adresleri (&)",
    "description": "C++'ı oyun geliştirmede bu kadar güçlü yapan şey, bellekle (RAM) doğrudan iletişime geçebilmesidir. Her değişken bellekte bir adreste durur. Bu adresi '&' operatörü ile görebiliriz. Metin2'de karakter HP'si gibi veriler bellekte tutulur.",
    "instruction": "int hp = 100; tanımla. std::cout << hp; ile değerini ekrana yazdır. (Pointer ve adres konularına hazırlık)",
    "targetOutputText": "100",
    "successMessage": "Değişkenlerin bellekteki değerlerine erişmeyi öğrendin. Bu, pointer ve referans kavramlarına geçiş için temel adımdır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    // std::cout << hp;\n    \n    return 0;\n}"
  },
  {
    "id": 14,
    "level": "MODUL 3: BELLEK YONETIMI",
    "title": "Görev 14: Referanslar (References)",
    "description": "Metin2'de bir iyileşme (Heal) büyüsü yapıldığında, karakterin HP'sinin KOPYAsını değil, ASIL değerini değiştirmemiz gerekir. Referans (&) kullanarak fonksiyona orijinal değişkeni gönderir ve doğrudan değiştiririz.",
    "instruction": "void Heal(int& targetHp) fonksiyonu yaz, targetHp'ye 50 eklesin. main'de int hp = 100; oluştur, Heal(hp) çağır ve hp'yi yazdır. Referans sayesinde asıl değer değişir.",
    "targetOutputText": "150",
    "successMessage": "Referans ile orijinal veriyi değiştirmeyi öğrendin. Metin2'deki buff, debuff, iyileşme sistemlerinin tümü bu mantıkla çalışır.",
    "defaultCode": "#include <iostream>\n\n// void Heal(int& targetHp) fonksiyonunu yaz\n\n\nint main() {\n    int hp = 100;\n    // Heal fonksiyonunu cagir ve hp'yi yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 15,
    "level": "MODUL 3: BELLEK YONETIMI",
    "title": "Görev 15: İşaretçiler (Pointers) Nedir?",
    "description": "Pointer (İşaretçi), başka bir değişkenin BELLEK ADRESİNİ tutan özel bir değişkendir. Metin2'de LPCHARACTER (Long Pointer to Character) gibi yapılar pointer'dır. Bir karaktere erişmek istediğinde onun adresini tutarsın.",
    "instruction": "int hp = 500; oluştur. int* p = &hp; ile hp'nin adresini tutan pointer yarat. *p (dereference) ile pointer'ın gösterdiği değeri yazdır.",
    "targetOutputText": "500",
    "successMessage": "Pointer'ın sırrına ilk adımı attın! Metin2 kaynak kodlarında LPCHARACTER, LPITEM gibi yapıların tümü pointer'dır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int hp = 500;\n    // pointer olustur\n    \n    // dereference (*p) yaparak yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 16,
    "level": "MODUL 3: BELLEK YONETIMI",
    "title": "Görev 16: Dinamik Bellek",
    "description": "Metin2 sunucusu çalışırken yeni mob'lar, eşyalar, efektler oluşturulur. Bunlar derleme zamanında değil, çalışma zamanında (runtime) bellekte yer ayırtılarak oluşturulur. 'new' ile oluşturulup 'delete' ile silinmelidir.",
    "instruction": "int* p = new int(45); ile çalışma zamanında bellekte yer ayır. *p ile değeri yazdır. İşin bitince delete p; ile belleği serbest bırak.",
    "targetOutputText": "45",
    "successMessage": "Dinamik bellek yönetimini öğrendin. Metin2'de her yeni mob spawn olduğunda new, despawn olduğunda delete çağrılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // new ile olustur\n    \n    \n    // yazdir ve delete et\n    \n    \n    return 0;\n}"
  },
  {
    "id": 17,
    "level": "MODUL 4: VERI YAPILARI",
    "title": "Görev 17: Diziler (Arrays)",
    "description": "Metin2'de bir karakterin öğrendiği 3 aktif yetenek sabit boyutlu bir dizide tutulur. Diziler aynı türden birden fazla veriyi yan yana saklar ve indeks numarasıyla erişim sağlar.",
    "instruction": "int skills[3] = {10, 20, 30}; dizisi oluştur. skills[0] + skills[1] toplayıp sonucu std::cout ile yazdır. (Diziler 0'dan başlar)",
    "targetOutputText": "30",
    "successMessage": "Dizi (Array) kullanımını öğrendin. Metin2'de yetenek slotları, efsun dizileri gibi birçok yapı sabit boyutlu dizilerle tutulur.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int skills[3] = {10, 20, 30};\n    // 0. ve 1. degeri toplayip yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 18,
    "level": "MODUL 4: VERI YAPILARI",
    "title": "Görev 18: Yapılar (Struct)",
    "description": "Metin2'de her eşyanın bir VNUM'u (kimlik numarası) ve sayısı (count) vardır. Bu verileri gruplamak için struct (yapı) kullanılır. Struct, farklı türdeki verileri tek bir paket altında toplar.",
    "instruction": "struct Item { int vnum; int count; }; tanımla. main'de Item esya; oluşturup esya.vnum = 2799; ata. vnum'u yazdır.",
    "targetOutputText": "2799",
    "successMessage": "Struct ile veri gruplama yaptın. Metin2'deki TItemData, TPlayerTable gibi yapıların tümü struct'tır.",
    "defaultCode": "#include <iostream>\n\n// struct Item { ... };\n\n\nint main() {\n    // nesne olustur, deger ata, yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 19,
    "level": "MODUL 5: NESNE YONELIMLI",
    "title": "Görev 19: Sınıflar (Classes)",
    "description": "Metin2 nesne yönelimli mimariyle yazılmıştır.",
    "instruction": "class Character sınıfı oluştur. public bölümüne void Attack() metodu yaz, içinde 'Vurdu' yazdırsın. main'de Character ch; nesne yarat ve ch.Attack() çağır.",
    "targetOutputText": "Vurdu",
    "successMessage": "Sınıflar çok önemli.",
    "defaultCode": "#include <iostream>\n\n// class Character olustur\n\n\nint main() {\n    // Nesne olustur ve fonksiyonu cagir\n    \n    return 0;\n}"
  },
  {
    "id": 20,
    "level": "MODUL 5: NESNE YONELIMLI",
    "title": "Görev 20: Sınıf Pointerları (LPCHARACTER)",
    "description": "Objeler genelde Pointer (*) olarak kullanılır.",
    "instruction": "Character* ch = new Character(); ile dinamik nesne oluştur. ch->Attack() ile (ok operatörü) metodu çağır. delete ch; ile temizle.",
    "targetOutputText": "Vurdu",
    "successMessage": "Mükemmel ötesi!",
    "defaultCode": "#include <iostream>\n\nclass Character {\npublic:\n    void Attack() { std::cout << \"Vurdu\"; }\n};\n\nint main() {\n    // Character* ch = new Character();\n    \n    return 0;\n}"
  },
  {
    "id": 21,
    "level": "ORTA SEVIYE: VERI YAPILARI",
    "title": "Görev 21: Statik Diziler ve Sınıflar",
    "description": "Metin2'de 4 ana karakter sınıfı vardır: Savaşçı, Ninja, Sura, Şaman.",
    "instruction": "std::string classes[4] = {\"Savasci\", \"Ninja\", \"Sura\", \"Saman\"}; dizisi oluştur. classes[2] ile Sura'yı yazdır. (İndeksler: 0=Savasci, 1=Ninja, 2=Sura)",
    "targetOutputText": "Sura",
    "successMessage": "Harika! Diziler C++'da 0'dan başlar.",
    "defaultCode": "#include <iostream>\n#include <string>\n\nint main() {\n    // string dizisini olustur\n    \n    // ekrana yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 22,
    "level": "ORTA SEVIYE: VERI YAPILARI",
    "title": "Görev 22: Dinamik Envanter (std::vector)",
    "description": "Standart dizilerin boyutu sabittir. Ancak std::vector, boyutu dinamik olarak değişebilen akıllı bir dizidir.",
    "instruction": "std::vector<int> inventory; oluştur. push_back(2799), push_back(299), push_back(19) ile 3 eşya ekle. inventory[1] ile 2. eşyayı (299) yazdır.",
    "targetOutputText": "299",
    "successMessage": "Tebrikler! std::vector Metin2'nin can damarıdır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> inventory;\n    // esyalari ekle\n    \n    // inventory[1] degerini yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 23,
    "level": "ORTA SEVIYE: VERI YAPILARI",
    "title": "Görev 23: Vector Boyutunu Öğrenme",
    "description": "Metin2'de envanterin dolup dolmadığını kontrol etmek hayati önem taşır. Envanter doluyken eşya almaya çalışan oyuncuya 'Envanter dolu' uyarısı gösterilir. Bunun için vektörün o anki eleman sayısını bilmemiz gerekir.",
    "instruction": "Boş bir vector<int> oluştur. push_back ile 5 farklı eşya kodu ekle. inventory.size() ile toplam eleman sayısını yazdır.",
    "targetOutputText": "5",
    "successMessage": "Vector boyut kontrolünü öğrendin. Metin2'de envanter dolu kontrolü tam olarak bu size() fonksiyonuyla yapılır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n\nint main() {\n    // Vector olustur ve 5 esya ekle\n    \n    // Boyutu yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 24,
    "level": "ORTA SEVIYE: VERI YAPILARI",
    "title": "Görev 24: Döngü ile Vector Tarama",
    "description": "Karakterin üzerindeki tüm eşyaları veritabanına kaydetmek için vektördeki tüm elemanları sırayla dönmemiz gerekir.",
    "instruction": "vector<int> items = {101, 102, 103}; oluştur. for döngüsü ile her elemanı yazdır ve arkasına tire (-) ekle. Çıktı: 101-102-103-",
    "targetOutputText": "101-102-103-",
    "successMessage": "For loops harika bir özelliktir.",
    "defaultCode": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> items = {101, 102, 103};\n    \n    // items icinde for ile donup yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 25,
    "level": "ORTA SEVIYE: VERI YAPILARI",
    "title": "Görev 25: std::map (Sözlük / Anahtar-Değer)",
    "description": "Metin2'de 'Vnum' (Esya ID) yazdığımızda esyanin ismini getiren sisteme std::map denir.",
    "instruction": "std::map<int, std::string> itemNames; oluştur. itemNames[2799] = \"Dolunay Kilici\"; ata. itemNames[2799] ile adı yazdır.",
    "targetOutputText": "Dolunay Kilici",
    "successMessage": "Harika! Metin2'deki 'item_proto' budur.",
    "defaultCode": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    std::map<int, std::string> itemNames;\n    // Atamayi yap\n    \n    // Degeri cagirip yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 26,
    "level": "ORTA SEVIYE: BIT VE ENUM",
    "title": "Görev 26: Enumeration (enum)",
    "description": "Kodun içinde '1' savaşçı, '2' ninja demek yerine bunları isimlerle sabitlemek okunabilirliği artırır.",
    "instruction": "enum JOB { JOB_WARRIOR=0, JOB_ASSASSIN=1, JOB_SURA=2, JOB_SHAMAN=3 }; tanımla. int myJob = JOB_SURA; yap ve myJob'u yazdır (2 çıkacak).",
    "targetOutputText": "2",
    "successMessage": "Oyunun ana dosyalarında binlerce enum göreceksin.",
    "defaultCode": "#include <iostream>\n\n// enum tanimi buraya\n\nint main() {\n    // atama ve yazdirma\n    \n    return 0;\n}"
  },
  {
    "id": 27,
    "level": "ORTA SEVIYE: BIT VE ENUM",
    "title": "Görev 27: Bitwise Operatörler (Bayraklar/Flags)",
    "description": "Bir eşyanın özelliklerini tek bir integer içinde bit düzeyinde OR (|) ile tutarız.",
    "instruction": "int ITEM_FLAG_DROP = 1; ve int ITEM_FLAG_TRADE = 2; tanımla. OR operatörü ile birleştir: int flags = ITEM_FLAG_DROP | ITEM_FLAG_TRADE; ve flags'i yazdır (3 çıkacak).",
    "targetOutputText": "3",
    "successMessage": "Bitwise OR kullanarak birleştirdin.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // Bayraklari tanimla ve OR islemine sok\n    \n    \n    return 0;\n}"
  },
  {
    "id": 28,
    "level": "ORTA SEVIYE: BIT VE ENUM",
    "title": "Görev 28: Bitwise AND ile Bayrak Kontrolü",
    "description": "Bir eşyanın yere atılıp atılamayacağını kontrol etmek için bit düzeyinde AND (&) kontrolü yaparız.",
    "instruction": "flags = 3 ve ITEM_FLAG_TRADE = 2 tanımla. if(flags & ITEM_FLAG_TRADE) kontrolü yap. Bit seviyesinde AND ile bayrak açıksa 'Ticarete Acik' yazdır.",
    "targetOutputText": "Ticarete Acik",
    "successMessage": "Çok profesyonel. Bit kontrolünü geçtin.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int flags = 3;\n    int ITEM_FLAG_TRADE = 2;\n    \n    // if kontrolu\n    \n    \n    return 0;\n}"
  },
  {
    "id": 29,
    "level": "ORTA SEVIYE: FONKSIYONLAR",
    "title": "Görev 29: Fonksiyon Aşırı Yükleme (Overloading)",
    "description": "Aynı isimde ama farklı parametreler alan fonksiyonlar tanımlayabiliriz.",
    "instruction": "Aynı isimde iki ShowInfo fonksiyonu yaz: biri int alıp 'Level: X' yazsın (endl ile), diğeri string alıp 'Isim: X' yazsın. main'den ShowInfo(99) ve ShowInfo(\"Savasci\") çağır.",
    "targetOutputText": "Level: 99\nIsim: Savasci",
    "successMessage": "Tebrikler. Overload başarıyla yapıldı.",
    "defaultCode": "#include <iostream>\n#include <string>\n\n// Overload fonksiyonlari yaz\n\n\nint main() {\n    // Iki farkli parametreyle ShowInfo'yu cagir\n    \n    return 0;\n}"
  },
  {
    "id": 30,
    "level": "ORTA SEVIYE: FONKSIYONLAR",
    "title": "Görev 30: Pointer Döndüren Fonksiyonlar",
    "description": "Bir karakteri bulduğumuzda bize kopyası değil adresi döndürülmelidir.",
    "instruction": "int* GetBossHP() fonksiyonu yaz. İçinde static int hp = 5000; tanımla ve &hp döndür. main'de int* p = GetBossHP(); ile adresi al ve *p ile değeri yazdır.",
    "targetOutputText": "5000",
    "successMessage": "Müthiş.",
    "defaultCode": "#include <iostream>\n\n// int* GetBossHP() fonksiyonunu yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 31,
    "level": "ORTA SEVIYE: OOP",
    "title": "Görev 31: İçi İçe Struct Yapıları",
    "description": "Struct'lar içinde başka struct dizileri barındırabilir.",
    "instruction": "struct TPlayerItemAttribute { int type; int value; }; yaz. struct Item içine TPlayerItemAttribute attrs[5]; dizisi koy. İlk efsunun value'sunu 2000 yap ve yazdır.",
    "targetOutputText": "2000",
    "successMessage": "Metin2'nin efsun mantığına hoş geldin!",
    "defaultCode": "#include <iostream>\n\n// Struct'lari olustur\n\n\nint main() {\n    // Obje yarat ve efsun degerini ata\n    \n    return 0;\n}"
  },
  {
    "id": 32,
    "level": "ORTA SEVIYE: OOP",
    "title": "Görev 32: Sınıflarda Erişim Belirleyiciler",
    "description": "Değişkenler dışarıdan gizlenmeli (Encapsulation).",
    "instruction": "Character sınıfında private: int hp; tanımla. public: void SetHP(int h) { hp = h; } ve int GetHP() { return hp; } yaz. SetHP(500) çağır, GetHP() ile yazdır.",
    "targetOutputText": "500",
    "successMessage": "Hileleri engellemenin ilk kuralı private verilerdir.",
    "defaultCode": "#include <iostream>\n\n// Sınıfı yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 33,
    "level": "ORTA SEVIYE: OOP",
    "title": "Görev 33: Kurucu Metotlar (Constructor)",
    "description": "Nesne oluştuğunda çalışan ilk fonksiyona Constructor denir.",
    "instruction": "Monster sınıfına constructor yaz: Monster() { hp = 1000; } İçinde private int hp olsun. public GetHP() ile hp döndür. Nesne yarat ve GetHP() yazdır.",
    "targetOutputText": "1000",
    "successMessage": "Constructor aşamasında haritaya ekleme yapılır.",
    "defaultCode": "#include <iostream>\n\n// Sınıfı yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 34,
    "level": "ORTA SEVIYE: OOP",
    "title": "Görev 34: Yıkıcı Metotlar (Destructor)",
    "description": "Sınıf silindiğinde otomatik çalışan fonksiyona Destructor denir.",
    "instruction": "Monster sınıfına destructor ekle: ~Monster() { std::cout << \"Silindi\"; } main'de Monster* m = new Monster(); yarat ve delete m; ile sil. Destructor otomatik çalışacak.",
    "targetOutputText": "Silindi",
    "successMessage": "Destructor çağrıldı.",
    "defaultCode": "#include <iostream>\n\n// Class tanimi\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 35,
    "level": "ORTA SEVIYE: MIMARI",
    "title": "Görev 35: Kalıtım (Inheritance)",
    "description": "Ortak özellikleri olan sınıflar temel bir sınıftan kalıtım alırlar.",
    "instruction": "class CEntity { public: int x, y; }; oluştur. class CCharacter : public CEntity {}; ile kalıtım al. CCharacter nesne yarat, x'e 50 ata ve yazdır.",
    "targetOutputText": "50",
    "successMessage": "Kalıtım alındı!",
    "defaultCode": "#include <iostream>\n\n// Siniflari yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 36,
    "level": "ORTA SEVIYE: MIMARI",
    "title": "Görev 36: Polymorphism",
    "description": "Kalıtım alan sınıflar fonksiyonları ezip kendi yöntemleriyle yazabilirler.",
    "instruction": "CEntity'ye virtual void Type() fonksiyonu yaz, 'Varlik' yazdırsın. CCharacter'da override ile ezip 'Karakter' yazdır. CEntity* e = new CCharacter(); e->Type(); çağır.",
    "targetOutputText": "Karakter",
    "successMessage": "Polimorfizm!",
    "defaultCode": "#include <iostream>\n\n// Siniflari yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 37,
    "level": "ORTA SEVIYE: KONTROL",
    "title": "Görev 37: Namespace (İsim Uzayları)",
    "description": "Fonksiyonları bir kutunun içine alırız.",
    "instruction": "namespace Game { void Start() { std::cout << \"Basladi\"; } } tanımla. main içinde Game::Start(); ile çağır. Namespace fonksiyonları isim çakışmasından korur.",
    "targetOutputText": "Basladi",
    "successMessage": "Namespaceler karmaşayı önler.",
    "defaultCode": "#include <iostream>\n\n// namespace Game olustur\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 38,
    "level": "ORTA SEVIYE: KONTROL",
    "title": "Görev 38: MACRO (#define)",
    "description": "Ön işlemci komutlarıdır.",
    "instruction": "#include <iostream> altına #define MAX_HP 2000 yaz. main içinde std::cout << MAX_HP; ile yazdır. Makro, derleme öncesi metinsel olarak yerleştirilir.",
    "targetOutputText": "2000",
    "successMessage": "Makrolar her yerdedir.",
    "defaultCode": "#include <iostream>\n// define ekle\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 39,
    "level": "ORTA SEVIYE: ALGORITMA",
    "title": "Görev 39: Cooldown Simülasyonu",
    "description": "Metin2'de bir yetenek kullandıktan sonra belirli bir süre (Cooldown) geçmeden tekrar kullanılamaz. Sunucu, son kullanım zamanı ile şimdiki zamanı karşılaştırarak sürenin dolup dolmadığını kontrol eder.",
    "instruction": "lastTime=100, currentTime=105, cooldown=10 tanımla. if(currentTime - lastTime < cooldown) koşulunu kontrol et. Fark cooldown'dan küçükse 'Bekle' yazdır.",
    "targetOutputText": "Bekle",
    "successMessage": "Cooldown (bekleme süresi) mantığını kavradın. Metin2'deki yetenek zamanlayıcıları tam olarak bu fark kontrolüyle çalışır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 40,
    "level": "ORTA SEVIYE: FONKSIYON POINTER",
    "title": "Görev 40: Callback",
    "description": "Metin2'de event (olay) sistemi, fonksiyonları değişken gibi saklar ve gerektiğinde çağırır. Bir timer dolduğunda, bir mob öldüğünde veya bir quest tetiklendiğinde kayıtlı fonksiyonlar otomatik çalıştırılır.",
    "instruction": "void Action() { std::cout << \"Hareket!\"; } yaz. void DoEvent(void (*func)()) fonksiyonu tanımla, içinde func() çağırsın. main'den DoEvent(Action) ile çağır.",
    "targetOutputText": "Hareket!",
    "successMessage": "Fonksiyon pointer (Callback) kullanımını öğrendin. Metin2 event sistemi tam olarak bu yapıyla çalışır.",
    "defaultCode": "#include <iostream>\n\n// Fonksiyonlari yaz\n\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 41,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 41: Try-Catch (İstisnalar)",
    "description": "Metin2 sunucusu beklenmedik bir hatayla kapandığında core dump verir. Hataları 'try-catch' bloğu ile yakalarız.",
    "instruction": "try bloğu içinde throw 404; ile hata fırlat. catch(int e) ile yakala ve 'Hata Kodu: ' + e değerini yazdır.",
    "targetOutputText": "Hata Kodu: 404",
    "successMessage": "Harika! C++'da hataları fırlatmak ve yakalamak kritiktir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    // try-catch yap\n    return 0;\n}"
  },
  {
    "id": 42,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 42: std::exception",
    "description": "Hatalar std::runtime_error gibi sınıflarla fırlatılır.",
    "instruction": "try bloğunda throw std::runtime_error(\"DB Koptu\"); fırlat. catch(const std::exception& e) ile yakala ve e.what() ile hata mesajını yazdır.",
    "targetOutputText": "DB Koptu",
    "successMessage": "syserr dosyalarına yazdırılan hataların temeli budur.",
    "defaultCode": "#include <iostream>\n#include <stdexcept>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 43,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 43: Pure Virtual Fonksiyonlar",
    "description": "Bir fonksiyonu alt sınıfların yazmasını zorunlu tutabiliriz (Interface).",
    "instruction": "class CEntity { public: virtual void Draw() = 0; }; soyut sınıf yaz. class CMonster : public CEntity ile kalıtım alıp Draw() içinde 'Monster Cizildi' yazdır.",
    "targetOutputText": "Monster Cizildi",
    "successMessage": "Tebrikler. CEntity 'Soyut' hale geldi.",
    "defaultCode": "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 44,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 44: Virtual Destructor",
    "description": "Polimorfizmde destructorların virtual olması şarttır, yoksa memory leak olur.",
    "instruction": "CEntity'ye virtual ~CEntity() { std::cout << \"E \"; } yaz. CMonster'a ~CMonster() { std::cout << \"M \"; } yaz. CEntity* e = new CMonster(); delete e; yap. Önce M sonra E yazacak.",
    "targetOutputText": "M E",
    "successMessage": "Kritik bir detay! Sızıntıyı önledin.",
    "defaultCode": "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 45,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 45: Dynamic Cast",
    "description": "Çalışma zamanında bir CEntity'nin CMonster olup olmadığını anlarız.",
    "instruction": "CEntity* e = new CMonster(); yarat. CMonster* m = dynamic_cast<CMonster*>(e); ile dönüştür. if(m != nullptr) 'Canavar' yazdır.",
    "targetOutputText": "Canavar",
    "successMessage": "Oyuncuyu yaratıktan ayırmanın en güvenli yoludur.",
    "defaultCode": "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 46,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 46: Bit Sola Kaydırma (<<)",
    "description": "Sayıyı 2 ile çarpmak yerine sola kaydırmak donanımda daha hızlıdır.",
    "instruction": "int attack = 10; tanımla. attack << 1 ile 1 bit sola kaydır ve sonucu yazdır. Her sola kaydırma sayıyı 2 ile çarpar, sonuç 20.",
    "targetOutputText": "20",
    "successMessage": "Bitleri sola her kaydırışın sayıyı 2 ile çarpar.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 47,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 47: Bit Sağa Kaydırma (>>)",
    "description": "Sayıyı 2'ye bölmek için sağa kaydırırız.",
    "instruction": "int def = 100; tanımla. def >> 2 ile 2 bit sağa kaydır ve sonucu yazdır. 2 bit sağa kaydırmak 4'e bölmek demektir, sonuç 25.",
    "targetOutputText": "25",
    "successMessage": "2 kaydırmak 4'e bölmek demektir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 48,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 48: Tek Integerda İki Veri Saklama",
    "description": "X ve Y koordinatlarını tek bir değişkende saklamak ağ trafiğini rahatlatır.",
    "instruction": "int x=255, y=128; tanımla. (x << 16 | y) işlemi ile iki sayıyı tek int'te paketle ve sonucu yazdır. x üst 16 bite, y alt 16 bite yerleşir.",
    "targetOutputText": "16711808",
    "successMessage": "Koordinat aktarımında bu paketleme kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 49,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 49: std::find",
    "description": "Metin2'de oyuncunun envanterinde belirli bir eşyanın olup olmadığını kontrol etmek sık yapılan bir işlemdir. Örneğin bir quest için gereken eşyayı kontrol ederken std::find algoritması kullanılır.",
    "instruction": "vector<int> inv = {10, 20, 30}; oluştur. auto it = std::find(inv.begin(), inv.end(), 20); ile 20'yi ara. if(it != inv.end()) 'Bulundu' yazdır.",
    "targetOutputText": "Bulundu",
    "successMessage": "std::find ile arama yapabiliyorsun. Metin2'de envanter kontrolü, quest gereksinimleri gibi sistemlerde sürekli kullanılır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 50,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 50: std::sort",
    "description": "Metin2'de oyuncu sıralamaları (Level, PvP skoru), eşya fiyatları veya hasar listeleri gibi verilerin sıralanması gerekir. std::sort algoritması bu işi son derece hızlı yapar.",
    "instruction": "vector<int> v = {50, 10, 30}; oluştur. std::sort(v.begin(), v.end()); ile küçükten büyüğe sırala. v[0] ile en küçük elemanı (10) yazdır.",
    "targetOutputText": "10",
    "successMessage": "std::sort ile sıralama yaptın. Metin2'deki ranking tabloları ve envanter sıralama sistemlerinde kullanılır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 51,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 51: Lambda İfadeleri",
    "description": "Lambda ifadeleri, kod içinde anında küçük fonksiyonlar tanımlamamızı sağlar. Metin2'de bir karakterin ölü olup olmadığını kontrol etmek gibi basit kontrolleri lambda ile yazabiliriz.",
    "instruction": "auto isDead = [](int hp) { return hp <= 0; }; lambda tanımla. if(isDead(0)) kontrolü yap ve 'Olu' yazdır.",
    "targetOutputText": "Olu",
    "successMessage": "Lambda ifadesi yazdın. Modern C++ kodlarında event handler, filtre ve kısa kontroller için sürekli kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 52,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 52: Özel Sıralama (Custom Sort)",
    "description": "Metin2'de eşyaları değerine göre büyükten küçüğe sıralamak veya oyuncuları seviyeye göre sıralamak için özel sıralama kuralları yazılır. Lambda fonksiyonu ile std::sort'a özel karşılaştırma mantığı veririz.",
    "instruction": "vector<int> v = {10, 50, 30}; oluştur. std::sort içine lambda ver: [](int a, int b){ return a > b; } ile büyükten küçüğe sırala. v[0]'ı (50) yazdır.",
    "targetOutputText": "50",
    "successMessage": "Özel sıralama kuralı (Custom Comparator) yazdın. Metin2'deki market, envanter ve skor tablosu sıralamaları bu mantıkla çalışır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 53,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 53: std::unique_ptr",
    "description": "Metin2 sunucusunda bellek sızıntısı (memory leak) en büyük sorunlardan biridir. std::unique_ptr akıllı işaretçisi, kendisi kapsam dışına çıktığında otomatik olarak belleği siler. Böylece delete yazmayı unutma riski ortadan kalkar.",
    "instruction": "std::unique_ptr<int> p(new int(100)); oluştur. *p ile değeri yazdır. Kapsam dışına çıkınca bellek otomatik silinir, delete gerekmez.",
    "targetOutputText": "100",
    "successMessage": "Akıllı işaretçi (Smart Pointer) kullandın. Modern C++ projelerinde memory leak riskini sıfıra indiren en önemli araçtır.",
    "defaultCode": "#include <iostream>\n#include <memory>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 54,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 54: std::shared_ptr",
    "description": "Metin2'de bir eşya birden fazla sistem tarafından referans edilebilir (envanter, ticaret penceresi, veritabanı). std::shared_ptr, kaç yerde kullanıldığını sayar ve son referans silindiğinde belleği otomatik temizler.",
    "instruction": "auto p1 = std::make_shared<int>(42); yarat. auto p2 = p1; ile paylaş. p2.use_count() ile kaç yerde kullanıldığını yazdır (2 çıkacak).",
    "targetOutputText": "2",
    "successMessage": "Paylaşımlı akıllı işaretçi kullandın. Referans sayacı 0 olduğunda obje otomatik silinir, bu sayede bellek sızıntısı önlenir.",
    "defaultCode": "#include <iostream>\n#include <memory>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 55,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 55: static_cast",
    "description": "C'deki (int)x gibi tehlikeli tip dönüşümleri yerine, C++ güvenli alternatifler sunar. static_cast derleme zamanında tip uyumluluğunu kontrol eder ve hataları erkenden yakalar.",
    "instruction": "float f = 3.14f; tanımla. int sonuc = static_cast<int>(f); ile güvenli şekilde int'e çevir ve sonucu yazdır (3 çıkacak, virgülden sonrası atılır).",
    "targetOutputText": "3",
    "successMessage": "Güvenli tip dönüşümü yaptın. Metin2 kodlarında float hasar değerlerini int'e çevirirken static_cast kullanılması önerilir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 56,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 56: #pragma pack(1)",
    "description": "Ağ üzerinden gönderilen veri paketlerinde, struct içindeki değişkenler arasına derleyici boşluk (padding) ekler. Bu fazladan byte'lar ağ trafiğini artırır. #pragma pack(1) ile bu boşluklar kapatılır.",
    "instruction": "#pragma pack(push, 1) ile hizalamayı kapat. struct Packet { char c; int i; }; tanımla. sizeof(Packet) yazdır. Normalde 8 olan boyut 5'e düşer.",
    "targetOutputText": "5",
    "successMessage": "Paket boyutu optimizasyonu yaptın. Metin2'deki tüm ağ paket struct'ları pragma pack(1) ile sıkıştırılmıştır.",
    "defaultCode": "#include <iostream>\n// pragma\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 57,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 57: String find()",
    "description": "Metin2'de GM (Game Master) komutları '/item 2799' gibi string olarak gelir. Sunucu bu string'i parse ederek hangi komutun çağrıldığını anlamalıdır. string::find() fonksiyonu ile komut başlığı aranır.",
    "instruction": "std::string cmd = \"/item 2799\"; tanımla. if(cmd.find(\"/item\") == 0) koşuluyla komut başlığını kontrol et. Eşleşirse 'Komut' yazdır.",
    "targetOutputText": "Komut",
    "successMessage": "String içinde arama yaptın. Metin2'deki GM komut sistemi, chat filtresi ve komut işleme tam olarak bu mantıkla çalışır.",
    "defaultCode": "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 58,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 58: String substr()",
    "description": "GM komutu '/item 2799' geldiğinde, '/item' kısmını ayırıp '2799' parametresini elde etmemiz gerekir. string::substr() fonksiyonu belirli bir konumdan itibaren string'in bir parçasını keser.",
    "instruction": "std::string cmd = \"/item 2799\"; tanımla. cmd.substr(6) ile 6. karakterden sonrasını kes. Sonuç olan '2799' stringini yazdır.",
    "targetOutputText": "2799",
    "successMessage": "String parçalama (substring) yaptın. Metin2 komut sisteminde parametre ayıklama bu şekilde yapılır.",
    "defaultCode": "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 59,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 59: std::stoi",
    "description": "GM komutu ile gelen '2799' değeri string formatındadır. Ancak eşya oluşturmak için bu değerin integer'a çevrilmesi gerekir. std::stoi (String to Integer) bu dönüşümü güvenli şekilde yapar.",
    "instruction": "std::string s = \"2799\"; tanımla. int vnum = std::stoi(s); ile string'i integer'a çevir ve vnum'u yazdır.",
    "targetOutputText": "2799",
    "successMessage": "String'i sayıya çevirdin. Metin2'de kullanıcıdan gelen tüm text verileri stoi/atoi ile sayıya dönüştürülür.",
    "defaultCode": "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 60,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 60: Şablon Fonksiyonlar (Templates)",
    "description": "Metin2'de hem int hem float hem de string için ayrı Max fonksiyonu yazmak yerine, template (şablon) kullanarak tek bir fonksiyonla tüm tipleri destekleyebiliriz. Bu, kod tekrarını ortadan kaldırır.",
    "instruction": "template<typename T> T Max(T a, T b) { return a > b ? a : b; } şablon fonksiyonu yaz. main'de Max(100, 200) çağır ve sonucu yazdır.",
    "targetOutputText": "200",
    "successMessage": "Template fonksiyon yazdın. Metin2 sunucusunda MIN/MAX makroları yerine modern C++ template kullanımı önerilir.",
    "defaultCode": "#include <iostream>\n\n// template\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 61,
    "level": "GELISMIS SEVIYE: NETWORK",
    "title": "Görev 61: Paket Başlıkları (Packet Headers)",
    "description": "Metin2'de istemci (Client) sunucuya (Game Core) bir istek yolladığında ilk olarak başlık (Header) okunur. (Örn: HEADER_CG_LOGIN = 1)",
    "instruction": "enum PACKET_HEADER { HEADER_CG_LOGIN=1, HEADER_CG_MOVE=2 }; tanımla. int p = HEADER_CG_LOGIN; yap. if(p == 1) 'Giris Istegi' yazdır.",
    "targetOutputText": "Giris Istegi",
    "successMessage": "Sunucudaki packet_info yapısı tam olarak bu headerlara göre fonksiyonları çağırır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 62,
    "level": "GELISMIS SEVIYE: NETWORK",
    "title": "Görev 62: Ağ Bayt Sırası (Endianness)",
    "description": "Intel işlemciler (Little Endian) ile ağ protokolleri (Big Endian) farklı dil konuşur. Ağa veri çıkarken htonl (Host to Network Long) kullanılır.",
    "instruction": "int x = 0x12345678; tanımla. Bit kaydırma ve maskeleme ile byte sırasını tersine çevir: ((x>>24)&0xff) | ((x<<8)&0xff0000) | ((x>>8)&0xff00) | ((x<<24)&0xff000000). Sonucu std::hex ile yazdır.",
    "targetOutputText": "78563412",
    "successMessage": "İşte bu ağ programlamanın kalbidir!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    int x = 0x12345678;\n    // x'in byte sirasini ters cevir ve hex olarak yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 63,
    "level": "GELISMIS SEVIYE: MIMARI",
    "title": "Görev 63: Singleton Tasarım Deseni",
    "description": "Metin2'de CItemManager veya CHARACTER_MANAGER gibi yöneticiler tek bir defa oluşturulur. Buna Singleton deseni denir.",
    "instruction": "CManager sınıfı yaz. static CManager* instance; üyesi ve static CManager* Get() metodu olsun. Get() içinde instance yoksa new ile oluştur. void Do() ile 'Calisti' yazdır. main'de CManager::Get()->Do(); çağır.",
    "targetOutputText": "Calisti",
    "successMessage": "Metin2 kaynak kodlarında CManager::instance() mantığı her saniye çalışır.",
    "defaultCode": "#include <iostream>\n\n// Sınıfı yaz\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 64,
    "level": "GELISMIS SEVIYE: MULTITHREAD",
    "title": "Görev 64: std::thread (Çoklu İş Parçacığı)",
    "description": "Metin2 Core'da veritabanı (DB) sorguları ana oyunu dondurmasın diye ayrı bir thread'de çalıştırılır (AsyncSQL).",
    "instruction": "void DB() { std::cout << \"Sorgu \"; } fonksiyonu yaz. main'de std::thread t(DB); ile yeni thread başlat. t.join(); ile bitmesini bekle.",
    "targetOutputText": "Sorgu",
    "successMessage": "Modern C++'da thread başlatmak bu kadar kolaydır.",
    "defaultCode": "#include <iostream>\n#include <thread>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 65,
    "level": "GELISMIS SEVIYE: MULTITHREAD",
    "title": "Görev 65: Mutex (Kilit Mekanizması)",
    "description": "İki farklı iş parçacığı aynı anda aynı eşyayı silmeye çalışırsa sunucu çöker (Race condition). Bunu engellemek için Mutex (Kilit) kullanılır.",
    "instruction": "std::mutex m; tanımla. m.lock(); ile kilitle, 'Guvenli' yazdır, m.unlock(); ile kilidi aç. Kilitli alan başka thread tarafından kullanılamaz.",
    "targetOutputText": "Guvenli",
    "successMessage": "Kilitlenen veriye başka hiçbir thread dokunamaz.",
    "defaultCode": "#include <iostream>\n#include <mutex>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 66,
    "level": "GELISMIS SEVIYE: MULTITHREAD",
    "title": "Görev 66: std::lock_guard",
    "description": "Mutex'i manuel unlock yapmayı unutursan Deadlock olur. lock_guard, kapsam(scope) dışına çıkıldığında kilidi otomatik açar.",
    "instruction": "std::mutex m; tanımla. Süslü parantez bloğu { } içinde std::lock_guard<std::mutex> lock(m); yaz ve 'Otomatik Kilit' yazdır. Blok bitince kilit otomatik açılır.",
    "targetOutputText": "Otomatik Kilit",
    "successMessage": "Güvenli Multi-threading kuralı 1: Manuel unlock yerine RAII (lock_guard) kullan.",
    "defaultCode": "#include <iostream>\n#include <mutex>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 67,
    "level": "GELISMIS SEVIYE: FIZIK",
    "title": "Görev 67: Mesafe Hesaplama (Pisagor Teoremi)",
    "description": "Bir yeteneğin hedefe ulaşıp ulaşmayacağını (Menzil) hesaplamak için X ve Y kordinatları arasındaki uzaklık bulunur.",
    "instruction": "x1=0, y1=0, x2=3, y2=4 tanımla. std::sqrt(std::pow(x2-x1,2) + std::pow(y2-y1,2)) formülünü int'e cast edip yazdır. 3-4-5 üçgeni, sonuç 5.",
    "targetOutputText": "5",
    "successMessage": "3-4-5 üçgeni ile DISTANCE(A, B) fonksiyonunu yeniden yazdın!",
    "defaultCode": "#include <iostream>\n#include <cmath>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 68,
    "level": "GELISMIS SEVIYE: FIZIK",
    "title": "Görev 68: Çember (AoE) Kontrolü",
    "description": "Kılıç Çevirme gibi alan (AoE) yetenekleri bir çember içerisindeki tüm varlıklara vurmalıdır.",
    "instruction": "int menzil = 10; int mesafe = 8; tanımla. if(mesafe <= menzil) kontrolü yap. Hedef menzil içindeyse 'Alan Hasari' yazdır.",
    "targetOutputText": "Alan Hasari",
    "successMessage": "Alan yeteneklerinin temeli.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 69,
    "level": "GELISMIS SEVIYE: FIZIK",
    "title": "Görev 69: Çarpışma Tespitinin İptali (Z Ekseni)",
    "description": "Metin2'de 3D (Z ekseni) çarpışma genellikle sunucu tarafında çok az kontrol edilir. Ama bazen dağda olan aşağıya vuramasın istenir.",
    "instruction": "int z1=100, z2=200; tanımla. if(abs(z1-z2) > 50) 'Vuramaz' yazdır, değilse 'Vurur'. Yükseklik farkı 100 olduğu için 'Vuramaz' çıkacak.",
    "targetOutputText": "Vuramaz",
    "successMessage": "Yükseklik (Z) farkı yüzünden yeteneğin boşa gitmesi.",
    "defaultCode": "#include <iostream>\n#include <cmath>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 70,
    "level": "GELISMIS SEVIYE: CORE",
    "title": "Görev 70: Game Tick (Oyun Kalp Atışı)",
    "description": "Oyun sunucusu saniyede X kez bir döngüde çalışır. (Tick). C++'da bunu zaman farklarına dayalı bir while döngüsü simüle eder.",
    "instruction": "for(int tick=1; tick<=3; tick++) döngüsü yaz. Her turda std::cout << \"Tick\" << tick; yazdır. Çıktı: Tick1Tick2Tick3",
    "targetOutputText": "Tick1Tick2Tick3",
    "successMessage": "Core Loop'un çok basitleştirilmiş hali.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 71,
    "level": "GELISMIS SEVIYE: CORE",
    "title": "Görev 71: State Machine (Durum Makinesi)",
    "description": "Bir karakter ya 'STATE_IDLE' (Bekliyor), ya 'STATE_BATTLE' (Savaşta) ya da 'STATE_DEAD' (Ölü) durumundadır.",
    "instruction": "enum STATE { IDLE, BATTLE, DEAD }; tanımla. int s = BATTLE; yap. if(s == BATTLE) 'Savas Modu' yazdır.",
    "targetOutputText": "Savas Modu",
    "successMessage": "Ölü karaktere vuramamanın sebebi bu if kontrolleridir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 72,
    "level": "GELISMIS SEVIYE: GUVENLIK",
    "title": "Görev 72: XOR Şifreleme",
    "description": "Metin2 paketleri ağda XOR (Özel Veya) ile şifrelenir (Çok temel bir koruma). Bir şifreyi aynı anahtarla 2 kez XOR yaparsan asıl veriyi alırsın.",
    "instruction": "char data='A'; char key='K'; ile veri ve anahtar tanımla. char enc = data ^ key; ile şifrele. char dec = enc ^ key; ile çöz. dec'i yazdır, orijinal 'A' geri gelecek.",
    "targetOutputText": "A",
    "successMessage": "Müthiş! Ağa giden paketi şifreledin ve çöztün.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 73,
    "level": "GELISMIS SEVIYE: GUVENLIK",
    "title": "Görev 73: Hash (Basit Checksum)",
    "description": "Paketin yolda değiştirilmediğini anlamak için içindeki tüm byteların toplamını paketin sonuna ekleriz.",
    "instruction": "std::string packet = \"LOGIN\"; tanımla. int sum=0; yap. for(char c : packet) sum += c; ile her karakterin ASCII değerini topla. sum'ı yazdır.",
    "targetOutputText": "375",
    "successMessage": "Checksum, hileleri (packet injection) önlemenin ilk adımıdır.",
    "defaultCode": "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 74,
    "level": "GELISMIS SEVIYE: GUVENLIK",
    "title": "Görev 74: Anti-Cheat (Hız Hilesi Tespiti)",
    "description": "Oyuncu saniyede 1 kez vurması gerekirken 1 saniyede 5 kez saldırı paketi gönderiyorsa banlanmalıdır.",
    "instruction": "int timeDiff=200; int requiredDiff=1000; tanımla. if(timeDiff < requiredDiff) ise 'Banlandi' yazdır. 200ms aralıkla saldırı normalde 1000ms olmalı.",
    "targetOutputText": "Banlandi",
    "successMessage": "Speed hack koruması server-side böyle yazılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 75,
    "level": "GELISMIS SEVIYE: OPTIMIZASYON",
    "title": "Görev 75: Object Pooling (Nesne Havuzu)",
    "description": "Sürekli 'new' ve 'delete' ile ok, iksir oluşturmak sunucuyu yavaşlatır. Bunun yerine nesneler silinmeden havuzda geri dönüşüme atılır.",
    "instruction": "int pool[3] = {1,1,0}; ile havuz oluştur (0=boş slot). if(pool[2] == 0) kontrolü yap. Boşsa pool[2]=1; ile havuzdan al ve 'Havuzdan Alindi' yazdır.",
    "targetOutputText": "Havuzdan Alindi",
    "successMessage": "Metin2'deki CMemoryPool sınıfının işlevi budur.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 76,
    "level": "GELISMIS SEVIYE: OPTIMIZASYON",
    "title": "Görev 76: Caching (Önbellek)",
    "description": "Aynı oyuncuyu sürekli veritabanından sorgulamak yavaştır. Oyuncu verisi Ram'de (Map) tutulur.",
    "instruction": "std::map<int,std::string> cache; tanımla. cache[1] = \"Savasci\"; ile kaydet. if(cache.count(1)) ile var mı kontrol et. Varsa cache[1] yazdır.",
    "targetOutputText": "Savasci",
    "successMessage": "Oyuncuyu ilk buluşunda DB'den alıp cache'e yazmak Metin2 DB Cache (PlayerManager) mantığıdır.",
    "defaultCode": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 77,
    "level": "GELISMIS SEVIYE: TIPLAR",
    "title": "Görev 77: Veri Tipi Sınırları (Limits)",
    "description": "Neden yang miktarı eskiden 2 Milyar ile sınırlıydı? Çünkü 'int' tipinin (32-bit işaretli) maksimum kapasitesi yaklaşık 2.1 Milyardır.",
    "instruction": "#include <limits> ekle. std::cout << std::numeric_limits<int>::max(); ile int'in alabileceği maksimum değeri yazdır.",
    "targetOutputText": "2147483647",
    "successMessage": "İşte Metin2 efsanesi 2T yang sınırının arkasındaki sebep budur!",
    "defaultCode": "#include <iostream>\n#include <limits>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 78,
    "level": "GELISMIS SEVIYE: TIPLAR",
    "title": "Görev 78: Long Long (64-bit Yang)",
    "description": "2T sınırını aşmak için değişken tipi 'long long' (64-bit) yapılır.",
    "instruction": "long long yang = 5000000000LL; tanımla (LL soneki zorunlu). std::cout ile yazdır. int ile bu değer taşar, long long ile rahat sığar.",
    "targetOutputText": "5000000000",
    "successMessage": "Yang sınırını 2T'den 9 Kentilyona çıkarttın!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 79,
    "level": "GELISMIS SEVIYE: TIPLAR",
    "title": "Görev 79: İşaretsiz Sayılar (unsigned)",
    "description": "Eksi değere düşmesi imkansız olan değerler (Level, Vnum) 'unsigned' olarak tanımlanmalıdır.",
    "instruction": "unsigned int level = 120; tanımla ve yazdır. unsigned tip negatif değer alamaz, bu yüzden tüm aralık pozitif sayılara ayrılır.",
    "targetOutputText": "120",
    "successMessage": "DWORD (unsigned int) Metin2 objelerinde sürekli kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 80,
    "level": "GELISMIS SEVIYE: STD",
    "title": "Görev 80: constexpr",
    "description": "Metin2'de envanter boyutu (9x5=45 slot) gibi sabit değerler her çalıştırmada yeniden hesaplanmamalıdır. constexpr ile bu hesaplamalar derleme anında yapılır ve çalışma zamanında sıfır maliyet oluşturur.",
    "instruction": "constexpr int MAX_INVENTORY = 9 * 5; tanımla. std::cout << MAX_INVENTORY; yazdır. Çarpma işlemi çalışma zamanında değil, derleme zamanında yapılır.",
    "targetOutputText": "45",
    "successMessage": "Derleme zamanı sabiti (constexpr) kullandın. Oyun performansı için sabit hesaplamaların compile-time yapılması kritiktir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 81,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 81: std::tuple (Birden Çok Değer Döndürme)",
    "description": "Metin2'de bir fonksiyondan hem X hem Y koordinatını aynı anda döndürmek istediğimizde, referans parametreler yerine std::tuple kullanabiliriz. Tuple, birden fazla farklı türde değeri tek bir paket olarak taşır.",
    "instruction": "std::tuple<int,int> coords(10, 20); oluştur. std::get<0>(coords) ile birinci, std::get<1>(coords) ile ikinci değeri arka arkaya yazdır.",
    "targetOutputText": "1020",
    "successMessage": "std::tuple ile çoklu değer döndürdün. Koordinat, RGB renk değeri gibi gruplu verilerde kullanılır.",
    "defaultCode": "#include <iostream>\n#include <tuple>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 82,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 82: İleri Operatör Aşırı Yükleme (Operator Overload)",
    "description": "Metin2'de iki eşyanın aynı olup olmadığını kontrol etmek (stacking, karşılaştırma) için == operatörünü kendi sınıfımız için yeniden tanımlayabiliriz. Bu, kodun daha okunabilir olmasını sağlar.",
    "instruction": "struct Item { int vnum; bool operator==(const Item& o) const { return vnum == o.vnum; } }; yaz. Item i1{10}, i2{10}; oluştur. if(i1 == i2) 'Ayni' yazdır.",
    "targetOutputText": "Ayni",
    "successMessage": "Operatör aşırı yükleme (Operator Overloading) yaptın. Eşya karşılaştırma ve sıralama sistemlerinde kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 83,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 83: Auto Anahtar Kelimesi",
    "description": "C++11 ile gelen 'auto' anahtar kelimesi, değişkenin tipini otomatik olarak belirler. Uzun template tiplerini yazmak yerine auto kullanarak kodu daha temiz ve okunabilir hale getiririz.",
    "instruction": "auto name = \"Sura\"; tanımla (derleyici tipi otomatik belirler). std::cout << name; ile yazdır.",
    "targetOutputText": "Sura",
    "successMessage": "auto ile otomatik tip belirleme yaptın. Modern Metin2 kodlarında iterator ve lambda tanımlarında çok kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 84,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 84: İleri Macro (#ifdef)",
    "description": "Metin2 kaynak kodlarında Lycan (Wolfman) sınıfı gibi opsiyonel özellikler #ifdef ile koşullu derlemeye tabi tutulur. Bu sayede aynı kod tabanı farklı sunucu konfigürasyonlarında derlenebilir.",
    "instruction": "En üste #define ENABLE_WOLFMAN yaz. #ifdef ENABLE_WOLFMAN ... #endif bloğu içinde 'Lycan Var' yazdır. Makro tanımlıysa blok derlenir.",
    "targetOutputText": "Lycan Var",
    "successMessage": "#ifdef koşullu derleme kullandın. Metin2 source'da ENABLE_WOLFMAN, ENABLE_MOUNT gibi yüzlerce ifdef bloğu bulunur.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 85,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 85: Typedef / Using",
    "description": "Metin2 kodlarında DWORD, BYTE, WORD gibi tipler aslında C++'da yoktur. Bunlar typedef veya using ile tanımlanmış kısaltmalardır. Uzun tip isimlerini kısaltarak kodu daha okunabilir yaparız.",
    "instruction": "using DWORD = unsigned int; (veya typedef) ile tip kısaltması yap. DWORD level = 100; tanımla ve yazdır.",
    "targetOutputText": "100",
    "successMessage": "Typedef/using ile tip kısaltması yaptın. DWORD=unsigned int, BYTE=unsigned char gibi tanımlar Metin2'nin temelindedir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 86,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 86: Inline Fonksiyonlar",
    "description": "Metin2'de GetHP(), GetLevel() gibi sık çağrılan basit fonksiyonlarda, fonksiyon çağrı maliyetini ortadan kaldırmak için inline kullanılır. Derleyici bu fonksiyonları çağırmak yerine kodun içine yapıştırır.",
    "instruction": "inline int GetMax(int a, int b) { return a>b?a:b; } fonksiyonu yaz. main'de GetMax(5,10) çağır ve sonucu yazdır.",
    "targetOutputText": "10",
    "successMessage": "Inline fonksiyon yazdın. Metin2'de sürekli çağrılan getter/setter fonksiyonları performans için inline olmalıdır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 87,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 87: İleri Dizi Yönetimi (memset)",
    "description": "Metin2'de bir mob veya eşya oluşturulduğunda struct içinde çöp (garbage) veri kalabilir. memset fonksiyonu ile tüm bellek alanını tek seferde 0'layarak temiz bir başlangıç sağlarız.",
    "instruction": "int arr[5]; tanımla. std::memset(arr, 0, sizeof(arr)); ile tüm elemanları sıfırla. arr[4]'ü yazdır (0 çıkacak).",
    "targetOutputText": "0",
    "successMessage": "memset ile bellek sıfırlama yaptın. Metin2'de yeni oluşturulan objelerin ilk işlemi memset ile temizlenmektir.",
    "defaultCode": "#include <iostream>\n#include <cstring>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 88,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 88: Array Kopyalama (memcpy)",
    "description": "Metin2 sunucusu ağ üzerinden paket gönderirken, struct verisini bir byte tamponuna (buffer) kopyalar. memcpy fonksiyonu bu kopyalamayı düşük seviyede ve son derece hızlı yapar.",
    "instruction": "char src[] = \"DATA\"; ve char dest[5]; tanımla. std::memcpy(dest, src, 5); ile kaynaktan hedefe kopyala. dest'i yazdır.",
    "targetOutputText": "DATA",
    "successMessage": "memcpy ile bellek kopyalama yaptın. Metin2'deki tüm ağ paketleri send/recv öncesinde memcpy ile tampona aktarılır.",
    "defaultCode": "#include <iostream>\n#include <cstring>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 89,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 89: Struct İçinde Union",
    "description": "Union, aynı bellek adresini birden fazla veri tipine paylaştırır. Metin2 ağ paketlerinde bazen aynı alan int olarak, bazen char dizisi olarak okunması gerekir. Union bu esnekliği sağlar.",
    "instruction": "union Data { int i; char c; }; tanımla. Data d; d.i = 65; yap. d.c'yi yazdır. int ve char aynı belleği paylaştığı için ASCII 65 = 'A' çıkar.",
    "targetOutputText": "A",
    "successMessage": "Union ile bellek paylaşımı yaptın. Ağ paketlerinde aynı veriyi farklı tiplerle okumak için kullanılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 90,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 90: Switch-Case Fallthrough",
    "description": "Switch-case yapısında break yazılmazsa, eşleşen case'den sonraki case'ler de çalışır (fallthrough). Bu genellikle bir hatadır ancak Metin2 quest sisteminde bazen kasıtlı olarak kullanılır.",
    "instruction": "int lvl=1; switch(lvl) { case 1: std::cout<<\"A\"; case 2: std::cout<<\"B\"; break; } yaz. case 1'de break yok, bu yüzden case 2 de çalışır: AB çıkar.",
    "targetOutputText": "AB",
    "successMessage": "Switch fallthrough davranışını öğrendin. Metin2 quest ve komut sistemlerinde bazen kasıtlı olarak break konmaz.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 91,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 91: Referans Döndüren Fonksiyon",
    "description": "Metin2'de bir karakterin belirli bir özelliğine (HP, Level) erişip onu doğrudan değiştirmek için referans döndüren fonksiyonlar kullanılır. Bu sayede fonksiyonun dönüş değeri atama operatörünün sol tarafında kullanılabilir.",
    "instruction": "int& GetVal(int& a) { return a; } fonksiyonu yaz. main'de int x=10; GetVal(x) = 20; ile fonksiyon dönüşüne atama yap. x'i yazdır (20 olacak).",
    "targetOutputText": "20",
    "successMessage": "Referans döndüren fonksiyon yazdın. Metin2'de GetPoint() gibi fonksiyonlar bu yapıyla çalışır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 92,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 92: Extern Değişkenler",
    "description": "Metin2 sunucusu onlarca .cpp dosyasından oluşur. Tüm dosyaların aynı global değişkene (örneğin g_bIsServer) erişebilmesi için extern anahtar kelimesi kullanılır. Bir dosyada tanımlanır, diğerlerinde extern ile bildirilir.",
    "instruction": "main() dışına int globalCount = 5; tanımla. main içinde std::cout << globalCount; yazdır. (Gerçek projede extern ile diğer dosyalardan erişilir)",
    "targetOutputText": "5",
    "successMessage": "Extern değişken kullanımını öğrendin. Metin2 Core'daki thecore, g_bAuthServer gibi global değişkenler extern'dir.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 93,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 93: İleri Iterator",
    "description": "Metin2'de bir oyuncu partiden çıktığında veya bir eşya envanterden silindiğinde, vektörün ortasından eleman çıkarmak gerekir. erase() fonksiyonu iterator ile belirtilen konumdaki elemanı siler.",
    "instruction": "vector<int> v = {1,2,3}; oluştur. v.erase(v.begin()+1); ile 2. elemanı (indeks 1) sil. v[1]'i yazdır (artık 3 olacak, çünkü 2 silindi).",
    "targetOutputText": "3",
    "successMessage": "Iterator ile eleman silme yaptın. Metin2'de parti listesi, envanter ve mob listelerinden eleman çıkarma bu şekilde yapılır.",
    "defaultCode": "#include <iostream>\n#include <vector>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 94,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 94: std::set (Benzersiz Liste)",
    "description": "Metin2'de bir haritadaki (map) oyuncu listesine aynı oyuncuyu iki kez eklememek gerekir. std::set veri yapısı her elemanı benzersiz tutar ve aynı değeri ikinci kez eklemeye izin vermez.",
    "instruction": "std::set<int> s; oluştur. s.insert(5); iki kez çağır. s.size() ile boyutu yazdır. Set tekrarı kabul etmez, sonuç 1.",
    "targetOutputText": "1",
    "successMessage": "std::set ile benzersiz liste oluşturdun. Metin2'de online oyuncu listesi, map içindeki entity listeleri set ile tutulabilir.",
    "defaultCode": "#include <iostream>\n#include <set>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 95,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 95: Static Member",
    "description": "Metin2'de toplam kaç mob oluşturulduğunu saymak istediğimizde, her obje için ayrı sayaç tutmak yerine sınıfın kendisinde tek bir ortak (static) sayaç tutarız. Bu değişken tüm objeler tarafından paylaşılır.",
    "instruction": "class A { public: static int id; }; tanımla. Sınıf dışında int A::id = 9; ile değer ver. A::id'yi yazdır.",
    "targetOutputText": "9",
    "successMessage": "Static member kullanımını öğrendin. Metin2'de instance sayaçları, global ID üreticileri static member ile yapılır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 96,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 96: Assert Kullanımı",
    "description": "Geliştirme anında bir kural uymazsa programın çökmesini istemek.",
    "instruction": "int hp = 5; tanımla. assert(hp > 0); ile pozitif olduğunu doğrula. Assert başarılıysa std::cout << \"Sorunsuz\"; yazdır.",
    "targetOutputText": "Sorunsuz",
    "successMessage": "Assert geçti, sistem sorunsuz çalışıyor.",
    "defaultCode": "#include <iostream>\n#include <cassert>\n\nint main() {\n    int hp = 5;\n    // assert ile hp'nin pozitif oldugunu dogrula\n    // ve 'Sorunsuz' yazdir\n    \n    return 0;\n}"
  },
  {
    "id": 97,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 97: Sınıflarda Const Metodlar",
    "description": "Metin2'de bir karakterin HP'sini okuyan fonksiyonun, yanlışlıkla HP'yi değiştirmemesi gerekir. const metod, fonksiyonun sınıfın verilerini değiştirmeyeceğinin garantisini verir.",
    "instruction": "class B { int x=5; public: int Get() const { return x; } }; yaz. const metod objeyi değiştirmez. B b; b.Get() yazdır.",
    "targetOutputText": "5",
    "successMessage": "Const metod yazdın. Metin2'de GetHP(), GetLevel() gibi okuma fonksiyonları güvenlik için const olmalıdır.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 98,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 98: std::map::iterator",
    "description": "Metin2'de bir haritadaki tüm oyuncuları dolaşmak (iterate) gerektiğinde, std::map üzerinde iterator kullanılır. Bu sayede map'teki her anahtar-değer çiftine sırayla erişiriz.",
    "instruction": "std::map<int,int> m; m[1]=10; tanımla. for(auto it=m.begin(); it!=m.end(); ++it) döngüsü ile it->second'ı yazdır.",
    "targetOutputText": "10",
    "successMessage": "Map iterator kullanımını öğrendin. Metin2'de oyuncu listesi, mob listesi ve envanter taramaları iterator ile yapılır.",
    "defaultCode": "#include <iostream>\n#include <map>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 99,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 99: C++11 auto ve Reference",
    "description": "C++11 ile gelen range-based for döngüsü ve referans (&) kullanarak, bir vektördeki elemanları döngü içinde kalıcı olarak değiştirebiliriz. & olmadan sadece kopya üzerinde işlem yapılır.",
    "instruction": "vector<int> v = {1}; oluştur. for(auto& i : v) i = 2; ile referansla değiştir. v[0]'ı yazdır (2 olacak, & sayesinde asıl değer değişti).",
    "targetOutputText": "2",
    "successMessage": "auto& ile referans döngüsü kullandın. Metin2'de envanter güncelleme, toplu buff uygulama gibi işlemlerde kritik öneme sahiptir.",
    "defaultCode": "#include <iostream>\n#include <vector>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 100,
    "level": "GELISMIS SEVIYE",
    "title": "Görev 100: Kapanış ve Master Sınavı",
    "description": "100 görevlik bu epik yolculukta C++'ın temellerinden ileri seviye konulara, Metin2'nin gerçek mimarisine kadar devasa bir bilgi birikimi edindin. Bu son görevde tüm öğrendiklerini tek bir satırla taçlandır!",
    "instruction": "std::cout << \"C++ Metin2 Core Uzmani\"; ile bu metni tam olarak yazdır. 100. görev tamamlanacak!",
    "targetOutputText": "C++ Metin2 Core Uzmani",
    "successMessage": "100. GÖREV TAMAMLANDI! C++ dilini ve Metin2 sunucu mimarisini artık anlıyorsun. Sen gerçek bir EFSANE oldun!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    return 0;\n}"
  },
  {
    "id": 101,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 101: std::mutex ve lock_guard",
    "description": "Metin2'de veritabanına aynı anda birden fazla iş parçacığı (thread) yazmaya çalıştığında Race Condition (Veri Yarışı) oluşur. Bunu kilitlerle çözeriz.",
    "instruction": "std::mutex mtx; oluştur. void SafeWrite() içine std::lock_guard<std::mutex> lock(mtx); yazıp 'Guvenli' yazdır.",
    "targetOutputText": "Guvenli",
    "successMessage": "Thread güvenliği sağlandı!",
    "defaultCode": "#include <iostream>\n#include <mutex>\n\nstd::mutex mtx;\n\nvoid SafeWrite() {\n    // lock_guard ekle\n    \n}\n\nint main() {\n    SafeWrite();\n    return 0;\n}"
  },
  {
    "id": 102,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 102: std::atomic",
    "description": "Çoklu thread ortamında sayacı artırmak için mutex yerine atomik işlemler donanım seviyesinde daha hızlıdır.",
    "instruction": "std::atomic<int> onlinePlayers(0); oluştur. onlinePlayers++ yapıp yazdır.",
    "targetOutputText": "1",
    "successMessage": "Lock-free mimariye adım attın.",
    "defaultCode": "#include <iostream>\n#include <atomic>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 103,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 103: Asenkron İşlemler (std::async)",
    "description": "Veritabanı sorguları oyunu dondurmamalıdır. Arka planda asenkron çalışmalıdır.",
    "instruction": "std::async(std::launch::async, [](){ return 5; }) ile asenkron değer al (auto fut). fut.get() ile okuyup yazdır.",
    "targetOutputText": "5",
    "successMessage": "Oyun donmadan arka planda islem yapildi.",
    "defaultCode": "#include <iostream>\n#include <future>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 104,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 104: Bellek Havuzu (Memory Pool)",
    "description": "Sürekli new/delete yapmak oyunu yavaşlatır. Metin2 'CPool' mimarisi ile belleği baştan tahsis eder.",
    "instruction": "char pool[1024]; int* p = new (pool) int(250); (Placement new) yazıp *p değerini yazdır.",
    "targetOutputText": "250",
    "successMessage": "Placement new kullanarak onceden ayrilmis bellegi kullandın.",
    "defaultCode": "#include <iostream>\n#include <new>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 105,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 105: Taşıma Semantiği (std::move)",
    "description": "C++11 ile gelen taşıma semantiği, kopyalama maliyetini sıfıra indirir.",
    "instruction": "std::string s1 = \"Kilic\"; std::string s2 = std::move(s1); yap. Ekrana s2'yi yazdır.",
    "targetOutputText": "Kilic",
    "successMessage": "Veri kopyalanmadı, sahipliği taşındı!",
    "defaultCode": "#include <iostream>\n#include <string>\n#include <utility>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 106,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 106: std::pair (İkili Veri)",
    "description": "İki farklı türden veriyi tek bir yapıda birleştirmek için std::pair kullanılır. Metin2'de koordinat (x, y) veya (itemVnum, count) çiftleri bu yapıyla saklanabilir.",
    "instruction": "std::pair<int, int> coord(100, 200); oluştur. coord.first ve coord.second değerlerini aralarında virgül ile yazdır.",
    "targetOutputText": "100,200",
    "successMessage": "Pair, map'in temel yapı taşıdır.",
    "defaultCode": "#include <iostream>\n#include <utility>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 107,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 107: Hex Dump",
    "description": "Gelen ağ paketlerinin (Packet Sniffing) incelenmesi için veriyi 16'lık tabanda yazdırırız.",
    "instruction": "int value = 255; std::cout << std::hex << value; ile hex formatinda yazdır.",
    "targetOutputText": "ff",
    "successMessage": "Network paketlerini artik okuyabilirsin.",
    "defaultCode": "#include <iostream>\n#include <iomanip>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 108,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 108: reinterpret_cast",
    "description": "Ağ paketlerinde ham byte dizisini (char*) struct'a dönüştürmek için reinterpret_cast kullanılır. Bu çok tehlikeli ama bazen zorunlu bir işlemdir.",
    "instruction": "int x = 42; char* p = reinterpret_cast<char*>(&x); int* back = reinterpret_cast<int*>(p); std::cout << *back; yazdır.",
    "targetOutputText": "42",
    "successMessage": "Ağ paketlerini struct'a dönüştürmenin yolu budur.",
    "defaultCode": "#include <iostream>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 109,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 109: std::function ve Callback",
    "description": "Metin2 event (olay) sisteminde fonksiyon işaretçileri yerine modern std::function kullanılır.",
    "instruction": "std::function<void(int)> action = [](int x){ std::cout << x; }; action(99); cagir.",
    "targetOutputText": "99",
    "successMessage": "Fonksiyonlari obje gibi tasidin.",
    "defaultCode": "#include <iostream>\n#include <functional>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 110,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 110: Zaman Ölçümü (Profiling)",
    "description": "Sunucudaki lag(gecikme) sorunlarını bulmak için kodun kaç milisaniyede çalıştığını ölçmeliyiz.",
    "instruction": "std::chrono kullanarak T1 ve T2 oluştur (system_clock::now). Aradaki farki duration_cast ile milisaniye cinsinden yazdır. (Şimdilik 0 yazdıracak).",
    "targetOutputText": "0",
    "successMessage": "Chrono kutuphanesi C++'da zaman olcumunun tek yoludur.",
    "defaultCode": "#include <iostream>\n#include <chrono>\n\nint main() {\n    auto start = std::chrono::system_clock::now();\n    auto end = std::chrono::system_clock::now();\n    // auto diff = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);\n    // std::cout << diff.count();\n    return 0;\n}"
  },
  {
    "id": 111,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 111: Observer Pattern (Olay Dinleyici)",
    "description": "Bir oyuncu seviye atladığında birden fazla sistemin (UI, ses, efekt) haberdar olması gerekir. Observer deseni bunu sağlar.",
    "instruction": "void OnLevelUp() { std::cout << \"Seviye!\"; } fonksiyonu yaz. Bir void(*callback)() = OnLevelUp; değişkenine ata ve callback(); ile çağır.",
    "targetOutputText": "Seviye!",
    "successMessage": "Event-driven mimarinin temeli Observer desenidir.",
    "defaultCode": "#include <iostream>\n\n// Observer\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 112,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 112: CRTP Pattern",
    "description": "Curiously Recurring Template Pattern: Dinamik Polimorfizm (virtual) kullanmadan statik kalıtım sağlar (Hız kazandırır).",
    "instruction": "template<class T> struct Base { void Do() { static_cast<T*>(this)->Impl(); } }; struct Derived : Base<Derived> { void Impl() { std::cout << \"Hizli\"; } }; Derived d; d.Do();",
    "targetOutputText": "Hizli",
    "successMessage": "CRTP, C++'da performans ustalik belgesidir.",
    "defaultCode": "#include <iostream>\n\n// Kalitim\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 113,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 113: Sınıf İçi Sınıf (Nested Classes)",
    "description": "Metin2 paket başlıklarını (Header) düzenli tutmak için sınıf içinde sınıf tanımları yapılır.",
    "instruction": "class Packet { public: class Header { public: int id; }; }; Packet::Header h; h.id = 50; yazdir.",
    "targetOutputText": "50",
    "successMessage": "Kapsulleme (Encapsulation) tamamlandi.",
    "defaultCode": "#include <iostream>\n\n// Sınıflar\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 114,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 114: Variadic Templates (Çok Parametreli Şablonlar)",
    "description": "Belirsiz sayıda parametre alan fonksiyonlar yazmak. Log sistemi veya paket oluşturma gibi yerlerde kullanılır.",
    "instruction": "template<typename T> void Print(T t) { std::cout << t; } template<typename T, typename... Args> void Print(T t, Args... args) { std::cout << t; Print(args...); } main'de Print(1, 2, 3); çağır.",
    "targetOutputText": "123",
    "successMessage": "Variadic templates, modern C++'ın en güçlü araçlarından biridir.",
    "defaultCode": "#include <iostream>\n\n// Variadic template\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 115,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 115: Extern C",
    "description": "C++ derleyicisinin isimleri bozmasını (Name Mangling) önlemek için C kodlarına entegre olurken extern \"C\" kullanılır (LUA kütüphanesi).",
    "instruction": "extern \"C\" { void LuaScript() { std::cout << \"Lua\"; } } yaz ve main'de cagir.",
    "targetOutputText": "Lua",
    "successMessage": "Metin2'nin C tabanlı LUA diliyle nasıl konuştuğunu öğrendin.",
    "defaultCode": "#include <iostream>\n\n// extern C\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 116,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 116: Bitset",
    "description": "Büyük miktarda bayrak (flag) saklamak için char dizisi yerine std::bitset kullanırız.",
    "instruction": "std::bitset<8> flags(\"10101010\"); std::cout << flags[3]; yazdir.",
    "targetOutputText": "1",
    "successMessage": "1 bytelık alanda 8 farklı özellik tuttun.",
    "defaultCode": "#include <iostream>\n#include <bitset>\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 117,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 117: Karşılıklı İçerme (Circular Dependency)",
    "description": "Character sınıfı Item'i, Item sınıfı Character'i içeriyorsa başlık dosyaları sonsuz döngüye girer. Forward Declaration kullanırız.",
    "instruction": "class Item; yaz. (Forward def). Sonra class Character { Item* m_pItem; void Show() { std::cout << \"Tanimli\"; } }; Nesne olusturup Show cagir.",
    "targetOutputText": "Tanimli",
    "successMessage": "Büyük çaplı mimarilerde çokça rastlanır.",
    "defaultCode": "#include <iostream>\n\n// Forward def\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 118,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 118: noexcept (İstisna Garantisi)",
    "description": "Bir fonksiyonun asla exception fırlatmayacağını garanti ederek derleyiciye optimizasyon fırsatı veririz.",
    "instruction": "int GetHP() noexcept { return 999; } tanımla. main'de çağırıp yazdır.",
    "targetOutputText": "999",
    "successMessage": "noexcept, performans kritik sistemlerde çok önemlidir.",
    "defaultCode": "#include <iostream>\n\n// noexcept\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 119,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 119: Metin2 State Machine",
    "description": "NPC'nin durumunu (Bekliyor, Yürüyor, Ölü) yönetmek için Finite State Machine tasarımı.",
    "instruction": "class State { public: virtual void Execute() = 0; }; class Idle : public State { public: void Execute() override { std::cout << \"Bekliyor\"; } }; State* s = new Idle(); s->Execute();",
    "targetOutputText": "Bekliyor",
    "successMessage": "NPC yapay zekasına giriş yaptın.",
    "defaultCode": "#include <iostream>\n\n// State Pattern\n\nint main() {\n    \n    return 0;\n}"
  },
  {
    "id": 120,
    "level": "MASTER (SOURCE) SEVIYE",
    "title": "Görev 120: Source Master Mezuniyeti",
    "description": "Metin2 Core altyapısında değişkenlerden, sınıflara, dinamik bellekten C++11 standartlarına, threadlerden ağ programlamaya kadar devasa bir yolu kat ettin.",
    "instruction": "Ekrana tam olarak 'BEN BIR C++ SOURCE MASTERIM' yazdır. Ve destanı tamamla!",
    "targetOutputText": "BEN BIR C++ SOURCE MASTERIM",
    "successMessage": "Sana inanamıyorum... 120 devasa görevi tamamladın. Sen gerçek bir Efsanesin!",
    "defaultCode": "#include <iostream>\n\nint main() {\n    \n    return 0;\n}"
  }
];
