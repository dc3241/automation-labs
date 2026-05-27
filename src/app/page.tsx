import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Automation Labs | Smart Tools, Workflows, and Custom Builds for SMB Operators",
  description:
    "Automation Labs helps SMB operators automate their work with smart tools, smart workflows, and custom builds — across HR, Sales, Marketing, Ops, Finance, and Customer Service.",
};

export default function Home() {
  return <HomePage />;
}
