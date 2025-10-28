"use client";
import { Card, Typography, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ModCard({ title, description, icon, author, downloads, slug }) {
  return (
    <Link
      href={`/mod/${slug}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          cursor: "pointer",
          overflow: "hidden",
          transition: "all 0.3s ease",
          width:"300px",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: "0 8px 24px rgba(0, 188, 212, 0.3)",
            transform: "translateY(-6px)",
          },
        }}
      >
        {/* Content */}
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 1.5,
          }}
        >
          {icon && (
            <Image
              loader={() => icon}
              src={icon}
              alt={`${title} icon`}
              width={80}
              height={80}
              style={{ borderRadius: "8px" }}
            />
          )}

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mt: 1,
              wordBreak: "break-word",          // ✅ breaks long words
              whiteSpace: "normal",             // ✅ allows multi-line
              overflowWrap: "anywhere",         // ✅ ensures wrapping even for URLs or long tokens
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            By {author}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              flexGrow: 1,
              wordBreak: "break-word",
              whiteSpace: "normal",
              overflowWrap: "anywhere",
              textAlign: "center",
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            p: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            style={{ color: "inherit" }}
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>
          <Typography variant="caption" color="text.secondary">
            {downloads}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
