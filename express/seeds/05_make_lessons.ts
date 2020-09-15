import * as Knex from "knex";
import { tables } from "../tables";

const lessonsTable = tables.LESSONS;

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(lessonsTable).del();

  // Inserts seed entries
  await knex(lessonsTable).insert([
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
  ]);
}
