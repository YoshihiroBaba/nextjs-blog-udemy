import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts"); //パスを取得

//mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //ファイル名(id)

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResults = matter(fileContents);

        //idとデータを返す
        return {
            id,
            ...matterResults.data, //スプレット構文
        };
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
    /* オブジェクトとして返される getStaticPaths を正常に動作させるため
        [
            {
                params: {
                    id: "ssg-ssr"
                }
            },
            {
                params: {
                    id: "next-react"
                }
            }
        ]

    */
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content); //remarkライブラリーを使いHTMLに変換

    const blogContentHTML = blogContent.toString(); //string型に変換

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}
