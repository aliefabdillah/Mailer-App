// components/CustomFileSelector.tsx
import React, { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

const CustomFileSelector = (props: Props) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Pick Attachment</span>
      </div>
      <label htmlFor="file-input" className="custom-file-upload">
        CHOOSE FILES
      </label>
      <input
        {...props}
        type="file"
        id="file-input"
        className="file-input file-input-bordered w-full"
        size={64000000}
        style={{ display: "none" }}
      />
      <div className="label">
        <span className="label-text-alt">
          <span className="text-red">*</span>Maximum File Size <b>64MB</b>
        </span>
      </div>
    </label>
  );
};

export default CustomFileSelector;
