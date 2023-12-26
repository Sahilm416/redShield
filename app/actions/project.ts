"use server";
import { db } from "@/utils/database/db";
import { getCookie } from "cookies-next";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
const { verify } = require("jsonwebtoken");

type projectData = {
  name: string;
  description: string;
  key: string;
};
export const createNewProject = async ({
  project_name,
  project_description,
}: {
  project_name: string;
  project_description: string;
}) => {
  try {
    const token = getCookie("_auth_token", { cookies });

    const data = verify(token, process.env.JWT_SECRET_KEY!) as {
      username: string;
    };

    const res = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
      project_name: string;
      project_id: string;
    };
    const projects = (await db.get(
      res.project_id + ":" + data.username + ":projects"
    )) as projectData[];

    const checkAlreadyExists = projects.some(
      (obj) => obj.name === project_name
    );
    if (checkAlreadyExists) {
      return {
        status: false,
        message: "Project already exists",
      };
    }

    const newProjects = await db.set(
      res.project_id + ":" + data.username + ":projects",
      [
        ...projects,
        {
          name: project_name,
          description: project_description,
          key: nanoid(10),
        },
      ]
    );

    if (newProjects) {
      return {
        status: true,
        message: "Project created successfully",
      };
    } else {
      return {
        status: false,
        message: "error creating project",
      };
    }
  } catch (error) {
    console.log("Error creating project", error);
    return {
      status: false,
      message: "error creating project",
    };
  }
};
