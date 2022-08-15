import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false, //取得してきたpath以外は404になるように設定、tureにすると動的にページを生成しようとする。
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
  return (
  <Layout>
    <Head>
        <title>{postData.title}</title>
    </Head>
    <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML}} />  {/*危険なので本来ならサニタイズする必要がある */}
    </article>
  </Layout>
  );
}
