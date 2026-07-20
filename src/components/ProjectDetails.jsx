import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ProjectDetails = ({
  title,
  overview,
  description,
  details,
  image,
  youtubeUrl,
  mp4,
  codeSnippets = [],
  designSnippets = [],
  tags = [],
  github,
  liveDemo,
  closeModal,
}) => {
  const [selectedCode, setSelectedCode] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [codeOpen, setCodeOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

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
    } catch {}

    return null;
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const isOpen = codeOpen;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6"
      onClick={closeModal}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 z-20 rounded-lg bg-black/60 p-2 transition hover:bg-red-500"
        >
         <img
            src={`${import.meta.env.BASE_URL}assets/close.svg`}
            className="h-5 w-5"
            alt="Close"
          />
        </button>

        {/* Hero Image */}
        <img
          src={image}
          alt={title}
          className="h-72 w-full object-cover rounded-t-2xl"
        />

        <div className="p-10 space-y-12">
          {/* Header */}
          <section>
            <h1 className="text-4xl font-bold text-white">{title}</h1>

            {overview && (
              <p className="mt-4 text-lg text-neutral-300">{overview}</p>
            )}

            {description && (
              <p className="mt-4 text-neutral-400">{description}</p>
            )}
          </section>

          {/* Project Details */}
          {details && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Project Details
              </h2>

              <div className="grid gap-y-4 md:grid-cols-[180px_1fr]">
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
                    <span className="font-semibold text-cyan-400">Platform</span>
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
              </div>
            </section>
          )}

          {/* Video */}
          {(mp4 || embedUrl) && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-white">Video</h2>

              <div className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black">
                {mp4 ? (
                  <video
                    className="h-full w-full"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={mp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={embedUrl}
                    title={`${title} Video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </section>
          )}

          {/* Programming Highlights */}
          {codeSnippets.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Programming Highlights
              </h2>

              <div className="rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden">

                {/* snippet selector */}
                <div className="flex flex-wrap gap-2 border-b border-white/10 p-4">
                  {codeSnippets.map((snippet, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCode(index);
                        setCodeOpen(false);
                      }}
                      className={`rounded-lg px-4 py-2 text-sm transition ${
                        selectedCode === index
                          ? "bg-cyan-500 text-white"
                          : "bg-white/5 text-neutral-400 hover:bg-white/10"
                      }`}
                    >
                      {snippet.title}
                    </button>
                  ))}
                </div>

                {/* BIG CLICKABLE HEADER */}
                <button
                  onClick={() => setCodeOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-base font-semibold text-white">
                      {isOpen ? "Hide Code" : "Click to View Code"}
                    </span>

                    <span className="text-xs text-neutral-400 mt-1">
                      {codeSnippets[selectedCode]?.language ?? "code"} •{" "}
                      {codeSnippets[selectedCode]?.title}
                    </span>
                  </div>

                  {/* Clear dropdown arrow */}
                  <svg
                    className={`h-5 w-5 text-neutral-400 transition-transform duration-200 ${
                      codeOpen ? "rotate-180" : "rotate-0"
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

                {/* copy bar */}
                <div className="flex items-center justify-end px-6 py-3 border-b border-white/10 bg-white/[0.02]">
                  <button
                    onClick={() =>
                      handleCopy(
                        codeSnippets[selectedCode]?.code,
                        selectedCode
                      )
                    }
                    className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-xs text-neutral-400 transition hover:bg-white/10 hover:text-white"
                  >
                    {copiedIndex === selectedCode ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* collapsible body */}
                {codeOpen && (
                  <div className="overflow-x-auto">
                    <SyntaxHighlighter
                      language={codeSnippets[selectedCode]?.language || "javascript"}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        borderRadius: "0.75rem",
                        background: "#0d1117",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                      }}
                      showLineNumbers
                    >
                      {codeSnippets[selectedCode]?.code || ""}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Design Highlights */}
          {designSnippets.length > 0 && (
            <section>
              <h2 className="mb-6 text-3xl font-bold text-white">
                Design Highlights
              </h2>

              <div className="flex flex-wrap gap-3 mb-5">
                {designSnippets.map((design, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDesign(index)}
                    className={`rounded-lg px-4 py-2 transition ${
                      selectedDesign === index
                        ? "bg-cyan-500 text-white"
                        : "bg-white/5 text-neutral-400 hover:bg-white/10"
                    }`}
                  >
                    {design.title}
                  </button>
                ))}
              </div>

              <img
                src={designSnippets[selectedDesign]?.image}
                alt={designSnippets[selectedDesign]?.title}
                className="w-full rounded-xl border border-white/10"
              />
            </section>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ProjectDetails;