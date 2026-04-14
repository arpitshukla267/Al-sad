import React from "react";
import articleImg from "../../public/assets/images/article.webp";
import Image from "next/image";

import { ARTICLES } from "../../lib/blogData";

const Article = ({ image, heading, description, id }) => {
  return (
    <article className="space-y-5 overflow-hidden">
      <div className="h-[232px] w-full relative">
        <Image src={image} alt={heading} fill className="object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-lg sm:text-2xl line-clamp-2">{heading}</h4>
        <p className="font-secondary font-medium text-sm sm:text-md mt-2 line-clamp-3">
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
            {ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="max-w-[80%] md:max-w-full shrink-0 snap-start sm:min-w-0 scrollbar-hide"
              >
                <Article
                  image={article.image}
                  heading={article.title}
                  description={article.shortDescription}
                  id={article.id}
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
