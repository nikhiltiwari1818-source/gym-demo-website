"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Loader } from "lucide-react";

interface PricingPackage {
  id: number;
  name: string;
  duration: string;
  price: string;
  originalPrice: string;
  features: string[];
}

interface EditFormState extends PricingPackage {
  featuresString: string;
}

export default function AdminPricingManager() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/pricing");
        if (!res.ok) throw new Error("Failed to fetch pricing");
        const data = await res.json();
        setPackages(data);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        console.error("Error fetching pricing:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handleEditClick = (pkg: PricingPackage) => {
    setEditingId(pkg.id);
    setEditForm({
      ...pkg,
      featuresString: pkg.features.join("\n"),
    });
    setError(null);
  };

  const handleInputChange = (field: keyof EditFormState, value: string | number) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSave = async (id: number) => {
    if (!editForm) return;

    try {
      setSaveLoading(true);
      setError(null);

      if (!editForm.name.trim()) {
        setError("Package name is required");
        return;
      }

      if (!editForm.duration.trim()) {
        setError("Duration is required");
        return;
      }

      if (!editForm.price.toString().trim()) {
        setError("Price is required");
        return;
      }

      if (!editForm.originalPrice.toString().trim()) {
        setError("Original price is required");
        return;
      }

      const updatedFeatures = editForm.featuresString
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      if (updatedFeatures.length === 0) {
        setError("At least one feature is required");
        return;
      }

      const updatedPkg: PricingPackage = {
        ...editForm,
        features: updatedFeatures,
      };

      const updatedList = packages.map((p) => (p.id === id ? updatedPkg : p));

      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList),
      });

      if (!res.ok) throw new Error("Failed to save pricing");

      setPackages(updatedList);
      setEditingId(null);
      setEditForm(null);
      setSuccess("✅ Pricing updated successfully!");

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Error saving pricing:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#09090b] text-[#f4f4f5] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-sm text-neutral-400">Loading pricing packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#09090b] text-[#f4f4f5] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-amber-500">
          💳 Gym Holic Pricing Manager
        </h1>
        <p className="text-sm text-neutral-400">
          Edit membership packages, pricing, and features in real-time
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-700 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-300">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
          >
            {editingId === pkg.id ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    value={editForm?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                    placeholder="e.g., Kickstarter Monthly"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editForm?.duration || ""}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                      placeholder="e.g., 1 Month"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="text"
                      value={editForm?.price || ""}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                      placeholder="e.g., 1,499"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-2">
                      Original (₹)
                    </label>
                    <input
                      type="text"
                      value={editForm?.originalPrice || ""}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50"
                      placeholder="e.g., 2,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-2">
                    Features (One per line)
                  </label>
                  <textarea
                    rows={5}
                    value={editForm?.featuresString || ""}
                    onChange={(e) => handleInputChange("featuresString", e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 px-3 py-2 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 resize-none"
                    placeholder="Full Gym Access&#10;24/7 Availability&#10;Free Locker Access&#10;WiFi Access"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    {(editForm?.featuresString.split("\n").filter((f) => f.trim()).length ?? 0)} feature(s)
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-neutral-800">
                  <button
                    onClick={handleCancel}
                    disabled={saveLoading}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(pkg.id)}
                    disabled={saveLoading}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-semibold rounded-lg text-sm flex items-center gap-2 transition-colors"
                  >
                    {saveLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "✓ Save Changes"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{pkg.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-amber-500">₹{pkg.price}</div>
                    <div className="text-xs text-neutral-500 line-through">₹{pkg.originalPrice}</div>
                  </div>
                </div>

                <ul className="text-xs text-neutral-300 space-y-2 border-t border-neutral-800 pt-4">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 flex-shrink-0">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleEditClick(pkg)}
                  className="w-full mt-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-amber-500/50 rounded-lg text-sm font-medium text-amber-400 transition-all"
                >
                  ✏️ Edit Pricing & Features
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {packages.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-neutral-400">No pricing packages found</p>
        </div>
      )}
    </div>
  );
}
