"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./card";

const testimonials = [
  {
    "name": "John Doe",
    "avatar": "JD",
    "title": "Software Engineer",
    "description": "Ever since I started using this app, I have never been elsewhere."
  },
  {
    "name": "Jane Smith",
    "avatar": "JS",
    "title": "Product Manager",
    "description": "This app has completely transformed the way I manage my projects. Highly recommended!"
  },
  {
    "name": "Alice Johnson",
    "avatar": "AJ",
    "title": "UX Designer",
    "description": "The user experience of this app is unmatched. It's intuitive and easy to use."
  },
  {
    "name": "Michael Brown",
    "avatar": "MB",
    "title": "Marketing Specialist",
    "description": "Using this app has doubled my productivity. I can't imagine working without it now."
  },
  {
    "name": "Sophia Williams",
    "avatar": "SW",
    "title": "Data Analyst",
    "description": "The insights I get from this app are invaluable. It has become a critical tool in my workflow."
  },
  {
    "name": "David Lee",
    "avatar": "DL",
    "title": "Freelance Writer",
    "description": "This app makes organizing my projects a breeze. I recommend it to anyone who values efficiency."
  }
]


export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-3xl font-extrabold mb-10 text-gray-900">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) =>(
          <Card
            key={item.description}
            className="bg-white text-gray-950 border-none shadow-gray-400"
          >
            <CardHeader>
              <CardTitle className="flex items-end p-2">
                <div className="rounded-md flex text-white items-center justify-center bg-gray-400 p-4 mr-2">
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
