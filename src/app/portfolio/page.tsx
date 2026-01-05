import { db } from "@/lib/db";

export default async function PortfolioPage() {
  const projects = await db.project.findMany({
    where: { isActive: true },
    include: { service: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-slate-300">
            Explore our successful projects and client success stories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-slate-900">{project.title}</h2>
                {project.client && (
                  <p className="text-sm text-slate-500 mb-4">Client: {project.client}</p>
                )}
                <p className="text-slate-600 mb-4">{project.description}</p>
                {project.service && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {project.service.title}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
