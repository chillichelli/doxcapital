"use client";

import {
  CsvRecord,
  CsvState,
  useCsvStateActions,
} from "@/components/csv-data-provider";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import Papa from "papaparse";

export const DropZone = () => {
  const { setData } = useCsvStateActions();

  const onDrop = useCallback<NonNullable<DropzoneOptions["onDrop"]>>(
    (acceptedFiles) => {
      const state: CsvState = {};

      acceptedFiles.forEach((file, i) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading failed");
        reader.onload = () => {
          const data = Papa.parse<CsvRecord>(reader.result as string, {
            header: true,
          });

          if (file.name.replace(/[^-]/g, "").length === 4) {
            const split = file.name.split("-");
            state[split[4].replace(".csv", "")] = data.data;
          } else {
            state[file.name.replace(".csv", "")] = data.data;
          }
        };
        reader.onloadend = () => {
          if (i === acceptedFiles.length - 1) {
            setData(state);
          }
        };

        reader.readAsBinaryString(file);
      });
    },
    [setData],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".csv"],
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={cn(
          isDragActive ? "border-blue-500" : "",
          "border-2 border-dotted rounded-xl text-sm text-center bg-accent dark:bg-accent/20 hover:dark:bg-accent/40 transition-all text-muted-foreground h-[200px] flex items-center justify-center cursor-pointer",
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-xs">Drop the files here ...</p>
        ) : (
          <p className="text-xs">
            Drag & drop some files here <br /> or click to select files
          </p>
        )}
      </div>
    </div>
  );
};
