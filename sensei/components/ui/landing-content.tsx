"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

const testimonials = [
  {
    name: "John Doe",
    avatar: "JD",
    title: "Software Engineer",
    description: "Ever since I started using this app, I have never been elsewhere. Awesome stuff"
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-3xl font-extrabold mb-10 text-gray-900">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) =>(
          <Card
            key={item.description}
            className="bg-white text-gray-950 border-none"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-around gap-x-2">
                <div className="rounded-sm flex text-white items-center justify-center bg-gray-400 p-4">
                  {item.avatar}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
