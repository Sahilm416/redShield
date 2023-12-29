"use server";
import { db } from "@/utils/database/db";
import { getCookie } from "cookies-next";
const { v4: uuidv4 } = require("uuid");
import { cookies } from "next/headers";
const { verify } = require("jsonwebtoken");
import { nanoid } from "nanoid";
type projectData = {
  id: string;
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
      email: string;
      project_id: string;
    };

    const projects = (await db.get(
      data.project_id + ":" + data.email + ":projects"
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
    const projectTobeAdded =  {
        id: nanoid(10),
        name: project_name,
        description: project_description,
        key: uuidv4(),
      }
    const newProjects = await db.set(
      data.project_id + ":" + data.email + ":projects",
      [
        ...projects,
        projectTobeAdded
      ]
    );

    if (newProjects) {

      await db.set("API_KEY:"+projectTobeAdded.key, {
        project_name: projectTobeAdded.name,
        project_id: uuidv4()
      })  

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

//get specific project

export const getProject = async (data: { id: string }) => {
  try {
  const token = getCookie("_auth_token", { cookies });

  const user = verify(token, process.env.JWT_SECRET_KEY!) as {
    email: string;
    project_id: string;
  };


  const projects = (await db.get(
    user.project_id + ":" + user.email + ":projects"
  )) as projectData[];

  const project = projects.find((obj) => (obj.id === data.id));

  return project;
  } catch (error) {
    console.log("Failed to get project", error);
    return null
  }
};
