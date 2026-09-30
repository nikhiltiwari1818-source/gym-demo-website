"use client";

import React, { useState, useEffect } from "react";

export default function AdminPricingManager() {
  const [packages, setPackages] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditClick = (pkg: any) => {
    setEditingId(pkg.id);
    setEditForm({ ...pkg, featuresString: pkg.features ? pkg.features.join("\n") : "" });
  };

  const handleSave = async (id: number) => {
    const updatedFeatures = editForm.featuresString
      .split("\n")
      .filter((item: string) => item.trim() !== "");

    const updatedPkg = { ...editForm, features: updatedFeatures };
    delete updatedPkg.featuresString;

    const updatedList = packages.map((p) => (p.id === id ? updatedPkg : p));
    setPackages(updatedList);

    await fetch("/api/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedList),
    });

    setEditingId(null);
    setEditForm(null);
  };

  return (
    <div className="p-6 bg-neutral-950 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-amber-500">
        💳 Active Membership Packages Manager
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
            {editingId === pkg.id ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Duration</label>
                    <input
                      type="text"
                      value={editForm.duration}
                      onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Price (₹)</label>
                    <input
                      type="text"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Original Price (₹)</label>
                    <input
                      type="text"
                      value={editForm.originalPrice}
                      onChange={(e) => setEditForm({ ...editForm, originalPrice: e.target.value })}
                      className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Features (One per line)</label>
                  <textarea
                    rows={4}
                    value={editForm.featuresString}
                    onChange={(e) => setEditForm({ ...editForm, featuresString: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white text-sm"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-1.5 bg-neutral-700 rounded text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(pkg.id)}
                    className="px-4 py-1.5 bg-amber-500 text-black font-semibold rounded text-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{pkg.name}</h3>
                    <p className="text-xs text-neutral-400">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-amber-500">₹{pkg.price}</span>
                    <span className="text-xs text-neutral-500 line-through block">₹{pkg.originalPrice}</span>
                  </div>
                </div>
                <ul className="text-xs text-neutral-300 space-y-1 my-4 border-t border-neutral-800 pt-3">
                  {pkg.features?.map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-amber-500">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleEditClick(pkg)}
                  className="w-full mt-2 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded text-xs font-medium text-amber-400"
                >
                  ✏️ Edit Pricing & Features
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
