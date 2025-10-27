"use client"
import { Card, Typography } from "@mui/material"
import Image from "next/image";

export default function ModCard({ title, description, icon, author, downloads }) {
  return (
    <Card
      className="bg-transparent text-foreground rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col"
    >
      <div className="flex flex-col items-center p-4 h-full">
        {icon && (
          <Image
            loader={() => icon}
            src={icon}
            alt={`${title} icon`}
            width={96}
            height={96}
            className="w-24 h-24 rounded-lg mb-4"
          />
        )}
        <div className="text-center flex flex-col grow">
          <div className="flex flex-col justify-center items-center">
            <div className="mb-2">
              <Typography gutterBottom variant="h6" component="div" className="font-bold">
                {title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                By {author}
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="text-gray-500"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
              </svg>
              <Typography variant="caption" color="text.secondary">
                {downloads}
              </Typography>
            </div>
          </div>
          <div className="grow h-20">
            <Typography variant="body2" color="text.secondary" className="mt-2">
              {description}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  )
}
