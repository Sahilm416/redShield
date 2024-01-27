"use server";
import { db } from "@/utils/database/db";
import { getCookie } from "cookies-next";
const { v4: uuidv4 } = require("uuid");
import { cookies } from "next/headers";
const { verify } = require("jsonwebtoken");
import { nanoid } from "nanoid";
import { getSession } from "./auth";
import { generateUniqueRandomImage } from "@/public/images";
type projectData = {
  id: string;
  image: string;
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
      (obj) => obj.name === project_name.trim()
    );
    if (checkAlreadyExists) {
      return {
        status: false,
        message: "Project already exists",
      };
    }
    //random image for project
    const imageLink = await generateUniqueRandomImage({ projects: projects });

    const projectTobeAdded = {
      id: nanoid(10),
      image: imageLink,
      name: project_name.trim(),
      description: project_description.trim(),
      key: uuidv4(),
    };
    const newProjects = await db.set(
      data.project_id + ":" + data.email + ":projects",
      [...projects, projectTobeAdded]
    );

    if (newProjects) {
      await db.set("API_KEY:" + projectTobeAdded.key, {
        project_name: projectTobeAdded.name,
        project_id: uuidv4(),
      });

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

    const project = projects.find((obj) => obj.id === data.id);

    return project;
  } catch (error) {
    console.log("Failed to get project", error);
    return null;
  }
};

export const deleteProject = async ({
  id,
  key,
}: {
  id: string;
  key: string;
}) => {
  const session = await getSession();
  if(!session.status){
    return {
      status:false,
      message:"session invalid",
    }
  }

  // Fetch the projects from the database based on the user's session data
  const projects = (await db.get(
    `${session.data.project_id}:${session.data.email}:projects`
  )) as projectData[];

  // Find the index of the project with the given id in the projects array
  const projectIndex = projects.findIndex((project) => project.id === id);

  // If the project with the given id is found, remove it from the array
  if (projectIndex !== -1) {
    projects.splice(projectIndex, 1);

    // Update the projects list in the database
    await db.set(
      `${session.data.project_id}:${session.data.email}:projects`,
      projects
    );
    
    //get project id affilated to api key
    const {project_id} = await db.get(`API_KEY:${key}`) as {project_id: string};
    //also delete the api key of project
    await db.del(`API_KEY:${key}`);
    //also delete all the related users of project
    const allUsers = (await db.keys(project_id + ":*:user")) as [string];
    await db.del(...allUsers);
    // Return the updated projects list or any other relevant information
    return projects;
  } else {
    // If the project with the given id is not found, you can throw an error or handle it as needed
    throw new Error(`Project with ID ${id} not found`);
  }
};


export const updateProject = async ({name,description,projectId}:{name:string ,description:string, projectId: string}) => {
  try {
    const session = await getSession();
    if(!session.status){
      return {
        status:false,
        message:"session invalid",
      }
    }
    const userProjectId = session.data.project_id;

    // Fetch the existing project list from the database
    const existingProjectList = await db.get(`${userProjectId}:${session.data.email}:projects`) as projectData[];
    const checkAlreadyExists = existingProjectList.some(
      (obj) => obj.name === name
    );
    if (checkAlreadyExists) {
      return {
        status: false,
        message: "Project already exists",
      };
    }
    // Find the index of the project with the specified ID in the array
    const projectIndex = existingProjectList.findIndex((p) => p.id === projectId);

    if (projectIndex !== -1) {
      // Update project properties with form data
      const updatedProject: projectData = {
        ...existingProjectList[projectIndex],
        name: name || existingProjectList[projectIndex].name,
        description: description || existingProjectList[projectIndex].description,

      };

      // Update the project in the array
      existingProjectList[projectIndex] = updatedProject;

      // Save the updated project list back to the database
      await db.set(`${userProjectId}:${session.data.email}:projects`, existingProjectList);

      return {
        status: true,
        message:" Project updated successfully"
      }
    } else {
      return {
        status: false,
        message:"project not found"
      }

    }
  } catch (error) {
    return {
      status: false,
      message:"error updating project"
    }
  }
};