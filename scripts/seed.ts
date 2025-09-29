import { faker } from "@faker-js/faker";
import { User } from "../src/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Task } from "../src/models/Task";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../src/db";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const generateUsers = async (amount: number, taskAmount: number) => {
  for (let i = 0; i < amount; i++) {
    const newUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);

    const user = await User.create({
      ...newUser,
      password: hashedPassword,
      role: "user",
    });
    await generateTasks(taskAmount, user._id);
  }
};
const generateAdminUser = async () => {
  const newUser = {
    name: "Joel Johansen",
    email: "joel@johansen.bz",
  };

  const hashedPassword = await bcrypt.hash("VivaldiIsOverrated", 10);

  const user = await User.create({
    ...newUser,
    password: hashedPassword,
    role: "admin",
  });

  await generateTasks(5, user._id);
};

const generateTasks = async (amount: number, user: mongoose.Types.ObjectId) => {
  const tasks = [];

  for (let j = 0; j < amount; j++) {
    tasks.push({
      title: `${faker.company.buzzVerb()} ${faker.company.buzzNoun()}`,
      description: faker.company.buzzPhrase(),
      status: ["to-do", "in progress", "blocked"][
        Math.round(Math.random() * 2)
      ],
      assignedTo: user,
      createdAt: new Date(),
    });
  }
  await Task.insertMany(tasks);
};

const generateData = () => {
  const userAmount = 5;
  const tasksPerUser = 5;

  generateUsers(userAmount, tasksPerUser);
  generateAdminUser();
};

connectDB().then(() => {
  generateData();
});
