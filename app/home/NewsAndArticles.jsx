import React from "react";
import articleImg from "../../public/assets/images/article.webp";
import Image from "next/image";

const ARTICLES = [
  {
    id: 1,
    image: articleImg,
    heading: "Article Heading",
    description:
      "A value that the company has. A value that the company has. A value that the company has. A value that the company has",
  },
  {
    id: 2,
    image: articleImg,
    heading: "Article Heading",
    description:
      "A value that the company has. A value that the company has. A value that the company has. A value that the company has",
  },
  {
    id: 3,
    image: articleImg,
    heading: "Article Heading",
    description:
      "A value that the company has. A value that the company has. A value that the company has. A value that the company has",
  },
];

const Article = ({ image, heading, description }) => {
  return (
    <article className="space-y-5 overflow-hidden">
      <div className="h-[232px] w-full relative">
        <Image src={image} alt={heading} fill className="object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-lg sm:text-2xl">{heading}</h4>
        <p className="font-secondary font-medium text-sm sm:text-md mt-2">
          {description}
        </p>
      </div>
    </article>
  );
};

const NewsAndArticles = () => {
  return (
    <section className="py-10 px-4 w-full sm:py-24 sm:px-20">
      <div className="mx-auto max-w-[1260px] space-y-6 sm:space-y-11">
        <h3 className="font-primary font-bold text-2xl sm:text-4xl">
          New & Articles
        </h3>
        <div className="overflow-hidden w-full">
          <div className="flex gap-6 overflow-x-auto flex-nowrap sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible snap-x snap-mandatory scrollbar-hide">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                className="max-w-full shrink-0 snap-start sm:min-w-0 scrollbar-hide"
              >
                <Article
                  image={article.image}
                  heading={article.heading}
                  description={article.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndArticles;
