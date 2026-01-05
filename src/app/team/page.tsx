import { db } from "@/lib/db";

export default async function TeamPage() {
  const teamMembers = await db.teamMember.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-slate-300">
            Meet the talented people behind Mita Agency
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border overflow-hidden text-center hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-slate-200 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-slate-600 mb-4">{member.role}</p>
                <p className="text-sm text-slate-500 mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
