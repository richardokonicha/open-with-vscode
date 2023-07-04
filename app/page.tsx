import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { Github, Vscode } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ListProjects from "@/components/home/list-project"
import ComponentGrid from "@/components/home/component-grid";
import CreateProject from "@/components/home/create-project"
import Image from "next/image";

type Data = {
  id: number,
  name: string,
  full_name: string,
  clone_url: string,
  default_branch: string,
  owner: {
    avatar_url: string
    username: string
  }
}
async function getData() {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/repos/search`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const { data }: { data: [Data] } = await getData();
  console.log(data, "data")
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <a
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Open
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer> <Vscode className="text-[#1d9bf0]" />withCode</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Create Repositories and Open with Vscode
          </Balancer>
        </p>

        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <CreateProject />
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/steven-tey/withCode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              List all Projects
            </p>
          </a>
        </div>
      </div>


      <div className="my-10 flex w-full max-w-screen-xl animate-fade-up gap-5 px-5  xl:px-0">

        <div
          className={`flex-1 relative col-span-1 h-96 overflow-scroll rounded-xl border border-gray-200 bg-white shadow-md ${true ? "md:col-span-2" : ""
            }`}
        >
          <div className="flex h-60 items-center justify-center">{<ComponentGrid />}</div>
        </div>

        <ListProjects data={data} />
      </div>
    </>
  );
}
