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
      <h2 className="text-center text-3xl font-extrabold mb-10 text-gray-900">What Our Users Say...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) =>(
          <Card
            key={item.description}
            className="bg-gray-600 text-gray-950 border-none"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-around gap-x-2">
                <div className="border-blue-500 border rounded-full flex items-center justify-center">
                  {item.avatar}
                </div>
                <p className="text-lg">{item.name}</p>
                <p className="text-sm text-gray-400">{item.title}</p>
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
