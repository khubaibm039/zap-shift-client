import { useState } from "react";
import { useLoaderData } from "react-router";

const About = () => {
    const { about_page } = useLoaderData();
    const { header, tabs } = about_page;
    const [activeId, setActiveId] = useState("story");

    const activeTab = tabs.find((tab) => tab.id === activeId);

    return (
        <div className="bg-white px-24 py-18 rounded-2xl h-200 ">
            <div className="w-1/2 mb-12">
                <h1 className="font-extrabold text-6xl mb-4">{header.title}</h1>
                <p>{header.description}</p>
            </div>
            <div>
                <div className="border-t border-gray-200">
                    {/* Tab Buttons */}
                    <div className="flex gap-4  mb-6 my-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveId(tab.id)}
                                className={`pb-2 text-2xl font-extrabold border-b-2 -mb-px transition-colors ${
                                    activeId === tab.id
                                        ? "border-green-700 text-[#5B6A2E] font-bold"
                                        : "border-transparent text-gray-400 hover:text-gray-600"
                                }`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Paragraphs */}
                    <div className="flex flex-col gap-4">
                        {activeTab.paragraphs.map((para, i) => (
                            <p
                                key={i}
                                className="text-sm text-[#606060] leading-relaxed text-justify">
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
