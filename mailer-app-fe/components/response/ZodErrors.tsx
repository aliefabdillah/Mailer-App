import React from "react";

export default function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div className="label">
      <label key={index} className="label-text text-red-500">
        {err}
      </label>
    </div>
  ));
}
