"use client";
import React, { useState } from "react";
import Title from "./Title";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Clinics = () => {
  const [activeClinic, setActiveClinic] = useState<{
    id: number;
    image: string;
    name: string;
    address: string;
    description: string;
  } | null>(null);
  const clinics = [
    {
      id: 1,
      image: "/assets/images/clinic.png",
      name: "Clinic 1",
      address: "12 Herbert Chitepo, Zimbabwe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    },
    {
      id: 2,
      image: "/assets/images/clinic2.png",
      name: "Clinic 2",
      address: "Cnr Silundika, Zimbabwe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    },
    {
      id: 3,
      image: "/assets/images/clinic3.png",
      name: "Clinic 3",
      address: "50 4th Street, Zimbabwe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    },
    {
      id: 4,
      image: "/assets/images/clinic2.png",
      name: "Clinic 4",
      address: "200 Harare St, Zimbabwe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.",
    },
  ];

  return (
    <section id="clinics" className="py-20">
      <div className="container mx-auto">
        <Title
          title="Our Clinics"
          subtitle="We have multiple clinics to serve our patients"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {clinics.map((clinic) => (
            <Dialog key={clinic.id}>
              <DialogTrigger asChild>
                <div
                  className="bg-slate-400 shadow-md rounded-lg p-4 cursor-pointer"
                  onClick={() => setActiveClinic(clinic)}
                >
                  <Image
                    width={1000}
                    height={1000}
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={clinic.image}
                    alt={clinic.name}
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold mb-2">{clinic.name}</h4>
                    <p className="text-xs">{clinic.address}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{activeClinic?.name}</DialogTitle>
                  <DialogDescription>
                    {activeClinic?.description}
                  </DialogDescription>
                </DialogHeader>
                <Image
                  width={80}
                  height={80}
                  className="w-full h-48 object-cover rounded-lg"
                  src={activeClinic?.image || ""}
                  alt={activeClinic?.name || ""}
                />
                <DialogFooter>
                  <Button
                    variant={"outline"}
                    onClick={() => setActiveClinic(null)}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clinics;
