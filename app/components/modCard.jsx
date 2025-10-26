"use client"
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material"

export default function ModCard({ title, description, img, author, downloads }) {
  return (
    <Card
      className="bg-[#1a1a1a] text-white rounded-2xl min-w-3xs shadow-lg hover:scale-[1.02] transition-transform duration-200" 
      sx={{ maxWidth: 320 }}
    >
      <CardMedia
        component="img"
        height="160"
        image={img}
        alt={title}
        className="rounded-t-2xl object-cover min-w-[260px]"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="text-white">
          {title}
        </Typography>
        <Typography variant="body2" color="gray" className="line-clamp-2">
          {description}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between px-3 pb-3">
        <div>
          <Typography variant="caption" color="lightgray">
            By {author}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16" height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6 1v7.5H3l5 5 5-5h-3V1H6z" />
          </svg>
          <Typography variant="caption" color="lightgray">
            {downloads}
          </Typography>
        </div>
      </CardActions>
    </Card>
  )
}
