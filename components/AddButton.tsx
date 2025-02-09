import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

function AddButton({ name }: { name: string }) {
  return (
    <Button variant="outline" className="border-slate-700">
      <Plus size={12} />
      <p className="">{name}</p>
    </Button>
  );
}

export default AddButton;
