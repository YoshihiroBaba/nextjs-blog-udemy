import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'

import Link from 'next/link'
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {

  // const fetchData = await fetch("endpoint"); //SSRの場合（例）データベースから引っ張ってくる

  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {

//   return{
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({allPostsData}) {
  return  <Layout home>
    {/* タグにタイトルを表示する */}
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
      <p>
        私はフルスタックエンジニアです/Udemy講師としても活動しています/好きな言語はJavascriptです
      </p>
    </section>
    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
            <img src={`${thumbnail}`} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}
      </div>
    </section>

  </Layout>
}
