type Props = {
  defaultValue?: string;
  action?: string;
};

export function GuidesSearchForm({
  defaultValue = "",
  action = "/guides/search",
}: Props) {
  return (
    <form className="guides-search" role="search" action={action} method="get">
      <label className="sr-only" htmlFor="guides-search-q">
        Search guides
      </label>
      <input
        id="guides-search-q"
        type="search"
        name="q"
        placeholder="Search guides…"
        defaultValue={defaultValue}
        autoComplete="off"
        aria-label="Search guides"
      />
      <button type="submit" aria-label="Submit search">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}
