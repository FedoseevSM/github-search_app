import Head from "next/head"
import Image from "next/image"
import EntryLayout from "../layouts/EntryLayout"
import MainSearch from "../components/MainSearch"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Поиск по GitHub</title>
        <meta
          name="description"
          content="Приложение, которое ищет репозитории на GitHub"
        />
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_FAVICON}/favicon.ico`}
        />
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <EntryLayout>
          <main className="mb-auto">
            <MainSearch />
          </main>
        </EntryLayout>
      </div>
    </div>
  )
}
