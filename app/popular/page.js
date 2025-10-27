import ModCard from "../components/ModCard";

async function getPopularMods() {
  const res = await fetch(
    "https://api.modrinth.com/v2/search?query=&limit=21&index=downloads",
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch mods data.");
  }

  const data = await res.json();
  return data.hits || [];
}

export default async function Popular() {
  let projects = [];
  let error = null;

  try {
    projects = await getPopularMods();
  } catch (e) {
    error = e.message;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <h1 className="text-3xl font-bold mb-4">No Mods Found</h1>
        <p>No popular mods found. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
          Most Popular Mods
        </h1>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ModCard
              key={project.project_id}
              title={project.title}
              description={
                project.description?.length > 150
                  ? project.description.slice(0, 150) + "..."
                  : project.description || "No description available."
              }
              author={project.author}
              downloads={project.downloads.toLocaleString()}
              icon={project.icon_url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
