"use client";

import { useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Button } from "@/components/ui/button";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GenerateDevScore } from "@/utils/GenerateDevScore";
import { StarsBackground } from "@/components/ui/tars-background";

export default function Home() {
  const [tonConnector] = useTonConnectUI();
  const [createProfileOpen, setCreateProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    photo: null,
    bio: "",
    techStack: "",
    github: "",
    linkedin: "",
    teamRole: "",
  });

  const handleInputChange = (key:any, value:any) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const uploadPhotoAndGetUrl = async (photo: File | string | null) => {
    // Simulate uploading the photo and returning a URL
    if (!photo) return null;
    const formData = new FormData();
    formData.append("file", photo);

    // Replace this URL with your actual upload API endpoint
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }

    const data = await response.json();
    return data.url;
  };

  const createHackerProfile = async () => {
    setLoading(true);
    try {
      if (!profile.name || !profile.bio) {
        alert("Name and Bio are required");
        setLoading(false);
        return;
      }

      // Upload photo and get URL
      const photoUrl = await uploadPhotoAndGetUrl(profile.photo);
      const userProfile = { ...profile, photo: photoUrl };

      // Generate developer score
      const score = await GenerateDevScore(userProfile);

      // Call Google Gemini function
      await fetch("https://google-gemini-api.example.com/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userProfile, devScore: score }),
      });

      alert("Hacker profile created successfully!");
      setCreateProfileOpen(false);
    } catch (error) {
      console.error("Error creating hacker profile:", error);
      alert("Failed to create hacker profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <div className="absolute top-4 right-4">
        <TonConnectButton />
      </div>

      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-6xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>The Open Network</span>
        <span className="text-white text-lg font-thin">x</span>
        <span>Hackathon</span>
      </h2>

      <Dialog open={createProfileOpen} onOpenChange={setCreateProfileOpen}>
        <DialogTrigger>
          <div className="m-10 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Create Hacker Profile</span>
            </HoverBorderGradient>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Hacker Profile</DialogTitle>
            <DialogDescription>
              Fill out your details to generate a developer score
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {[
              { id: "name", label: "Name", type: "text", value: profile.name },
              {
                id: "photo",
                label: "Upload Photo",
                type: "file",
                value: profile.photo,
              },
              { id: "bio", label: "Bio", type: "text", value: profile.bio },
              {
                id: "techStack",
                label: "Tech Stack",
                type: "text",
                value: profile.techStack,
              },
              { id: "github", label: "GitHub", type: "text", value: profile.github },
              { id: "linkedin", label: "LinkedIn", type: "text", value: profile.linkedin },
              { id: "teamRole", label: "Team Role", type: "text", value: profile.teamRole },
            ].map((field) => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type}
                  value={field.type !== "file" ? field.value ?? "" : undefined}
                  onChange={(e) =>
                    handleInputChange(
                      field.id,
                      field.type === "file"
                        ? e.target.files
                          ? e.target.files[0]
                          : null
                        : e.target.value
                    )
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={createHackerProfile}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Profile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
