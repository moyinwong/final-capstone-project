import * as Knex from "knex";
import { tables } from "../tables";
import faker from "faker";

const lessonsTable = tables.LESSONS;

const randomLessonList: any[] = [];

export async function seed(knex: Knex): Promise<void> {
  //generate random lesson
  for (let i = 0; i < 800; i++) {
    const randomCourseId: number = Math.floor(Math.random() * 305) + 1;
    const randomObj: any = {
      name: faker.name.findName(),
      description: faker.commerce.productDescription(),
      is_trial: Math.random() >= 0.5,
      video_url: "https://youtu.be/oZCM4u7d_6U",
      course_id: randomCourseId,
    };

    randomLessonList.push(randomObj);
  }

  // Deletes ALL existing entries
  await knex(lessonsTable).del();

  // Inserts seed entries
  await knex(lessonsTable).insert(
    [
      {
        name: "我當時用收音機考試聽唔到？｜用紅外線考好過收音機？",
        description: `Hello大家好我係ad
      今次係想同大家分享下我當時用收音機考聆聽嘅經歷
      一開頭真係好擔心！
      但其實用收音機考都幾好🤣🙈
      唔使咁擔心架～
      希望大家DSE可以旗開得勝啦～
      加油！`,
        is_trial: true,
        video_url: "https://youtu.be/k8KZ3cSbKC8",
        course_id: 1,
      },
      {
        name:
          "2020 DSE中文卷一閱讀理解｜由2升到5*｜十二篇範文點溫好？｜有咩小技巧？",
        description: `2020DSE中文卷一｜十二篇範文點溫好？
      想知點解我可以由學校pre我lv.2到最後攞5*就記得睇埋落去啦～🤓
      希望呢條片出得及時 唔算太遲🦾
      有咩唔明可以ig inbox搵我
      希望過左30/3你地會話比我聽你地考成點啦～期待你地嘅好消息🤍`,
        is_trial: false,
        video_url: "https://youtu.be/6A_HQhYwlrI",
        course_id: 1,
      },
      {
        name: "2020 DSE中文卷二寫作｜點樣呃到啲分返黎｜人物事例又使唔使背？",
        description: `年近二十少女的艾豬：@castle.ad
      咁其實呢張卷私都唔係考得高grade，所以我都參考左我一個攞5**朋友嘅意見。希望可以幫到大家~
      有咩唔明可以ig inbox/留言問我
      希望到左30/3你地會話比我聽你地考成點啦～期待你地嘅好消息`,
        is_trial: false,
        video_url: "https://youtu.be/8xSFY3LK77k",
        course_id: 1,
      },
      {
        name:
          "DSE 英文寫作 Paper 2 五大致命傷！ (2021 DSE 必看 Mini Course 課程🔥)",
        description: `好多同學想係英文 Paper 2 Writing 有顯著既進步 (上一至兩個Grade)，平時只係注重去 (無目標、無明確方向咁) 操練作文、背句式、讀生字、學又難又複雜既 Grammar (但其實係 Paper 2未必用到。就算用到，自己都好可能會用錯，因為唔夠熟)。可惜地，同學仔往往作左好幾篇文都無進步！點解？因為佢地無一個好有系統既計劃、可行既升級策略！`,
        is_trial: true,
        video_url: "https://youtu.be/PcawIctezy8",
        course_id: 2,
      },
      {
        name:
          "DSE 英文 Paper 2 寫作: 必讀5**滿分內容 CAR 口訣框架 (輕易拎7/7分內容!)",
        description: `今次同大家分享左 Paper 2 寫作 CAR 既內容口訣，幫大家 KO 青少年、上癮既題目，攞滿分內容。其他既口訣可以係【三週昇華寫作】睇到，有興趣可以留意以下既資料。`,
        is_trial: false,
        video_url: "https://youtu.be/j9v-daDI3M4",
        course_id: 2,
      },
      {
        name: "DSE 英文寫作 Paper 2 文法Grammar補底 Mini Course (5**同學都錯)",
        description: `今次同大家分享左英文 Grammar 文法補底 Mini Course，教左4個創意招去幫大家記：
      1) passive voice 被打論
      2) ED VS ING 高潮論
      3) Number + increasing 數文火箭
      4) everyday 我每日既刀
      希望幫到你地啦！有咩都可以留言同我講！`,
        is_trial: false,
        video_url: "https://youtu.be/XzYpSqQgAkw",
        course_id: 2,
      },
      {
        name: "DSE 英文: 四招永別港式英文 (輕鬆寫出一手流利英文)",
        description: `今次同大家分享 4 招去輕鬆改善港式英文！尤其你作文、Oral 會特別適用！希望會幫到大家！`,
        is_trial: false,
        video_url: "https://youtu.be/2GqLEE6AJ7I",
        course_id: 2,
      },
      {
        name: "荀子《勸學》",
        description: `細路，記得，只吃罐頭會營養不良的。

      這些影片只是一張粗略的地圖，讓你在溫習時容易找到所在的方位，容易把所學分類整理。所以拿着地圖，就拜託你們真的抬抬腿，踏踏實實走進書本筆記和試題庫。
      
      加油吧。`,
        is_trial: false,
        video_url: "https://youtu.be/k_azP6gm884",
        course_id: 3,
      },
      {
        name: "〈莊子．逍遙遊〉（節錄）",
        description: `一個腦圖丶一段簡述，絶不能涵蓋文章的深刻思想。
      所以影片只是最基本的整理，請務必作更深入的認識和思考，課堂學習和日常積累決不可少。
      時間有限，製作倉促，如發現錯漏，請幫忙指正，以免影響同學理解。
      望大家學而不厭，盡力而為，能獲得與付出相稱的回報。`,
        is_trial: false,
        video_url: "https://youtu.be/YAXe5XhaKek",
        course_id: 3,
      },
      {
        name: "孟子《魚我所欲也》",
        description: `細路，記得，只吃罐頭會營養不良的。

      這些影片只是一張粗略的地圖，讓你在溫習時容易找到所在的方位，容易把所學分類整理。所以拿着地圖，就拜託你們真的抬抬腿，踏踏實實走進書本筆記和試題庫。
      
      加油吧。`,
        is_trial: false,
        video_url: "https://youtu.be/6-DvzmgM-Vc",
        course_id: 3,
      },
      {
        name: "孟子《魚我所欲也》2",
        description: `細路，記得，只吃罐頭會營養不良的。

      這些影片只是一張粗略的地圖，讓你在溫習時容易找到所在的方位，容易把所學分類整理。所以拿着地圖，就拜託你們真的抬抬腿，踏踏實實走進書本筆記和試題庫。
      
      加油吧。`,
        is_trial: false,
        video_url: "https://youtu.be/6-DvzmgM-Vc",
        course_id: 4,
      },
      {
        name: "【一個字 Programming】0 安裝程式",
        description: `一般人以為 Programming 是很複雜，遙不可及，即使有很多網上教學，大多數都以英文為主。Tecky Academy 製作全新廣東話【一個字Programming】淺白教學片，為任何職業人士、待業人士、甚至學生和全職媽媽等的繁忙都市人，可以只需花5分鐘「一個字」的時間去認識 Programming。我們每星期會上傳一集！讓你輕鬆了解 Programming！　

      今集《【一個字Programming 】#0安裝程式的內容》，就由最基本的步驟說起 — 安裝程式！
      要安裝哪些程式？哪些版本比較穩定？Windows、macOS、Linux安裝過程中可能會遇到什麼問題？由我們的首席導師Alex為您們逐一講解吧！
      
      下集預告： 《第一個簡單 Program 的誕生 - Hello World》
      
      記得訂閱 Tecky Academy YouTube頻道： https://bit.ly/2ErlzEb
      ～讓Tecky Academy定時為你們提供更多有關程式設計的實用短片～`,
        is_trial: true,
        video_url: "https://youtu.be/uA8jsazvSSM",
        course_id: 5,
      },
      {
        name: "【一個字 Programming】1 第一個程式：Hello World",
        description: `《#1 第一個程式：Hello World》

      上一集教完大家安裝程式軟件後，今集會教大家寫第一個程式 “Hello World”！
      在於JaveScript世界內，每一個符號的組合都有特別意思或指令，歡迎大家一邊
      觀看教學短片，一邊動動手指試做練習。
      
      下集預告： String （字串）是什麼！？ 程式 ＋ 字串 ＝指令
                         留意下集內容，讓大家慢慢開始”寫劇本”吧！
      
      記得訂閱 Tecky Academy YouTube頻道： https://bit.ly/2ErlzEb
      ～讓Tecky Academy定時為你們提供更多有關程式設計的實用短片～`,
        is_trial: false,
        video_url: "https://youtu.be/oZCM4u7d_6U",
        course_id: 5,
      },
    ].concat(randomLessonList)
  );
}
