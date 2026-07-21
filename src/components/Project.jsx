import React, { useState, useEffect } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  href,
  image,
  hoverImage,
  tags,
  setPreview,
  overview,
  details,
  youtubeUrl,
  codeSnippets,
  designSnippets,
  github,
  liveDemo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);

  const hoverImages = Array.isArray(hoverImage)
    ? hoverImage
    : hoverImage
    ? [hoverImage]
    : [];

  useEffect(() => {
    if (!isHovered || hoverImages.length <= 1) return;

    const interval = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, 900);

    return () => clearInterval(interval);
  }, [isHovered, hoverImages.length]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => {
          setPreview?.({ image, title });
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setPreview?.(null);
          setIsHovered(false);
          setHoverIndex(0);
        }}
        className="group w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-800">

          {/* Default blurred background */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover scale-125 blur-2xl brightness-50 transition-opacity duration-300 ${
              isHovered && hoverImages.length ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Default image */}
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 h-full w-full object-contain transition-all duration-300 ${
              isHovered && hoverImages.length
                ? "opacity-0 scale-105"
                : "opacity-100 group-hover:scale-105"
            }`}
          />

          {/* Hover slideshow */}
          {hoverImages.map((img, index) => (
            <React.Fragment key={index}>
              {/* Background */}
              <img
                src={img}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover scale-125 blur-2xl brightness-50 transition-opacity duration-300 ${
                  isHovered && hoverIndex === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />

              {/* Foreground */}
              <img
                src={img}
                alt={`${title} ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                  isHovered && hoverIndex === index
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </React.Fragment>
          ))}

          <div className="absolute inset-0 bg-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className={`rounded-full border px-3 py-1 text-xs ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <h3 className="mb-3 text-2xl font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm leading-6 text-neutral-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {isOpen && (
        <ProjectDetails
          title={title}
          overview={overview}
          description={description}
          image={image}
          tags={tags}
          href={href}
          details={details}
          youtubeUrl={youtubeUrl}
          codeSnippets={codeSnippets}
          designSnippets={designSnippets}
          github={github}
          liveDemo={liveDemo}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Project;