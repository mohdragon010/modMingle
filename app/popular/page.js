import ModCard from "../components/ModCard";

export default async function Popular() {
  const res = await fetch(
    "https://api.modrinth.com/v2/search?query=&limit=21&index=downloads",
    {
      next: { revalidate: 120 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch mods data.");
  }

  const data = await res.json();
  const projects = data.hits || [];

  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No mods found. Try again later.
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Most Popular Mods</h1>
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
      >
        {projects.map((project) => (
          <ModCard
            key={project.project_id}
            title={project.title}
            description={
              project.description?.length > 100
                ? project.description.slice(0, 100) + "..."
                : project.description || "No description available."
            }
            author={project.author}
            downloads={project.downloads.toLocaleString()}
            img={project.icon_url}
          />
        ))}
      </div>
    </main>
  );
}
