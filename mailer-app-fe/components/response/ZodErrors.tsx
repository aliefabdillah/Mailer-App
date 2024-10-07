import React from "react";

export default function ZodErrors({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="label">
      <label  className="label-text text-red-500">
        {err}
      </label>
    </div>
  ));
}
