"use client";
import { useState } from "react";
import Card from "./components/Card";
import { Search, ShowMore, SubArticleButton } from "@/components/atoms";
import { useQuery } from "@tanstack/react-query";
import { getArticlesByCategoryAndSubcategory } from "@/service/artikel";
import NewCardPage from "./components/NewCard";
import CardVideo from "./components/CardVideo";
import NewVidPage from "./components/NewVid";

export const HomeOrtu = () => {
  const [filterText, setFilterText] = useState("");
  const [showCountT1, setShowCountT1] = useState(3);
  const [showCountT2, setShowCountT2] = useState(3);
  const [showCountT3, setShowCountT3] = useState(3);
  const [showCountVid, setShowCountVid] = useState(3);

  const { data: articlesT1, isLoading: loadingT1 } = useQuery({
    queryKey: ["articles", "persiapan-ortu", "persiapan-mental"],
    queryFn: () =>
      getArticlesByCategoryAndSubcategory("persiapan-ortu", "persiapan-mental"),
  });

  const { data: articlesT2, isLoading: loadingT2 } = useQuery({
    queryKey: ["articles", "persiapan-ortu", "persiapan-intelektual"],
    queryFn: () =>
      getArticlesByCategoryAndSubcategory(
        "persiapan-ortu",
        "persiapan-intelektual",
      ),
  });

  const { data: articlesT3, isLoading: loadingT3 } = useQuery({
    queryKey: ["articles", "persiapan-ortu", "persiapan-hubungan"],
    queryFn: () =>
      getArticlesByCategoryAndSubcategory(
        "persiapan-ortu",
        "persiapan-hubungan",
      ),
  });

  const { data: video, isLoading: loadingVid } = useQuery({
    queryKey: ["articles", "persiapan-ortu", "video"],
    queryFn: () =>
      getArticlesByCategoryAndSubcategory("persiapan-ortu", "video"),
  });

  if (loadingT1 || loadingT2 || loadingT3 || loadingVid) {
    return <div>Loading...</div>;
  }

  const handleShowMoreT1 = () => {
    setShowCountT1((prevCount) => prevCount + 3);
  };

  const handleShowMoreT2 = () => {
    setShowCountT2((prevCount) => prevCount + 3);
  };

  const handleShowMoreT3 = () => {
    setShowCountT3((prevCount) => prevCount + 3);
  };

  const handleShowMoreVid = () => {
    setShowCountVid((prevcount) => prevcount + 3);
  };

  const filteredArticlesT1 =
    articlesT1?.filter((article) =>
      article.title.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];
  const filteredArticlesT2 =
    articlesT2?.filter((article) =>
      article.title.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];
  const filteredArticlesT3 =
    articlesT3?.filter((article) =>
      article.title.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];
  const filteredVideos =
    video?.filter((video) =>
      video.title.toLowerCase().includes(filterText.toLowerCase()),
    ) || [];

  const totalFilteredArticles =
    filteredArticlesT1.length +
    filteredArticlesT2.length +
    filteredArticlesT3.length;
  const noArticlesToShow =
    totalFilteredArticles === 0 && filteredVideos.length === 0;

  return (
    <main className="flex flex-col gap-10 px-6 py-48 md:px-28">
      <section>
        <Search filterText={filterText} onFilterTextChange={setFilterText} />
      </section>

      <section className="flex flex-col gap-10 md:flex-row">
        {/* Bagian Kanan (dapat di-scroll) */}
        <div className="flex-1 ">
          {noArticlesToShow ? (
            <p className="italic">Maaf, artikel dan video belum ada!</p>
          ) : (
            <>
              {/* Render articles for each trimester */}
              {filteredArticlesT1.length > 0 && (
                <section className="flex flex-col gap-10">
                  <p className="w-fit rounded-md border bg-primary-purple px-4 py-2 text-text-s text-white">
                    Persiapan Mental
                  </p>
                  <Card
                    category="persiapan-ortu"
                    subcategory="persiapan-mental"
                    showCount={showCountT1}
                  />
                  <div className="flex w-full justify-end">
                    {showCountT1 < filteredArticlesT1.length && (
                      <ShowMore onClick={handleShowMoreT1}>
                        Lihat lebih banyak
                      </ShowMore>
                    )}
                  </div>
                </section>
              )}
              {filteredArticlesT2.length > 0 && (
                <section className="flex flex-col gap-8">
                  <p className="w-fit rounded-md border bg-primary-purple px-4 py-2 text-text-s text-white">
                    Persiapan Intelektual
                  </p>
                  <Card
                    category="persiapan-ortu"
                    subcategory="persiapan-intelektual"
                    showCount={showCountT2}
                  />
                  <div className="flex w-full justify-end">
                    {showCountT2 < filteredArticlesT2.length && (
                      <ShowMore onClick={handleShowMoreT2}>
                        Lihat lebih banyak
                      </ShowMore>
                    )}
                  </div>
                </section>
              )}
              {filteredArticlesT3.length > 0 && (
                <section className="flex flex-col gap-8">
                  <p className="w-fit rounded-md border bg-primary-purple px-4 py-2 text-text-s text-white">
                    Persiapan Hubungan
                  </p>
                  <Card
                    category="persiapan-ortu"
                    subcategory="persiapan-hubungan"
                    showCount={showCountT3}
                  />
                  <div className="flex w-full justify-end">
                    {showCountT3 < filteredArticlesT3.length && (
                      <ShowMore onClick={handleShowMoreT3}>
                        Lihat lebih banyak
                      </ShowMore>
                    )}
                  </div>
                </section>
              )}
              {filteredVideos.length > 0 && (
                <section className="flex flex-col gap-10">
                  <SubArticleButton>Video Terkait</SubArticleButton>
                  <section className="flex flex-col gap-8">
                    <CardVideo
                      category="persiapan-ortu"
                      subcategory="video"
                      showCount={showCountVid}
                    />
                    <div className="flex w-full justify-end">
                      {showCountVid < filteredVideos.length && (
                        <ShowMore onClick={handleShowMoreVid}>
                          Lihat lebih banyak
                        </ShowMore>
                      )}
                    </div>
                  </section>
                </section>
              )}
            </>
          )}
        </div>
        <aside className="sticky top-28 flex h-screen flex-shrink-0 flex-col gap-10 lg:w-1/4 ">
          <section className="flex flex-col gap-8">
            <SubArticleButton>Artikel Terbaru</SubArticleButton>
            <NewCardPage />
          </section>
          <section className="flex flex-col gap-8">
            <SubArticleButton>Video Terbaru</SubArticleButton>
            <NewVidPage />
          </section>
        </aside>
      </section>
    </main>
  );
};
