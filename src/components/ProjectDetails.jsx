import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const getVideoMimeType = (src = "") => {
  const ext = src.split(".").pop()?.toLowerCase();
  if (ext === "mov") return "video/quicktime";
  if (ext === "webm") return "video/webm";
  return "video/mp4";
};

// Turns a normal Google Slides share/edit link (or one already pointing at
// /embed) into the correct /embed URL for an <iframe>.
// Found on internet
const getGoogleSlidesEmbedUrl = (url) => {
  if (!url) return null;

  const match = url.match(/\/presentation\/d\/(?:e\/)?([a-zA-Z0-9-_]+)/);
  if (!match) return null;

  const isPublished = url.includes("/presentation/d/e/");
  const idSegment = isPublished ? `e/${match[1]}` : match[1];

  return `https://docs.google.com/presentation/d/${idSegment}/embed?start=false&loop=false&delayms=3000`;
};

const AutoplayVideo = ({ src, className }) => {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);

  const isGif = src?.toLowerCase().endsWith(".gif");

  useEffect(() => {
    if (isGif) return;

    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isGif]);

  useEffect(() => {
    if (isGif) return;

    const vid = videoRef.current;
    if (!vid) return;

    if (inView) {
      vid.play().catch(() => {}); // browsers can reject autoplay
    } else {
      vid.pause();
    }
  }, [inView, isGif]);

  if (isGif) {
    return (
      <div className={className}>
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={className}>
      <video
        ref={videoRef}
        className="h-full w-full"
        controls
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={src} type={getVideoMimeType(src)} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const ImageLinkCard = ({ href, src, alt, caption, compact }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block overflow-hidden rounded-xl border border-white/10 transition hover:border-white/30 ${
      compact ? "mx-auto max-w-xs" : ""
    }`}
  >
    <img
      src={src}
      alt={alt || caption || "External link"}
      className="w-full object-cover transition duration-300 group-hover:scale-105"
    />
  </a>
);

const ProjectDetails = ({
  title,
  titleColor = "#22d3ee",
  overview,
  description,
  details,
  image,
  youtubeUrl,
  mp4,
  codeSnippets = [],
  designSnippets = [],
  sections = [],
  content = [],
  imageLink,
  imageLinks = [],
  tags = [],
  github,
  liveDemo,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [openCodeBlocks, setOpenCodeBlocks] = useState({});

  const [copiedBlockKey, setCopiedBlockKey] = useState(null);

  const trailerWrapperRef = useRef(null);
  const mp4VideoRef = useRef(null);
  const [trailerInView, setTrailerInView] = useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const u = new URL(url);

      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${u.pathname}`;
      }

      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      if (u.pathname.startsWith("/embed/")) return url;

      if (u.pathname.startsWith("/shorts/")) {
        const shortId = u.pathname.split("/shorts/")[1];
        if (shortId) return `https://www.youtube.com/embed/${shortId}`;
      }
    } catch {}

    return null;
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  const allImageLinks = imageLink ? [imageLink, ...imageLinks] : imageLinks;

  const renderFormattedText = (text) => {
    if (!text) return null;

    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      ) : (
        part
      )
    );
  };

  // Combine new sections prop with legacy content prop so nothing breaks
  const extraSections = sections.length > 0 ? sections : content;

  const toggleCodeBlock = (key) => {
    setOpenCodeBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Watch the trailer wrapper and flip trailerInView when it scrolls onscreen
  useEffect(() => {
    const el = trailerWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setTrailerInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause the actual <video> element (mp4 trailers) as it enters/leaves view
  useEffect(() => {
    const vid = mp4VideoRef.current;
    if (!vid) return;

    if (trailerInView) {
      vid.play().catch(() => {}); // browsers can reject autoplay
    } else {
      vid.pause();
    }
  }, [trailerInView]);

  // For YouTube trailers, append autoplay/mute params only once it's in view
  const trailerEmbedSrc = embedUrl
    ? `${embedUrl}${embedUrl.includes("?") ? "&" : "?"}rel=0&playsinline=1${
        trailerInView ? "&autoplay=1&mute=1" : ""
      }`
    : null;

  return (
    <div className="min-h-screen py-24 px-6">
      {/* Background turns into the project's image, in place of the home page's particles */}
      <div className="fixed inset-0 -z-10">
        <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0b0f1a]/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-[#111827] shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
        </div>

        <div className="p-10 space-y-12">
          <section>
            <h1
              className="text-center text-4xl font-extrabold"
              style={{ color: titleColor }}
            >
              {title}
            </h1>
          </section>

          {details && (
            <section className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <button
                onClick={() => setDetailsOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-5 bg-white/[0.03] hover:bg-white/[0.06] transition"
              >
                <span className="text-2xl font-bold text-white">
                  Project Details
                </span>

                <svg
                  className={`h-5 w-5 text-neutral-400 transition-transform duration-200 ${
                    detailsOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {detailsOpen && (
                <div className="grid gap-y-4 px-6 py-6 md:grid-cols-[180px_1fr]">
                  {details.role && (
                    <>
                      <span className="font-semibold text-cyan-400">Role</span>
                      <span className="text-neutral-300">{details.role}</span>
                    </>
                  )}

                  {details.type && (
                    <>
                      <span className="font-semibold text-cyan-400">Type</span>
                      <span className="text-neutral-300">{details.type}</span>
                    </>
                  )}

                  {details.platform && (
                    <>
                      <span className="font-semibold text-cyan-400">Platforms</span>
                      <span className="text-neutral-300">{details.platform}</span>
                    </>
                  )}

                  {details.language && (
                    <>
                      <span className="font-semibold text-cyan-400">Language</span>
                      <span className="text-neutral-300">{details.language}</span>
                    </>
                  )}

                  {details.software?.length > 0 && (
                    <>
                      <span className="font-semibold text-cyan-400">
                        Software
                      </span>
                      <span className="text-neutral-300">
                        {details.software.join(", ")}
                      </span>
                    </>
                  )}

                  {details.duration && (
                    <>
                      <span className="font-semibold text-cyan-400">
                        Duration
                      </span>
                      <span className="text-neutral-300">
                        {details.duration}
                      </span>
                    </>
                  )}

                  {details.teamSize && (
                    <>
                      <span className="font-semibold text-cyan-400">
                        Team Size
                      </span>
                      <span className="text-neutral-300">
                        {details.teamSize}
                      </span>
                    </>
                  )}
                </div>
              )}
            </section>
          )}

          {(mp4 || embedUrl || overview || description) && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-white">About</h2>

              {(mp4 || embedUrl) && (
                <div
                  ref={trailerWrapperRef}
                  className="mb-6 aspect-video overflow-hidden rounded-xl border border-white/10 bg-black"
                >
                  {mp4 ? (
                    <video
                      ref={mp4VideoRef}
                      className="h-full w-full"
                      controls
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={mp4} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <iframe
                      className="h-full w-full"
                      src={trailerEmbedSrc}
                      title={`${title} Trailer`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>
              )}

              {overview && (
                <p className="text-lg text-neutral-300 whitespace-pre-line">
                  {renderFormattedText(overview)}
                </p>
              )}
            </section>
          )}

          {allImageLinks.length > 0 && (
            <section className="flex flex-wrap justify-center gap-4">
              {allImageLinks.map((link, i) => (
                <ImageLinkCard key={i} {...link} />
              ))}
            </section>
          )}

          {/* Custom per-project sections - text / image / images / youtube / list / imageLink, any order, any count */}
          {extraSections.map((sectionItem, sIndex) => (
            <section key={sIndex} className="space-y-8">
              {sectionItem.title && (
                <h2 className="text-3xl font-bold text-white">
                  {sectionItem.title}
                </h2>
              )}

              {(sectionItem.blocks || []).map((block, index) => {
                if (block.type === "text") {
                  return (
                    <div key={index}>
                      {block.heading && (
                        <h3 className="mb-2 text-xl font-semibold text-white">
                          {block.heading}
                        </h3>
                      )}
                      <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
                        {renderFormattedText(block.body)}
                      </p>
                    </div>
                  );
                }

                if (block.type === "video") {
                  const isVertical = block.aspect === "vertical";

                  return (
                    <figure key={index}>
                      <AutoplayVideo
                        src={block.src}
                        className={
                          isVertical
                            ? "mx-auto aspect-[9/16] max-w-xs overflow-hidden rounded-xl border border-white/10 bg-black"
                            : "aspect-video overflow-hidden rounded-xl border border-white/10 bg-black"
                        }
                      />
                      {block.caption && (
                        <figcaption className="mt-2 text-sm text-neutral-400">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.type === "code") {
                  const blockKey = `${sIndex}-${index}`;
                  const isBlockOpen = !!openCodeBlocks[blockKey];

                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]"
                    >
                      <button
                        onClick={() => toggleCodeBlock(blockKey)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] transition"
                      >
                        <span className="text-sm font-semibold text-white">
                          {block.heading || block.language || "Code"}
                        </span>

                        <svg
                          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
                            isBlockOpen ? "rotate-180" : "rotate-0"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {isBlockOpen && (
                        <>
                          <div className="flex items-center justify-end border-t border-white/10 bg-white/[0.02] px-4 py-2">
                          </div>

                          <div className="overflow-x-auto">
                            <SyntaxHighlighter
                              language={block.language || "javascript"}
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                padding: "1.25rem",
                                background: "#0d1117",
                                fontSize: "0.875rem",
                                lineHeight: "1.6",
                              }}
                              showLineNumbers
                            >
                              {block.code || ""}
                            </SyntaxHighlighter>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                if (block.type === "slides") {
                  const url = getGoogleSlidesEmbedUrl(block.url);

                  return (
                    <figure key={index}>
                      <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
                        {url && (
                          <iframe
                            className="h-full w-full"
                            src={url}
                            title={block.caption || `${title} slides ${index}`}
                            loading="lazy"
                            allowFullScreen
                          />
                        )}
                      </div>
                      {block.caption && (
                        <figcaption className="mt-2 text-sm text-neutral-400">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.type === "imageLink") {
                  return <ImageLinkCard key={index} {...block} />;
                }

                if (block.type === "image") {
                  return (
                    <figure key={index}>
                      <img
                        src={block.src}
                        alt={block.caption || ""}
                        className="w-full rounded-xl border border-white/10"
                      />
                      {block.caption && (
                        <figcaption className="mt-2 text-sm text-neutral-400">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.type === "images") {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-3"
                    >
                      {(block.items || []).map((img, i) => (
                        <figure key={i}>
                          <img
                            src={img.src}
                            alt={img.caption || ""}
                            className="w-full rounded-xl border border-white/10 object-cover aspect-square"
                          />
                          {img.caption && (
                            <figcaption className="mt-2 text-center text-sm text-neutral-400">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  );
                }

                if (block.type === "youtube") {
                  const url = getEmbedUrl(block.url);
                  const isShort = block.url?.includes("/shorts/");

                  return (
                    <div
                      key={index}
                      className={
                        isShort
                          ? "mx-auto aspect-[9/16] max-w-xs overflow-hidden rounded-xl border border-white/10 bg-black"
                          : "aspect-video overflow-hidden rounded-xl border border-white/10 bg-black"
                      }
                    >
                      {url && (
                        <iframe
                          className="h-full w-full"
                          src={url}
                          title={block.caption || `${title} video ${index}`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 divide-y divide-white/10 overflow-hidden"
                    >
                      {(block.rows || []).map((row, rIndex) => (
                        <div
                          key={rIndex}
                          className="grid gap-2 p-5 sm:grid-cols-[180px_1fr]"
                        >
                          <span className="font-semibold text-white-500">
                            {row.heading}
                          </span>
                          <ul className="list-disc space-y-1 pl-5 text-neutral-300">
                            {(row.bullets || []).map((bullet, bIndex) => (
                              <li key={bIndex}>{renderFormattedText(bullet)}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;