const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

let jsonStart = fileContent.indexOf('export const quests: Quest[] = [') + 'export const quests: Quest[] = '.length;
let jsonStr = fileContent.substring(jsonStart, fileContent.lastIndexOf(']') + 1);
let quests = JSON.parse(jsonStr);

const fixes = {
  // MODUL 1
  5: { instruction: "level adında int (55) ve isWarrior adında bool (true) değişkeni oluştur. if koşulunda her iki şartı && (ve) operatörü ile kontrol et. İkisi de doğruysa 'Esya giyildi' yazdır." },
  6: { instruction: "dialogOption adında bir int değişkeni oluştur ve 2 yap. switch bloğu içinde case 1, 2, 3 tanımla. case 2 içinde 'Markete bak' yazdır ve break koy." },
  7: { instruction: "for döngüsünü 0'dan 3'e kadar çalıştır. Her turda std::cout << \"Saldiri\" << std::endl; ile alt alta yazdır." },
  8: { instruction: "countdown değişkenini 3 yap. while(countdown > 0) döngüsü içinde değeri yazdırıp bir boşluk ekle, sonra countdown-- ile azalt. Çıktı: 3 2 1" },

  // MODUL 2 - FONKSIYONLAR
  9: { instruction: "main() fonksiyonunun üzerine void LevelUpAnimasyon() adında bir fonksiyon tanımla. İçine std::cout << \"Isiklar sacti\"; yaz. main() içinden bu fonksiyonu çağır." },
  10: { instruction: "void TakeDamage(int damage) adında bir fonksiyon yaz. İçinde 'Hasar alindi: ' ve ardından damage değerini yazdırsın. main'den TakeDamage(500) ile çağır." },
  11: { instruction: "int CalculateCrit() fonksiyonu yaz, return 15; döndürsün. main içinde int sonuc = CalculateCrit(); ile değeri alıp std::cout ile yazdır." },
  12: { instruction: "void SummonMob(int vnum, std::string tur = \"Normal\") fonksiyonu yaz. İçinde tür ve vnum'u yan yana yazdırsın. main'den sadece SummonMob(101) ile çağır, tür otomatik 'Normal' gelecek." },

  // MODUL 3 - BELLEK
  13: { instruction: "int hp = 100; tanımla. std::cout << hp; ile değerini ekrana yazdır. (Pointer ve adres konularına hazırlık)" },
  14: { instruction: "void Heal(int& targetHp) fonksiyonu yaz, targetHp'ye 50 eklesin. main'de int hp = 100; oluştur, Heal(hp) çağır ve hp'yi yazdır. Referans sayesinde asıl değer değişir." },
  15: { instruction: "int hp = 500; oluştur. int* p = &hp; ile hp'nin adresini tutan pointer yarat. *p (dereference) ile pointer'ın gösterdiği değeri yazdır." },
  16: { instruction: "int* p = new int(45); ile çalışma zamanında bellekte yer ayır. *p ile değeri yazdır. İşin bitince delete p; ile belleği serbest bırak." },

  // MODUL 4 - VERI YAPILARI
  17: { instruction: "int skills[3] = {10, 20, 30}; dizisi oluştur. skills[0] + skills[1] toplayıp sonucu std::cout ile yazdır. (Diziler 0'dan başlar)" },
  18: { instruction: "struct Item { int vnum; int count; }; tanımla. main'de Item esya; oluşturup esya.vnum = 2799; ata. vnum'u yazdır." },

  // MODUL 5 - OOP
  19: { instruction: "class Character sınıfı oluştur. public bölümüne void Attack() metodu yaz, içinde 'Vurdu' yazdırsın. main'de Character ch; nesne yarat ve ch.Attack() çağır." },
  20: { instruction: "Character* ch = new Character(); ile dinamik nesne oluştur. ch->Attack() ile (ok operatörü) metodu çağır. delete ch; ile temizle." },

  // ORTA SEVIYE
  21: { instruction: "std::string classes[4] = {\"Savasci\", \"Ninja\", \"Sura\", \"Saman\"}; dizisi oluştur. classes[2] ile Sura'yı yazdır. (İndeksler: 0=Savasci, 1=Ninja, 2=Sura)" },
  22: { instruction: "std::vector<int> inventory; oluştur. push_back(2799), push_back(299), push_back(19) ile 3 eşya ekle. inventory[1] ile 2. eşyayı (299) yazdır." },
  23: { instruction: "Boş bir vector<int> oluştur. push_back ile 5 farklı eşya kodu ekle. inventory.size() ile toplam eleman sayısını yazdır." },
  24: { instruction: "vector<int> items = {101, 102, 103}; oluştur. for döngüsü ile her elemanı yazdır ve arkasına tire (-) ekle. Çıktı: 101-102-103-" },
  25: { instruction: "std::map<int, std::string> itemNames; oluştur. itemNames[2799] = \"Dolunay Kilici\"; ata. itemNames[2799] ile adı yazdır." },
  26: { instruction: "enum JOB { JOB_WARRIOR=0, JOB_ASSASSIN=1, JOB_SURA=2, JOB_SHAMAN=3 }; tanımla. int myJob = JOB_SURA; yap ve myJob'u yazdır (2 çıkacak)." },
  27: { instruction: "int ITEM_FLAG_DROP = 1; ve int ITEM_FLAG_TRADE = 2; tanımla. OR operatörü ile birleştir: int flags = ITEM_FLAG_DROP | ITEM_FLAG_TRADE; ve flags'i yazdır (3 çıkacak)." },
  28: { instruction: "flags = 3 ve ITEM_FLAG_TRADE = 2 tanımla. if(flags & ITEM_FLAG_TRADE) kontrolü yap. Bit seviyesinde AND ile bayrak açıksa 'Ticarete Acik' yazdır." },
  29: { instruction: "Aynı isimde iki ShowInfo fonksiyonu yaz: biri int alıp 'Level: X' yazsın (endl ile), diğeri string alıp 'Isim: X' yazsın. main'den ShowInfo(99) ve ShowInfo(\"Savasci\") çağır." },
  30: { instruction: "int* GetBossHP() fonksiyonu yaz. İçinde static int hp = 5000; tanımla ve &hp döndür. main'de int* p = GetBossHP(); ile adresi al ve *p ile değeri yazdır." },
  31: { instruction: "struct TPlayerItemAttribute { int type; int value; }; yaz. struct Item içine TPlayerItemAttribute attrs[5]; dizisi koy. İlk efsunun value'sunu 2000 yap ve yazdır." },
  32: { instruction: "Character sınıfında private: int hp; tanımla. public: void SetHP(int h) { hp = h; } ve int GetHP() { return hp; } yaz. SetHP(500) çağır, GetHP() ile yazdır." },
  33: { instruction: "Monster sınıfına constructor yaz: Monster() { hp = 1000; } İçinde private int hp olsun. public GetHP() ile hp döndür. Nesne yarat ve GetHP() yazdır." },
  34: { instruction: "Monster sınıfına destructor ekle: ~Monster() { std::cout << \"Silindi\"; } main'de Monster* m = new Monster(); yarat ve delete m; ile sil. Destructor otomatik çalışacak." },
  35: { instruction: "class CEntity { public: int x, y; }; oluştur. class CCharacter : public CEntity {}; ile kalıtım al. CCharacter nesne yarat, x'e 50 ata ve yazdır." },
  36: { instruction: "CEntity'ye virtual void Type() fonksiyonu yaz, 'Varlik' yazdırsın. CCharacter'da override ile ezip 'Karakter' yazdır. CEntity* e = new CCharacter(); e->Type(); çağır." },
  37: { instruction: "namespace Game { void Start() { std::cout << \"Basladi\"; } } tanımla. main içinde Game::Start(); ile çağır. Namespace fonksiyonları isim çakışmasından korur." },
  38: { instruction: "#include <iostream> altına #define MAX_HP 2000 yaz. main içinde std::cout << MAX_HP; ile yazdır. Makro, derleme öncesi metinsel olarak yerleştirilir." },
  39: { instruction: "lastTime=100, currentTime=105, cooldown=10 tanımla. if(currentTime - lastTime < cooldown) koşulunu kontrol et. Fark cooldown'dan küçükse 'Bekle' yazdır." },
  40: { instruction: "void Action() { std::cout << \"Hareket!\"; } yaz. void DoEvent(void (*func)()) fonksiyonu tanımla, içinde func() çağırsın. main'den DoEvent(Action) ile çağır." },

  // GELISMIS SEVIYE 41-60
  41: { instruction: "try bloğu içinde throw 404; ile hata fırlat. catch(int e) ile yakala ve 'Hata Kodu: ' + e değerini yazdır." },
  42: { instruction: "try bloğunda throw std::runtime_error(\"DB Koptu\"); fırlat. catch(const std::exception& e) ile yakala ve e.what() ile hata mesajını yazdır." },
  43: { instruction: "class CEntity { public: virtual void Draw() = 0; }; soyut sınıf yaz. class CMonster : public CEntity ile kalıtım alıp Draw() içinde 'Monster Cizildi' yazdır." },
  44: { instruction: "CEntity'ye virtual ~CEntity() { std::cout << \"E \"; } yaz. CMonster'a ~CMonster() { std::cout << \"M \"; } yaz. CEntity* e = new CMonster(); delete e; yap. Önce M sonra E yazacak." },
  45: { instruction: "CEntity* e = new CMonster(); yarat. CMonster* m = dynamic_cast<CMonster*>(e); ile dönüştür. if(m != nullptr) 'Canavar' yazdır." },
  46: { instruction: "int attack = 10; tanımla. attack << 1 ile 1 bit sola kaydır ve sonucu yazdır. Her sola kaydırma sayıyı 2 ile çarpar, sonuç 20." },
  47: { instruction: "int def = 100; tanımla. def >> 2 ile 2 bit sağa kaydır ve sonucu yazdır. 2 bit sağa kaydırmak 4'e bölmek demektir, sonuç 25." },
  48: { instruction: "int x=255, y=128; tanımla. (x << 16 | y) işlemi ile iki sayıyı tek int'te paketle ve sonucu yazdır. x üst 16 bite, y alt 16 bite yerleşir." },
  49: { instruction: "vector<int> inv = {10, 20, 30}; oluştur. auto it = std::find(inv.begin(), inv.end(), 20); ile 20'yi ara. if(it != inv.end()) 'Bulundu' yazdır." },
  50: { instruction: "vector<int> v = {50, 10, 30}; oluştur. std::sort(v.begin(), v.end()); ile küçükten büyüğe sırala. v[0] ile en küçük elemanı (10) yazdır." },
  51: { instruction: "auto isDead = [](int hp) { return hp <= 0; }; lambda tanımla. if(isDead(0)) kontrolü yap ve 'Olu' yazdır." },
  52: { instruction: "vector<int> v = {10, 50, 30}; oluştur. std::sort içine lambda ver: [](int a, int b){ return a > b; } ile büyükten küçüğe sırala. v[0]'ı (50) yazdır." },
  53: { instruction: "std::unique_ptr<int> p(new int(100)); oluştur. *p ile değeri yazdır. Kapsam dışına çıkınca bellek otomatik silinir, delete gerekmez." },
  54: { instruction: "auto p1 = std::make_shared<int>(42); yarat. auto p2 = p1; ile paylaş. p2.use_count() ile kaç yerde kullanıldığını yazdır (2 çıkacak)." },
  55: { instruction: "float f = 3.14f; tanımla. int sonuc = static_cast<int>(f); ile güvenli şekilde int'e çevir ve sonucu yazdır (3 çıkacak, virgülden sonrası atılır)." },
  56: { instruction: "#pragma pack(push, 1) ile hizalamayı kapat. struct Packet { char c; int i; }; tanımla. sizeof(Packet) yazdır. Normalde 8 olan boyut 5'e düşer." },
  57: { instruction: "std::string cmd = \"/item 2799\"; tanımla. if(cmd.find(\"/item\") == 0) koşuluyla komut başlığını kontrol et. Eşleşirse 'Komut' yazdır." },
  58: { instruction: "std::string cmd = \"/item 2799\"; tanımla. cmd.substr(6) ile 6. karakterden sonrasını kes. Sonuç olan '2799' stringini yazdır." },
  59: { instruction: "std::string s = \"2799\"; tanımla. int vnum = std::stoi(s); ile string'i integer'a çevir ve vnum'u yazdır." },
  60: { instruction: "template<typename T> T Max(T a, T b) { return a > b ? a : b; } şablon fonksiyonu yaz. main'de Max(100, 200) çağır ve sonucu yazdır." },

  // GELISMIS SEVIYE 61-100
  61: { instruction: "enum PACKET_HEADER { HEADER_CG_LOGIN=1, HEADER_CG_MOVE=2 }; tanımla. int p = HEADER_CG_LOGIN; yap. if(p == 1) 'Giris Istegi' yazdır." },
  62: { instruction: "int x = 0x12345678; tanımla. Bit kaydırma ve maskeleme ile byte sırasını tersine çevir: ((x>>24)&0xff) | ((x<<8)&0xff0000) | ((x>>8)&0xff00) | ((x<<24)&0xff000000). Sonucu std::hex ile yazdır." },
  63: { instruction: "CManager sınıfı yaz. static CManager* instance; üyesi ve static CManager* Get() metodu olsun. Get() içinde instance yoksa new ile oluştur. void Do() ile 'Calisti' yazdır. main'de CManager::Get()->Do(); çağır." },
  64: { instruction: "void DB() { std::cout << \"Sorgu \"; } fonksiyonu yaz. main'de std::thread t(DB); ile yeni thread başlat. t.join(); ile bitmesini bekle." },
  65: { instruction: "std::mutex m; tanımla. m.lock(); ile kilitle, 'Guvenli' yazdır, m.unlock(); ile kilidi aç. Kilitli alan başka thread tarafından kullanılamaz." },
  66: { instruction: "std::mutex m; tanımla. Süslü parantez bloğu { } içinde std::lock_guard<std::mutex> lock(m); yaz ve 'Otomatik Kilit' yazdır. Blok bitince kilit otomatik açılır." },
  67: { instruction: "x1=0, y1=0, x2=3, y2=4 tanımla. std::sqrt(std::pow(x2-x1,2) + std::pow(y2-y1,2)) formülünü int'e cast edip yazdır. 3-4-5 üçgeni, sonuç 5." },
  68: { instruction: "int menzil = 10; int mesafe = 8; tanımla. if(mesafe <= menzil) kontrolü yap. Hedef menzil içindeyse 'Alan Hasari' yazdır." },
  69: { instruction: "int z1=100, z2=200; tanımla. if(abs(z1-z2) > 50) 'Vuramaz' yazdır, değilse 'Vurur'. Yükseklik farkı 100 olduğu için 'Vuramaz' çıkacak." },
  70: { instruction: "for(int tick=1; tick<=3; tick++) döngüsü yaz. Her turda std::cout << \"Tick\" << tick; yazdır. Çıktı: Tick1Tick2Tick3" },
  71: { instruction: "enum STATE { IDLE, BATTLE, DEAD }; tanımla. int s = BATTLE; yap. if(s == BATTLE) 'Savas Modu' yazdır." },
  72: { instruction: "char data='A'; char key='K'; ile veri ve anahtar tanımla. char enc = data ^ key; ile şifrele. char dec = enc ^ key; ile çöz. dec'i yazdır, orijinal 'A' geri gelecek." },
  73: { instruction: "std::string packet = \"LOGIN\"; tanımla. int sum=0; yap. for(char c : packet) sum += c; ile her karakterin ASCII değerini topla. sum'ı yazdır." },
  74: { instruction: "int timeDiff=200; int requiredDiff=1000; tanımla. if(timeDiff < requiredDiff) ise 'Banlandi' yazdır. 200ms aralıkla saldırı normalde 1000ms olmalı." },
  75: { instruction: "int pool[3] = {1,1,0}; ile havuz oluştur (0=boş slot). if(pool[2] == 0) kontrolü yap. Boşsa pool[2]=1; ile havuzdan al ve 'Havuzdan Alindi' yazdır." },
  76: { instruction: "std::map<int,std::string> cache; tanımla. cache[1] = \"Savasci\"; ile kaydet. if(cache.count(1)) ile var mı kontrol et. Varsa cache[1] yazdır." },
  77: { instruction: "#include <limits> ekle. std::cout << std::numeric_limits<int>::max(); ile int'in alabileceği maksimum değeri yazdır." },
  78: { instruction: "long long yang = 5000000000LL; tanımla (LL soneki zorunlu). std::cout ile yazdır. int ile bu değer taşar, long long ile rahat sığar." },
  79: { instruction: "unsigned int level = 120; tanımla ve yazdır. unsigned tip negatif değer alamaz, bu yüzden tüm aralık pozitif sayılara ayrılır." },
  80: { instruction: "constexpr int MAX_INVENTORY = 9 * 5; tanımla. std::cout << MAX_INVENTORY; yazdır. Çarpma işlemi çalışma zamanında değil, derleme zamanında yapılır." },
  81: { instruction: "std::tuple<int,int> coords(10, 20); oluştur. std::get<0>(coords) ile birinci, std::get<1>(coords) ile ikinci değeri arka arkaya yazdır." },
  82: { instruction: "struct Item { int vnum; bool operator==(const Item& o) const { return vnum == o.vnum; } }; yaz. Item i1{10}, i2{10}; oluştur. if(i1 == i2) 'Ayni' yazdır." },
  83: { instruction: "auto name = \"Sura\"; tanımla (derleyici tipi otomatik belirler). std::cout << name; ile yazdır." },
  84: { instruction: "En üste #define ENABLE_WOLFMAN yaz. #ifdef ENABLE_WOLFMAN ... #endif bloğu içinde 'Lycan Var' yazdır. Makro tanımlıysa blok derlenir." },
  85: { instruction: "using DWORD = unsigned int; (veya typedef) ile tip kısaltması yap. DWORD level = 100; tanımla ve yazdır." },
  86: { instruction: "inline int GetMax(int a, int b) { return a>b?a:b; } fonksiyonu yaz. main'de GetMax(5,10) çağır ve sonucu yazdır." },
  87: { instruction: "int arr[5]; tanımla. std::memset(arr, 0, sizeof(arr)); ile tüm elemanları sıfırla. arr[4]'ü yazdır (0 çıkacak)." },
  88: { instruction: "char src[] = \"DATA\"; ve char dest[5]; tanımla. std::memcpy(dest, src, 5); ile kaynaktan hedefe kopyala. dest'i yazdır." },
  89: { instruction: "union Data { int i; char c; }; tanımla. Data d; d.i = 65; yap. d.c'yi yazdır. int ve char aynı belleği paylaştığı için ASCII 65 = 'A' çıkar." },
  90: { instruction: "int lvl=1; switch(lvl) { case 1: std::cout<<\"A\"; case 2: std::cout<<\"B\"; break; } yaz. case 1'de break yok, bu yüzden case 2 de çalışır: AB çıkar." },
  91: { instruction: "int& GetVal(int& a) { return a; } fonksiyonu yaz. main'de int x=10; GetVal(x) = 20; ile fonksiyon dönüşüne atama yap. x'i yazdır (20 olacak)." },
  92: { instruction: "main() dışına int globalCount = 5; tanımla. main içinde std::cout << globalCount; yazdır. (Gerçek projede extern ile diğer dosyalardan erişilir)" },
  93: { instruction: "vector<int> v = {1,2,3}; oluştur. v.erase(v.begin()+1); ile 2. elemanı (indeks 1) sil. v[1]'i yazdır (artık 3 olacak, çünkü 2 silindi)." },
  94: { instruction: "std::set<int> s; oluştur. s.insert(5); iki kez çağır. s.size() ile boyutu yazdır. Set tekrarı kabul etmez, sonuç 1." },
  95: { instruction: "class A { public: static int id; }; tanımla. Sınıf dışında int A::id = 9; ile değer ver. A::id'yi yazdır." },
  96: { instruction: "int hp = 5; tanımla. assert(hp > 0); ile pozitif olduğunu doğrula. Assert başarılıysa std::cout << \"Sorunsuz\"; yazdır." },
  97: { instruction: "class B { int x=5; public: int Get() const { return x; } }; yaz. const metod objeyi değiştirmez. B b; b.Get() yazdır." },
  98: { instruction: "std::map<int,int> m; m[1]=10; tanımla. for(auto it=m.begin(); it!=m.end(); ++it) döngüsü ile it->second'ı yazdır." },
  99: { instruction: "vector<int> v = {1}; oluştur. for(auto& i : v) i = 2; ile referansla değiştir. v[0]'ı yazdır (2 olacak, & sayesinde asıl değer değişti)." },
  100: { instruction: "std::cout << \"C++ Metin2 Core Uzmani\"; ile bu metni tam olarak yazdır. 100. görev tamamlanacak!" }
};

let fixCount = 0;
for (const [id, fix] of Object.entries(fixes)) {
  const quest = quests.find(q => q.id === parseInt(id));
  if (quest) {
    if (fix.instruction) quest.instruction = fix.instruction;
    fixCount++;
  }
}

// defaultCode'lardaki newline'ları koru
for (let i = 0; i < quests.length; i++) {
  if (quests[i].defaultCode) {
    quests[i].defaultCode = quests[i].defaultCode.replace(/\\n/g, '\n');
  }
}

const finalOutput = "export interface Quest {\n" +
  "  id: number;\n  level: string;\n  title: string;\n  description: string;\n" +
  "  instruction: string;\n  targetOutputText: string;\n  defaultCode: string;\n  successMessage: string;\n" +
  "}\n\nexport const quests: Quest[] = " + JSON.stringify(quests, null, 2) + ";\n";

fs.writeFileSync(filePath, finalOutput, 'utf-8');
console.log(fixCount + ' gorev instruction duzeltildi!');
