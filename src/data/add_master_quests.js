const fs = require('fs');
const path = require('path');

const q101_120 = [
  // --- MASTERCLASS: MULTITHREADING VE OPTIMIZASYON ---
  { id: 101, level: "MASTER (SOURCE) SEVIYE", title: "Görev 101: std::mutex ve lock_guard", description: "Metin2'de veritabanına aynı anda birden fazla iş parçacığı (thread) yazmaya çalıştığında Race Condition (Veri Yarışı) oluşur. Bunu kilitlerle çözeriz.", instruction: "std::mutex mtx; oluştur. void SafeWrite() içine std::lock_guard<std::mutex> lock(mtx); yazıp 'Guvenli' yazdır.", targetOutputText: "Guvenli", successMessage: "Thread güvenliği sağlandı!", defaultCode: "#include <iostream>\n#include <mutex>\n\nstd::mutex mtx;\n\nvoid SafeWrite() {\n    // lock_guard ekle\n    \n}\n\nint main() {\n    SafeWrite();\n    return 0;\n}" },
  { id: 102, level: "MASTER (SOURCE) SEVIYE", title: "Görev 102: std::atomic", description: "Çoklu thread ortamında sayacı artırmak için mutex yerine atomik işlemler donanım seviyesinde daha hızlıdır.", instruction: "std::atomic<int> onlinePlayers(0); oluştur. onlinePlayers++ yapıp yazdır.", targetOutputText: "1", successMessage: "Lock-free mimariye adım attın.", defaultCode: "#include <iostream>\n#include <atomic>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 103, level: "MASTER (SOURCE) SEVIYE", title: "Görev 103: Asenkron İşlemler (std::async)", description: "Veritabanı sorguları oyunu dondurmamalıdır. Arka planda asenkron çalışmalıdır.", instruction: "std::async(std::launch::async, [](){ return 5; }) ile asenkron değer al (auto fut). fut.get() ile okuyup yazdır.", targetOutputText: "5", successMessage: "Oyun donmadan arka planda islem yapildi.", defaultCode: "#include <iostream>\n#include <future>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 104, level: "MASTER (SOURCE) SEVIYE", title: "Görev 104: Bellek Havuzu (Memory Pool)", description: "Sürekli new/delete yapmak oyunu yavaşlatır. Metin2 'CPool' mimarisi ile belleği baştan tahsis eder.", instruction: "char pool[1024]; int* p = new (pool) int(250); (Placement new) yazıp *p değerini yazdır.", targetOutputText: "250", successMessage: "Placement new kullanarak onceden ayrilmis bellegi kullandın.", defaultCode: "#include <iostream>\n#include <new>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 105, level: "MASTER (SOURCE) SEVIYE", title: "Görev 105: Taşıma Semantiği (std::move)", description: "C++11 ile gelen taşıma semantiği, kopyalama maliyetini sıfıra indirir.", instruction: "std::string s1 = \"Kilic\"; std::string s2 = std::move(s1); yap. Ekrana s2'yi yazdır.", targetOutputText: "Kilic", successMessage: "Veri kopyalanmadı, sahipliği taşındı!", defaultCode: "#include <iostream>\n#include <string>\n#include <utility>\n\nint main() {\n    \n    return 0;\n}" },
  
  // --- MASTERCLASS: NETWORK VE KRIPTOGRAFI ---
  { id: 106, level: "MASTER (SOURCE) SEVIYE", title: "Görev 106: XOR Kriptografi", description: "Metin2'de paketler P2P iletişiminde basit algoritmalarla şifrelenir.", instruction: "char data = 'A'; char key = 0x5; data = data ^ key; yap. Sonra tekrar data = data ^ key; yapıp yazdır.", targetOutputText: "A", successMessage: "Mükemmel. Simetrik şifrelemenin temeli XOR'dur.", defaultCode: "#include <iostream>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 107, level: "MASTER (SOURCE) SEVIYE", title: "Görev 107: Hex Dump", description: "Gelen ağ paketlerinin (Packet Sniffing) incelenmesi için veriyi 16'lık tabanda yazdırırız.", instruction: "int value = 255; std::cout << std::hex << value; ile hex formatinda yazdır.", targetOutputText: "ff", successMessage: "Network paketlerini artik okuyabilirsin.", defaultCode: "#include <iostream>\n#include <iomanip>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 108, level: "MASTER (SOURCE) SEVIYE", title: "Görev 108: Endianness (Byte Sırası)", description: "Intel CPU'lar Little-Endian iken Network Big-Endian çalışır. Metin2 paketlerinde bunu tersine çeviririz.", instruction: "uint32_t net = 0x12345678; uint32_t host = __builtin_bswap32(net); (gcc/clang) kullanarak cevir ve hex yazdir.", targetOutputText: "78563412", successMessage: "hton / ntoh mantigi budur.", defaultCode: "#include <iostream>\n#include <cstdint>\n\nint main() {\n    uint32_t net = 0x12345678;\n    // __builtin_bswap32 kullan ve hex yazdir (std::hex)\n    \n    return 0;\n}" },
  { id: 109, level: "MASTER (SOURCE) SEVIYE", title: "Görev 109: std::function ve Callback", description: "Metin2 event (olay) sisteminde fonksiyon işaretçileri yerine modern std::function kullanılır.", instruction: "std::function<void(int)> action = [](int x){ std::cout << x; }; action(99); cagir.", targetOutputText: "99", successMessage: "Fonksiyonlari obje gibi tasidin.", defaultCode: "#include <iostream>\n#include <functional>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 110, level: "MASTER (SOURCE) SEVIYE", title: "Görev 110: Zaman Ölçümü (Profiling)", description: "Sunucudaki lag(gecikme) sorunlarını bulmak için kodun kaç milisaniyede çalıştığını ölçmeliyiz.", instruction: "std::chrono kullanarak T1 ve T2 oluştur (system_clock::now). Aradaki farki duration_cast ile milisaniye cinsinden yazdır. (Şimdilik 0 yazdıracak).", targetOutputText: "0", successMessage: "Chrono kutuphanesi C++'da zaman olcumunun tek yoludur.", defaultCode: "#include <iostream>\n#include <chrono>\n\nint main() {\n    auto start = std::chrono::system_clock::now();\n    auto end = std::chrono::system_clock::now();\n    // auto diff = std::chrono::duration_cast<std::chrono::milliseconds>(end - start);\n    // std::cout << diff.count();\n    return 0;\n}" },
  
  // --- MASTERCLASS: ARCHITECTURE VE PATTERNS ---
  { id: 111, level: "MASTER (SOURCE) SEVIYE", title: "Görev 111: Singleton Pattern", description: "Oyun dünyasında CHARACTER_MANAGER gibi objelerden hafızada sadece 1 tane bulunmalıdır.", instruction: "class Manager { public: static Manager& Get() { static Manager instance; return instance; } void Print() { std::cout << \"Manager\"; } }; Manager::Get().Print();", targetOutputText: "Manager", successMessage: "Singleton, C++ oyun motorlarinin bel kemigidir.", defaultCode: "#include <iostream>\n\n// Singleton Sinifi\n\nint main() {\n    \n    return 0;\n}" },
  { id: 112, level: "MASTER (SOURCE) SEVIYE", title: "Görev 112: CRTP Pattern", description: "Curiously Recurring Template Pattern: Dinamik Polimorfizm (virtual) kullanmadan statik kalıtım sağlar (Hız kazandırır).", instruction: "template<class T> struct Base { void Do() { static_cast<T*>(this)->Impl(); } }; struct Derived : Base<Derived> { void Impl() { std::cout << \"Hizli\"; } }; Derived d; d.Do();", targetOutputText: "Hizli", successMessage: "CRTP, C++'da performans ustalik belgesidir.", defaultCode: "#include <iostream>\n\n// Kalitim\n\nint main() {\n    \n    return 0;\n}" },
  { id: 113, level: "MASTER (SOURCE) SEVIYE", title: "Görev 113: Sınıf İçi Sınıf (Nested Classes)", description: "Metin2 paket başlıklarını (Header) düzenli tutmak için sınıf içinde sınıf tanımları yapılır.", instruction: "class Packet { public: class Header { public: int id; }; }; Packet::Header h; h.id = 50; yazdir.", targetOutputText: "50", successMessage: "Kapsulleme (Encapsulation) tamamlandi.", defaultCode: "#include <iostream>\n\n// Sınıflar\n\nint main() {\n    \n    return 0;\n}" },
  { id: 114, level: "MASTER (SOURCE) SEVIYE", title: "Görev 114: Union (Ortak Bellek)", description: "Farklı türdeki değişkenleri RAM'de AYNI adreste tutarak paketin boyutunu küçültürüz.", instruction: "union Data { int i; char c[4]; }; Data d; d.i = 65; d.c[0] yazdir. (Little endian'dan dolayi 'A' yazar)", targetOutputText: "A", successMessage: "Ağ paketlerindeki 'karanlık' boyut küçültme numarası.", defaultCode: "#include <iostream>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 115, level: "MASTER (SOURCE) SEVIYE", title: "Görev 115: Extern C", description: "C++ derleyicisinin isimleri bozmasını (Name Mangling) önlemek için C kodlarına entegre olurken extern \"C\" kullanılır (LUA kütüphanesi).", instruction: "extern \"C\" { void LuaScript() { std::cout << \"Lua\"; } } yaz ve main'de cagir.", targetOutputText: "Lua", successMessage: "Metin2'nin C tabanlı LUA diliyle nasıl konuştuğunu öğrendin.", defaultCode: "#include <iostream>\n\n// extern C\n\nint main() {\n    \n    return 0;\n}" },
  { id: 116, level: "MASTER (SOURCE) SEVIYE", title: "Görev 116: Bitset", description: "Büyük miktarda bayrak (flag) saklamak için char dizisi yerine std::bitset kullanırız.", instruction: "std::bitset<8> flags(\"10101010\"); std::cout << flags[3]; yazdir.", targetOutputText: "1", successMessage: "1 bytelık alanda 8 farklı özellik tuttun.", defaultCode: "#include <iostream>\n#include <bitset>\n\nint main() {\n    \n    return 0;\n}" },
  { id: 117, level: "MASTER (SOURCE) SEVIYE", title: "Görev 117: Karşılıklı İçerme (Circular Dependency)", description: "Character sınıfı Item'i, Item sınıfı Character'i içeriyorsa başlık dosyaları sonsuz döngüye girer. Forward Declaration kullanırız.", instruction: "class Item; yaz. (Forward def). Sonra class Character { Item* m_pItem; void Show() { std::cout << \"Tanimli\"; } }; Nesne olusturup Show cagir.", targetOutputText: "Tanimli", successMessage: "Büyük çaplı mimarilerde çokça rastlanır.", defaultCode: "#include <iostream>\n\n// Forward def\n\nint main() {\n    \n    return 0;\n}" },
  { id: 118, level: "MASTER (SOURCE) SEVIYE", title: "Görev 118: constexpr (Derleme Zamanı Sabitleri)", description: "C++11 ile oyundaki sabitlerin hesabını oyun çalışırken değil, OYUN DERLENİRKEN yaparız (Sıfır işlemci yükü).", instruction: "constexpr int GetMaxLevel() { return 120; } main'de bunu cagirip yazdir.", targetOutputText: "120", successMessage: "Kod derlendiği an GetMaxLevel silinip her yerine 120 yazıldı.", defaultCode: "#include <iostream>\n\n// constexpr\n\nint main() {\n    \n    return 0;\n}" },
  { id: 119, level: "MASTER (SOURCE) SEVIYE", title: "Görev 119: Metin2 State Machine", description: "NPC'nin durumunu (Bekliyor, Yürüyor, Ölü) yönetmek için Finite State Machine tasarımı.", instruction: "class State { public: virtual void Execute() = 0; }; class Idle : public State { public: void Execute() override { std::cout << \"Bekliyor\"; } }; State* s = new Idle(); s->Execute();", targetOutputText: "Bekliyor", successMessage: "NPC yapay zekasına giriş yaptın.", defaultCode: "#include <iostream>\n\n// State Pattern\n\nint main() {\n    \n    return 0;\n}" },
  { id: 120, level: "MASTER (SOURCE) SEVIYE", title: "Görev 120: Source Master Mezuniyeti", description: "Metin2 Core altyapısında değişkenlerden, sınıflara, dinamik bellekten C++11 standartlarına, threadlerden ağ programlamaya kadar devasa bir yolu kat ettin.", instruction: "Ekrana tam olarak 'BEN BIR C++ SOURCE MASTERIM' yazdır. Ve destanı tamamla!", targetOutputText: "BEN BIR C++ SOURCE MASTERIM", successMessage: "Sana inanamıyorum... 120 devasa görevi tamamladın. Sen gerçek bir Efsanesin!", defaultCode: "#include <iostream>\n\nint main() {\n    \n    return 0;\n}" }
];

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

// quests string array'i JSON'a cevir
let jsonStart = fileContent.indexOf('export const quests: Quest[] = [') + 'export const quests: Quest[] = '.length;
let jsonStr = fileContent.substring(jsonStart, fileContent.lastIndexOf(']') + 1);

let questsArray = JSON.parse(jsonStr);

// Eski 101-120 sablonunu gercek array ile degistir
for (let i = 0; i < questsArray.length; i++) {
  if (questsArray[i].id >= 101 && questsArray[i].id <= 120) {
    let newQuest = q101_120.find(q => q.id === questsArray[i].id);
    if (newQuest) {
      questsArray[i] = newQuest;
    }
  }
}

// Ciktiya escape edilmis newline (\\n) sorunu olusmamasi icin
// eger string literal \n iceriyorsa bunu gercek \n'ye cevirip stringify sonrasi oyle korumaliyiz.
// Aslinda biz JSON.stringify yapiyoruz, o gercek newline'i \n'ye cevirir.
// O yuzden defaultCode'larin icindeki escape'li karakterleri normal newline'a cevirelim.
for(let i=0; i<questsArray.length; i++) {
  if (questsArray[i].defaultCode) {
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
console.log('Masterclass (101-120) eklendi ve tamamlandi!');
