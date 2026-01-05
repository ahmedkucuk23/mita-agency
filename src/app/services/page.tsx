import { db } from "@/lib/db";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-slate-300">
            Comprehensive marketing solutions tailored to your needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-lg border hover:shadow-lg transition-shadow">
              {service.icon && (
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{service.icon}</span>
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h2>
              <p className="text-slate-600 mb-6">{service.description}</p>
              {service.price && (
                <p className="text-lg font-semibold text-slate-900 mb-4">{service.price}</p>
              )}
              <Link
                href={`/contact`}
                className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
