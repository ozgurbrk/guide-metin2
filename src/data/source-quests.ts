// ============================================================================
//  METIN2 SOURCE AKADEMİSİ — Görev Veritabanı
//  Martysama Server Source üzerinde doğrulanmış görevler.
//  Her dosya yolu ve fonksiyon adı gerçek source'dan alınmıştır.
// ============================================================================

export interface QuestFile {
  path: string;          // Dosya adi (orn: "cmd_gm.cpp")
  description: string;   // Bu dosyada ne yapilacak
}

export interface SourceQuest {
  id: number;
  category: "temel" | "orta" | "zor";
  title: string;
  description: string;
  instruction: string;
  files: QuestFile[];
  hint?: string;
  successMessage: string;
}

export const sourceQuests: SourceQuest[] = [
  // ============================================================================
  //  BÖLÜM 1: TEMEL SEVİYE (20 Görev)
  //  Kodu okuyup bulmayı öğrenmek. Hepsi gerçek dosya ve fonksiyonlara dayalı.
  //  Kolaydan zora doğru sıralanmıştır.
  // ============================================================================
  {
    id: 1,
    category: "temel",
    title: "Görev 1: İlk Komutu Tanı",
    description: "Oyuncu komutları (/dice, /stat gibi) hep aynı yerde tanımlanır. Sistemin kalbi burasıdır.",
    instruction: "cmd_general.cpp dosyasında ACMD(do_dice) fonksiyonunu bulup yapısını inceleyin. ACMD makrosunun size otomatik olarak hangi parametreleri verdiğini anlayın.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_dice) fonksiyonunun gövdesini incele" }
    ],
    hint: "ACMD( anahtar kelimesiyle arama yapın. do_dice satır 2268 civarında.",
    successMessage: "ACMD bir makrodur ve sana otomatik olarak 'ch' (karakter) ve 'argument' (komut metni) verir."
  },
  {
    id: 2,
    category: "temel",
    title: "Görev 2: Komut Nasıl Kaydedilir?",
    description: "Bir ACMD fonksiyonu yazmak yetmez; komutun bir tabloya kaydedilmesi gerekir.",
    instruction: "cmd.cpp içindeki cmd_info[] tablosunu bulun (satır 280 civarı). Bir komutun tabloya nasıl eklendiğini görün: { isim, fonksiyon, subcmd, pozisyon, gm_seviye } yapısını anlayın.",
    files: [
      { path: "cmd.cpp", description: "cmd_info[] komut kayıt tablosunu incele" }
    ],
    hint: "struct command_info cmd_info[] = satırını arayın",
    successMessage: "Her komut: { \"isim\", fonksiyon_ptr, subcmd, min_pozisyon, gm_level } olarak kaydedilir."
  },
  {
    id: 3,
    category: "temel",
    title: "Görev 3: Karakterin Konumu",
    description: "Bir karakterin haritadaki x/y koordinatlarına nasıl erişildiğini öğrenin. CHARACTER sınıfı CEntity'den kalıtım alır.",
    instruction: "entity.h içinde GetX(), GetY() ve GetXYZ() fonksiyonlarını bulun (satır 39-42). Dönüş tiplerinin long olduğuna dikkat edin.",
    files: [
      { path: "entity.h", description: "GetX / GetY / GetXYZ tanımlarını bul" }
    ],
    hint: "GetX( araması yapın; dönüş tipi long'dur, float değil!",
    successMessage: "Koordinatlar long döner. CHARACTER → CEntity kalıtımı sayesinde ch->GetX() doğrudan çalışır."
  },
  {
    id: 4,
    category: "temel",
    title: "Görev 4: Oyuncuya Mesaj Gönderme",
    description: "ChatPacket, printf gibi çalışır: format string + değerler alır. Oyuncunun ekranına mesaj basar.",
    instruction: "shop_manager.cpp veya char_item.cpp içinde ch->ChatPacket(CHAT_TYPE_INFO, ...) kullanan örnekleri bulun. %d ve %s ile format string kullanımını inceleyin.",
    files: [
      { path: "shop_manager.cpp", description: "ChatPacket ile format string kullanımını gör" }
    ],
    hint: "ChatPacket(CHAT_TYPE_INFO araması yapın. shop_manager.cpp satır 351 güzel bir örnek.",
    successMessage: "ChatPacket printf mantığıyla çalışır: ch->ChatPacket(CHAT_TYPE_INFO, \"Fiyat: %d\", deger);"
  },
  {
    id: 5,
    category: "temel",
    title: "Görev 5: Komuta Parametre Aldırma",
    description: "Oyuncunun komuttan sonra yazdığı metin 'argument' değişkeninde tutulur. Bunu parçalara ayırmak gerekir.",
    instruction: "cmd_gm.cpp içinde one_argument kullanan bir komut bulun (satır 55 civarı). Metnin nasıl ayrıştırılıp sayıya çevrildiğini görün.",
    files: [
      { path: "cmd_gm.cpp", description: "one_argument / two_arguments kullanımını incele" }
    ],
    hint: "one_argument( araması yapın. argument → char arg1[256]; one_argument(argument, arg1, sizeof(arg1));",
    successMessage: "argument bir METİNDİR; sayıya çevirmek için atoi(arg1) kullanılır."
  },
  {
    id: 6,
    category: "temel",
    title: "Görev 6: Herkese Duyuru",
    description: "Tek oyuncuya değil, tüm sunucuya sarı uyarı göndermenin yolu vardır.",
    instruction: "cmd.h içinde BroadcastNotice fonksiyonunun prototipini bulun (satır 63). Format string almadığına, sadece const char* buffer aldığına dikkat edin.",
    files: [
      { path: "cmd.h", description: "BroadcastNotice prototipi ve parametreleri" }
    ],
    hint: "extern void BroadcastNotice(const char * c_pszBuf, bool bBigFont=false);",
    successMessage: "BroadcastNotice format almaz; önce snprintf ile buffer hazırlanır, sonra BroadcastNotice(buf) çağrılır."
  },
  {
    id: 7,
    category: "temel",
    title: "Görev 7: PC mi NPC mi?",
    description: "Bir karakterin gerçek oyuncu mu yoksa canavar/NPC mi olduğunu ayırt etmek gerekir.",
    instruction: "char.h satır 713-715'te IsPC(), IsNPC() ve IsMonster() fonksiyonlarını bulun. IsPC'nin GetDesc() kontrolü yaptığına dikkat edin.",
    files: [
      { path: "char.h", description: "IsPC / IsNPC / IsMonster kontrollerini incele" }
    ],
    hint: "IsPC() = GetDesc() ? true : false; → Descriptor (bağlantı) olan = gerçek oyuncu",
    successMessage: "IsPC = bağlantısı olan (gerçek oyuncu), IsNPC = PC olmayan, IsMonster = canavar türü."
  },
  {
    id: 8,
    category: "temel",
    title: "Görev 8: Ölüm Olayı",
    description: "Bir karakter öldüğünde çalışan merkezi fonksiyon; öldüren (killer) bilgisini taşır.",
    instruction: "char_battle.cpp satır 1152'de CHARACTER::Dead fonksiyonunu bulun. pkKiller parametresinin ne taşıdığını ve bImmediateDead'in ne işe yaradığını inceleyin.",
    files: [
      { path: "char_battle.cpp", description: "CHARACTER::Dead(LPCHARACTER pkKiller, bool bImmediateDead)" }
    ],
    hint: "void CHARACTER::Dead(LPCHARACTER pkKiller, bool bImmediateDead) — this = ölen, pkKiller = öldüren",
    successMessage: "Dead içinde ölen = this, öldüren = pkKiller. Kill announce, drop, EXP cezası hep buradan yönetilir."
  },
  {
    id: 9,
    category: "temel",
    title: "Görev 9: Oyuna Giriş Anı",
    description: "Oyuncu oyuna tam girdiğinde çalışan fonksiyon; login bonusu gibi sistemler buraya eklenir.",
    instruction: "input_login.cpp satır 608'de CInputLogin::Entergame fonksiyonunu bulun. ch = d->GetCharacter() satırından sonra karakterin geçerli olduğunu doğrulayın.",
    files: [
      { path: "input_login.cpp", description: "Entergame fonksiyonu ve ch geçerliliği" }
    ],
    hint: "void CInputLogin::Entergame(LPDESC d, const char * data) — ch hazır olduktan sonra login kodu eklenebilir",
    successMessage: "ch = d->GetCharacter() satırından sonra karakter hazırdır; login bonusu, günlük ödül gibi kodlar buraya gelir."
  },
  {
    id: 10,
    category: "temel",
    title: "Görev 10: Oyuncuya Eşya Verme",
    description: "Bir oyuncunun çantasına eşya eklemenin standart yolu.",
    instruction: "char.h satır 1245'te AutoGiveItem fonksiyonunu bulun. DWORD dwItemVnum (eşya numarası) ve BYTE bCount (adet) parametrelerini inceleyin.",
    files: [
      { path: "char.h", description: "AutoGiveItem imzasını incele (satır 1245-1246)" }
    ],
    hint: "LPITEM AutoGiveItem(DWORD dwItemVnum, BYTE bCount=1, int iRarePct = -1, bool bMsg = true);",
    successMessage: "ch->AutoGiveItem(VNUM, ADET) ile eşya verilir. Çanta doluysa yere düşer. İki overload'u var."
  },
  {
    id: 11,
    category: "temel",
    title: "Görev 11: Kalıcı Veri Saklama (Quest Flag)",
    description: "Oyuncuya özel, DB'ye kaydedilen ve girişte kaybolmayan sayı saklama yöntemi.",
    instruction: "char.h satır 1791-1792'de GetQuestFlag ve SetQuestFlag fonksiyonlarını bulun. Parametrenin std::string& olduğuna dikkat edin.",
    files: [
      { path: "char.h", description: "GetQuestFlag / SetQuestFlag imzaları (satır 1791-1792)" }
    ],
    hint: "int GetQuestFlag(const std::string& flag) const; void SetQuestFlag(const std::string& flag, int value);",
    successMessage: "ch->GetQuestFlag(\"daily.last_day\") okur, ch->SetQuestFlag(\"daily.last_day\", 42) kaydeder."
  },
  {
    id: 12,
    category: "temel",
    title: "Görev 12: Sunucu Zamanı",
    description: "Günlük ödül gibi sistemler için sunucunun anlık zamanına ihtiyaç vardır.",
    instruction: "utils.cpp satır 7'de get_global_time() fonksiyonunun tanımını bulun. Dönüş tipinin time_t (saniye) olduğunu doğrulayın. Sonra questlua_horse.cpp satır 233'te gerçek bir kullanım örneği inceleyin.",
    files: [
      { path: "utils.cpp", description: "get_global_time() tanımını incele (satır 7)" },
      { path: "questlua_horse.cpp", description: "get_global_time() gerçek kullanım örneği (satır 233)" }
    ],
    hint: "time_t get_global_time() — saniye cinsinden Unix timestamp döner. 86400 = 1 gün.",
    successMessage: "get_global_time()/86400 her gün 1 artan gün numarası verir; günlük kontrollerde SetQuestFlag ile birlikte kullanılır."
  },
  {
    id: 13,
    category: "temel",
    title: "Görev 13: Geçici Efekt (Affect/Buff)",
    description: "Süreli buff, iksir, kostüm bonusu gibi her geçici etki bu fonksiyonla verilir.",
    instruction: "char.h satır 1066'da AddAffect fonksiyonunu bulun. 8 parametresinin sırasını inceleyin: tip, hangiStat, değer, flag, süre, spCost, override, isCube.",
    files: [
      { path: "char.h", description: "AddAffect imzasını incele (satır 1066)" },
      { path: "char_affect.cpp", description: "AddAffect'in gerçek bir kullanımını gör" }
    ],
    hint: "bool AddAffect(DWORD dwType, BYTE bApplyOn, long lApplyValue, DWORD dwFlag, long lDuration, long lSPCost, bool bOverride, bool IsCube = false);",
    successMessage: "AddAffect(tip, APPLY_xxx, değer, 0, süre_saniye, 0, true) ile süreli buff verilir."
  },
  {
    id: 14,
    category: "temel",
    title: "Görev 14: Stat Tipleri (POINT_*)",
    description: "Hangi statın değişeceğini POINT_ sabitleri belirler. Bunlar tek bir enum'da tanımlıdır.",
    instruction: "common/length.h içinde POINT_NONE'dan başlayan enum'u bulun. POINT_MOV_SPEED, POINT_ATT_GRADE, POINT_HP gibi sabitleri inceleyin.",
    files: [
      { path: "common/length.h", description: "POINT_* sabitlerinin enum tanımını incele" }
    ],
    hint: "POINT_MAX_HP, POINT_MOV_SPEED, POINT_ATT_SPEED, POINT_HP gibi sabitleri arayın",
    successMessage: "POINT_MOV_SPEED=hareket hızı, POINT_ATT_GRADE=saldırı gücü, POINT_HP=anlık can."
  },
  {
    id: 15,
    category: "temel",
    title: "Görev 15: Can/Para Değiştirme (PointChange)",
    description: "Can, mana, yang gibi değerleri güvenli şekilde değiştiren ve client'a bildiren fonksiyon.",
    instruction: "char.h satır 826'da PointChange imzasını bulun. Sonra char_item.cpp'de POINT_GOLD ile kullanıldığı bir yer arayın.",
    files: [
      { path: "char.h", description: "PointChange imzasını incele (satır 826)" },
      { path: "char_item.cpp", description: "PointChange(POINT_GOLD, ...) kullanımı" }
    ],
    hint: "void PointChange(BYTE type, long long amount, bool bAmount = false, bool bBroadcast = false);",
    successMessage: "PointChange ekleme/çıkarma yapar ve client ekranını günceller. SetHP'den daha güvenlidir."
  },
  {
    id: 16,
    category: "temel",
    title: "Görev 16: Eşya Kullanımını Yakalama",
    description: "Oyuncu bir eşyaya çift tıkladığında çalışan merkezi fonksiyon; özel kutu/eşya sistemleri burada.",
    instruction: "char_item.cpp satır 1630'da CHARACTER::UseItemEx fonksiyonunu bulun. item->GetVnum() ile VNUM kontrolünü ve switch/case yapısını inceleyin.",
    files: [
      { path: "char_item.cpp", description: "UseItemEx fonksiyonu ve item->GetVnum() kontrolü" }
    ],
    hint: "bool CHARACTER::UseItemEx(LPITEM item, TItemPos DestCell) — item->GetType() ile eşya türü belirlenir",
    successMessage: "UseItemEx içinde item->GetVnum() veya GetType() ile özel eşyanı yakalayıp kendi kodunu çalıştırırsın."
  },
  {
    id: 17,
    category: "temel",
    title: "Görev 17: Güvenli Rastgele Sayı",
    description: "Sunucuda rand() yerine kendi güvenli random fonksiyonu kullanılır.",
    instruction: "char_item.cpp veya battle.cpp içinde number(min, max) kullanan bir yer bulun. Fonksiyonun nasıl çağrıldığını inceleyin.",
    files: [
      { path: "char_item.cpp", description: "number(min, max) kullanımını incele" }
    ],
    hint: "number( araması yapın — number(1, 100) = 1-100 arası rastgele sayı",
    successMessage: "number(min, max) belirtilen aralıkta güvenli rastgele sayı verir; drop/ödül sistemlerinin temeli."
  },
  {
    id: 18,
    category: "temel",
    title: "Görev 18: Zamanlı Event (Timer)",
    description: "Kendi kendine, belirli aralıklarla tekrar çalışan kod yapısı. Zehir, regen, dungeon gibi sistemler bununla çalışır.",
    instruction: "char_resist.cpp satır 41'de EVENTFUNC(poison_event) fonksiyonunu bulun. Dönüş değerinin pozitif olunca tekrar çalıştığını, 0 olunca durduğunu inceleyin.",
    files: [
      { path: "char_resist.cpp", description: "EVENTFUNC(poison_event) gövdesi ve event_create çağrısı" }
    ],
    hint: "EVENTFUNC(poison_event) — return PASSES_PER_SEC(1); = 1 saniye sonra tekrar çalış, return 0; = dur",
    successMessage: "EVENTFUNC pozitif değer dönerse tekrar çalışır (timer), 0 dönerse event durur."
  },
  {
    id: 19,
    category: "temel",
    title: "Görev 19: Takılabilir Slotlar (Wear)",
    description: "Karakterin üzerine takabileceği her eşya türü bir slot enum'unda tanımlıdır.",
    instruction: "common/length.h satır 134'te enum EWearPositions yapısını bulun. WEAR_BODY, WEAR_HEAD, WEAR_WEAPON gibi slotları inceleyin.",
    files: [
      { path: "common/length.h", description: "EWearPositions enum'unu incele (satır 134)" }
    ],
    hint: "EWearPositions veya WEAR_BODY araması",
    successMessage: "Yeni bir takı slotu eklemek için bu enum'a yeni WEAR_* eklenir. Ama client tarafında da UI desteği gerekir!"
  },
  {
    id: 20,
    category: "temel",
    title: "Görev 20: Efsun Tipleri (APPLY_*)",
    description: "Eşyalardaki tüm bonuslar (efsunlar) tek bir enum'da tanımlıdır.",
    instruction: "common/length.h'de APPLY_MAX_HP (satır 387), APPLY_MOV_SPEED (satır 394), APPLY_ATTBONUS_MONSTER (satır 449) gibi sabitleri bulun.",
    files: [
      { path: "common/length.h", description: "APPLY_* efsun tipleri enum'unu incele" }
    ],
    hint: "APPLY_ATTBONUS araması yapın — çok sayıda bonus türü göreceksiniz",
    successMessage: "Yeni efsun eklemek için bu enum'a yeni APPLY_* eklenir; sonra battle.cpp'de hasar hesabına ve client'a bağlanır."
  },

  // ============================================================================
  //  BÖLÜM 2: ORTA SEVİYE (40 Görev)
  //  Sistem yazma/değiştirme görevleri. Source doğrulaması yapılmıştır.
  // ============================================================================
  {
    id: 21,
    category: "orta",
    title: "Görev 21: /heal Komutu Yaz",
    description: "Oyuncuya yazdığı kadar can veren bir komut yazın.",
    instruction: "Yeni bir ACMD(do_heal) yazın: one_argument ile miktarı alın, atoi ile sayıya çevirin, PointChange(POINT_HP, miktar) uygulayın. Sonra cmd.cpp'de ACMD prototipini ve cmd_info tablosuna kaydı ekleyin.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_heal) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "ACMD(do_heal) prototipi + cmd_info tablosuna kayıt" }
    ],
    hint: "atoi(arg1) ile metni sayıya çevirin; PointChange(POINT_HP, miktar) SetHP'den daha güvenlidir",
    successMessage: "PointChange(POINT_HP, ...) canı ekler ve client ekranını günceller."
  },
  {
    id: 22,
    category: "orta",
    title: "Görev 22: /addgold Komutu Yaz",
    description: "Oyuncuya parametreyle belirtilen miktarda yang veren komut.",
    instruction: "do_addgold yazın: argument'ı one_argument ile alıp atoi ile çevirip PointChange(POINT_GOLD, miktar) uygulayın. GM yetkisi ile kaydedin.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_addgold) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu GM_LOW_WIZARD yetkisiyle kaydet" }
    ],
    hint: "PointChange(POINT_GOLD, ...) kullanımını char_item.cpp'de örnek olarak görebilirsiniz",
    successMessage: "Para işlemleri için PointChange(POINT_GOLD, miktar) kullanılır."
  },
  {
    id: 23,
    category: "orta",
    title: "Görev 23: /addexp Komutu Yaz",
    description: "Oyuncuya tecrübe puanı veren komut.",
    instruction: "do_addexp yazın: one_argument ile miktarı alın, PointChange(POINT_EXP, miktar) uygulayın.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_addexp) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu kaydet" }
    ],
    hint: "PointChange(POINT_EXP, ...) — yeterince artınca sistem otomatik level atlatır",
    successMessage: "POINT_EXP yeterince artınca char.cpp'deki level mantığı devreye girer."
  },
  {
    id: 24,
    category: "orta",
    title: "Görev 24: /myinfo Komutu Yaz",
    description: "Oyuncuya kendi level, exp ve yang bilgisini gösteren komut.",
    instruction: "do_myinfo yazın: GetLevel() (int → %d), GetExp() (DWORD → %u), GetGold() (long long → %lld) değerlerini ChatPacket ile gösterin.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_myinfo) fonksiyonunu yaz" },
      { path: "char.h", description: "GetLevel (sat.725) / GetExp (sat.732) / GetGold (sat.1289) imzalarını teyit et" }
    ],
    hint: "GetLevel()→int→%d, GetExp()→DWORD→%u, GetGold()→long long→%lld",
    successMessage: "Her fonksiyonun dönüş tipi farklı; format belirteci yanlış olursa çöp değer basılır."
  },
  {
    id: 25,
    category: "orta",
    title: "Görev 25: /home Komutu Yaz",
    description: "Oyuncuyu doğum/başlangıç köyüne ışınlayan komut.",
    instruction: "do_home yazın: ch->GoHome() çağırın. GoHome() char.h satır 2046'da tanımlıdır.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_home) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu kaydet" }
    ],
    hint: "GoHome() oyuncuyu imparatorluğunun başlangıç köyüne ışınlar",
    successMessage: "GoHome() tek satırlık bir çağrıdır; arka planda WarpSet kullanır."
  },
  {
    id: 26,
    category: "orta",
    title: "Görev 26: /speed Buff Komutu Yaz",
    description: "60 saniyeliğine hareket hızı veren süreli buff komutu.",
    instruction: "do_speed yazın: AddAffect ile POINT_MOV_SPEED'e +50, süre 60 saniye verin. AddAffect imzası char.h satır 1066'dadır.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_speed) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu kaydet" }
    ],
    hint: "ch->AddAffect(AFFECT_CUSTOM, POINT_MOV_SPEED, 50, 0, 60, 0, true) — lDuration=60 saniye",
    successMessage: "AddAffect lDuration parametresi saniye cinsindendir; süre bitince efekt otomatik kalkar."
  },
  {
    id: 27,
    category: "orta",
    title: "Görev 27: /removebuff Komutu Yaz",
    description: "Belirli bir affect tipini oyuncudan kaldıran komut.",
    instruction: "do_removebuff yazın: ch->RemoveAffect(dwType) çağırın. dwType, Görev 26'da AddAffect'e verdiğiniz ilk parametre ile aynı olmalı.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_removebuff) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu kaydet" }
    ],
    hint: "RemoveAffect(DWORD dwType) — char.h satır 1068. Verirken kullandığınız tip ile aynı olmalı.",
    successMessage: "RemoveAffect verilen dwType ile eşleşen affect'i bulup kaldırır."
  },
  {
    id: 28,
    category: "orta",
    title: "Görev 28: PvP Kill Announce Sistemi",
    description: "Bir oyuncu başka oyuncuyu öldürünce tüm sunucuya duyuru.",
    instruction: "CHARACTER::Dead (char_battle.cpp sat.1152) içinde, pkKiller && pkKiller->IsPC() && this->IsPC() kontrolü yapın. snprintf ile mesaj hazırlayıp BroadcastNotice(buf) çağırın.",
    files: [
      { path: "char_battle.cpp", description: "Dead fonksiyonu içine PvP kill duyurusu ekle" }
    ],
    hint: "this->GetName() = ölen, pkKiller->GetName() = öldüren. BroadcastNotice format almaz, önce buffer hazırlayın.",
    successMessage: "char buf[256]; snprintf(buf, sizeof(buf), \"%s killed %s!\", pkKiller->GetName(), GetName()); BroadcastNotice(buf);"
  },
  {
    id: 29,
    category: "orta",
    title: "Görev 29: Boss Öldürme Duyurusu",
    description: "Bir oyuncu boss öldürdüğünde özel duyuru yapılsın.",
    instruction: "CHARACTER::Dead içinde this->GetMobRank() >= MOB_RANK_BOSS kontrolü yapın (IsBoss() bu source'da yoktur!). pkKiller IsPC ise BroadcastNotice ile duyuru yapın.",
    files: [
      { path: "char_battle.cpp", description: "Dead içinde boss rank kontrolü ekle" },
      { path: "char.h", description: "GetMobRank() (sat.786) imzasını teyit et" }
    ],
    hint: "GetMobRank() >= MOB_RANK_BOSS — MOB_RANK_BOSS common/length.h satır 352'de tanımlı",
    successMessage: "IsBoss() bu source'da yoktur; GetMobRank() ile rank karşılaştırması yapılır."
  },
  {
    id: 30,
    category: "orta",
    title: "Görev 30: Basit Login Bonusu",
    description: "Oyuncu oyuna girince otomatik hediye eşya alsın.",
    instruction: "CInputLogin::Entergame (input_login.cpp sat.608) içinde, ch geçerli olduktan sonra ch->AutoGiveItem(VNUM, ADET) ve bir hoşgeldin ChatPacket ekleyin.",
    files: [
      { path: "input_login.cpp", description: "Entergame sonuna bonus kodunu ekle" }
    ],
    hint: "Kodu fonksiyonun sonlarına, mevcut işlemlerden sonra koyun",
    successMessage: "AutoGiveItem(VNUM, ADET) ile her giriş bir hediye verir. Henüz limitsiz — Görev 31'de sınırlandırılacak."
  },
  {
    id: 31,
    category: "orta",
    title: "Görev 31: Günde 1 Kez Login Bonusu",
    description: "Login bonusunu günde yalnızca bir kez verilecek şekilde sınırlandırın.",
    instruction: "get_global_time()/86400 ile gün numarasını hesaplayın; GetQuestFlag(\"daily.last_day\") ile son verilen günü okuyup karşılaştırın; verince SetQuestFlag ile bugünü kaydedin.",
    files: [
      { path: "input_login.cpp", description: "Login bonusunu flag kontrolüyle sarmala" }
    ],
    hint: "SetQuestFlag'i unutursanız oyuncu her girişte hediye alır!",
    successMessage: "get_global_time()/86400 her gün artan bir sayı verir; karşılaştırma bununla yapılır."
  },
  {
    id: 32,
    category: "orta",
    title: "Görev 32: Streak (Üst Üste Giriş) Sistemi",
    description: "Üst üste giren oyuncunun serisini sayın, gün atlarsa sıfırlayın.",
    instruction: "İki quest flag tutun: 'streak.last_day' ve 'streak.count'. sonGun == bugun-1 ise count++, sonGun == bugun ise zaten işlendi, değilse count=1. Her durumda flagleri güncelleyin.",
    files: [
      { path: "input_login.cpp", description: "İki flag ile streak mantığını kur" }
    ],
    hint: "sonGun == bugun durumunu en başta eleyin (bugün zaten işlendi, tekrar verme)",
    successMessage: "İki flag birlikte yönetildiğinde 'dün girdi mi' kontrolü streak'i mümkün kılar."
  },
  {
    id: 33,
    category: "orta",
    title: "Görev 33: Tek Seferlik İlk Giriş Hediyesi",
    description: "Sadece karakterin hayatında bir kez verilen özel bir hediye.",
    instruction: "Entergame'de GetQuestFlag(\"first_login.done\") == 0 ise AutoGiveItem ile hediye verip SetQuestFlag(\"first_login.done\", 1) yapın.",
    files: [
      { path: "input_login.cpp", description: "İlk giriş kontrolü ve hediye" }
    ],
    hint: "GetQuestFlag hiç set edilmemişse 0 döner; bunu 'henüz almadı' olarak kullanın",
    successMessage: "Tek seferlik kontrol: flag 0 → ver → 1 yap. Bir daha 0 olmayacağı için tekrar çalışmaz."
  },
  {
    id: 34,
    category: "orta",
    title: "Görev 34: Sürpriz Kutu Item'ı",
    description: "Çift tıklanınca rastgele yang veren özel eşya.",
    instruction: "UseItemEx (char_item.cpp sat.1630) içinde item->GetVnum() == KUTU_VNUM ise: number(1000, 50000) ile yang hesaplayın, ch->GiveGold(miktar) uygulayın, item->SetCount(item->GetCount()-1) ile 1 azaltın.",
    files: [
      { path: "char_item.cpp", description: "UseItemEx içine VNUM kontrolü ekle" }
    ],
    hint: "SetCount ile eşyayı azaltmazsanız kutu sonsuz açılır! GiveGold char.h sat.1293.",
    successMessage: "number(min,max) güvenli random verir; GiveGold yang ekler; SetCount eşyayı tüketir."
  },
  {
    id: 35,
    category: "orta",
    title: "Görev 35: Buff İksiri Item'ı",
    description: "Kullanılınca süreli saldırı gücü buff'ı veren iksir.",
    instruction: "UseItemEx içinde özel VNUM yakalayıp AddAffect ile POINT_ATT_GRADE'e +30 bonus, 120 saniye süre verin. item->SetCount(item->GetCount()-1) ile tüketin.",
    files: [
      { path: "char_item.cpp", description: "UseItemEx içinde iksir efektini uygula" }
    ],
    hint: "AddAffect(AFFECT_CUSTOM, APPLY_ATT_GRADE_BONUS, 30, 0, 120, 0, true) + SetCount",
    successMessage: "İksir = UseItemEx yakalama + AddAffect + eşya tüketimi kombinasyonudur."
  },
  {
    id: 36,
    category: "orta",
    title: "Görev 36: Işınlanma Taşı Item'ı",
    description: "Kullanılınca oyuncuyu belirli bir koordinata ışınlayan eşya.",
    instruction: "UseItemEx içinde özel VNUM yakalayıp ch->WarpSet(x, y, mapIndex) ile ışınlayın. WarpSet char.h satır 933'te tanımlıdır. Eşyayı tüketin.",
    files: [
      { path: "char_item.cpp", description: "UseItemEx içinde WarpSet kullan" },
      { path: "char.h", description: "WarpSet(long x, long y, long lRealMapIndex = 0) imzası (sat.933)" }
    ],
    hint: "WarpSet(468800, 364800, 1) — koordinatlar piksel cinsindendir (cell×100)",
    successMessage: "WarpSet oyuncuyu hedef haritaya/koordinata taşır; koordinat birimi cell×100."
  },
  {
    id: 37,
    category: "orta",
    title: "Görev 37: EXP Kitabı Item'ı",
    description: "Kullanılınca sabit miktarda tecrübe veren eşya.",
    instruction: "UseItemEx içinde özel VNUM yakalayıp PointChange(POINT_EXP, miktar) uygulayın ve item->SetCount(item->GetCount()-1) ile 1 azaltın.",
    files: [
      { path: "char_item.cpp", description: "UseItemEx içinde EXP ver ve eşya tüket" }
    ],
    hint: "PointChange(POINT_EXP, 500000) + SetCount(...-1)",
    successMessage: "PointChange(POINT_EXP) yeterli miktarda verilirse otomatik level atlatır."
  },
  {
    id: 38,
    category: "orta",
    title: "Görev 38: 'Bosslara Karşı Güçlü' Efsunu Ekle",
    description: "Source'da olmayan yeni bir APPLY_ATTBONUS_BOSS efsunu ekleyin.",
    instruction: "1) common/length.h APPLY enum'una yeni APPLY_ATTBONUS_BOSS ekleyin. 2) battle.cpp CalcAttBonus (sat.306) içinde, mevcut IsRaceFlag zincirinin DIŞINDA, pkVictim->GetMobRank() >= MOB_RANK_BOSS kontrolü ile iAtk += (iAtk * pkAttacker->GetPoint(POINT_ATTBONUS_BOSS)) / 100 ekleyin.",
    files: [
      { path: "common/length.h", description: "APPLY_ATTBONUS_BOSS sabitini enum'a ekle" },
      { path: "battle.cpp", description: "CalcAttBonus'ta GetMobRank kontrolü ile bonus uygula (sat.~306)" }
    ],
    hint: "IsBoss() bu source'da YOKTUR! GetMobRank() >= MOB_RANK_BOSS kullanın. Bonusu IsRaceFlag else-if zincirinin dışına koyun.",
    successMessage: "Boss bonusu IsRaceFlag'ten bağımsızdır; GetMobRank ile rank kontrolü yapılır."
  },
  {
    id: 39,
    category: "orta",
    title: "Görev 39: 'Metinlere Karşı Güçlü' Efsunu Ekle",
    description: "Source'da olmayan yeni bir APPLY_ATTBONUS_METIN efsunu ekleyin.",
    instruction: "1) common/length.h'ye APPLY_ATTBONUS_METIN ekleyin. 2) battle.cpp CalcAttBonus içinde, pkVictim->IsNPC() bloğunun İÇİNDE pkVictim->IsStone() ise iAtk += (iAtk * pkAttacker->GetPoint(POINT_ATTBONUS_METIN)) / 100 ekleyin.",
    files: [
      { path: "common/length.h", description: "APPLY_ATTBONUS_METIN sabitini enum'a ekle" },
      { path: "battle.cpp", description: "CalcAttBonus IsNPC bloğunda IsStone kontrolü ekle" }
    ],
    hint: "IsStone() = m_bCharType == CHAR_TYPE_STONE (char.h sat.716). IsRaceFlag DEĞİLDİR, ayrı bir if ile ekleyin.",
    successMessage: "IsStone metin taşlarını ayırt eder; IsRaceFlag zincirinden bağımsız bir if gerekir."
  },
  {
    id: 40,
    category: "orta",
    title: "Görev 40: Hasar Bonusu Hesabını Çöz",
    description: "Efsunların hasara nasıl eklendiğini tam olarak anlayın (Görev 38-39 için temel bilgi).",
    instruction: "battle.cpp CalcAttBonus fonksiyonunu (sat.306) satır satır okuyun: 1) IsNPC bloğunda IsRaceFlag ile ırk bonusları, 2) IsPC bloğunda GetJob ile sınıf bonusları, 3) POINT_ATTBONUS_MONSTER her NPC'ye uygulanır.",
    files: [
      { path: "battle.cpp", description: "CalcAttBonus fonksiyonunu baştan sona oku (sat.306)" }
    ],
    hint: "iAtk += (iAtk * GetPoint(POINT_ATTBONUS_INSECT)) / 100 — bonus yüzdesel olarak eklenir",
    successMessage: "Bonus yüzdeseldir: iAtk * bonus / 100 olarak saldırıya eklenir. MONSTER bonusu tüm NPC'lere uygulanır."
  },
  {
    id: 41,
    category: "orta",
    title: "Görev 41: Otomatik Duyuru Event'i",
    description: "Belirli aralıklarla kendiliğinden tekrarlayan sunucu duyurusu.",
    instruction: "Bir EVENTFUNC yazın: BroadcastNotice ile mesaj basıp return PASSES_PER_SEC(300) ile 5dk sonra tekrar çalışın. event_create ile başlatın. Şablon: cmd_general.cpp sat.172 (shutdown_event).",
    files: [
      { path: "cmd_general.cpp", description: "EVENTFUNC + başlatma komutu yaz. shutdown_event (sat.172) şablonu." }
    ],
    hint: "PASSES_PER_SEC(300) = 5 dakika. return 0; durur, return PASSES_PER_SEC(n); tekrar eder.",
    successMessage: "EVENTFUNC pozitif değer dönerse tekrar çalışır, 0 dönerse event silinir."
  },
  {
    id: 42,
    category: "orta",
    title: "Görev 42: Öldürene Geçici Buff",
    description: "PvP'de rakip öldüren oyuncuya kısa süreli ödül buff'ı.",
    instruction: "CHARACTER::Dead içinde, pkKiller && pkKiller->IsPC() && this->IsPC() ise pkKiller->AddAffect ile süreli bonus verin.",
    files: [
      { path: "char_battle.cpp", description: "Dead içinde pkKiller'a AddAffect uygula" }
    ],
    hint: "Buff'ı this'e (ölen) değil pkKiller'a (öldüren) verin!",
    successMessage: "AddAffect öldürene uygulanır; Dead içinde pkKiller NULL olabilir, kontrol şart."
  },
  {
    id: 43,
    category: "orta",
    title: "Görev 43: Boss Öldürene Ödül Kutusu",
    description: "Boss öldüren oyuncuya otomatik bir ödül eşyası verilsin.",
    instruction: "Dead içinde this->GetMobRank() >= MOB_RANK_BOSS ve pkKiller && pkKiller->IsPC() ise pkKiller->AutoGiveItem(VNUM, 1) ile ödül verin.",
    files: [
      { path: "char_battle.cpp", description: "Dead içinde boss ödülünü ekle" }
    ],
    hint: "IsBoss() bu source'da yok! GetMobRank() >= MOB_RANK_BOSS kullanın. Ödülü pkKiller'a verin.",
    successMessage: "Boss yakalama (GetMobRank) + öldürene ödül (AutoGiveItem) klasik bir kombinasyon."
  },
  {
    id: 44,
    category: "orta",
    title: "Görev 44: Metin Kırma Sayacı",
    description: "Oyuncunun kırdığı metin taşı sayısını kalıcı olarak sayın.",
    instruction: "Dead içinde this->IsStone() (char.h sat.716) ve pkKiller->IsPC() ise: int eski = pkKiller->GetQuestFlag(\"metin.count\"); pkKiller->SetQuestFlag(\"metin.count\", eski+1);",
    files: [
      { path: "char_battle.cpp", description: "Dead içinde metin sayacını artır" }
    ],
    hint: "IsStone() = (m_bCharType == CHAR_TYPE_STONE). Önce GetQuestFlag ile oku, +1 yapıp yaz.",
    successMessage: "Sayaç quest flag'te tutulur ve oturumlar arası korunur."
  },
  {
    id: 45,
    category: "orta",
    title: "Görev 45: Mob Kill Milestone Ödülü",
    description: "Belirli sayıda canavar öldüren oyuncuya ödül (örn. her 100 mobda).",
    instruction: "Dead içinde pkKiller->IsPC() && this->IsNPC() ise sayacı artırın. sayac % 100 == 0 olduğunda AutoGiveItem ile ödül verin.",
    files: [
      { path: "char_battle.cpp", description: "Dead içinde sayaç + milestone kontrolü" }
    ],
    hint: "if (sayac % 100 == 0) ödül ver; modül operatörü milestone'lar için idealdir",
    successMessage: "Mob = IsNPC, oyuncu = IsPC; sayaç quest flag'te tutulur."
  },
  {
    id: 46,
    category: "orta",
    title: "Görev 46: Eşya Şartlı Giriş Bonusu",
    description: "Sadece belirli bir eşyaya sahip oyunculara giriş bonusu.",
    instruction: "Entergame'de ch->CountSpecifyItem(VNUM) > 0 ise bonus verin. CountSpecifyItem char.h satır 1259'da tanımlıdır.",
    files: [
      { path: "input_login.cpp", description: "CountSpecifyItem ile şart kontrolü" },
      { path: "char.h", description: "CountSpecifyItem(DWORD vnum) imzası (sat.1259)" }
    ],
    hint: "CountSpecifyItem(vnum) oyuncunun envanterindeki o eşyanın toplam adedini döner",
    successMessage: "CountSpecifyItem envanterdeki belirli eşyanın sayısını verir; 0 ise yok demektir."
  },
  {
    id: 47,
    category: "orta",
    title: "Görev 47: Anahtarla Açılan Kutu",
    description: "Kutuyu açmak için envanterde bir anahtar eşyası gereksin.",
    instruction: "UseItemEx kutu kodunda: 1) CountSpecifyItem(ANAHTAR_VNUM) > 0 kontrolü, 2) Varsa → ödül ver + RemoveSpecifyItem(ANAHTAR_VNUM, 1) + kutuyu tüket, 3) Yoksa → ChatPacket ile uyarı.",
    files: [
      { path: "char_item.cpp", description: "Kutu kodunda anahtar şartı ekle" }
    ],
    hint: "RemoveSpecifyItem(vnum, count) char.h sat.1260. Hem anahtarı hem kutuyu tüketin!",
    successMessage: "CountSpecifyItem kontrol eder, RemoveSpecifyItem tüketir. İkisini birlikte kullanın."
  },
  {
    id: 48,
    category: "orta",
    title: "Görev 48: Komut Cooldown'u (Bekleme Süresi)",
    description: "Bir komutu belirli süre boyunca tekrar kullanılamaz yapın.",
    instruction: "Komut içinde: int now = get_global_time(); int last = ch->GetQuestFlag(\"cmd.heal_cd\"); if (now - last < 30) { uyarı; return; } else { işlem yap; ch->SetQuestFlag(\"cmd.heal_cd\", now); }",
    files: [
      { path: "cmd_general.cpp", description: "Komut başına cooldown kontrolü ekle" }
    ],
    hint: "30 = 30 saniye bekleme. get_global_time() Unix timestamp (saniye) döner.",
    successMessage: "Cooldown = get_global_time() + quest flag karşılaştırması. Flag'i güncellemeyi unutmayın!"
  },
  {
    id: 49,
    category: "orta",
    title: "Görev 49: EXP Tablosunu İncele",
    description: "Oyuncuların ulaşabileceği en yüksek seviyenin ve exp tablosunun nasıl belirlendiğini inceleyin.",
    instruction: "constants.cpp satır 58'de exp_table_common[PLAYER_MAX_LEVEL_CONST + 1] dizisini inceleyin. Her seviyenin gerektirdiği toplam exp'i görün. PLAYER_MAX_LEVEL_CONST common/length.h sat.56'da 250 olarak tanımlı.",
    files: [
      { path: "constants.cpp", description: "exp_table ve max level tanımını incele (sat.58)" }
    ],
    hint: "exp_table_common dizisinde her index bir seviyeye karşılık gelir",
    successMessage: "exp_table her seviye için gereken toplam tecrübeyi tutar. Config'den gPlayerMaxLevel ile sınır konur."
  },
  {
    id: 50,
    category: "orta",
    title: "Görev 50: Level Atlayınca Ödül",
    description: "Oyuncu her seviye atladığında otomatik ödül alsın.",
    instruction: "char.cpp'de case POINT_LEVEL: bloğunu bulun (sat.3092). Seviye arttığında (amount > 0 ise) AutoGiveItem ile küçük bir ödül ekleyin.",
    files: [
      { path: "char.cpp", description: "PointChange POINT_LEVEL case'ine ödül ekle (sat.3092)" }
    ],
    hint: "case POINT_LEVEL: bloğunda amount > 0 kontrolü yapın (level düşme durumunda ödül vermemek için)",
    successMessage: "Level atlama PointChange(POINT_LEVEL, 1) ile tetiklenir; ödül kodu case bloğuna eklenir."
  },
  {
    id: 51,
    category: "orta",
    title: "Görev 51: Ölüm EXP Kaybını İncele/Ayarla",
    description: "Oyuncu ölünce ne kadar tecrübe kaybettiğini bulun ve ayarlayın.",
    instruction: "char_battle.cpp satır 332'de iLoss hesabını bulun: iLoss = (GetNextExp() * __GetExpLossPerc(GetLevel())) / 100. Satır 344'te PointChange(POINT_EXP, -iLoss, true) ile uygulanır.",
    files: [
      { path: "char_battle.cpp", description: "Ölümde exp kaybı hesabını incele (sat.332-344)" }
    ],
    hint: "iLoss = GetNextExp() * yüzde / 100. MIN(800000, iLoss) ile üst sınır konuyor (sat.334).",
    successMessage: "Negatif PointChange exp düşürür; iLoss = bir sonraki level için gereken exp'in yüzdesi."
  },
  {
    id: 52,
    category: "orta",
    title: "Görev 52: Polymorph Halinde Komut Engeli",
    description: "Oyuncu polymorph (dönüşüm) halindeyken belirli bir komutu kullanamasın.",
    instruction: "Komutun başında if (ch->IsPolymorphed()) kontrolü yapıp ChatPacket ile uyarı gösterip return yapın. IsPolymorphed char.h sat.852'de tanımlı.",
    files: [
      { path: "cmd_general.cpp", description: "Komut başına IsPolymorphed kontrolü ekle" }
    ],
    hint: "IsPolymorphed() = (m_dwPolymorphRace > 0) — dönüşmüş oyuncu true döner",
    successMessage: "IsPolymorphed dönüşüm halini bildirir; erken return ile komut engellenir."
  },
  {
    id: 53,
    category: "orta",
    title: "Görev 53: Sadece At Üstündeyken Çalışan Komut",
    description: "Komut yalnızca oyuncu ata binmişken çalışsın.",
    instruction: "Komut başında if (!ch->IsRiding()) { ChatPacket uyarı; return; } kontrolü ekleyin. IsRiding char.h sat.1697'de tanımlı.",
    files: [
      { path: "cmd_general.cpp", description: "IsRiding kontrolü ile komut" }
    ],
    hint: "if (!ch->IsRiding()) { uyarı; return; }",
    successMessage: "IsRiding() oyuncunun ata binip binmediğini döner."
  },
  {
    id: 54,
    category: "orta",
    title: "Görev 54: Envanterdeki Eşya Sayısını Gösteren Komut",
    description: "Parametre olarak verilen VNUM'dan oyuncuda kaç tane olduğunu gösterin.",
    instruction: "do_count yazın: one_argument ile arg alın, atoi ile vnum çevirin, int count = ch->CountSpecifyItem(vnum); ile sayın, ChatPacket ile gösterin.",
    files: [
      { path: "cmd_general.cpp", description: "ACMD(do_count) fonksiyonunu yaz" },
      { path: "cmd.cpp", description: "Komutu kaydet" }
    ],
    hint: "CountSpecifyItem(DWORD vnum) → int döner (char.h sat.1259)",
    successMessage: "CountSpecifyItem belirli VNUM'un envanterdeki toplam adedini verir."
  },
  {
    id: 55,
    category: "orta",
    title: "Görev 55: Ölü Oyuncuya İşlem Engeli",
    description: "Bir komutun ölü oyuncuda çalışmasını engelleyin.",
    instruction: "Komut başında if (ch->IsDead()) kontrolü yapıp uyarı verip return yapın. IsDead char.h sat.1372'de tanımlı.",
    files: [
      { path: "cmd_general.cpp", description: "IsDead kontrolü ekle" }
    ],
    hint: "if (ch->IsDead()) { ChatPacket uyarı; return; }",
    successMessage: "IsDead() oyuncunun ölü olup olmadığını döner; güvenlik kontrolü olarak önemlidir."
  },
  {
    id: 56,
    category: "orta",
    title: "Görev 56: Ticaret/Şop Sırasında Komut Engeli",
    description: "Oyuncu takas, şop veya kasa açıkken komutu kullanamasın (exploit önleme).",
    instruction: "Komut başında if (ch->GetExchange() || ch->GetMyShop() || ch->IsOpenSafebox()) kontrolü yapıp uyarı verip return yapın. Aynı kalıp char_item.cpp sat.5349'da kullanılır.",
    files: [
      { path: "cmd_general.cpp", description: "Meşguliyet kontrolü ekle" },
      { path: "char_item.cpp", description: "GetExchange/GetMyShop/IsOpenSafebox kalıbını incele (sat.5349)" }
    ],
    hint: "Bu kalıbı char_item.cpp sat.5349'da görebilirsiniz — dupe/exploit önler",
    successMessage: "Bu kontrol takas sırasında eşya kaybolması (dupe) gibi exploit'leri önler."
  },
  {
    id: 57,
    category: "orta",
    title: "Görev 57: İmparatorluk (Empire) Bazlı Davranış",
    description: "Komut oyuncunun imparatorluğuna göre farklı sonuç versin.",
    instruction: "ch->GetEmpire() değerine göre switch/if ile dallanın: 1=Shinsoo, 2=Chunjo, 3=Jinno. Her birinde farklı ChatPacket mesajı gösterin.",
    files: [
      { path: "cmd_general.cpp", description: "GetEmpire ile dallanma ekle" }
    ],
    hint: "GetEmpire() BYTE döner (char.h sat.1742). 1/2/3 değerleri krallıklardır.",
    successMessage: "GetEmpire() oyuncunun krallığını verir; switch ile dallanmak en temiz yoldur."
  },
  {
    id: 58,
    category: "orta",
    title: "Görev 58: Skill Seviyesine Göre Bonus",
    description: "Oyuncunun belirli bir yeteneğinin seviyesine göre ödül/etki uygulayın.",
    instruction: "Komutta int skillLv = ch->GetSkillLevel(SKILL_VNUM); ile seviyeyi okuyup, seviyeye göre bonus hesaplayın ve ChatPacket ile gösterin.",
    files: [
      { path: "cmd_general.cpp", description: "GetSkillLevel kullanımı" }
    ],
    hint: "GetSkillLevel(DWORD dwVnum) → int döner (char.h sat.1503)",
    successMessage: "GetSkillLevel verilen yeteneğin güncel seviyesini döner."
  },
  {
    id: 59,
    category: "orta",
    title: "Görev 59: Otomatik İyileşme Event'i (Komutla Başlatılan)",
    description: "Belirli bir oyuncuya periyodik can yenileyen tekrarlı event.",
    instruction: "1) Bir event_info struct tanımlayın (PID tutan). 2) EVENTFUNC yazın: info'dan PID alın, oyuncuyu bulun, PointChange(POINT_HP, ...) uygulayın, PASSES_PER_SEC(5) ile tekrarlayın. 3) Komutla event_create çağırın. Şablon: cmd_general.cpp sat.172 (shutdown_event).",
    files: [
      { path: "cmd_general.cpp", description: "Event struct + EVENTFUNC + başlatma komutu. Şablon: shutdown_event (sat.172)" }
    ],
    hint: "AllocEventInfo<MyInfoStruct>() ile info oluşturulur. Oyuncu çıkarsa CHARACTER_MANAGER::FindByPID ile NULL dönebilir — kontrol şart!",
    successMessage: "Karaktere özel event'lerde info struct ile PID taşınır; oyuncu çıkmışsa NULL kontrolü şart."
  },
  {
    id: 60,
    category: "orta",
    title: "Görev 60: Yang Üst Limiti Kontrolü",
    description: "Bir komutla para verirken oyuncunun yang'ının taşmasını önleyin.",
    instruction: "Para vermeden önce: if (ch->GetGold() + miktar > MAX_YANG) { uyarı; return; } kontrolü yapın. GetGold() long long döner (char.h sat.1289).",
    files: [
      { path: "cmd_general.cpp", description: "GiveGold/PointChange öncesi limit kontrolü" }
    ],
    hint: "GetGold() long long'dur (int64); toplamı kontrol etmeden eklemeyin",
    successMessage: "Para sistemlerinde üst limit kontrolü, overflow ve exploit'i önler."
  },

  // ============================================================================
  //  BÖLÜM 3: ZOR SEVİYE (40 Görev)
  //  TODO: Source doğrulaması yapılacak
  // ============================================================================
];
