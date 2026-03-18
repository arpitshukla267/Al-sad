import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const INFORMATIONS_DIR = path.join(process.cwd(), "informations");

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
};

export async function GET(request: NextRequest) {
  const relativePath = request.nextUrl.searchParams.get("path");

  if (!relativePath) {
    return new NextResponse("Missing image path", { status: 400 });
  }

  const decodedPath = decodeURIComponent(relativePath);
  const resolvedPath = path.resolve(INFORMATIONS_DIR, decodedPath);

  if (
    resolvedPath !== INFORMATIONS_DIR &&
    !resolvedPath.startsWith(`${INFORMATIONS_DIR}${path.sep}`)
  ) {
    return new NextResponse("Invalid image path", { status: 400 });
  }

  if (!fs.existsSync(resolvedPath)) {
    return new NextResponse("Image not found", { status: 404 });
  }

  const extension = path.extname(resolvedPath).toLowerCase();
  const mimeType = MIME_TYPES[extension] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(resolvedPath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
