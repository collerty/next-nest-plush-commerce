"use client";

import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Download, Printer} from "lucide-react";

export function DownloadOrderButton() {
  return (
      <Button variant="secondary" size="sm"  onClick={() => toast.info("Download button is not implemented")}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
  )
}

export function PrintOrderButton() {
  return (
      <Button variant="secondary" size="sm" onClick={() => toast.info("Print button is not implemented")}>

        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
  )
}
