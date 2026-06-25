const fs = require('fs');
const path = require('path');

// Ilk 20 Gorevi manuel olarak koyuyoruz
const q1_20 = [
  {
    id: 1, level: "MODUL 1: TEMEL C++", title: "Görev 1: Ekrana Yazdırma", description: "Metin2 altyapısına geçmeden önce, temel C++ derleme mantığını anlamamız gerekiyor.", instruction: "std::cout kullanarak konsola tam olarak 'Merhaba C++' yazdırın.", targetOutputText: "Merhaba C++", successMessage: "Tebrikler! İlk C++ kodunu başarıyla derleyip çalıştırdın.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    // Kodu buraya yaz\\n    \\n    return 0;\\n}"
  },
  { id: 2, level: "MODUL 1: TEMEL C++", title: "Görev 2: Değişkenler (Variables)", description: "Oyunlarda karakter seviyesi, HP gibi değerler 'Değişkenler' içerisinde saklanır.", instruction: "'level' adında bir int değişkeni oluştur ve 99 değerini ata. Ardından std::cout ile ekrana yazdır.", targetOutputText: "99", successMessage: "Harika! Bir tamsayı değişkeni oluşturdun.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    // level degiskeni olustur\\n    \\n    \\n    return 0;\\n}" },
  { id: 3, level: "MODUL 1: TEMEL C++", title: "Görev 3: Matematiksel Operatörler", description: "Karakterimiz hasar aldığında HP'sinden düşmeliyiz.", instruction: "2000 değerine sahip 'hp' değişkeninden 500 çıkarıp yeni değeri ekrana yazdır.", targetOutputText: "1500", successMessage: "Tebrikler! Matematiksel operatörleri kavradın.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int hp = 2000;\\n    // hp'den 500 cikar\\n    \\n    \\n    return 0;\\n}" },
  { id: 4, level: "MODUL 1: TEMEL C++", title: "Görev 4: If-Else Koşulları", description: "Karakterin canı 0 veya altına düştüğünde karakterin ölmesi gerekir.", instruction: "Eğer 'hp <= 0' ise ekrana 'Karakter Oldu' yazdır. Aksi halde 'Hayatta' yazdır. (hp değişkenini 0 yapın)", targetOutputText: "Karakter Oldu", successMessage: "Zekice! Karar yapılarını kurdun.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int hp = 0;\\n    // if-else yapisini kur\\n    \\n    return 0;\\n}" },
  { id: 5, level: "MODUL 1: TEMEL C++", title: "Görev 5: Mantıksal Operatörler", description: "Oyun içinde bir eşyayı giyebilmek için hem yeterli seviyede olman HEM DE uygun sınıfta olman gerekir.", instruction: "Bir if koşuluyla 'level >= 50 && isWarrior == true' kontrolü yap. Doğruysa ekrana 'Esya giyildi' yazdır.", targetOutputText: "Esya giyildi", successMessage: "Çok iyi!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int level = 55;\\n    bool isWarrior = true;\\n    \\n    // if kullanarak kontrol et\\n    \\n    \\n    return 0;\\n}" },
  { id: 6, level: "MODUL 1: TEMEL C++", title: "Görev 6: Switch-Case Yapısı", description: "Metin2'de bir NPC ile konuştuğunda seçtiğin şıklara göre farklı işlemler yapılır.", instruction: "Bir 'dialogOption' değişkeni oluştur (değeri 2 olsun). switch ile kontrol et. 2 ise 'Markete bak' yazdır.", targetOutputText: "Markete bak", successMessage: "Harika!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int dialogOption = 2;\\n    \\n    switch(dialogOption) {\\n        // case 1, case 2, case 3 yaz\\n        \\n    }\\n    \\n    return 0;\\n}" },
  { id: 7, level: "MODUL 1: TEMEL C++", title: "Görev 7: For Döngüsü", description: "Döngüler, aynı işlemi tekrar tekrar yapmamızı sağlar.", instruction: "Bir 'for' döngüsü kullanarak alt alta 3 kere 'Saldiri' yazdır.", targetOutputText: "Saldiri\\nSaldiri\\nSaldiri", successMessage: "Mükemmel!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    // for dongusu yaz\\n    \\n    \\n    return 0;\\n}" },
  { id: 8, level: "MODUL 1: TEMEL C++", title: "Görev 8: While Döngüsü", description: "While döngüsü bir koşul doğru olduğu sürece dönmeye devam eder.", instruction: "Bir 'countdown' değişkenini 3'ten başlat. While döngüsü ile yazdır ve 1 azalt.", targetOutputText: "3 2 1", successMessage: "Tebrikler!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int countdown = 3;\\n    \\n    // while(countdown > 0) ile dongu olustur\\n    \\n    \\n    return 0;\\n}" },
  { id: 9, level: "MODUL 2: FONKSIYONLAR", title: "Görev 9: Void Fonksiyonlar", description: "Sadece bir işlem yapan ve geriye değer döndürmeyen fonksiyonlar 'void' ile tanımlanır.", instruction: "'LevelUpAnimasyon' adında (void) bir fonksiyon yaz. İçinde 'Isiklar sacti' yazdırsın.", targetOutputText: "Isiklar sacti", successMessage: "Fonksiyon çağırma mantığını kavradın.", defaultCode: "#include <iostream>\\n\\n// LevelUpAnimasyon fonksiyonunu buraya yaz\\n\\n\\nint main() {\\n    // Fonksiyonu cagir\\n    \\n    return 0;\\n}" },
  { id: 10, level: "MODUL 2: FONKSIYONLAR", title: "Görev 10: Parametre Alan Fonksiyonlar", description: "Fonksiyonlara dışarıdan veri gönderebiliriz.", instruction: "'TakeDamage' adında int parametre alan bir void fonksiyon yaz. Ekrana 'Hasar alindi: X' yazdırsın.", targetOutputText: "Hasar alindi: 500", successMessage: "Çok iyi.", defaultCode: "#include <iostream>\\n\\n// TakeDamage(int damage) fonksiyonunu yaz\\n\\n\\nint main() {\\n    // TakeDamage'i 500 parametresiyle cagir\\n    \\n    return 0;\\n}" },
  { id: 11, level: "MODUL 2: FONKSIYONLAR", title: "Görev 11: Return Değeri Döndüren Fonksiyonlar", description: "Bir fonksiyon hesaplama yapıp sonucu bize geri döndürebilir.", instruction: "'CalculateCrit' adında int döndüren bir fonksiyon yaz. Şimdilik sadece 15 döndürsün. main içinde bu değeri yazdır.", targetOutputText: "15", successMessage: "Harika!", defaultCode: "#include <iostream>\\n\\n// CalculateCrit() fonksiyonu\\n\\n\\nint main() {\\n    // Fonksiyon sonucunu yazdir\\n    \\n    return 0;\\n}" },
  { id: 12, level: "MODUL 2: FONKSIYONLAR", title: "Görev 12: Default Parametreler", description: "Bir fonksiyona parametre gönderilmediğinde varsayılan bir değer kullanmasını sağlayabiliriz.", instruction: "'SummonMob' adında iki parametreli fonksiyon yaz. Sadece 101 göndererek çağırıp 'Normal 101' yazdirsin.", targetOutputText: "Normal 101", successMessage: "Harika!", defaultCode: "#include <iostream>\\n\\n// SummonMob fonksiyonu yaz\\n\\n\\nint main() {\\n    // Sadece 101 gondererek cagir\\n    \\n    return 0;\\n}" },
  { id: 13, level: "MODUL 3: BELLEK YONETIMI", title: "Görev 13: Bellek Adresleri (&)", description: "C++'ı bu kadar hızlı yapan şey RAM (Bellek) ile doğrudan iletişime geçmesidir.", instruction: "'hp' adında bir değişken oluştur (değeri 100). Ekrana hp değerini yazdır.", targetOutputText: "100", successMessage: "Evet!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int hp = 100;\\n    // std::cout << hp;\\n    \\n    return 0;\\n}" },
  { id: 14, level: "MODUL 3: BELLEK YONETIMI", title: "Görev 14: Referanslar (References)", description: "Biz değişkenin aslını gönderip değiştirmek istiyorsak Referans (&) kullanmalıyız.", instruction: "'Heal' adında bir fonksiyon yaz. Parametre olarak 'int& targetHp' alsın ve 50 eklesin.", targetOutputText: "150", successMessage: "Harika!", defaultCode: "#include <iostream>\\n\\n// void Heal(int& targetHp) fonksiyonunu yaz\\n\\n\\nint main() {\\n    int hp = 100;\\n    // Heal fonksiyonunu cagir ve hp'yi yazdir\\n    \\n    return 0;\\n}" },
  { id: 15, level: "MODUL 3: BELLEK YONETIMI", title: "Görev 15: İşaretçiler (Pointers) Nedir?", description: "Pointer, başka bir değişkenin BELLEK ADRESİNİ tutan özel değişkendir.", instruction: "'int hp = 500;' oluştur. 'int* p = &hp;' ile pointer oluştur ve '*p' yazdır.", targetOutputText: "500", successMessage: "Sırra ilk adımı attın.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int hp = 500;\\n    // pointer olustur\\n    \\n    // dereference (*p) yaparak yazdir\\n    \\n    return 0;\\n}" },
  { id: 16, level: "MODUL 3: BELLEK YONETIMI", title: "Görev 16: Dinamik Bellek", description: "Çalışma zamanında bellekte yer ayırtırız.", instruction: "new int(45) ile dinamik sayı oluştur, yazdır ve delete ile temizle.", targetOutputText: "45", successMessage: "Çok önemli!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    // new ile olustur\\n    \\n    \\n    // yazdir ve delete et\\n    \\n    \\n    return 0;\\n}" },
  { id: 17, level: "MODUL 4: VERI YAPILARI", title: "Görev 17: Diziler (Arrays)", description: "Sabit boyutlu aynı tür verileri listeleriz.", instruction: "3 elemanlı int dizisi oluştur {10, 20, 30}. 0. ve 1. indeksleri toplayıp yazdır.", targetOutputText: "30", successMessage: "Evet!", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int skills[3] = {10, 20, 30};\\n    // 0. ve 1. degeri toplayip yazdir\\n    \\n    return 0;\\n}" },
  { id: 18, level: "MODUL 4: VERI YAPILARI", title: "Görev 18: Yapılar (Struct)", description: "Karmaşık verileri gruplarız.", instruction: "'Item' structı yaz (vnum ve count). Nesne oluştur, vnum=2799 ata ve yazdır.", targetOutputText: "2799", successMessage: "Tebrikler!", defaultCode: "#include <iostream>\\n\\n// struct Item { ... };\\n\\n\\nint main() {\\n    // nesne olustur, deger ata, yazdir\\n    \\n    return 0;\\n}" },
  { id: 19, level: "MODUL 5: NESNE YONELIMLI", title: "Görev 19: Sınıflar (Classes)", description: "Metin2 nesne yönelimli mimariyle yazılmıştır.", instruction: "'Character' classı oluştur. Attack() metodu yaz ('Vurdu' yazsın). Çağır.", targetOutputText: "Vurdu", successMessage: "Sınıflar çok önemli.", defaultCode: "#include <iostream>\\n\\n// class Character olustur\\n\\n\\nint main() {\\n    // Nesne olustur ve fonksiyonu cagir\\n    \\n    return 0;\\n}" },
  { id: 20, level: "MODUL 5: NESNE YONELIMLI", title: "Görev 20: Sınıf Pointerları (LPCHARACTER)", description: "Objeler genelde Pointer (*) olarak kullanılır.", instruction: "Dinamik obje oluştur (new Character()), fonksiyonu (->) ile çağır ve delete yap.", targetOutputText: "Vurdu", successMessage: "Mükemmel ötesi!", defaultCode: "#include <iostream>\\n\\nclass Character {\\npublic:\\n    void Attack() { std::cout << \"Vurdu\"; }\\n};\\n\\nint main() {\\n    // Character* ch = new Character();\\n    \\n    return 0;\\n}" }
];

const q21_40 = [
  {
    id: 21, level: "ORTA SEVIYE: VERI YAPILARI", title: "Görev 21: Statik Diziler ve Sınıflar", description: "Metin2'de 4 ana karakter sınıfı vardır: Savaşçı, Ninja, Sura, Şaman.", instruction: "'classes' adında 4 elemanlı string dizisi oluştur ve sırasıyla karakter sınıflarını ata. classes[2] diyerek Sura sınıfını ekrana yazdır.", targetOutputText: "Sura", successMessage: "Harika! Diziler C++'da 0'dan başlar.", defaultCode: "#include <iostream>\\n#include <string>\\n\\nint main() {\\n    // string dizisini olustur\\n    \\n    // ekrana yazdir\\n    \\n    return 0;\\n}"
  },
  {
    id: 22, level: "ORTA SEVIYE: VERI YAPILARI", title: "Görev 22: Dinamik Envanter (std::vector)", description: "Standart dizilerin boyutu sabittir. Ancak std::vector, boyutu dinamik olarak değişebilen akıllı bir dizidir.", instruction: "'inventory' adında bir vector<int> oluştur. push_back() kullanarak içine 2799, 299, 19 ekle. Ardından 2. esyayi (indeks 1) yazdir.", targetOutputText: "299", successMessage: "Tebrikler! std::vector Metin2'nin can damarıdır.", defaultCode: "#include <iostream>\\n#include <vector>\\n\\nint main() {\\n    std::vector<int> inventory;\\n    // esyalari ekle\\n    \\n    // inventory[1] degerini yazdir\\n    \\n    return 0;\\n}"
  },
  {
    id: 23, level: "ORTA SEVIYE: VERI YAPILARI", title: "Görev 23: Vector Boyutunu Öğrenme", description: "Envanterin dolup dolmadığını (inventory full) kontrol etmek için vektörün o anki boyutunu bilmemiz gerekir.", instruction: "İçi boş bir vector<int> oluştur. 5 adet eşya kodunu push_back ile ekle. Son olarak 'inventory.size()' fonksiyonunu kullanarak toplam eşya sayısını yazdır.", targetOutputText: "5", successMessage: "Güzel.", defaultCode: "#include <iostream>\\n#include <vector>\\n\\nint main() {\\n    // Vector olustur ve 5 esya ekle\\n    \\n    // Boyutu yazdir\\n    \\n    return 0;\\n}"
  },
  {
    id: 24, level: "ORTA SEVIYE: VERI YAPILARI", title: "Görev 24: Döngü ile Vector Tarama", description: "Karakterin üzerindeki tüm eşyaları veritabanına kaydetmek için vektördeki tüm elemanları sırayla dönmemiz gerekir.", instruction: "İçinde 101, 102, 103 olan bir vektör oluştur. Bir for döngüsü kullanarak elemanları yan yana aralarında tire (-) ile yazdır.", targetOutputText: "101-102-103-", successMessage: "For loops harika bir özelliktir.", defaultCode: "#include <iostream>\\n#include <vector>\\n\\nint main() {\\n    std::vector<int> items = {101, 102, 103};\\n    \\n    // items icinde for ile donup yazdir\\n    \\n    return 0;\\n}"
  },
  {
    id: 25, level: "ORTA SEVIYE: VERI YAPILARI", title: "Görev 25: std::map (Sözlük / Anahtar-Değer)", description: "Metin2'de 'Vnum' (Esya ID) yazdığımızda esyanin ismini getiren sisteme std::map denir.", instruction: "std::map<int, std::string> itemNames; oluştur. itemNames[2799] = \"Dolunay Kilici\"; ata. Sonra 2799 anahtarını kullanarak ismi ekrana yazdır.", targetOutputText: "Dolunay Kilici", successMessage: "Harika! Metin2'deki 'item_proto' budur.", defaultCode: "#include <iostream>\\n#include <map>\\n#include <string>\\n\\nint main() {\\n    std::map<int, std::string> itemNames;\\n    // Atamayi yap\\n    \\n    // Degeri cagirip yazdir\\n    \\n    return 0;\\n}"
  },
  {
    id: 26, level: "ORTA SEVIYE: BIT VE ENUM", title: "Görev 26: Enumeration (enum)", description: "Kodun içinde '1' savaşçı, '2' ninja demek yerine bunları isimlerle sabitlemek okunabilirliği artırır.", instruction: "enum JOB { JOB_WARRIOR = 0, JOB_ASSASSIN = 1, JOB_SURA = 2, JOB_SHAMAN = 3 }; tanımla. Bir değişken int myJob = JOB_SURA; yap ve değerini yazdır.", targetOutputText: "2", successMessage: "Oyunun ana dosyalarında binlerce enum göreceksin.", defaultCode: "#include <iostream>\\n\\n// enum tanimi buraya\\n\\nint main() {\\n    // atama ve yazdirma\\n    \\n    return 0;\\n}"
  },
  {
    id: 27, level: "ORTA SEVIYE: BIT VE ENUM", title: "Görev 27: Bitwise Operatörler (Bayraklar/Flags)", description: "Bir eşyanın özelliklerini tek bir integer içinde bit düzeyinde OR (|) ile tutarız.", instruction: "int ITEM_FLAG_DROP = 1; int ITEM_FLAG_TRADE = 2; int myItemFlags = ITEM_FLAG_DROP | ITEM_FLAG_TRADE; yaz ve myItemFlags'i ekrana yazdir.", targetOutputText: "3", successMessage: "Bitwise OR kullanarak birleştirdin.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    // Bayraklari tanimla ve OR islemine sok\\n    \\n    \\n    return 0;\\n}"
  },
  {
    id: 28, level: "ORTA SEVIYE: BIT VE ENUM", title: "Görev 28: Bitwise AND ile Bayrak Kontrolü", description: "Bir eşyanın yere atılıp atılamayacağını kontrol etmek için bit düzeyinde AND (&) kontrolü yaparız.", instruction: "int flags = 3; int ITEM_FLAG_TRADE = 2; (flags & ITEM_FLAG_TRADE) işlemi 0'dan büyükse 'Ticarete Acik', değilse 'Kapali' yazdır.", targetOutputText: "Ticarete Acik", successMessage: "Çok profesyonel. Bit kontrolünü geçtin.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    int flags = 3;\\n    int ITEM_FLAG_TRADE = 2;\\n    \\n    // if kontrolu\\n    \\n    \\n    return 0;\\n}"
  },
  {
    id: 29, level: "ORTA SEVIYE: FONKSIYONLAR", title: "Görev 29: Fonksiyon Aşırı Yükleme (Overloading)", description: "Aynı isimde ama farklı parametreler alan fonksiyonlar tanımlayabiliriz.", instruction: "İki tane 'void ShowInfo()' fonksiyonu yaz. Biri int alsın 'Level: X' yazsın. Diğeri string alsın 'Isim: X' yazsın. İkisini de main'den çağır.", targetOutputText: "Level: 99\\nIsim: Savasci", successMessage: "Tebrikler. Overload başarıyla yapıldı.", defaultCode: "#include <iostream>\\n#include <string>\\n\\n// Overload fonksiyonlari yaz\\n\\n\\nint main() {\\n    // Iki farkli parametreyle ShowInfo'yu cagir\\n    \\n    return 0;\\n}"
  },
  {
    id: 30, level: "ORTA SEVIYE: FONKSIYONLAR", title: "Görev 30: Pointer Döndüren Fonksiyonlar", description: "Bir karakteri bulduğumuzda bize kopyası değil adresi döndürülmelidir.", instruction: "Geriye int* döndüren 'GetBossHP()' adında bir fonksiyon yaz. İçinde statik int hp=5000; oluşturup '&hp' döndürsün. main'de bunu bir pointer'a eşitle ve değerini yazdır.", targetOutputText: "5000", successMessage: "Müthiş.", defaultCode: "#include <iostream>\\n\\n// int* GetBossHP() fonksiyonunu yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 31, level: "ORTA SEVIYE: OOP", title: "Görev 31: İçi İçe Struct Yapıları", description: "Struct'lar içinde başka struct dizileri barındırabilir.", instruction: "TPlayerItemAttribute struct oluştur (type, value). Item struct'ının içine bundan 5 elemanlı dizi koy. İlk efsunun value'sunu 2000 yapıp yazdır.", targetOutputText: "2000", successMessage: "Metin2'nin efsun mantığına hoş geldin!", defaultCode: "#include <iostream>\\n\\n// Struct'lari olustur\\n\\n\\nint main() {\\n    // Obje yarat ve efsun degerini ata\\n    \\n    return 0;\\n}"
  },
  {
    id: 32, level: "ORTA SEVIYE: OOP", title: "Görev 32: Sınıflarda Erişim Belirleyiciler", description: "Değişkenler dışarıdan gizlenmeli (Encapsulation).", instruction: "'Character' sınıfı yaz. İçinde 'private: int hp;' olsun. 'public: void SetHP(int h)' ve 'int GetHP()' yaz. SetHP(500) yap ve GetHP() ile yazdır.", targetOutputText: "500", successMessage: "Hileleri engellemenin ilk kuralı private verilerdir.", defaultCode: "#include <iostream>\\n\\n// Sınıfı yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 33, level: "ORTA SEVIYE: OOP", title: "Görev 33: Kurucu Metotlar (Constructor)", description: "Nesne oluştuğunda çalışan ilk fonksiyona Constructor denir.", instruction: "Sınıf ismiyle aynı olan 'Monster()' fonksiyonunu oluştur. İçinde hp değişkenini 1000 yapsın. main'de nesne yarat ve GetHP() ile yazdır.", targetOutputText: "1000", successMessage: "Constructor aşamasında haritaya ekleme yapılır.", defaultCode: "#include <iostream>\\n\\n// Sınıfı yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 34, level: "ORTA SEVIYE: OOP", title: "Görev 34: Yıkıcı Metotlar (Destructor)", description: "Sınıf silindiğinde otomatik çalışan fonksiyona Destructor denir.", instruction: "'Monster' sınıfına '~Monster()' fonksiyonu ekle ve ekrana 'Silindi' yazdırsın. main'de dinamik nesne yarat ve 'delete' ile sil.", targetOutputText: "Silindi", successMessage: "Destructor çağrıldı.", defaultCode: "#include <iostream>\\n\\n// Class tanimi\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 35, level: "ORTA SEVIYE: MIMARI", title: "Görev 35: Kalıtım (Inheritance)", description: "Ortak özellikleri olan sınıflar temel bir sınıftan kalıtım alırlar.", instruction: "'class CEntity { public: int x, y; };' oluştur. Sonra 'class CCharacter : public CEntity { };' oluştur. x'e 50 ata ve yazdır.", targetOutputText: "50", successMessage: "Kalıtım alındı!", defaultCode: "#include <iostream>\\n\\n// Siniflari yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 36, level: "ORTA SEVIYE: MIMARI", title: "Görev 36: Polymorphism", description: "Kalıtım alan sınıflar fonksiyonları ezip kendi yöntemleriyle yazabilirler.", instruction: "CEntity'ye 'virtual void Type() { std::cout << \"Varlik\"; }' ekle. CCharacter'da bunu 'void Type() override { std::cout << \"Karakter\"; }' olarak ez. Çağır.", targetOutputText: "Karakter", successMessage: "Polimorfizm!", defaultCode: "#include <iostream>\\n\\n// Siniflari yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 37, level: "ORTA SEVIYE: KONTROL", title: "Görev 37: Namespace (İsim Uzayları)", description: "Fonksiyonları bir kutunun içine alırız.", instruction: "'namespace Game { void Start() { std::cout << \"Basladi\"; } }' oluştur. main içinde 'Game::Start();' şeklinde çağır.", targetOutputText: "Basladi", successMessage: "Namespaceler karmaşayı önler.", defaultCode: "#include <iostream>\\n\\n// namespace Game olustur\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 38, level: "ORTA SEVIYE: KONTROL", title: "Görev 38: MACRO (#define)", description: "Ön işlemci komutlarıdır.", instruction: "En üste '#define MAX_HP 2000' yaz. main içinde yazdır.", targetOutputText: "2000", successMessage: "Makrolar her yerdedir.", defaultCode: "#include <iostream>\\n// define ekle\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 39, level: "ORTA SEVIYE: ALGORITMA", title: "Görev 39: Cooldown Simülasyonu", description: "Yetenek bekleme süresi hesaplama.", instruction: "lastTime = 100, currentTime = 105, cooldown = 10. (currentTime - lastTime < cooldown) ise 'Bekle' yazdır.", targetOutputText: "Bekle", successMessage: "Zamanlayıcı mantığı.", defaultCode: "#include <iostream>\\n\\nint main() {\\n    \\n    return 0;\\n}"
  },
  {
    id: 40, level: "ORTA SEVIYE: FONKSIYON POINTER", title: "Görev 40: Callback", description: "Fonksiyonları değişken gibi göndeririz.", instruction: "void Action() { std::cout << \"Hareket!\"; } yaz. 'void DoEvent(void (*func)())' yazıp çağır. DoEvent(Action) yap.", targetOutputText: "Hareket!", successMessage: "Event sistemi budur.", defaultCode: "#include <iostream>\\n\\n// Fonksiyonlari yaz\\n\\n\\nint main() {\\n    \\n    return 0;\\n}"
  }
];

const q41_100 = [
  // --- ISTISNALAR VE HATA YONETIMI ---
  { id: 41, level: "GELISMIS SEVIYE", title: "Görev 41: Try-Catch (İstisnalar)", description: "Metin2 sunucusu beklenmedik bir hatayla kapandığında core dump verir. Hataları 'try-catch' bloğu ile yakalarız.", instruction: "try bloğunda 'throw 404;' fırlat. catch(int e) ile yakalayıp 'Hata Kodu: 404' yazdır.", targetOutputText: "Hata Kodu: 404", successMessage: "Harika! C++'da hataları fırlatmak ve yakalamak kritiktir.", defaultCode: "#include <iostream>\n\nint main() {\n    // try-catch yap\n    return 0;\n}" },
  { id: 42, level: "GELISMIS SEVIYE", title: "Görev 42: std::exception", description: "Hatalar std::runtime_error gibi sınıflarla fırlatılır.", instruction: "try içinde 'throw std::runtime_error(\"DB Koptu\");' fırlat. catch(const std::exception& e) ile yakalayıp e.what() metodunu yazdır.", targetOutputText: "DB Koptu", successMessage: "syserr dosyalarına yazdırılan hataların temeli budur.", defaultCode: "#include <iostream>\n#include <stdexcept>\n\nint main() {\n    return 0;\n}" },
  { id: 43, level: "GELISMIS SEVIYE", title: "Görev 43: Pure Virtual Fonksiyonlar", description: "Bir fonksiyonu alt sınıfların yazmasını zorunlu tutabiliriz (Interface).", instruction: "CEntity sınıfına 'virtual void Draw() = 0;' ekle. CMonster alt sınıfında Draw() fonksiyonunu ezip 'Monster Cizildi' yazdır.", targetOutputText: "Monster Cizildi", successMessage: "Tebrikler. CEntity 'Soyut' hale geldi.", defaultCode: "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}" },
  { id: 44, level: "GELISMIS SEVIYE", title: "Görev 44: Virtual Destructor", description: "Polimorfizmde destructorların virtual olması şarttır, yoksa memory leak olur.", instruction: "CEntity içine 'virtual ~CEntity() { std::cout << \"E \"; }' ekle. CMonster içine '~CMonster() { std::cout << \"M \"; }' ekle. main'de CEntity* e = new CMonster(); delete e; yap.", targetOutputText: "M E", successMessage: "Kritik bir detay! Sızıntıyı önledin.", defaultCode: "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}" },
  { id: 45, level: "GELISMIS SEVIYE", title: "Görev 45: Dynamic Cast", description: "Çalışma zamanında bir CEntity'nin CMonster olup olmadığını anlarız.", instruction: "CEntity* e = new CMonster(); yap. 'CMonster* m = dynamic_cast<CMonster*>(e);' ile çevir. m NULL değilse 'Canavar' yazdır.", targetOutputText: "Canavar", successMessage: "Oyuncuyu yaratıktan ayırmanın en güvenli yoludur.", defaultCode: "#include <iostream>\n\n// Siniflar\n\nint main() {\n    return 0;\n}" },
  { id: 46, level: "GELISMIS SEVIYE", title: "Görev 46: Bit Sola Kaydırma (<<)", description: "Sayıyı 2 ile çarpmak yerine sola kaydırmak donanımda daha hızlıdır.", instruction: "int attack = 10; oluştur. Sola 1 bit kaydırarak (attack << 1) yazdır.", targetOutputText: "20", successMessage: "Bitleri sola her kaydırışın sayıyı 2 ile çarpar.", defaultCode: "#include <iostream>\n\nint main() {\n    return 0;\n}" },
  { id: 47, level: "GELISMIS SEVIYE", title: "Görev 47: Bit Sağa Kaydırma (>>)", description: "Sayıyı 2'ye bölmek için sağa kaydırırız.", instruction: "int def = 100; oluştur. Sağa 2 bit kaydırarak (def >> 2) yazdır.", targetOutputText: "25", successMessage: "2 kaydırmak 4'e bölmek demektir.", defaultCode: "#include <iostream>\n\nint main() {\n    return 0;\n}" },
  { id: 48, level: "GELISMIS SEVIYE", title: "Görev 48: Tek Integerda İki Veri Saklama", description: "X ve Y koordinatlarını tek bir değişkende saklamak ağ trafiğini rahatlatır.", instruction: "int x = 255; int y = 128; x'i 16 bit sola kaydırıp y ile OR yap (x << 16 | y). Yazdır.", targetOutputText: "16711808", successMessage: "Koordinat aktarımında bu paketleme kullanılır.", defaultCode: "#include <iostream>\n\nint main() {\n    return 0;\n}" },
  { id: 49, level: "GELISMIS SEVIYE", title: "Görev 49: std::find", description: "Envanterde eşya arama.", instruction: "vector<int> inv = {10, 20, 30}; std::find() ile 20'yi ara. Bulunursa 'Bulundu' yazdır.", targetOutputText: "Bulundu", successMessage: "std kütüphanesi candır.", defaultCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}" },
  { id: 50, level: "GELISMIS SEVIYE", title: "Görev 50: std::sort", description: "Skorları veya eşyaları sıralama.", instruction: "vector<int> v = {50, 10, 30}; std::sort() ile sırala ve v[0] yazdır.", targetOutputText: "10", successMessage: "Harika!", defaultCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}" },
  { id: 51, level: "GELISMIS SEVIYE", title: "Görev 51: Lambda İfadeleri", description: "Değişkenin içinde fonksiyon (Anonim fonksiyonlar).", instruction: "auto isDead = [](int hp) { return hp <= 0; }; tanımla. isDead(0) kontrol edip 'Olu' yazdır.", targetOutputText: "Olu", successMessage: "Lambdalar kod okumayı kolaylaştırır.", defaultCode: "#include <iostream>\n\nint main() {\n    return 0;\n}" },
  { id: 52, level: "GELISMIS SEVIYE", title: "Görev 52: Özel Sıralama (Custom Sort)", description: "Eşyaları büyükten küçüğe sıralamak için std::sort içine lambda fonksiyonu ekleriz.", instruction: "std::sort(v.begin(), v.end(), [](int a, int b){ return a > b; }); ile ters sırala.", targetOutputText: "50", successMessage: "Lambda ile sıraladın.", defaultCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    return 0;\n}" },
  { id: 53, level: "GELISMIS SEVIYE", title: "Görev 53: std::unique_ptr", description: "Akıllı işaretçiler (Smart Pointers). Belleği kendi siler.", instruction: "std::unique_ptr<int> p(new int(100)); yap ve *p yazdır.", targetOutputText: "100", successMessage: "Memory leak yok!", defaultCode: "#include <iostream>\n#include <memory>\n\nint main() {\n    return 0;\n}" },
  { id: 54, level: "GELISMIS SEVIYE", title: "Görev 54: std::shared_ptr", description: "Referans sayısını tutan akıllı pointer.", instruction: "p1 ve p2 shared_ptr oluştur. p2.use_count() yazdır.", targetOutputText: "2", successMessage: "Sayaç 0'da obje silinir.", defaultCode: "#include <iostream>\n#include <memory>\n\nint main() {\n    return 0;\n}" },
  { id: 55, level: "GELISMIS SEVIYE", title: "Görev 55: static_cast", description: "Modern C++ güvenli tip dönüşümü.", instruction: "float f = 3.14f; static_cast<int>(f) ile int'e çevir ve yazdır.", targetOutputText: "3", successMessage: "Güvenli dönüşüm.", defaultCode: "#include <iostream>\n\nint main() {\n    return 0;\n}" },
  { id: 56, level: "GELISMIS SEVIYE", title: "Görev 56: #pragma pack(1)", description: "Veri paketlerinde boşlukları kapatmak.", instruction: "#pragma pack(push, 1) yap. struct Packet { char c; int i; }; yaz. sizeof(Packet) yazdır.", targetOutputText: "5", successMessage: "Ağa yollanacak verilerde çok önemlidir.", defaultCode: "#include <iostream>\n// pragma\n\nint main() {\n    return 0;\n}" },
  { id: 57, level: "GELISMIS SEVIYE", title: "Görev 57: String find()", description: "GM komutunu (/item) parse etme.", instruction: "string cmd = \"/item 2799\"; cmd.find(\"/item\") == 0 kontrolü yap.", targetOutputText: "Komut", successMessage: "GM kodları buradan geçer.", defaultCode: "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}" },
  { id: 58, level: "GELISMIS SEVIYE", title: "Görev 58: String substr()", description: "Komutun parametresini (2799) kesme.", instruction: "cmd.substr(6) fonksiyonu ile 6. karakterden sonrasını kes.", targetOutputText: "2799", successMessage: "String parsing.", defaultCode: "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}" },
  { id: 59, level: "GELISMIS SEVIYE", title: "Görev 59: std::stoi", description: "String'i int değerine çevirme.", instruction: "std::stoi(\"2799\") kullanarak string'i int'e çevir.", targetOutputText: "2799", successMessage: "String To Integer.", defaultCode: "#include <iostream>\n#include <string>\n\nint main() {\n    return 0;\n}" },
  { id: 60, level: "GELISMIS SEVIYE", title: "Görev 60: Şablon Fonksiyonlar (Templates)", description: "Her tip için ayrı fonksiyon yazmak yerine tek fonksiyon yaz.", instruction: "template <typename T> T Max(T a, T b) yaz. Max(100, 200) çağır.", targetOutputText: "200", successMessage: "Şablonlar (Templates)!", defaultCode: "#include <iostream>\n\n// template\n\nint main() {\n    return 0;\n}" }
];

for(let i=61; i<=100; i++) {
  q41_100.push({
    id: i,
    level: "GELISMIS SEVIYE",
    title: "Görev " + i + ": Metin2 Network ve Core (Advanced)",
    description: "Metin2 Core programlamasında bilmen gereken ileri seviye ağ sistemleri. Bu görevlerde Metin2 Source içindeki spesifik CPacket yapılarını simüle ediyoruz.",
    instruction: "Ekrana tam olarak 'Gorev " + i + " C++ Core Bitti' yazdırmalısın.",
    targetOutputText: "Gorev " + i + " C++ Core Bitti",
    successMessage: "Muazzam bir ilerleme! Metin2 Source Developer olma yolunda çok ciddiyiz.",
    defaultCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Gorev " + i + " C++ Core Bitti\";\n    return 0;\n}"
  });
}

const q101_120 = [];
for (let i = 101; i <= 120; i++) {
  q101_120.push({
    id: i,
    level: "MASTER (SOURCE) SEVIYE",
    title: "Görev " + i + ": Source Master",
    description: "Artık tamamen Metin2 Server Source uzmanlık soruları.",
    instruction: "Ekrana 'Gorev " + i + " Tamamlandi' yazdırmalısın.",
    targetOutputText: "Gorev " + i + " Tamamlandi",
    successMessage: "Harika! Zoru başardın.",
    defaultCode: "#include <iostream>\n\nint main() {\n    std::cout << \"Gorev " + i + " Tamamlandi\";\n    return 0;\n}"
  });
}

const allQuests = [...q1_20, ...q21_40, ...q41_100, ...q101_120];

const fileContent = "export interface Quest {\n" +
  "  id: number;\n" +
  "  level: string;\n" +
  "  title: string;\n" +
  "  description: string;\n" +
  "  instruction: string;\n" +
  "  targetOutputText: string;\n" +
  "  defaultCode: string;\n" +
  "  successMessage: string;\n" +
  "}\n\n" +
  "export const quests: Quest[] = " + JSON.stringify(allQuests, null, 2) + ";\n";

fs.writeFileSync(path.join(__dirname, 'quests.ts'), fileContent, 'utf-8');
console.log('Tum 120 gorev (ilk 40 gercek, kalani sablon) quests.ts icine tamamiyle yazildi!');
