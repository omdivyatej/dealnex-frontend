"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CompareContent() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-bold">Transaction Name</TableHead>
            <TableHead className="font-bold">Project Argon</TableHead>
            <TableHead className="font-bold">Project Mega</TableHead>
            <TableHead className="font-bold">Project North</TableHead>
            <TableHead className="font-bold">Project Birch</TableHead>
            <TableHead className="font-bold">Project Sunstar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add your rows here */}
        </TableBody>
      </Table>
    </div>
  );
}
