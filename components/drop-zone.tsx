"use client";

import {
  CsvRecord,
  CsvState,
  useCsvStateActions,
} from "@/components/csv-data-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

          state[file.name] = data.data;
        };
        reader.onloadend = () => {
          if (i === acceptedFiles.length - 1) {
            setData(state);
          }
        };

        reader.readAsBinaryString(file);
      });
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload CSV</CardTitle>
        <CardDescription>
          Download multiple CSV files containing holder data <br />
          from the Etherscan token page and upload them here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className="min-w-[320px] text-sm text-center bg-accent text-muted-foreground hover:bg-accent border-2 border-dotted rounded-lg p-4 h-[200px] flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag 'n' drop some files here <br /> or click to select files
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
