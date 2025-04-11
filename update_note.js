// RSSフィードを取得して解析するスクリプト
const fetch = require("node-fetch");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

// noteのユーザー名
const NOTE_USERNAME = "oyatsu_calpas04"; // あなたのnoteユーザー名
const RSS_URL = `https://note.com/${NOTE_USERNAME}/rss`;
const INDEX_HTML_PATH = path.join(__dirname, "index.html");

// RSSフィードを取得する関数
async function fetchRssFeed() {
  try {
    const response = await fetch(RSS_URL);
    const xml = await response.text();
    const parser = new xml2js.Parser();
    return parser.parseStringPromise(xml);
  } catch (error) {
    console.error("RSSフィードの取得に失敗しました:", error);
    return null;
  }
}

// index.htmlを更新する関数
async function updateIndexHtml() {
  const rssFeed = await fetchRssFeed();
  if (
    !rssFeed ||
    !rssFeed.rss ||
    !rssFeed.rss.channel ||
    !rssFeed.rss.channel[0].item
  ) {
    console.error("有効なRSSフィードが見つかりませんでした");
    return false;
  }

  // 最新の記事を取得（最大12件）
  const items = rssFeed.rss.channel[0].item.slice(0, 12);
  const embedItems = items
    .map((item) => {
      const link = item.link[0];
      // noteの埋め込みURLを作成（URLから記事IDを抽出）
      const noteId = link.split("/").pop();
      return `<li class="list_note">
              <iframe class="note-embed" src="https://note.com/embed/notes/${noteId}"></iframe>
            </li>`;
    })
    .join("\n");

  // index.htmlを読み込む
  let html = fs.readFileSync(INDEX_HTML_PATH, "utf-8");

  // noteのセクションを探して置き換える
  const noteListStartRegex = /<ul class="unordered_list_note">\s*/;
  const noteListEndRegex = /\s*<\/ul>(\s*<\/section>\s*<!-- Note -->)/;

  const noteListStartMatch = html.match(noteListStartRegex);
  const noteListEndMatch = html.match(noteListEndRegex);

  if (noteListStartMatch && noteListEndMatch) {
    // 既存のnoteリストを新しいリストに置き換える
    const startIndex = noteListStartMatch.index + noteListStartMatch[0].length;
    const endIndex = noteListEndMatch.index;

    const newHtml =
      html.substring(0, startIndex) + embedItems + html.substring(endIndex);

    fs.writeFileSync(INDEX_HTML_PATH, newHtml, "utf-8");
    console.log("note記事を更新しました");
    return true;
  } else {
    console.error("noteセクションが見つかりませんでした");
    return false;
  }
}

// スクリプト実行
updateIndexHtml().then((result) => {
  if (result) {
    console.log("更新が完了しました");
  } else {
    console.error("更新に失敗しました");
  }
});
