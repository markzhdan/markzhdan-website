import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import verifyToken from "./verifyToken";

type Handler = (request: Request, context: any) => Promise<Response>;

const catchErrors = (handler: Handler): Handler =>
  async (request, context) => {
    try {
      return await handler(request, context);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const isOperational = error.status && error.status < 500;

      if (process.env.NODE_ENV !== "production") {
        console.log(`Error message (${statusCode}): `, error.message);
        console.log("Error stack: ", error.stack);
      }

      return NextResponse.json(
        {
          message: isOperational ? error.message : "Internal server error",
          stack: process.env.NODE_ENV === "production" ? null : error.stack,
        },
        { status: statusCode }
      );
    }
  };

// Any valid JWT
export const withAuth = (handler: Handler) =>
  catchErrors(async (request, context) => {
    await connectDB();
    verifyToken(request);
    return handler(request, context);
  });

// Valid JWT with isAdmin: true
export const withAdminAuth = (handler: Handler) =>
  catchErrors(async (request, context) => {
    await connectDB();
    const decoded = verifyToken(request);
    if (!decoded.isAdmin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return handler(request, context);
  });

export const withDB = (handler: Handler) =>
  catchErrors(async (request, context) => {
    await connectDB();
    return handler(request, context);
  });
