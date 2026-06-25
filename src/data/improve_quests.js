const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'quests.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

let jsonStart = fileContent.indexOf('export const quests: Quest[] = [') + 'export const quests: Quest[] = '.length;
let jsonStr = fileContent.substring(jsonStart, fileContent.lastIndexOf(']') + 1);
let quests = JSON.parse(jsonStr);

// Düzeltilecek görevler
const fixes = {
  9: {
    description: "Metin2 sunucusunda LevelUp animasyonu, hasar efekti gibi birçok işlem sadece bir şey yapar ve geriye değer döndürmez. Bu tür fonksiyonlar 'void' ile tanımlanır ve oyundaki görsel efektlerin tetiklenmesinde kullanılır.",
    successMessage: "Void fonksiyon çağırma mantığını kavradın. Metin2'de void fonksiyonlar ekran efektleri, ses çalma gibi işlemlerde kullanılır."
  },
  10: {
    description: "Metin2'de hasar hesaplaması yapılırken, fonksiyonlara dışarıdan veri gönderilmesi gerekir. Örneğin TakeDamage fonksiyonuna hasar miktarı parametre olarak verilir ve bu değer üzerinden işlem yapılır.",
    successMessage: "Parametreli fonksiyon mantığını kavradın. Metin2 sunucusundaki hasar, iyileşme, buff gibi sistemlerin tümü parametreli fonksiyonlarla çalışır."
  },
  11: {
    description: "Metin2'de kritik vuruş şansı hesaplanırken, bir fonksiyon hesaplama yapıp sonucu çağıran yere geri döndürür. Bu sayede hesaplama mantığı tek bir yerde tutulur ve her yerden çağrılabilir.",
    successMessage: "Return ile değer döndüren fonksiyon yazdın. Metin2'deki hasar formülleri, kritik hesaplama gibi sistemlerin tümü bu yapıyla çalışır."
  },
  12: {
    description: "Metin2'de bir mob çağırırken (spawn) bazen sadece VNUM yeterlidir, tür belirtilmezse varsayılan olarak 'Normal' atanır. Default parametreler sayesinde fonksiyona her seferinde tüm değerleri göndermek zorunda kalmazsın.",
    successMessage: "Default parametre kullanımını öğrendin. Metin2 sunucusunda birçok fonksiyon bu yapıyla opsiyonel parametreler alır."
  },
  13: {
    description: "C++'ı oyun geliştirmede bu kadar güçlü yapan şey, bellekle (RAM) doğrudan iletişime geçebilmesidir. Her değişken bellekte bir adreste durur. Bu adresi '&' operatörü ile görebiliriz. Metin2'de karakter HP'si gibi veriler bellekte tutulur.",
    successMessage: "Değişkenlerin bellekteki değerlerine erişmeyi öğrendin. Bu, pointer ve referans kavramlarına geçiş için temel adımdır."
  },
  14: {
    description: "Metin2'de bir iyileşme (Heal) büyüsü yapıldığında, karakterin HP'sinin KOPYAsını değil, ASIL değerini değiştirmemiz gerekir. Referans (&) kullanarak fonksiyona orijinal değişkeni gönderir ve doğrudan değiştiririz.",
    successMessage: "Referans ile orijinal veriyi değiştirmeyi öğrendin. Metin2'deki buff, debuff, iyileşme sistemlerinin tümü bu mantıkla çalışır."
  },
  15: {
    description: "Pointer (İşaretçi), başka bir değişkenin BELLEK ADRESİNİ tutan özel bir değişkendir. Metin2'de LPCHARACTER (Long Pointer to Character) gibi yapılar pointer'dır. Bir karaktere erişmek istediğinde onun adresini tutarsın.",
    successMessage: "Pointer'ın sırrına ilk adımı attın! Metin2 kaynak kodlarında LPCHARACTER, LPITEM gibi yapıların tümü pointer'dır."
  },
  16: {
    description: "Metin2 sunucusu çalışırken yeni mob'lar, eşyalar, efektler oluşturulur. Bunlar derleme zamanında değil, çalışma zamanında (runtime) bellekte yer ayırtılarak oluşturulur. 'new' ile oluşturulup 'delete' ile silinmelidir.",
    successMessage: "Dinamik bellek yönetimini öğrendin. Metin2'de her yeni mob spawn olduğunda new, despawn olduğunda delete çağrılır."
  },
  17: {
    description: "Metin2'de bir karakterin öğrendiği 3 aktif yetenek sabit boyutlu bir dizide tutulur. Diziler aynı türden birden fazla veriyi yan yana saklar ve indeks numarasıyla erişim sağlar.",
    successMessage: "Dizi (Array) kullanımını öğrendin. Metin2'de yetenek slotları, efsun dizileri gibi birçok yapı sabit boyutlu dizilerle tutulur."
  },
  18: {
    description: "Metin2'de her eşyanın bir VNUM'u (kimlik numarası) ve sayısı (count) vardır. Bu verileri gruplamak için struct (yapı) kullanılır. Struct, farklı türdeki verileri tek bir paket altında toplar.",
    successMessage: "Struct ile veri gruplama yaptın. Metin2'deki TItemData, TPlayerTable gibi yapıların tümü struct'tır."
  },
  23: {
    description: "Metin2'de envanterin dolup dolmadığını kontrol etmek hayati önem taşır. Envanter doluyken eşya almaya çalışan oyuncuya 'Envanter dolu' uyarısı gösterilir. Bunun için vektörün o anki eleman sayısını bilmemiz gerekir.",
    successMessage: "Vector boyut kontrolünü öğrendin. Metin2'de envanter dolu kontrolü tam olarak bu size() fonksiyonuyla yapılır."
  },
  39: {
    description: "Metin2'de bir yetenek kullandıktan sonra belirli bir süre (Cooldown) geçmeden tekrar kullanılamaz. Sunucu, son kullanım zamanı ile şimdiki zamanı karşılaştırarak sürenin dolup dolmadığını kontrol eder.",
    successMessage: "Cooldown (bekleme süresi) mantığını kavradın. Metin2'deki yetenek zamanlayıcıları tam olarak bu fark kontrolüyle çalışır."
  },
  40: {
    description: "Metin2'de event (olay) sistemi, fonksiyonları değişken gibi saklar ve gerektiğinde çağırır. Bir timer dolduğunda, bir mob öldüğünde veya bir quest tetiklendiğinde kayıtlı fonksiyonlar otomatik çalıştırılır.",
    successMessage: "Fonksiyon pointer (Callback) kullanımını öğrendin. Metin2 event sistemi tam olarak bu yapıyla çalışır."
  },
  49: {
    description: "Metin2'de oyuncunun envanterinde belirli bir eşyanın olup olmadığını kontrol etmek sık yapılan bir işlemdir. Örneğin bir quest için gereken eşyayı kontrol ederken std::find algoritması kullanılır.",
    successMessage: "std::find ile arama yapabiliyorsun. Metin2'de envanter kontrolü, quest gereksinimleri gibi sistemlerde sürekli kullanılır."
  },
  50: {
    description: "Metin2'de oyuncu sıralamaları (Level, PvP skoru), eşya fiyatları veya hasar listeleri gibi verilerin sıralanması gerekir. std::sort algoritması bu işi son derece hızlı yapar.",
    successMessage: "std::sort ile sıralama yaptın. Metin2'deki ranking tabloları ve envanter sıralama sistemlerinde kullanılır."
  },
  51: {
    description: "Lambda ifadeleri, kod içinde anında küçük fonksiyonlar tanımlamamızı sağlar. Metin2'de bir karakterin ölü olup olmadığını kontrol etmek gibi basit kontrolleri lambda ile yazabiliriz.",
    successMessage: "Lambda ifadesi yazdın. Modern C++ kodlarında event handler, filtre ve kısa kontroller için sürekli kullanılır."
  },
  52: {
    description: "Metin2'de eşyaları değerine göre büyükten küçüğe sıralamak veya oyuncuları seviyeye göre sıralamak için özel sıralama kuralları yazılır. Lambda fonksiyonu ile std::sort'a özel karşılaştırma mantığı veririz.",
    successMessage: "Özel sıralama kuralı (Custom Comparator) yazdın. Metin2'deki market, envanter ve skor tablosu sıralamaları bu mantıkla çalışır."
  },
  53: {
    description: "Metin2 sunucusunda bellek sızıntısı (memory leak) en büyük sorunlardan biridir. std::unique_ptr akıllı işaretçisi, kendisi kapsam dışına çıktığında otomatik olarak belleği siler. Böylece delete yazmayı unutma riski ortadan kalkar.",
    successMessage: "Akıllı işaretçi (Smart Pointer) kullandın. Modern C++ projelerinde memory leak riskini sıfıra indiren en önemli araçtır."
  },
  54: {
    description: "Metin2'de bir eşya birden fazla sistem tarafından referans edilebilir (envanter, ticaret penceresi, veritabanı). std::shared_ptr, kaç yerde kullanıldığını sayar ve son referans silindiğinde belleği otomatik temizler.",
    successMessage: "Paylaşımlı akıllı işaretçi kullandın. Referans sayacı 0 olduğunda obje otomatik silinir, bu sayede bellek sızıntısı önlenir."
  },
  55: {
    description: "C'deki (int)x gibi tehlikeli tip dönüşümleri yerine, C++ güvenli alternatifler sunar. static_cast derleme zamanında tip uyumluluğunu kontrol eder ve hataları erkenden yakalar.",
    successMessage: "Güvenli tip dönüşümü yaptın. Metin2 kodlarında float hasar değerlerini int'e çevirirken static_cast kullanılması önerilir."
  },
  56: {
    description: "Ağ üzerinden gönderilen veri paketlerinde, struct içindeki değişkenler arasına derleyici boşluk (padding) ekler. Bu fazladan byte'lar ağ trafiğini artırır. #pragma pack(1) ile bu boşluklar kapatılır.",
    successMessage: "Paket boyutu optimizasyonu yaptın. Metin2'deki tüm ağ paket struct'ları pragma pack(1) ile sıkıştırılmıştır."
  },
  57: {
    description: "Metin2'de GM (Game Master) komutları '/item 2799' gibi string olarak gelir. Sunucu bu string'i parse ederek hangi komutun çağrıldığını anlamalıdır. string::find() fonksiyonu ile komut başlığı aranır.",
    successMessage: "String içinde arama yaptın. Metin2'deki GM komut sistemi, chat filtresi ve komut işleme tam olarak bu mantıkla çalışır."
  },
  58: {
    description: "GM komutu '/item 2799' geldiğinde, '/item' kısmını ayırıp '2799' parametresini elde etmemiz gerekir. string::substr() fonksiyonu belirli bir konumdan itibaren string'in bir parçasını keser.",
    successMessage: "String parçalama (substring) yaptın. Metin2 komut sisteminde parametre ayıklama bu şekilde yapılır."
  },
  59: {
    description: "GM komutu ile gelen '2799' değeri string formatındadır. Ancak eşya oluşturmak için bu değerin integer'a çevrilmesi gerekir. std::stoi (String to Integer) bu dönüşümü güvenli şekilde yapar.",
    successMessage: "String'i sayıya çevirdin. Metin2'de kullanıcıdan gelen tüm text verileri stoi/atoi ile sayıya dönüştürülür."
  },
  60: {
    description: "Metin2'de hem int hem float hem de string için ayrı Max fonksiyonu yazmak yerine, template (şablon) kullanarak tek bir fonksiyonla tüm tipleri destekleyebiliriz. Bu, kod tekrarını ortadan kaldırır.",
    successMessage: "Template fonksiyon yazdın. Metin2 sunucusunda MIN/MAX makroları yerine modern C++ template kullanımı önerilir."
  },
  80: {
    description: "Metin2'de envanter boyutu (9x5=45 slot) gibi sabit değerler her çalıştırmada yeniden hesaplanmamalıdır. constexpr ile bu hesaplamalar derleme anında yapılır ve çalışma zamanında sıfır maliyet oluşturur.",
    successMessage: "Derleme zamanı sabiti (constexpr) kullandın. Oyun performansı için sabit hesaplamaların compile-time yapılması kritiktir."
  },
  81: {
    description: "Metin2'de bir fonksiyondan hem X hem Y koordinatını aynı anda döndürmek istediğimizde, referans parametreler yerine std::tuple kullanabiliriz. Tuple, birden fazla farklı türde değeri tek bir paket olarak taşır.",
    successMessage: "std::tuple ile çoklu değer döndürdün. Koordinat, RGB renk değeri gibi gruplu verilerde kullanılır."
  },
  82: {
    description: "Metin2'de iki eşyanın aynı olup olmadığını kontrol etmek (stacking, karşılaştırma) için == operatörünü kendi sınıfımız için yeniden tanımlayabiliriz. Bu, kodun daha okunabilir olmasını sağlar.",
    successMessage: "Operatör aşırı yükleme (Operator Overloading) yaptın. Eşya karşılaştırma ve sıralama sistemlerinde kullanılır."
  },
  83: {
    description: "C++11 ile gelen 'auto' anahtar kelimesi, değişkenin tipini otomatik olarak belirler. Uzun template tiplerini yazmak yerine auto kullanarak kodu daha temiz ve okunabilir hale getiririz.",
    successMessage: "auto ile otomatik tip belirleme yaptın. Modern Metin2 kodlarında iterator ve lambda tanımlarında çok kullanılır."
  },
  84: {
    description: "Metin2 kaynak kodlarında Lycan (Wolfman) sınıfı gibi opsiyonel özellikler #ifdef ile koşullu derlemeye tabi tutulur. Bu sayede aynı kod tabanı farklı sunucu konfigürasyonlarında derlenebilir.",
    successMessage: "#ifdef koşullu derleme kullandın. Metin2 source'da ENABLE_WOLFMAN, ENABLE_MOUNT gibi yüzlerce ifdef bloğu bulunur."
  },
  85: {
    description: "Metin2 kodlarında DWORD, BYTE, WORD gibi tipler aslında C++'da yoktur. Bunlar typedef veya using ile tanımlanmış kısaltmalardır. Uzun tip isimlerini kısaltarak kodu daha okunabilir yaparız.",
    successMessage: "Typedef/using ile tip kısaltması yaptın. DWORD=unsigned int, BYTE=unsigned char gibi tanımlar Metin2'nin temelindedir."
  },
  86: {
    description: "Metin2'de GetHP(), GetLevel() gibi sık çağrılan basit fonksiyonlarda, fonksiyon çağrı maliyetini ortadan kaldırmak için inline kullanılır. Derleyici bu fonksiyonları çağırmak yerine kodun içine yapıştırır.",
    successMessage: "Inline fonksiyon yazdın. Metin2'de sürekli çağrılan getter/setter fonksiyonları performans için inline olmalıdır."
  },
  87: {
    description: "Metin2'de bir mob veya eşya oluşturulduğunda struct içinde çöp (garbage) veri kalabilir. memset fonksiyonu ile tüm bellek alanını tek seferde 0'layarak temiz bir başlangıç sağlarız.",
    successMessage: "memset ile bellek sıfırlama yaptın. Metin2'de yeni oluşturulan objelerin ilk işlemi memset ile temizlenmektir."
  },
  88: {
    description: "Metin2 sunucusu ağ üzerinden paket gönderirken, struct verisini bir byte tamponuna (buffer) kopyalar. memcpy fonksiyonu bu kopyalamayı düşük seviyede ve son derece hızlı yapar.",
    successMessage: "memcpy ile bellek kopyalama yaptın. Metin2'deki tüm ağ paketleri send/recv öncesinde memcpy ile tampona aktarılır."
  },
  89: {
    description: "Union, aynı bellek adresini birden fazla veri tipine paylaştırır. Metin2 ağ paketlerinde bazen aynı alan int olarak, bazen char dizisi olarak okunması gerekir. Union bu esnekliği sağlar.",
    successMessage: "Union ile bellek paylaşımı yaptın. Ağ paketlerinde aynı veriyi farklı tiplerle okumak için kullanılır."
  },
  90: {
    description: "Switch-case yapısında break yazılmazsa, eşleşen case'den sonraki case'ler de çalışır (fallthrough). Bu genellikle bir hatadır ancak Metin2 quest sisteminde bazen kasıtlı olarak kullanılır.",
    successMessage: "Switch fallthrough davranışını öğrendin. Metin2 quest ve komut sistemlerinde bazen kasıtlı olarak break konmaz."
  },
  91: {
    description: "Metin2'de bir karakterin belirli bir özelliğine (HP, Level) erişip onu doğrudan değiştirmek için referans döndüren fonksiyonlar kullanılır. Bu sayede fonksiyonun dönüş değeri atama operatörünün sol tarafında kullanılabilir.",
    successMessage: "Referans döndüren fonksiyon yazdın. Metin2'de GetPoint() gibi fonksiyonlar bu yapıyla çalışır."
  },
  92: {
    description: "Metin2 sunucusu onlarca .cpp dosyasından oluşur. Tüm dosyaların aynı global değişkene (örneğin g_bIsServer) erişebilmesi için extern anahtar kelimesi kullanılır. Bir dosyada tanımlanır, diğerlerinde extern ile bildirilir.",
    successMessage: "Extern değişken kullanımını öğrendin. Metin2 Core'daki thecore, g_bAuthServer gibi global değişkenler extern'dir."
  },
  93: {
    description: "Metin2'de bir oyuncu partiden çıktığında veya bir eşya envanterden silindiğinde, vektörün ortasından eleman çıkarmak gerekir. erase() fonksiyonu iterator ile belirtilen konumdaki elemanı siler.",
    successMessage: "Iterator ile eleman silme yaptın. Metin2'de parti listesi, envanter ve mob listelerinden eleman çıkarma bu şekilde yapılır."
  },
  94: {
    description: "Metin2'de bir haritadaki (map) oyuncu listesine aynı oyuncuyu iki kez eklememek gerekir. std::set veri yapısı her elemanı benzersiz tutar ve aynı değeri ikinci kez eklemeye izin vermez.",
    successMessage: "std::set ile benzersiz liste oluşturdun. Metin2'de online oyuncu listesi, map içindeki entity listeleri set ile tutulabilir."
  },
  95: {
    description: "Metin2'de toplam kaç mob oluşturulduğunu saymak istediğimizde, her obje için ayrı sayaç tutmak yerine sınıfın kendisinde tek bir ortak (static) sayaç tutarız. Bu değişken tüm objeler tarafından paylaşılır.",
    successMessage: "Static member kullanımını öğrendin. Metin2'de instance sayaçları, global ID üreticileri static member ile yapılır."
  },
  97: {
    description: "Metin2'de bir karakterin HP'sini okuyan fonksiyonun, yanlışlıkla HP'yi değiştirmemesi gerekir. const metod, fonksiyonun sınıfın verilerini değiştirmeyeceğinin garantisini verir.",
    successMessage: "Const metod yazdın. Metin2'de GetHP(), GetLevel() gibi okuma fonksiyonları güvenlik için const olmalıdır."
  },
  98: {
    description: "Metin2'de bir haritadaki tüm oyuncuları dolaşmak (iterate) gerektiğinde, std::map üzerinde iterator kullanılır. Bu sayede map'teki her anahtar-değer çiftine sırayla erişiriz.",
    successMessage: "Map iterator kullanımını öğrendin. Metin2'de oyuncu listesi, mob listesi ve envanter taramaları iterator ile yapılır."
  },
  99: {
    description: "C++11 ile gelen range-based for döngüsü ve referans (&) kullanarak, bir vektördeki elemanları döngü içinde kalıcı olarak değiştirebiliriz. & olmadan sadece kopya üzerinde işlem yapılır.",
    successMessage: "auto& ile referans döngüsü kullandın. Metin2'de envanter güncelleme, toplu buff uygulama gibi işlemlerde kritik öneme sahiptir."
  },
  100: {
    description: "100 görevlik bu epik yolculukta C++'ın temellerinden ileri seviye konulara, Metin2'nin gerçek mimarisine kadar devasa bir bilgi birikimi edindin. Bu son görevde tüm öğrendiklerini tek bir satırla taçlandır!",
    successMessage: "100. GÖREV TAMAMLANDI! C++ dilini ve Metin2 sunucu mimarisini artık anlıyorsun. Sen gerçek bir EFSANE oldun!"
  }
};

let fixCount = 0;
for (const [id, fix] of Object.entries(fixes)) {
  const quest = quests.find(q => q.id === parseInt(id));
  if (quest) {
    if (fix.description) quest.description = fix.description;
    if (fix.instruction) quest.instruction = fix.instruction;
    if (fix.successMessage) quest.successMessage = fix.successMessage;
    if (fix.targetOutputText) quest.targetOutputText = fix.targetOutputText;
    if (fix.defaultCode) quest.defaultCode = fix.defaultCode;
    fixCount++;
  }
}

// defaultCode icindeki gercek newline'lari koru
for (let i = 0; i < quests.length; i++) {
  if (quests[i].defaultCode) {
    quests[i].defaultCode = quests[i].defaultCode.replace(/\\n/g, '\n');
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
  "export const quests: Quest[] = " + JSON.stringify(quests, null, 2) + ";\n";

fs.writeFileSync(filePath, finalOutput, 'utf-8');
console.log(fixCount + ' gorev duzeltildi!');
